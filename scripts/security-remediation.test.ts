import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import nextConfig from '../next.config.mjs';
import {
  ArtworkSchema,
  ExhibitionSchema,
  ArtistProfileSchema,
  SiteSettingsSchema,
} from '../lib/schemas';
import { getArtworks, getExhibitions, getArtistProfile, getSiteSettings } from '../lib/content';

const ROOT_DIR = path.resolve(__dirname, '..');

function collectSourceFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

describe('Security Remediation (sculptor-portfolio): 2 outflow finding(s) [50cb6affd41e]', () => {
  it('TC-01: Verify AC-SEC-01 (sculptor-portfolio): Remediate 1 UNSAFE_XSS_OR_EXTERNAL_SINK finding(s) across [app/layout.tsx]', () => {
    const layoutPath = path.join(ROOT_DIR, 'app', 'layout.tsx');
    expect(fs.existsSync(layoutPath)).toBe(true);

    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    expect(layoutContent).not.toContain('dangerouslySetInnerHTML');
    expect(layoutContent).toContain('type="application/ld+json"');
    expect(layoutContent).toContain('JSON.stringify(jsonLd)');
  });

  it('TC-02: Verify AC-SEC-02 (sculptor-portfolio): Remediate 1 MISSING_SECURITY_HEADERS finding(s) across [next.config.mjs]', async () => {
    const nextConfigPath = path.join(ROOT_DIR, 'next.config.mjs');
    expect(fs.existsSync(nextConfigPath)).toBe(true);

    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');
    expect(nextConfigContent).toContain('X-Content-Type-Options');
    expect(nextConfigContent).toContain('X-Frame-Options');
    expect(nextConfigContent).toContain('Referrer-Policy');

    expect(typeof nextConfig.headers).toBe('function');
    const rules = await nextConfig.headers!();
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBeGreaterThan(0);

    const allHeaders = rules.flatMap(
      (rule: { headers: Array<{ key: string; value: string }> }) => rule.headers
    );
    const headerMap = new Map(allHeaders.map((h) => [h.key, h.value]));

    expect(headerMap.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headerMap.get('X-Frame-Options')).toMatch(/^(DENY|SAMEORIGIN)$/);
    expect(headerMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
  });

  it('TC-03: Form validation & negative input rejection without corrupting state', () => {
    const invalidArtwork = {
      id: '',
      slug: '',
      title: '',
      year: 1500,
    };
    const artworkResult = ArtworkSchema.safeParse(invalidArtwork);
    expect(artworkResult.success).toBe(false);
    if (!artworkResult.success) {
      expect(artworkResult.error.issues.length).toBeGreaterThan(0);
    }

    const invalidSettings = {
      siteTitle: '',
      tagline: '',
      contactEmail: 'not-an-email',
      contactPhone: '',
    };
    const settingsResult = SiteSettingsSchema.safeParse(invalidSettings);
    expect(settingsResult.success).toBe(false);

    const invalidExhibition = { id: '', slug: '' };
    expect(ExhibitionSchema.safeParse(invalidExhibition).success).toBe(false);

    const invalidProfile = { name: '', birthYear: 1200 };
    expect(ArtistProfileSchema.safeParse(invalidProfile).success).toBe(false);
  });

  it('TC-04: State persistence across full browser reload', async () => {
    const [firstArtworks, firstExhibitions, firstProfile, firstSettings] = await Promise.all([
      getArtworks(),
      getExhibitions(),
      getArtistProfile(),
      getSiteSettings(),
    ]);

    const [reloadedArtworks, reloadedExhibitions, reloadedProfile, reloadedSettings] =
      await Promise.all([getArtworks(), getExhibitions(), getArtistProfile(), getSiteSettings()]);

    expect(reloadedArtworks.length).toBeGreaterThan(0);
    expect(reloadedArtworks).toEqual(firstArtworks);
    expect(reloadedExhibitions).toEqual(firstExhibitions);
    expect(reloadedProfile).toEqual(firstProfile);
    expect(reloadedSettings).toEqual(firstSettings);
  });

  it('TC-SEC-01: Security: Client bundle secret isolation & XSS/external sink integrity (sculptor-portfolio)', () => {
    const sourceDirs = ['app', 'components', 'lib'].map((d) => path.join(ROOT_DIR, d));
    const files = sourceDirs.flatMap((d) => collectSourceFiles(d));
    expect(files.length).toBeGreaterThan(0);

    const forbiddenSecrets = [
      'KEYSTATIC_SECRET',
      'KEYSTATIC_GITHUB_CLIENT_SECRET',
      'GITHUB_PAT',
      'PRIVATE_KEY',
    ];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toContain('dangerouslySetInnerHTML');

      const isClientModule = /^\s*['"]use client['"]/m.test(content);
      if (isClientModule) {
        for (const secret of forbiddenSecrets) {
          expect(content).not.toContain(secret);
        }
      }

      for (const secret of forbiddenSecrets) {
        expect(content).not.toContain(`NEXT_PUBLIC_${secret}`);
      }
    }
  });
});
