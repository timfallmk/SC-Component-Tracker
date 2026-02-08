#!/usr/bin/env node
/**
 * Bump version across all required files.
 * Updates APP_VERSION in app.js and cache-bust params in index.html.
 *
 * Usage: node scripts/bump-version.js <new-version>
 * Example: node scripts/bump-version.js 0.87
 */

const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
if (!newVersion) {
    console.error('Usage: node scripts/bump-version.js <new-version>');
    console.error('Example: node scripts/bump-version.js 0.87');
    process.exit(1);
}

// Validate version format (X.Y or X.Y.Z, numeric only)
if (!/^\d+\.\d+(\.\d+)?$/.test(newVersion)) {
    console.error(`ERROR: Invalid version format '${newVersion}'`);
    console.error('Expected format: X.Y or X.Y.Z (e.g., 0.87, 1.0, 1.2.3)');
    process.exit(1);
}

// Derive cache-bust number from version by stripping dots
// e.g., 0.87 -> 087, 1.0 -> 10, 1.2.3 -> 123
const cacheBust = newVersion.replace(/\./g, '');

const root = path.join(__dirname, '..');
const appJsPath = path.join(root, 'app.js');
const indexPath = path.join(root, 'index.html');

// 1. Update APP_VERSION in app.js
let appJs = fs.readFileSync(appJsPath, 'utf8');
const oldVersionMatch = appJs.match(/const APP_VERSION = '([^']+)'/);
if (!oldVersionMatch) {
    console.error('ERROR: Could not find APP_VERSION in app.js');
    process.exit(1);
}
const oldVersion = oldVersionMatch[1];
appJs = appJs.replace(
    `const APP_VERSION = '${oldVersion}'`,
    `const APP_VERSION = '${newVersion}'`
);
fs.writeFileSync(appJsPath, appJs);
console.log(`✓ app.js: APP_VERSION '${oldVersion}' → '${newVersion}'`);

// 2. Update cache-bust params in index.html
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace all ?v=XX patterns (global flag to catch duplicates)
const EXPECTED_REPLACEMENTS = 3;
const replacements = [
    { pattern: /styles\.css\?v=\d+/g, replacement: `styles.css?v=${cacheBust}` },
    { pattern: /data\.js\?v=\d+/g, replacement: `data.js?v=${cacheBust}` },
    { pattern: /app\.js\?v=\d+/g, replacement: `app.js?v=${cacheBust}` },
];

let updateCount = 0;
for (const { pattern, replacement } of replacements) {
    pattern.lastIndex = 0;
    if (pattern.test(indexHtml)) {
        pattern.lastIndex = 0;
        indexHtml = indexHtml.replace(pattern, replacement);
        updateCount++;
    }
}

if (updateCount !== EXPECTED_REPLACEMENTS) {
    console.error(`ERROR: Expected ${EXPECTED_REPLACEMENTS} cache-bust replacements in index.html, but only found ${updateCount}`);
    process.exit(1);
}

fs.writeFileSync(indexPath, indexHtml);
console.log(`✓ index.html: Updated ${updateCount} cache-bust params to v=${cacheBust}`);

console.log(`\nVersion bumped to ${newVersion}`);
console.log('Remember to update CHANGELOG.md with release notes.');
