import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as schemas from '../lib/schemas';

const ROOT_DIR = path.resolve(__dirname, '..');

describe('Repo Hygiene Cleanup (sculptor-portfolio)', () => {
  it('TC-01: Remediate 2 STRAY_ROOT_FILE finding(s) across [.env.local, .vercel]', () => {
    // 1. Verify stray root files do not exist
    const envLocalPath = path.join(ROOT_DIR, '.env.local');
    const vercelPath = path.join(ROOT_DIR, '.vercel');

    expect(fs.existsSync(envLocalPath)).toBe(false);
    expect(fs.existsSync(vercelPath)).toBe(false);

    // 2. Verify .gitignore ignores .env.local / env files and .vercel
    const gitignorePath = path.join(ROOT_DIR, '.gitignore');
    expect(fs.existsSync(gitignorePath)).toBe(true);
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

    expect(gitignoreContent).toMatch(/\.env/);
    expect(gitignoreContent).toMatch(/\.vercel/);
  });

  it('TC-02: Remediate 6 UNUSED_EXPORT finding(s) across [lib/schemas.ts]', () => {
    // Verify that the 6 unreferenced schemas are not exported from lib/schemas.ts
    const exportedSymbols = Object.keys(schemas);

    expect(exportedSymbols).not.toContain('ArtworkStatusSchema');
    expect(exportedSymbols).not.toContain('DimensionsSchema');
    expect(exportedSymbols).not.toContain('ExhibitionTypeSchema');
    expect(exportedSymbols).not.toContain('GalleryImageSchema');
    expect(exportedSymbols).not.toContain('MaterialCategorySchema');
    expect(exportedSymbols).not.toContain('PriceModeSchema');

    // Verify that required public schemas remain exported and valid
    expect(schemas.ArtworkSchema).toBeDefined();
    expect(schemas.ExhibitionSchema).toBeDefined();
    expect(schemas.ArtistProfileSchema).toBeDefined();
    expect(schemas.SiteSettingsSchema).toBeDefined();
  });

  it('TC-03: Remediate 2 UNUSED_DEPENDENCY finding(s) across [package.json]', () => {
    // 1. Check package.json
    const packageJsonPath = path.join(ROOT_DIR, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};

    expect(deps).not.toHaveProperty('clsx');
    expect(deps).not.toHaveProperty('tailwind-merge');
    expect(devDeps).not.toHaveProperty('clsx');
    expect(devDeps).not.toHaveProperty('tailwind-merge');

    // 2. Check pnpm-lock.yaml for direct dependencies
    const lockfilePath = path.join(ROOT_DIR, 'pnpm-lock.yaml');
    const lockfileContent = fs.readFileSync(lockfilePath, 'utf-8');

    // In pnpm-lock.yaml v9, root dependencies appear under importers -> . -> dependencies
    const rootDepsMatch = lockfileContent.match(
      /importers:\s+[\s\S]+?dependencies:\s+([\s\S]+?)(?:devDependencies:|packages:)/
    );
    if (rootDepsMatch && rootDepsMatch[1]) {
      const rootDepsBlock = rootDepsMatch[1];
      expect(rootDepsBlock).not.toMatch(/^\s+clsx:/m);
      expect(rootDepsBlock).not.toMatch(/^\s+tailwind-merge:/m);
    }
  });
});
