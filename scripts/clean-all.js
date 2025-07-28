#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning all node_modules and build artifacts...\n');

// Function to remove directory recursively (cross-platform)
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`🗑️  Removing ${dirPath}`);
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Successfully removed ${dirPath}`);
    } catch (error) {
      console.error(`❌ Failed to remove ${dirPath}:`, error.message);
    }
  } else {
    console.log(`✅ ${dirPath} does not exist`);
  }
}

// Directories to clean node_modules from
const dirs = [
  '.',
  'entity-based-ecommerce/backend',
  'entity-based-ecommerce/frontend', 
  'domain-based-ecommerce/backend',
  'domain-based-ecommerce/frontend'
];

// Remove node_modules directories
dirs.forEach(dir => {
  const nodeModulesPath = path.join(dir, 'node_modules');
  removeDir(nodeModulesPath);
});

// Remove build artifacts manually (since individual clean scripts might fail)
console.log('\n🧽 Cleaning build artifacts...');

const buildArtifacts = [
  { dir: 'entity-based-ecommerce/backend', paths: ['dist'] },
  { dir: 'entity-based-ecommerce/frontend', paths: ['.nuxt', '.output', 'dist'] },
  { dir: 'domain-based-ecommerce/backend', paths: ['dist'] },
  { dir: 'domain-based-ecommerce/frontend', paths: ['.nuxt', '.output', 'dist'] }
];

buildArtifacts.forEach(({ dir, paths }) => {
  paths.forEach(artifactPath => {
    const fullPath = path.join(dir, artifactPath);
    removeDir(fullPath);
  });
});

console.log('\n🎉 All cleaning completed successfully!');
console.log('\nNext steps:');
console.log('1. Run: pnpm install');
console.log('2. Run: pnpm db:generate');
console.log('3. Run: pnpm db:push');
