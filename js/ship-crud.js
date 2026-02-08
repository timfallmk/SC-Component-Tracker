// ============ Ship CRUD Operations ============

import { state, saveData, generateId } from './state.js';

export function addShip(ship) {
    ship.id = generateId();
    state.appData.ships.push(ship);
    saveData(state.appData);
}

export function updateShip(id, updatedShip) {
    const index = state.appData.ships.findIndex(s => s.id === id);
    if (index !== -1) {
        state.appData.ships[index] = { ...updatedShip, id };
        saveData(state.appData);
    }
}

export function deleteShip(id) {
    state.appData.ships = state.appData.ships.filter(s => s.id !== id);
    saveData(state.appData);
}

export function getShipById(id) {
    return state.appData.ships.find(s => s.id === id);
}

// Get ship spec from database
// Falls back to base ship for variants (e.g., "Aegis Gladius Pirate" -> "Aegis Gladius")
export function getShipSpec(shipName) {
    const SC_DATA = window.SC_DATA;
    
    // Direct match
    let spec = SC_DATA.ships.find(s => s.name === shipName);
    if (spec) return spec;

    // Try to find base ship for variants
    const baseShipName = findBaseShipName(shipName);
    if (baseShipName && baseShipName !== shipName) {
        spec = SC_DATA.ships.find(s => s.name === baseShipName);
        if (spec) {
            return { ...spec, name: shipName, isVariant: true, baseName: baseShipName };
        }
    }

    // Fallback: saved name may be missing manufacturer prefix
    spec = SC_DATA.ships.find(s => s.name.endsWith(' ' + shipName));
    if (spec) return { ...spec, name: shipName };

    return null;
}

// Find the base ship name for a variant
export function findBaseShipName(variantName) {
    const SC_DATA = window.SC_DATA;
    
    for (const ship of SC_DATA.ships) {
        if (variantName.startsWith(ship.name + ' ')) {
            return ship.name;
        }
    }
    return null;
}

// Get display name for a ship (without manufacturer prefix)
export function getShipDisplayName(shipName) {
    const spec = getShipSpec(shipName);
    if (!spec) return shipName;

    const manufacturer = spec.manufacturer;

    if (manufacturer === "Consolidated Outland") {
        return shipName.replace(/^C\.O\.\s+/, '');
    }

    if (manufacturer === "Kruger Intergalatic" && shipName.startsWith("Kruger ")) {
        return shipName.substring(7);
    }

    const prefix = manufacturer + ' ';
    if (shipName.startsWith(prefix)) {
        return shipName.substring(prefix.length);
    }

    return shipName;
}
