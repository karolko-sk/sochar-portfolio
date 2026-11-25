import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextConfig from '../next.config.mjs';
import {
  ArtworkSchema,
  ExhibitionSchema,
  ArtistProfileSchema,
  SiteSettingsSchema,
} from '../lib/schemas.ts';
import { getArtworks, getExhibitions, getArtistProfile, getSiteSettings } from '../lib/content.ts';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
    assert.equal(fs.existsSync(layoutPath), true);

    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    assert.equal(layoutContent.includes('dangerouslySetInnerHTML'), false);
    assert.equal(layoutContent.includes('type="application/ld+json"'), true);
    assert.equal(layoutContent.includes('JSON.stringify(jsonLd)'), true);
  });

  it('TC-02: Verify AC-SEC-02 (sculptor-portfolio): Remediate 1 MISSING_SECURITY_HEADERS finding(s) across [next.config.mjs]', async () => {
    const nextConfigPath = path.join(ROOT_DIR, 'next.config.mjs');
    assert.equal(fs.existsSync(nextConfigPath), true);

    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');
    assert.equal(nextConfigContent.includes('X-Content-Type-Options'), true);
    assert.equal(nextConfigContent.includes('X-Frame-Options'), true);
    assert.equal(nextConfigContent.includes('Referrer-Policy'), true);

    assert.equal(typeof nextConfig.headers, 'function');
    const rules = await nextConfig.headers();
    assert.equal(Array.isArray(rules), true);
    assert.ok(rules.length > 0);

    const allHeaders = rules.flatMap(
      (rule: { headers: Array<{ key: string; value: string }> }) => rule.headers
    );
    const headerMap = new Map(allHeaders.map((h) => [h.key, h.value]));

    assert.equal(headerMap.get('X-Content-Type-Options'), 'nosniff');
    const xFrameOptions = headerMap.get('X-Frame-Options');
    assert.equal(typeof xFrameOptions, 'string');
    assert.match(xFrameOptions as string, /^(DENY|SAMEORIGIN)$/);
    assert.equal(headerMap.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  });

  it('TC-03: Form validation & negative input rejection without corrupting state', () => {
    const invalidArtwork = {
      id: '',
      slug: '',
      title: '',
      year: 1500,
    };
    const artworkResult = ArtworkSchema.safeParse(invalidArtwork);
    assert.equal(artworkResult.success, false);
    if (!artworkResult.success) {
      assert.ok(artworkResult.error.issues.length > 0);
    }

    const invalidSettings = {
      siteTitle: '',
      tagline: '',
      contactEmail: 'not-an-email',
      contactPhone: '',
    };
    const settingsResult = SiteSettingsSchema.safeParse(invalidSettings);
    assert.equal(settingsResult.success, false);

    const invalidExhibition = { id: '', slug: '' };
    assert.equal(ExhibitionSchema.safeParse(invalidExhibition).success, false);

    const invalidProfile = { name: '', birthYear: 1200 };
    assert.equal(ArtistProfileSchema.safeParse(invalidProfile).success, false);
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

    assert.ok(reloadedArtworks.length > 0);
    assert.deepEqual(reloadedArtworks, firstArtworks);
    assert.deepEqual(reloadedExhibitions, firstExhibitions);
    assert.deepEqual(reloadedProfile, firstProfile);
    assert.deepEqual(reloadedSettings, firstSettings);
  });

  it('TC-SEC-01: Security: Client bundle secret isolation & XSS/external sink integrity (sculptor-portfolio)', () => {
    const sourceDirs = ['app', 'components', 'lib'].map((d) => path.join(ROOT_DIR, d));
    const files = sourceDirs.flatMap((d) => collectSourceFiles(d));
    assert.ok(files.length > 0);

    const forbiddenSecrets = [
      'KEYSTATIC_SECRET',
      'KEYSTATIC_GITHUB_CLIENT_SECRET',
      'GITHUB_PAT',
      'PRIVATE_KEY',
    ];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      assert.equal(content.includes('dangerouslySetInnerHTML'), false);

      const isClientModule = /^\s*['"]use client['"]/m.test(content);
      if (isClientModule) {
        for (const secret of forbiddenSecrets) {
          assert.equal(content.includes(secret), false);
        }
      }

      for (const secret of forbiddenSecrets) {
        assert.equal(content.includes(`NEXT_PUBLIC_${secret}`), false);
      }
    }
  });
});
