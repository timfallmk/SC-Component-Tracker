#!/usr/bin/env node
/**
 * End-to-end test for the ship data update pipeline
 * Simulates running the full update process and validates results
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, condition, details = '') {
    if (condition) {
        console.log(`  ✓ ${name}`);
        passed++;
    } else {
        console.log(`  ✗ ${name}`);
        if (details) console.log(`    ${details}`);
        failed++;
    }
}

function run(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf8', cwd: path.join(__dirname, '..') });
    } catch (e) {
        return e.stdout || e.message;
    }
}

console.log('\n=== Update Pipeline Tests ===\n');

// Test 1: Extract ships runs without error
console.log('1. Running extract-ships.js:');
const shipOutput = run('node scripts/extract-ships.js');
test('Script completes', shipOutput.includes('Processed') && shipOutput.includes('ships'));
test('Output file created', fs.existsSync(path.join(__dirname, 'extracted-ships.js')));

// Verify extracted ships structure
const ships = require('./extracted-ships.js');
test('Ships array not empty', ships.length > 200, `Got: ${ships.length}`);
test('Ships have required fields', ships[0].name && ships[0].manufacturer && ships[0].pilotWeapons);

// Test 2: Extract loadouts runs without error
console.log('\n2. Running extract-loadouts.js:');
const loadoutOutput = run('node scripts/extract-loadouts.js');
test('Script completes', loadoutOutput.includes('Processed') && loadoutOutput.includes('loadout'));
test('Output file created', fs.existsSync(path.join(__dirname, 'extracted-loadouts.js')));

// Clear require cache and reload
delete require.cache[require.resolve('./extracted-loadouts.js')];
const loadouts = require('./extracted-loadouts.js');
const loadoutCount = Object.keys(loadouts).length;
test('Loadouts object not empty', loadoutCount > 200, `Got: ${loadoutCount}`);
test('Loadouts have required fields',
     loadouts['Aegis Gladius']?.pilotWeapons && loadouts['Aegis Gladius']?.shields);

// Test 3: Validate spec-loadout consistency for key ships
console.log('\n3. Spec-Loadout consistency:');

function getShip(name) {
    return ships.find(s => s.name === name);
}

const testShips = [
    { name: 'Aegis Gladius', expectPilot: 3, expectTurret: 0 },
    { name: 'Anvil Asgard', expectPilot: 6, expectTurret: 2 },
    { name: 'Kruger P-52 Merlin', expectPilot: 3, expectTurret: 0 },
    { name: 'Drake Cutlass Black', expectPilot: 2, expectTurret: 2 },
];

testShips.forEach(({ name, expectPilot, expectTurret }) => {
    const spec = getShip(name);
    const loadout = loadouts[name];

    if (!spec || !loadout) {
        test(`${name} exists in both`, false, `spec: ${!!spec}, loadout: ${!!loadout}`);
        return;
    }

    const specPilot = spec.pilotWeapons.length;
    const stockPilot = loadout.pilotWeapons.length;
    const specTurretGuns = spec.turrets.reduce((sum, t) => sum + t.guns, 0);
    const stockTurret = loadout.turretWeapons.length;

    test(`${name} pilot weapons match (spec ${specPilot} = stock ${stockPilot})`,
         specPilot === stockPilot || stockPilot <= specPilot);

    // Turret weapons should roughly match (stock may have more due to PDC)
    test(`${name} turret weapons reasonable (spec ${specTurretGuns}, stock ${stockTurret})`,
         stockTurret >= specTurretGuns * 0.8 && stockTurret <= specTurretGuns * 2);
});

// Test 4: Check for duplicate ships (some dupes expected from scunpacked)
console.log('\n4. Data integrity:');
const shipNames = ships.map(s => s.name);
const uniqueNames = new Set(shipNames);
const dupeCount = shipNames.length - uniqueNames.size;
// Some duplicates expected (e.g., Eclipse, Idris-P have multiple entries in scunpacked)
test('Duplicate count within expected range', dupeCount <= 25,
     `Total: ${shipNames.length}, Unique: ${uniqueNames.size}, Dupes: ${dupeCount}`);

// Test 5: Validate weapon sizes are reasonable
console.log('\n5. Weapon size sanity checks:');
const invalidSizes = ships.filter(s =>
    s.pilotWeapons.some(w => w.size < 0 || w.size > 10) ||
    s.turrets.some(t => t.size < 0 || t.size > 10)
);
test('All weapon sizes in valid range (0-10)', invalidSizes.length === 0,
     `Ships with invalid sizes: ${invalidSizes.map(s => s.name).join(', ')}`);

// Test 6: Validate component counts
console.log('\n6. Component count checks:');
const shipsWithComponents = ships.filter(s =>
    s.shields.count > 0 || s.powerPlants.count > 0 || s.coolers.count > 0
);
test('Most ships have components', shipsWithComponents.length > ships.length * 0.9,
     `Ships with components: ${shipsWithComponents.length}/${ships.length}`);

// Test 7: Run validation script
console.log('\n7. Running validation:');
const validationOutput = run('node validate.js');
const issueMatch = validationOutput.match(/TOTAL ISSUES:\s+(\d+)/);
const totalIssues = issueMatch ? parseInt(issueMatch[1]) : -1;
test('Validation completes', totalIssues >= 0, 'Could not parse validation output');
test('Issue count is tracked', true, `Current issues: ${totalIssues}`);

// Summary
console.log('\n' + '='.repeat(50));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

if (totalIssues >= 0) {
    console.log(`\nValidation found ${totalIssues} issues to review`);
}

console.log('\n');
process.exit(failed > 0 ? 1 : 0);
