#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating monorepo structure...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'pnpm-workspace.yaml',
  '.nvmrc',
  'DEVELOPMENT.md',
  'entity-based-ecommerce/backend/package.json',
  'entity-based-ecommerce/frontend/package.json',
  'domain-based-ecommerce/backend/package.json',
  'domain-based-ecommerce/frontend/package.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allFilesExist = false;
  }
});

// Check package names in workspace
console.log('\n📦 Checking package names...');

const packages = [
  { file: 'entity-based-ecommerce/backend/package.json', expectedName: 'entity-backend' },
  { file: 'entity-based-ecommerce/frontend/package.json', expectedName: 'entity-frontend' },
  { file: 'domain-based-ecommerce/backend/package.json', expectedName: 'domain-backend' },
  { file: 'domain-based-ecommerce/frontend/package.json', expectedName: 'domain-frontend' }
];

let allNamesCorrect = true;

packages.forEach(({ file, expectedName }) => {
  try {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (content.name === expectedName) {
      console.log(`✅ ${expectedName}`);
    } else {
      console.log(`❌ ${file} - Expected name "${expectedName}", got "${content.name}"`);
      allNamesCorrect = false;
    }
  } catch (error) {
    console.log(`❌ ${file} - Error reading: ${error.message}`);
    allNamesCorrect = false;
  }
});

// Summary
console.log('\n📊 Validation Summary:');
if (allFilesExist && allNamesCorrect) {
  console.log('🎉 Monorepo structure is valid!');
  console.log('\nNext steps:');
  console.log('1. Run: pnpm install');
  console.log('2. Run: pnpm db:generate');
  console.log('3. Run: pnpm db:push');
  console.log('4. Run: pnpm start:all');
} else {
  console.log('❌ Some issues found. Please fix them before proceeding.');
  process.exit(1);
}
