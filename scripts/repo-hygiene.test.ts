import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as schemas from '../lib/schemas.ts';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('Repo Hygiene Cleanup (sculptor-portfolio)', () => {
  it('TC-01: Remediate 2 STRAY_ROOT_FILE finding(s) across [.env.local, .vercel]', () => {
    const envLocalPath = path.join(ROOT_DIR, '.env.local');
    const vercelPath = path.join(ROOT_DIR, '.vercel');

    assert.equal(fs.existsSync(envLocalPath), false);
    assert.equal(fs.existsSync(vercelPath), false);

    const gitignorePath = path.join(ROOT_DIR, '.gitignore');
    assert.equal(fs.existsSync(gitignorePath), true);
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

    assert.match(gitignoreContent, /\.env/);
    assert.match(gitignoreContent, /\.vercel/);
  });

  it('TC-02: Remediate 6 UNUSED_EXPORT finding(s) across [lib/schemas.ts]', () => {
    const exportedSymbols = Object.keys(schemas);

    assert.equal(exportedSymbols.includes('ArtworkStatusSchema'), false);
    assert.equal(exportedSymbols.includes('DimensionsSchema'), false);
    assert.equal(exportedSymbols.includes('ExhibitionTypeSchema'), false);
    assert.equal(exportedSymbols.includes('GalleryImageSchema'), false);
    assert.equal(exportedSymbols.includes('MaterialCategorySchema'), false);
    assert.equal(exportedSymbols.includes('PriceModeSchema'), false);

    assert.notEqual(schemas.ArtworkSchema, undefined);
    assert.notEqual(schemas.ExhibitionSchema, undefined);
    assert.notEqual(schemas.ArtistProfileSchema, undefined);
    assert.notEqual(schemas.SiteSettingsSchema, undefined);
  });

  it('TC-03: Remediate 2 UNUSED_DEPENDENCY finding(s) across [package.json]', () => {
    const packageJsonPath = path.join(ROOT_DIR, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};

    assert.equal(Object.prototype.hasOwnProperty.call(deps, 'clsx'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(deps, 'tailwind-merge'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(devDeps, 'clsx'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(devDeps, 'tailwind-merge'), false);

    const lockfilePath = path.join(ROOT_DIR, 'pnpm-lock.yaml');
    const lockfileContent = fs.readFileSync(lockfilePath, 'utf-8');

    const rootDepsMatch = lockfileContent.match(
      /importers:\s+[\s\S]+?dependencies:\s+([\s\S]+?)(?:devDependencies:|packages:)/
    );
    if (rootDepsMatch && rootDepsMatch[1]) {
      const rootDepsBlock = rootDepsMatch[1];
      assert.doesNotMatch(rootDepsBlock, /^\s+clsx:/m);
      assert.doesNotMatch(rootDepsBlock, /^\s+tailwind-merge:/m);
    }
  });

  it('TC-04: Verify Tailwind v4 @layer base tokens and WCAG AA contrast token (#63615B) in app/globals.css', () => {
    const globalsCssPath = path.join(ROOT_DIR, 'app', 'globals.css');
    assert.equal(fs.existsSync(globalsCssPath), true);

    const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8');
    assert.equal(globalsCss.includes('@import "tailwindcss";'), true);
    assert.equal(globalsCss.includes('@layer base'), true);
    assert.equal(globalsCss.includes('--ink-faint: #63615B;'), true);
    assert.equal(globalsCss.includes('#98968F'), false);
  });

  it('[TC-01] Verify AC-NH-01 (sculptor-portfolio): Remediate all 2 grounded finding(s) in 00:root-and-build-config (.dockerignore, Dockerfile)', () => {
    const dockerignorePath = path.join(ROOT_DIR, '.dockerignore');
    const dockerfilePath = path.join(ROOT_DIR, 'Dockerfile');

    assert.equal(fs.existsSync(dockerignorePath), false);
    assert.equal(fs.existsSync(dockerfilePath), false);
  });
});
