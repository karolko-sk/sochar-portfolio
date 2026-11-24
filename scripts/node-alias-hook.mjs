import fs from 'node:fs';
import path from 'node:path';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function resolveFileCandidate(basePath) {
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.mts`,
    `${basePath}.mjs`,
    `${basePath}.js`,
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.mjs'),
    path.join(basePath, 'index.js'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return pathToFileURL(candidate).href;
    }
  }

  return null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const targetPath = path.join(ROOT_DIR, specifier.slice(2));
      const resolvedUrl = resolveFileCandidate(targetPath);
      if (resolvedUrl) {
        return nextResolve(resolvedUrl, context);
      }
    }

    if (
      (specifier.startsWith('./') || specifier.startsWith('../')) &&
      context.parentURL?.startsWith('file://') &&
      !path.extname(specifier)
    ) {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const targetPath = path.resolve(parentDir, specifier);
      const resolvedUrl = resolveFileCandidate(targetPath);
      if (resolvedUrl) {
        return nextResolve(resolvedUrl, context);
      }
    }

    return nextResolve(specifier, context);
  },

  load(url, context, nextLoad) {
    if (url.startsWith('file://') && !url.includes('/node_modules/')) {
      const filePath = fileURLToPath(url);
      if (/\.(ts|tsx|mts)$/.test(filePath)) {
        const source = fs.readFileSync(filePath, 'utf8');
        const { outputText } = ts.transpileModule(source, {
          fileName: filePath,
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            jsx: ts.JsxEmit.Preserve,
            verbatimModuleSyntax: false,
          },
        });
        return {
          format: 'module',
          source: outputText,
          shortCircuit: true,
        };
      }
    }

    return nextLoad(url, context);
  },
});
