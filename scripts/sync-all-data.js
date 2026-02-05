#!/usr/bin/env node
/**
 * Comprehensive data sync script
 * Updates ship specs and stock loadouts from extracted data
 *
 * Usage:
 *   node scripts/sync-all-data.js           # Preview changes
 *   node scripts/sync-all-data.js --apply   # Apply changes
 */

const fs = require('fs');
const path = require('path');

const apply = process.argv.includes('--apply');

// Paths
const dataJsPath = path.join(__dirname, '..', 'data.js');
const extractedShipsPath = path.join(__dirname, 'extracted-ships.js');
const extractedLoadoutsPath = path.join(__dirname, 'extracted-loadouts.js');

// Ships to skip (manually verified or intentionally different)
const SKIP_SHIPS = [
    // Manually verified ships with corrected specs
    'Anvil F7A Hornet Mk II',
    'Anvil F7A Hornet Mk II Heartseeker',
    'Esperia Stinger',
    'C.O. Mustang Delta',
    'Drake Cutlass Steel',
];

// Load data
const extractedShips = require(extractedShipsPath);
const extractedLoadouts = require(extractedLoadoutsPath);

console.log('=== SC Component Tracker Data Sync ===\n');
console.log(`Mode: ${apply ? 'APPLY' : 'PREVIEW'}`);
console.log(`Extracted ships: ${extractedShips.length}`);
console.log(`Extracted loadouts: ${Object.keys(extractedLoadouts).length}`);
console.log(`Skipped ships: ${SKIP_SHIPS.length}`);

// Read data.js content
let dataContent = fs.readFileSync(dataJsPath, 'utf8');

// Parse existing ships from data.js
function getExistingShips() {
    // Ships are in format: ships: [ { name: "...", ... }, ... ]
    const ships = [];
    const shipPattern = /name:\s*"([^"]+)"/g;
    let match;
    while ((match = shipPattern.exec(dataContent)) !== null) {
        // Only include if it looks like a ship entry (has manufacturer nearby)
        const context = dataContent.slice(Math.max(0, match.index - 100), match.index + 200);
        if (context.includes('manufacturer:') && context.includes('pilotWeapons:')) {
            ships.push(match[1]);
        }
    }
    return [...new Set(ships)]; // Remove duplicates
}

const existingShipNames = getExistingShips();
console.log(`Existing ships in data.js: ${existingShipNames.length}\n`);

// Track changes
let specUpdates = 0;
let specAdds = 0;
let loadoutUpdates = 0;
const newShipsToAdd = [];
const processedNewShips = new Set(); // Track ships already processed to avoid duplicates

// === SYNC SHIP SPECS ===
console.log('--- Ship Spec Sync ---\n');

extractedShips.forEach(extracted => {
    const name = extracted.name;

    if (SKIP_SHIPS.includes(name)) {
        return; // Skip manually verified ships
    }

    const exists = existingShipNames.includes(name);

    if (!exists) {
        // New ship - track for adding (skip duplicates from extracted data)
        if (!processedNewShips.has(name)) {
            console.log(`  [NEW] ${name}`);
            newShipsToAdd.push(extracted);
            processedNewShips.add(name);
            specAdds++;
        }
        return;
    }

    // Find and compare existing spec
    const specPattern = new RegExp(
        `(\\{\\s*name:\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*pilotWeapons:\\s*\\[)([^\\]]*)(\\][^}]*turrets:\\s*\\[)([^\\]]*)(\\])`,
        's'
    );

    const match = dataContent.match(specPattern);
    if (!match) return;

    const oldPilot = match[2].trim();
    const oldTurrets = match[4].trim();

    // Format new values
    const newPilot = extracted.pilotWeapons.map(w => `{ size: ${w.size} }`).join(', ');
    const newTurrets = extracted.turrets.map(t =>
        `{ type: "${t.type}", guns: ${t.guns}, size: ${t.size} }`
    ).join(',\n            ');

    // Check for differences
    const pilotChanged = normalizeSpec(oldPilot) !== normalizeSpec(newPilot);
    const turretsChanged = normalizeSpec(oldTurrets) !== normalizeSpec(newTurrets);

    if (pilotChanged || turretsChanged) {
        console.log(`  [UPDATE] ${name}`);
        if (pilotChanged) {
            console.log(`    pilot: ${countItems(oldPilot)} -> ${extracted.pilotWeapons.length}`);
        }
        if (turretsChanged) {
            console.log(`    turrets: ${countItems(oldTurrets)} -> ${extracted.turrets.length}`);
        }
        specUpdates++;

        if (apply) {
            // Apply the update
            const replacement = `$1${newPilot}$3${newTurrets}$5`;
            dataContent = dataContent.replace(specPattern, replacement);
        }
    }
});

function normalizeSpec(str) {
    return str.replace(/\s+/g, '').replace(/,$/,'');
}

function countItems(str) {
    if (!str.trim()) return 0;
    return (str.match(/\{/g) || []).length;
}

// Format a ship entry for data.js
function formatShipEntry(ship) {
    const pilotWeapons = ship.pilotWeapons.map(w => `{ size: ${w.size} }`).join(', ');
    const turrets = ship.turrets.map(t =>
        `{ type: "${t.type}", guns: ${t.guns}, size: ${t.size} }`
    ).join(',\n            ');

    return `{
        name: "${ship.name}",
        manufacturer: "${ship.manufacturer}",
        size: "${ship.size}",
        pilotWeapons: [${pilotWeapons}],
        turrets: [${turrets}],
        shields: { count: ${ship.shields.count}, size: ${ship.shields.size} },
        powerPlants: { count: ${ship.powerPlants.count}, size: ${ship.powerPlants.size} },
        coolers: { count: ${ship.coolers.count}, size: ${ship.coolers.size} },
        quantumDrive: { size: ${ship.quantumDrive.size} }
    }`;
}

// Add new ships to data.js
if (apply && newShipsToAdd.length > 0) {
    console.log('\n--- Adding New Ships ---\n');

    // Find the ships array end - it's the `    ]` line before `};` before stockLoadouts
    // The structure is: ships: [...], followed by ];\n};\n\n// Helper
    const stockLoadoutsPos = dataContent.indexOf('SC_DATA.stockLoadouts');
    const beforeStockLoadouts = dataContent.substring(0, stockLoadoutsPos);

    // Find the closing of the ships array: "    ]\n];\n" pattern
    const shipsArrayEnd = beforeStockLoadouts.lastIndexOf('    ]\n');

    if (shipsArrayEnd !== -1) {
        // Insert new ships before the closing ]
        const newShipEntries = newShipsToAdd.map(ship => formatShipEntry(ship)).join(',\n    ');
        const insertPos = shipsArrayEnd;
        dataContent = dataContent.slice(0, insertPos) + '    },\n    ' + newShipEntries + '\n' + dataContent.slice(insertPos + 5);
        console.log(`  ✓ Added ${newShipsToAdd.length} new ships`);
    } else {
        console.log('  ERROR: Could not find ships array end');
    }
}

// === SYNC STOCK LOADOUTS ===
console.log('\n--- Stock Loadout Sync ---\n');

// Convert extracted loadouts to the format needed
const newLoadoutsJson = JSON.stringify(extractedLoadouts, null, 2);

// Find stockLoadouts section
const loadoutsStart = dataContent.indexOf('SC_DATA.stockLoadouts');
if (loadoutsStart === -1) {
    console.log('ERROR: Could not find SC_DATA.stockLoadouts');
    process.exit(1);
}

// Find end of stockLoadouts
let braceCount = 0;
let inObject = false;
let endPos = loadoutsStart;
for (let i = loadoutsStart; i < dataContent.length; i++) {
    if (dataContent[i] === '{') { braceCount++; inObject = true; }
    else if (dataContent[i] === '}') {
        braceCount--;
        if (inObject && braceCount === 0) {
            endPos = i + 1;
            if (dataContent[i + 1] === ';') endPos++;
            break;
        }
    }
}

const oldLoadoutsSection = dataContent.slice(loadoutsStart, endPos);
const oldLoadoutCount = (oldLoadoutsSection.match(/"[^"]+"\s*:\s*\{/g) || []).length;
const newLoadoutCount = Object.keys(extractedLoadouts).length;

console.log(`  Current loadouts: ${oldLoadoutCount}`);
console.log(`  New loadouts: ${newLoadoutCount}`);

if (apply) {
    const newSection = `SC_DATA.stockLoadouts = ${newLoadoutsJson};`;
    dataContent = dataContent.slice(0, loadoutsStart) + newSection + dataContent.slice(endPos);
    loadoutUpdates = newLoadoutCount;
    console.log(`  ✓ Updated stockLoadouts`);
}

// === SUMMARY ===
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Spec updates: ${specUpdates}`);
console.log(`New ships: ${specAdds}`);
console.log(`Loadout sync: ${apply ? 'applied' : 'pending'}`);

if (apply) {
    fs.writeFileSync(dataJsPath, dataContent);
    console.log('\n✓ Changes written to data.js');
} else {
    console.log('\nRun with --apply to apply changes');
}
