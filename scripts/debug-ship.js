#!/usr/bin/env node
/**
 * Debug script to analyze ship loadout structure
 */

const fs = require('fs');
const path = require('path');

const shipName = process.argv[2] || 'RSI Aurora MR';
const ships = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ships.json'), 'utf8'));
const ship = ships.find(s => s.Name === shipName);

if (!ship) {
    console.log('Ship not found:', shipName);
    process.exit(1);
}

console.log(`=== ${shipName} ===`);
console.log(`Size: ${ship.Size}, IsSpaceship: ${ship.IsSpaceship}`);

function printLoadout(items, indent = 0) {
    if (!items) return;
    for (const item of items) {
        const hp = item.HardpointName || '';
        const type = item.Type || '';
        const size = item.MaxSize || 0;
        const className = item.ClassName || '';

        // Filter to relevant items
        const isWeaponRelated = hp.includes('weapon') || hp.includes('gun') ||
            hp.includes('turret') || hp.includes('class') ||
            type.includes('Gun') || type.includes('Turret') ||
            type.includes('Missile') || type.includes('Rocket');

        if (isWeaponRelated || indent > 0) {
            const prefix = ' '.repeat(indent);
            console.log(`${prefix}${hp}`);
            console.log(`${prefix}  Type: ${type}`);
            console.log(`${prefix}  MaxSize: ${size}, Class: ${className}`);
            if (item.Loadout && item.Loadout.length > 0) {
                printLoadout(item.Loadout, indent + 4);
            }
        }
    }
}

console.log('\n--- Weapon-related hardpoints ---');
printLoadout(ship.Loadout);
