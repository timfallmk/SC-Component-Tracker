#!/usr/bin/env node
/**
 * Test script for ship extraction pipeline
 * Validates that extract-ships.js and extract-loadouts.js produce correct results
 */

const path = require('path');

// Load extracted data
const extractedShips = require('./extracted-ships.js');
const extractedLoadouts = require('./extracted-loadouts.js');

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

function getShip(name) {
    return extractedShips.find(s => s.name === name);
}

function getLoadout(name) {
    return extractedLoadouts[name];
}

console.log('\n=== Ship Extraction Tests ===\n');

// Test 1: Snub ships have QD size 0
console.log('1. Snub ships QD size:');
const snubs = [
    'Kruger P-52 Merlin',
    'Kruger P-72 Archimedes',
    'Mirai Fury',
    'Mirai Fury MX',
    'Mirai Fury LX',
    'Argo MPUV Cargo',
    'Argo MPUV Personnel',
    'Argo MPUV Tractor'
];
snubs.forEach(name => {
    const ship = getShip(name);
    if (ship) {
        test(`${name} QD size = 0`, ship.quantumDrive.size === 0,
             `Got: ${ship.quantumDrive.size}`);
    } else {
        test(`${name} exists`, false, 'Ship not found');
    }
});

// Test 2: Merlin has correct pilot weapons (NoseMounted fix)
console.log('\n2. Merlin pilot weapons (NoseMounted fix):');
const merlin = getShip('Kruger P-52 Merlin');
if (merlin) {
    test('Merlin has 3 pilot weapons', merlin.pilotWeapons.length === 3,
         `Got: ${merlin.pilotWeapons.length}`);
    test('Merlin has S2 nose gun', merlin.pilotWeapons.some(w => w.size === 2),
         `Sizes: ${merlin.pilotWeapons.map(w => w.size).join(', ')}`);
    test('Merlin has 2x S1 wing guns', merlin.pilotWeapons.filter(w => w.size === 1).length === 2,
         `S1 count: ${merlin.pilotWeapons.filter(w => w.size === 1).length}`);
}

// Test 3: Asgard pilot/turret classification
console.log('\n3. Asgard weapon classification:');
const asgard = getShip('Anvil Asgard');
if (asgard) {
    test('Asgard has 6 pilot weapons', asgard.pilotWeapons.length === 6,
         `Got: ${asgard.pilotWeapons.length}`);
    test('Asgard pilot weapons are all S3', asgard.pilotWeapons.every(w => w.size === 3),
         `Sizes: ${asgard.pilotWeapons.map(w => w.size).join(', ')}`);
    test('Asgard has 1 manned turret', asgard.turrets.length === 1,
         `Got: ${asgard.turrets.length} turrets`);
    test('Asgard turret is 2x S4',
         asgard.turrets[0]?.guns === 2 && asgard.turrets[0]?.size === 4,
         `Got: ${asgard.turrets[0]?.guns}x S${asgard.turrets[0]?.size}`);
}

// Test 4: Reclaimer remote turrets
console.log('\n4. Reclaimer turret classification:');
const reclaimer = getShip('Aegis Reclaimer');
if (reclaimer) {
    test('Reclaimer has 0 pilot weapons', reclaimer.pilotWeapons.length === 0,
         `Got: ${reclaimer.pilotWeapons.length}`);
    test('Reclaimer has 7 turrets', reclaimer.turrets.length === 7,
         `Got: ${reclaimer.turrets.length}`);
    const mannedCount = reclaimer.turrets.filter(t => t.type === 'manned').length;
    const remoteCount = reclaimer.turrets.filter(t => t.type === 'remote').length;
    test('Reclaimer has 1 manned turret', mannedCount === 1, `Got: ${mannedCount}`);
    test('Reclaimer has 6 remote turrets', remoteCount === 6, `Got: ${remoteCount}`);
}

// Test 5: Redeemer turrets
console.log('\n5. Redeemer turret classification:');
const redeemer = getShip('Aegis Redeemer');
if (redeemer) {
    test('Redeemer has 2 pilot weapons', redeemer.pilotWeapons.length === 2,
         `Got: ${redeemer.pilotWeapons.length}`);
    test('Redeemer has 4 turrets total', redeemer.turrets.length === 4,
         `Got: ${redeemer.turrets.length}`);
    const mannedCount = redeemer.turrets.filter(t => t.type === 'manned').length;
    const remoteCount = redeemer.turrets.filter(t => t.type === 'remote').length;
    test('Redeemer has 2 manned turrets', mannedCount === 2, `Got: ${mannedCount}`);
    test('Redeemer has 2 remote turrets', remoteCount === 2, `Got: ${remoteCount}`);
}

console.log('\n=== Stock Loadout Tests ===\n');

// Test 6: Asgard loadout matches spec
console.log('6. Asgard loadout:');
const asgardLoadout = getLoadout('Anvil Asgard');
if (asgardLoadout) {
    test('Asgard has 6 pilot weapons in stock', asgardLoadout.pilotWeapons.length === 6,
         `Got: ${asgardLoadout.pilotWeapons.length}`);
    test('Asgard has 2 turret weapons in stock', asgardLoadout.turretWeapons.length === 2,
         `Got: ${asgardLoadout.turretWeapons.length}`);
    test('No YellowJacket in pilot weapons (door guns excluded)',
         !asgardLoadout.pilotWeapons.some(w => w.includes('YellowJacket')),
         `Found: ${asgardLoadout.pilotWeapons.filter(w => w.includes('YellowJacket'))}`);
}

// Test 7: Merlin loadout matches spec
console.log('\n7. Merlin loadout:');
const merlinLoadout = getLoadout('Kruger P-52 Merlin');
if (merlinLoadout) {
    test('Merlin has 3 pilot weapons in stock', merlinLoadout.pilotWeapons.length === 3,
         `Got: ${merlinLoadout.pilotWeapons.length}`);
    test('Merlin has 0 turret weapons', merlinLoadout.turretWeapons.length === 0,
         `Got: ${merlinLoadout.turretWeapons.length}`);
}

// Test 8: Reclaimer loadout
console.log('\n8. Reclaimer loadout:');
const reclaimerLoadout = getLoadout('Aegis Reclaimer');
if (reclaimerLoadout) {
    test('Reclaimer has 0 pilot weapons in stock', reclaimerLoadout.pilotWeapons.length === 0,
         `Got: ${reclaimerLoadout.pilotWeapons.length}`);
    // 7 turrets x 2 guns = 14 + 7 PDC turrets x 1 gun = 21 total turret weapons
    // PDC weapons are included in stock but PDC turrets aren't in spec (non-swappable)
    test('Reclaimer turret weapons count (includes PDC)', reclaimerLoadout.turretWeapons.length === 21,
         `Got: ${reclaimerLoadout.turretWeapons.length}`);
}

// Test 9: Snub loadouts have no QD
console.log('\n9. Snub loadouts (no QD):');
snubs.slice(0, 3).forEach(name => {
    const loadout = getLoadout(name);
    if (loadout) {
        test(`${name} has 0 QD in stock`, loadout.quantumDrives.length === 0,
             `Got: ${loadout.quantumDrives.length}`);
    }
});

// Test 10: Standard ship checks
console.log('\n10. Standard ships:');
const gladius = getShip('Aegis Gladius');
if (gladius) {
    test('Gladius has 3 pilot weapons', gladius.pilotWeapons.length === 3,
         `Got: ${gladius.pilotWeapons.length}`);
    test('Gladius has no turrets', gladius.turrets.length === 0,
         `Got: ${gladius.turrets.length}`);
}

const hammerhead = getShip('Aegis Hammerhead');
if (hammerhead) {
    test('Hammerhead has 0 pilot weapons', hammerhead.pilotWeapons.length === 0,
         `Got: ${hammerhead.pilotWeapons.length}`);
    test('Hammerhead has 6 turrets', hammerhead.turrets.length === 6,
         `Got: ${hammerhead.turrets.length}`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50) + '\n');

process.exit(failed > 0 ? 1 : 0);
