import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ArtworkSchema,
  ExhibitionSchema,
  ArtistProfileSchema,
  SiteSettingsSchema,
} from '../lib/schemas.ts';

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateAllContent() {
  console.log('🔍 [SCHEMA_GATE] Validating all content records against Zod schemas...\n');
  const baseDir = process.cwd();
  let errorsCount = 0;

  // 1. Artworks
  const artworksDir = path.join(baseDir, 'content', 'artworks');
  if (await pathExists(artworksDir)) {
    const dirEntries = await fs.readdir(artworksDir);
    const files = dirEntries.filter((f) => f.endsWith('.json'));
    console.log(`Checking ${files.length} artworks in ${artworksDir}...`);

    // Asynchronously batch file reads outside the validation loop
    const artworkRecords = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(artworksDir, file);
        const content = await fs.readFile(fullPath, 'utf8');
        return { file, content };
      })
    );

    for (const { file, content } of artworkRecords) {
      try {
        const raw = JSON.parse(content);
        ArtworkSchema.parse(raw);
        console.log(`  ✓ [ARTWORK] ${file} (${raw.title}) -> Valid`);
      } catch (err: any) {
        console.error(`  ❌ [ARTWORK_SCHEMA_ERROR] in ${file}:`, err.errors || err.message);
        errorsCount++;
      }
    }
  }

  // 2. Exhibitions
  const exhibitionsDir = path.join(baseDir, 'content', 'exhibitions');
  if (await pathExists(exhibitionsDir)) {
    const dirEntries = await fs.readdir(exhibitionsDir);
    const files = dirEntries.filter((f) => f.endsWith('.json'));
    console.log(`\nChecking ${files.length} exhibitions in ${exhibitionsDir}...`);

    // Asynchronously batch file reads outside the validation loop
    const exhibitionRecords = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(exhibitionsDir, file);
        const content = await fs.readFile(fullPath, 'utf8');
        return { file, content };
      })
    );

    for (const { file, content } of exhibitionRecords) {
      try {
        const raw = JSON.parse(content);
        ExhibitionSchema.parse(raw);
        console.log(`  ✓ [EXHIBITION] ${file} (${raw.title}) -> Valid`);
      } catch (err: any) {
        console.error(`  ❌ [EXHIBITION_SCHEMA_ERROR] in ${file}:`, err.errors || err.message);
        errorsCount++;
      }
    }
  }

  // 3. Settings Singletons
  const settingsDir = path.join(baseDir, 'content', 'settings');
  if (await pathExists(settingsDir)) {
    console.log(`\nChecking settings singletons in ${settingsDir}...`);
    // Artist profile
    const profilePath = path.join(settingsDir, 'artist-profile.json');
    if (await pathExists(profilePath)) {
      try {
        const raw = JSON.parse(await fs.readFile(profilePath, 'utf8'));
        ArtistProfileSchema.parse(raw);
        console.log(`  ✓ [SINGLETON] artist-profile.json -> Valid`);
      } catch (err: any) {
        console.error(`  ❌ [PROFILE_SCHEMA_ERROR]:`, err.errors || err.message);
        errorsCount++;
      }
    }

    // Site settings
    const settingsPath = path.join(settingsDir, 'site-settings.json');
    if (await pathExists(settingsPath)) {
      try {
        const raw = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
        SiteSettingsSchema.parse(raw);
        console.log(`  ✓ [SINGLETON] site-settings.json -> Valid`);
      } catch (err: any) {
        console.error(`  ❌ [SETTINGS_SCHEMA_ERROR]:`, err.errors || err.message);
        errorsCount++;
      }
    }
  }

  if (errorsCount > 0) {
    console.error(`\n❌ [FAILED] Found ${errorsCount} schema validation errors.`);
    process.exit(1);
  } else {
    console.log('\n✅ [PASSED] All content files are strictly valid against Zod contracts.');
  }
}

validateAllContent().catch((err) => {
  console.error('Fatal error during content validation:', err);
  process.exit(1);
});
