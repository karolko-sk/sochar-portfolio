import fs from 'fs';
import path from 'path';
import {
  ArtworkSchema,
  ExhibitionSchema,
  ArtistProfileSchema,
  SiteSettingsSchema,
} from '../lib/schemas.ts';

function validateAllContent() {
  console.log('🔍 [SCHEMA_GATE] Validating all content records against Zod schemas...\n');
  const baseDir = process.cwd();
  let errorsCount = 0;

  // 1. Artworks
  const artworksDir = path.join(baseDir, 'content', 'artworks');
  if (fs.existsSync(artworksDir)) {
    const files = fs.readdirSync(artworksDir).filter((f) => f.endsWith('.json'));
    console.log(`Checking ${files.length} artworks in ${artworksDir}...`);
    for (const file of files) {
      const fullPath = path.join(artworksDir, file);
      try {
        const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
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
  if (fs.existsSync(exhibitionsDir)) {
    const files = fs.readdirSync(exhibitionsDir).filter((f) => f.endsWith('.json'));
    console.log(`\nChecking ${files.length} exhibitions in ${exhibitionsDir}...`);
    for (const file of files) {
      const fullPath = path.join(exhibitionsDir, file);
      try {
        const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
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
  if (fs.existsSync(settingsDir)) {
    console.log(`\nChecking settings singletons in ${settingsDir}...`);
    // Artist profile
    const profilePath = path.join(settingsDir, 'artist-profile.json');
    if (fs.existsSync(profilePath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
        ArtistProfileSchema.parse(raw);
        console.log(`  ✓ [SINGLETON] artist-profile.json -> Valid`);
      } catch (err: any) {
        console.error(`  ❌ [PROFILE_SCHEMA_ERROR]:`, err.errors || err.message);
        errorsCount++;
      }
    }

    // Site settings
    const settingsPath = path.join(settingsDir, 'site-settings.json');
    if (fs.existsSync(settingsPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
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

validateAllContent();
