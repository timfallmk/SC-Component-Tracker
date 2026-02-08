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

// Derive cache-bust number from version (0.87 -> 87)
const cacheBust = newVersion.replace(/^0\./, '');

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
const oldCacheBust = oldVersion.replace(/^0\./, '');

// Replace all ?v=XX patterns
const replacements = [
    { pattern: /styles\.css\?v=\d+/, replacement: `styles.css?v=${cacheBust}` },
    { pattern: /data\.js\?v=\d+/, replacement: `data.js?v=${cacheBust}` },
    { pattern: /app\.js\?v=\d+/, replacement: `app.js?v=${cacheBust}` },
];

let updateCount = 0;
for (const { pattern, replacement } of replacements) {
    if (pattern.test(indexHtml)) {
        indexHtml = indexHtml.replace(pattern, replacement);
        updateCount++;
    }
}
fs.writeFileSync(indexPath, indexHtml);
console.log(`✓ index.html: Updated ${updateCount} cache-bust params to v=${cacheBust}`);

console.log(`\nVersion bumped to ${newVersion}`);
console.log('Remember to update CHANGELOG.md with release notes.');
