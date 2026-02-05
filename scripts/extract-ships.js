#!/usr/bin/env node
/**
 * Extract Ship Specs from ships.json
 *
 * This script parses the scunpacked ships.json file and extracts
 * ship hardpoint configurations (weapon mounts, component slots).
 * All ship variants are included to ensure stock loadouts have matching specs.
 *
 * Usage: node scripts/extract-ships.js
 * Output: Writes to scripts/extracted-ships.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const SHIPS_JSON_PATH = path.join(__dirname, '..', 'ships.json');
const OUTPUT_PATH = path.join(__dirname, 'extracted-ships.js');

// Size mapping: game Size value to display string
const SIZE_MAP = {
    0: 'Vehicle',
    1: 'Small',
    2: 'Small',
    3: 'Medium',
    4: 'Medium',
    5: 'Large',
    6: 'Large',
    7: 'Capital',
    8: 'Capital'
};

// Manufacturer name cleanup
const MANUFACTURER_MAP = {
    'Aegis Dynamics': 'Aegis',
    'Anvil Aerospace': 'Anvil',
    'Aopoa': 'Aopoa',
    'Argo Astronautics': 'Argo',
    'Banu': 'Banu',
    'Consolidated Outland': 'Consolidated Outland',
    'Crusader Industries': 'Crusader',
    'Drake Interplanetary': 'Drake',
    'Esperia': 'Esperia',
    'Gatac Manufacture': 'Gatac',
    'Greycat Industrial': 'Greycat',
    'Kruger Intergalactic': 'Kruger',
    'MISC': 'MISC',
    'Musashi Industrial & Starflight Concern': 'MISC',
    'Origin Jumpworks': 'Origin',
    'Roberts Space Industries': 'RSI',
    'Tumbril Land Systems': 'Tumbril',
    'Vanduul': 'Vanduul',
    "Grey's Market": "Grey's Market",
    'Mirai': 'Mirai'
};

/**
 * Clean up ship name
 * Note: Previously stripped "Kruger " prefix, but this caused mismatches
 * with stock loadouts. Now keeps all names as-is from ships.json.
 */
function cleanShipName(name) {
    return name;
}

/**
 * Recursively find items in loadout matching a predicate
 */
function findInLoadout(loadout, predicate, results = []) {
    if (!Array.isArray(loadout)) return results;

    for (const item of loadout) {
        if (predicate(item)) {
            results.push(item);
        }
        if (item.Loadout && Array.isArray(item.Loadout)) {
            findInLoadout(item.Loadout, predicate, results);
        }
    }
    return results;
}

/**
 * Extract pilot weapon hardpoints (not in manned/remote turrets)
 * Only counts actual gun hardpoints (hardpoint_gun_*, hardpoint_class_*, etc.)
 * Gimbals (Turret.GunTurret) at the top level are pilot weapons
 * CanardTurrets (nose turrets) are pilot-controlled, so their guns count as pilot weapons
 * Excludes turret mounts (hardpoint names containing "turret") except for pilot-controlled turrets
 */
function extractPilotWeapons(loadout) {
    const weapons = [];

    // Helper to count weapon hardpoints inside a turret
    function countWeaponsInTurret(items) {
        const turretWeapons = [];
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            const size = item.MaxSize || getSizeFromClassName(item.ClassName) || 0;
            // Count weapon hardpoints inside the turret
            if ((hpName.includes('weapon') || hpName.includes('gun') || hpName.includes('class') ||
                 item.Type === 'Turret.GunTurret') && size > 0) {
                turretWeapons.push({ size });
            }
            // Recurse
            if (item.Loadout) {
                turretWeapons.push(...countWeaponsInTurret(item.Loadout));
            }
        }
        return turretWeapons;
    }

    function processItems(items, inMannedOrRemoteTurret = false) {
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            const type = item.Type || '';

            // Only skip actual turret types, not gimbal mounts named "turret"
            const isMannedTurret = type.includes('TurretBase.MannedTurret');
            const isRemoteTurret = type.includes('TurretBase.RemoteTurret');
            // CanardTurret (nose turret) is pilot-controlled - its weapons should be pilot weapons
            const isCanardTurret = type === 'Turret.CanardTurret';
            // BallTurret and TopTurret are pilot-controlled but swappable, handled in extractTurrets
            const isBallTurret = type === 'Turret.BallTurret';
            const isTopTurret = type === 'Turret.TopTurret';
            // PDCTurret is point defense - automated, not pilot weapons
            const isPDCTurret = type === 'Turret.PDCTurret';
            // WeaponMount.WeaponControl are crew-operated door guns, not pilot weapons
            const isWeaponMount = type.includes('WeaponMount');
            // Remote turrets identified by hardpoint name (e.g., hardpoint_remote_turret_*, hardpoint_turret_remote_*)
            // These are NOT pilot weapons even though they might have Turret.GunTurret type
            const isNamedRemoteTurret = hpName.includes('remote_turret') || hpName.includes('turret_remote');

            // Skip manned/remote turrets (processed separately)
            if (isMannedTurret || isRemoteTurret || isNamedRemoteTurret) continue;

            // Skip ball/top/pdc turrets (handled in extractTurrets as swappable/automated turrets)
            if (isBallTurret || isTopTurret || isPDCTurret) continue;

            // Skip crew-operated weapon mounts (door guns, etc.)
            if (isWeaponMount) continue;

            // CanardTurret (nose turret) - count its weapons as pilot weapons
            if (isCanardTurret && item.Loadout) {
                const turretWeapons = countWeaponsInTurret(item.Loadout);
                weapons.push(...turretWeapons);
                continue;
            }

            // Check if this is a gun hardpoint (gimbal mount, direct weapon, rocket, or nose mount)
            // Rockets can be swapped for guns so they count as weapon hardpoints
            // Only count: Turret.GunTurret (gimbal), WeaponGun.* (weapons), or hardpoint_gun_*
            // Do NOT count hardpoint_class_* alone - that includes missile racks and module mounts
            const isGunHardpoint = hpName.startsWith('hardpoint_gun');
            const isGimbalMount = type === 'Turret.GunTurret';
            const isDirectGun = type === 'WeaponGun.Gun';
            const isRocket = type === 'WeaponGun.Rocket';
            const isNoseMounted = type === 'WeaponGun.NoseMounted';
            // For gimbal mounts, get size from class name (Mount_Gimbal_S4 = size 4)
            // MaxSize at gimbal level is often 1 less than actual weapon size
            let size = item.MaxSize || 0;
            if (isGimbalMount && item.ClassName) {
                const gimbalSizeMatch = item.ClassName.match(/Mount_Gimbal_S(\d+)/i);
                if (gimbalSizeMatch) {
                    size = parseInt(gimbalSizeMatch[1], 10);
                }
            }
            if (!size) {
                size = getSizeFromClassName(item.ClassName) || 0;
            }

            // Check if this gimbal contains nested gimbals (composite structure like Asgard nose)
            // If so, recurse into it instead of counting it as a single weapon
            const hasNestedGimbals = isGimbalMount && item.Loadout &&
                item.Loadout.some(child => child.Type === 'Turret.GunTurret');

            if (!inMannedOrRemoteTurret && !hasNestedGimbals &&
                (isGunHardpoint || isGimbalMount || isDirectGun || isRocket || isNoseMounted) && size > 0) {
                // This is a pilot weapon hardpoint
                weapons.push({ size });
                // Don't recurse into this - we've counted the mount
                continue;
            }

            // Recurse into nested loadout (but skip already-counted gimbals)
            if (item.Loadout && Array.isArray(item.Loadout)) {
                processItems(item.Loadout, inMannedOrRemoteTurret);
            }
        }
    }

    if (loadout) processItems(loadout);
    return weapons;
}

/**
 * Extract turret information (manned, remote, and ball turrets)
 * Detects turrets by Type (TurretBase.MannedTurret, TurretBase.RemoteTurret, Turret.BallTurret)
 * or by hardpoint name (hardpoint_*turret* with Turret.GunTurret type)
 * BallTurrets are pilot-controlled but swappable, so they're treated as "remote" turrets
 * CanardTurrets (nose turrets) are handled in extractPilotWeapons since they're fixed
 */
function extractTurrets(loadout) {
    const turrets = [];

    function countWeaponHardpoints(items) {
        let count = 0;
        let maxSize = 0;
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            const type = item.Type || '';
            // For gimbal mounts, get size from class name (Mount_Gimbal_S4 = size 4)
            // MaxSize at gimbal level is often 1 less than actual weapon size
            let size = item.MaxSize || 0;
            if (type === 'Turret.GunTurret' && item.ClassName) {
                const gimbalSizeMatch = item.ClassName.match(/Mount_Gimbal_S(\d+)/i);
                if (gimbalSizeMatch) {
                    size = parseInt(gimbalSizeMatch[1], 10);
                }
            }
            if (!size) {
                size = getSizeFromClassName(item.ClassName) || 0;
            }

            // Gimbal mounts (Turret.GunTurret) count as 1 weapon - don't recurse into them
            // This prevents double-counting the gimbal + the gun inside
            if (type === 'Turret.GunTurret' && size > 0) {
                count++;
                maxSize = Math.max(maxSize, size);
                // Don't recurse - the gimbal IS the weapon mount
                continue;
            }

            // Direct guns (WeaponGun.Gun) also count
            if (type === 'WeaponGun.Gun' && size > 0) {
                count++;
                maxSize = Math.max(maxSize, size);
                continue;
            }

            // Rockets (WeaponGun.Rocket) also count - they can be swapped for guns
            if (type === 'WeaponGun.Rocket' && size > 0) {
                count++;
                maxSize = Math.max(maxSize, size);
                continue;
            }

            // Recurse into other nested items (but not gimbals/guns)
            if (item.Loadout) {
                const sub = countWeaponHardpoints(item.Loadout);
                count += sub.count;
                maxSize = Math.max(maxSize, sub.maxSize);
            }
        }
        return { count, maxSize };
    }

    function processItems(items) {
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            const type = item.Type || '';
            const cls = (item.ClassName || '').toLowerCase();

            // Detect turrets by type or by hardpoint name or class name
            // TurretBase types are crew-operated or remote turrets
            const isMannedTurret = type.includes('TurretBase.MannedTurret');
            const isRemoteTurret = type.includes('TurretBase.RemoteTurret');
            // BallTurret and TopTurret are pilot-controlled but swappable - treat as "remote"
            const isBallTurret = type === 'Turret.BallTurret';
            const isTopTurret = type === 'Turret.TopTurret';
            // Remote turrets may have Turret.GunTurret type but are identified by name or class
            // Patterns: hardpoint_remote_turret_*, hardpoint_turret_remote_*, *_Remote_Turret class
            const isNamedRemoteTurret = ((hpName.includes('remote_turret') || hpName.includes('turret_remote')) ||
                cls.includes('remote_turret')) &&
                (type === 'Turret.GunTurret' || type.includes('Turret'));

            if (isMannedTurret || isRemoteTurret || isBallTurret || isTopTurret || isNamedRemoteTurret) {
                // Count weapon hardpoints in this turret
                const { count, maxSize } = item.Loadout ?
                    countWeaponHardpoints(item.Loadout) : { count: 0, maxSize: 0 };

                if (count > 0 && maxSize > 0) {
                    turrets.push({
                        type: isMannedTurret ? 'manned' : 'remote',
                        guns: count,
                        size: maxSize
                    });
                }
            } else if (item.Loadout) {
                // Recurse for non-turret items
                processItems(item.Loadout);
            }
        }
    }

    if (loadout) processItems(loadout);
    return turrets;
}

/**
 * Extract size from ClassName (e.g., "QDRV_JUST_S03_Kama_SCItem" -> 3)
 * Used as fallback when MaxSize is 0 or undefined
 */
function getSizeFromClassName(className) {
    if (!className) return 0;
    const match = className.match(/_S0?(\d)/);
    return match ? parseInt(match[1]) : 0;
}

/**
 * Extract component slots (shields, coolers, power plants, quantum drive)
 * Uses MaxSize from hardpoint definitions, with ClassName fallback for QD
 */
function extractComponents(loadout) {
    const components = {
        shields: { count: 0, size: 0 },
        coolers: { count: 0, size: 0 },
        powerPlants: { count: 0, size: 0 },
        quantumDrive: { size: 0 }
    };

    const shields = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('Shield.') && !i.Type.includes('Controller')
    );
    const coolers = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('Cooler') && !i.Type.includes('Controller')
    );
    const powerPlants = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('PowerPlant')
    );
    const qDrives = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('QuantumDrive')
    );

    if (shields.length > 0) {
        components.shields.count = shields.length;
        components.shields.size = Math.max(...shields.map(s =>
            s.MaxSize || s.Size || getSizeFromClassName(s.ClassName) || 0
        ));
    }

    if (coolers.length > 0) {
        components.coolers.count = coolers.length;
        components.coolers.size = Math.max(...coolers.map(c =>
            c.MaxSize || c.Size || getSizeFromClassName(c.ClassName) || 0
        ));
    }

    if (powerPlants.length > 0) {
        components.powerPlants.count = powerPlants.length;
        components.powerPlants.size = Math.max(...powerPlants.map(p =>
            p.MaxSize || p.Size || getSizeFromClassName(p.ClassName) || 0
        ));
    }

    if (qDrives.length > 0) {
        // Try MaxSize first, then Size, then parse from ClassName as fallback
        components.quantumDrive.size = Math.max(...qDrives.map(q =>
            q.MaxSize || q.Size || getSizeFromClassName(q.ClassName) || 0
        ));
    }

    return components;
}

/**
 * Process a single ship
 */
function processShip(ship) {
    const manufacturerName = ship.Manufacturer?.Name || 'Unknown';
    const manufacturer = MANUFACTURER_MAP[manufacturerName] || manufacturerName;
    const size = SIZE_MAP[ship.Size] || 'Unknown';

    const pilotWeapons = extractPilotWeapons(ship.Loadout);
    const turrets = extractTurrets(ship.Loadout);
    const components = extractComponents(ship.Loadout);

    return {
        name: cleanShipName(ship.Name),
        manufacturer,
        size,
        pilotWeapons,
        turrets,
        shields: components.shields,
        powerPlants: components.powerPlants,
        coolers: components.coolers,
        quantumDrive: components.quantumDrive
    };
}

/**
 * Main extraction function
 */
function main() {
    console.log('Reading ships.json...');
    const shipsData = JSON.parse(fs.readFileSync(SHIPS_JSON_PATH, 'utf8'));

    console.log(`Found ${shipsData.length} entries in ships.json`);

    // Filter to spaceships only (include all variants)
    const allSpaceships = shipsData.filter(ship => {
        if (!ship.Name) return false;
        if (!ship.IsSpaceship) return false;
        return true;
    });

    console.log(`Spaceships (including variants): ${allSpaceships.length}`);

    const ships = [];

    for (const ship of allSpaceships) {
        const processed = processShip(ship);

        // Only include ships with some meaningful data
        if (processed.pilotWeapons.length > 0 ||
            processed.turrets.length > 0 ||
            processed.shields.count > 0 ||
            processed.quantumDrive.size > 0) {
            ships.push(processed);
        }
    }

    // Sort by manufacturer then name
    ships.sort((a, b) => {
        const mfgCompare = a.manufacturer.localeCompare(b.manufacturer);
        if (mfgCompare !== 0) return mfgCompare;
        return a.name.localeCompare(b.name);
    });

    console.log(`Processed ${ships.length} ships with hardpoint data`);

    // Generate output
    const output = `// Auto-generated ship specs from ships.json
// Generated: ${new Date().toISOString()}
// Ships with hardpoint data: ${ships.length}

const EXTRACTED_SHIPS = ${JSON.stringify(ships, null, 4)};

// Export for Node.js (if used as module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXTRACTED_SHIPS;
}
`;

    fs.writeFileSync(OUTPUT_PATH, output);
    console.log(`\nOutput written to: ${OUTPUT_PATH}`);

    // Print a few examples for verification
    console.log('\n--- Sample Output ---');
    const samples = ['Aegis Gladius', 'Aegis Hammerhead', "Grey's Shiv"];
    for (const name of samples) {
        const ship = ships.find(s => s.name === name);
        if (ship) {
            console.log(`\n${name}:`);
            console.log(`  Pilot weapons: ${ship.pilotWeapons.length} (sizes: ${ship.pilotWeapons.map(w => w.size).join(', ') || 'none'})`);
            console.log(`  Turrets: ${ship.turrets.length}`);
            console.log(`  Shields: ${ship.shields.count}x S${ship.shields.size}`);
            console.log(`  Power Plants: ${ship.powerPlants.count}x S${ship.powerPlants.size}`);
            console.log(`  Coolers: ${ship.coolers.count}x S${ship.coolers.size}`);
            console.log(`  Quantum Drive: S${ship.quantumDrive.size}`);
        }
    }

    return ships;
}

// Run
main();
