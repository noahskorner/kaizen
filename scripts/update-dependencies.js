/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.resolve(__dirname, '../');
const extensions = ['ts', 'js', 'tsx', 'jsx'];
const rootPackageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
);

function alphabetically(a, b) {
  const regex = /^[a-zA-Z]/;

  // If both start with a letter, or both start with a non-letter, sort alphabetically
  if ((regex.test(a) && regex.test(b)) || (!regex.test(a) && !regex.test(b))) {
    return a.localeCompare(b);
  }

  // Otherwise, sort non-letters first
  return regex.test(a) ? 1 : -1;
}

function getPackageJsonFiles(dir) {
  return fs.readdirSync(dir).filter((file) => file === 'package.json');
}

function updateDependencies(packageJsonPath, dependencies) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Clear out existing dependencies
  packageJson.dependencies = {};
  packageJson.devDependencies = {};
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  dependencies.forEach((dependency) => {
    // Excluding internal dependencies for now
    if (dependency.startsWith('@kaizen')) return;

    // If the dependency is a devDependency in the root package.json
    if (rootPackageJson.devDependencies[dependency] != null) {
      if (packageJson.devDependencies == null) {
        packageJson.devDependencies = {};
      }

      // Add it to devDependencies
      packageJson.devDependencies[dependency] =
        rootPackageJson.devDependencies[dependency];
      return;
    }

    // Else if the dependency is a dependency in the root package.json
    if (rootPackageJson.dependencies[dependency] != null) {
      if (packageJson.dependencies == null) {
        packageJson.dependencies = {};
      }

      // Add it to dependencies
      packageJson.dependencies[dependency] =
        rootPackageJson.dependencies[dependency];
      return;
    }

    console.warn(`Missing dependency in kaizen/package.json: ${dependency}`);
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function findImports(filePath) {
  const fileContent = fs.readFileSync(path.resolve(rootDir, filePath), 'utf8');
  const imports =
    fileContent.match(/import\s+.*\s+from\s+['"]([^'"]+)['"]/g) || [];

  return imports.reduce((prev, importStatement) => {
    const importPath = importStatement.match(/['"]([^'"]+)['"]/)[1];
    if (!importPath.startsWith('.')) {
      return prev.concat(importPath);
    }
    return prev;
  }, []);
}

function updateDependenciesForDir(directory) {
  const packageJsonFiles = getPackageJsonFiles(directory);

  packageJsonFiles.forEach((packageJsonFile) => {
    const packageJsonPath = path.join(directory, packageJsonFile);
    const pattern = `${directory}/**/*.{${extensions.join(',')}}`;
    const files = glob.sync(pattern);

    const dependencies = [
      ...new Set(
        files.reduce((prev, file) => {
          const imports = findImports(file);
          if (imports.length === 0) return prev;

          return [...prev, ...imports];
        }, [])
      )
    ].sort(alphabetically);

    updateDependencies(packageJsonPath, dependencies);
  });
}

const foldersToUpdate = [
  path.join(rootDir, 'apps/api'),
  path.join(rootDir, 'apps/frontend'),
  path.join(rootDir, 'packages/auth/client'),
  path.join(rootDir, 'packages/auth/server'),
  path.join(rootDir, 'packages/auth/shared'),
  path.join(rootDir, 'packages/config'),
  path.join(rootDir, 'packages/core/client'),
  path.join(rootDir, 'packages/core/server'),
  path.join(rootDir, 'packages/core/shared'),
  path.join(rootDir, 'packages/env/client'),
  path.join(rootDir, 'packages/env/server'),
  path.join(rootDir, 'packages/finance/client'),
  path.join(rootDir, 'packages/finance/server'),
  path.join(rootDir, 'packages/finance/shared'),
  path.join(rootDir, 'packages/user/client'),
  path.join(rootDir, 'packages/user/server'),
  path.join(rootDir, 'packages/user/shared')
];

foldersToUpdate.forEach((folder) => {
  updateDependenciesForDir(folder);
});
