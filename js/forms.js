// ============ Form Handling ============

import { addShip, updateShip } from './ship-crud.js';
import { addStorageItem, updateStorageItem } from './storage.js';
import { renderShips, renderStorage } from './render.js';
import { getSlotValues, getTurretValues } from './slots.js';
import { closeModal } from './modals.js';

export function handleShipSubmit(e) {
    e.preventDefault();

    const shipId = document.getElementById('shipId').value;
    const shipName = document.getElementById('shipName').value;

    if (!shipName) {
        alert('Please select a ship.');
        return;
    }

    const ship = {
        name: shipName,
        nickname: document.getElementById('shipNickname').value.trim(),
        components: {
            pilotWeapons: getSlotValues('pilotWeaponSlots'),
            turrets: getTurretValues(),
            shields: getSlotValues('shieldSlots'),
            powerPlants: getSlotValues('powerPlantSlots'),
            coolers: getSlotValues('coolerSlots'),
            quantumDrives: getSlotValues('quantumDriveSlots')
        }
    };

    if (shipId) {
        updateShip(shipId, ship);
    } else {
        addShip(ship);
    }

    renderShips();
    closeModal('shipModal');
}

export function getComponentSize(type, name) {
    const SC_DATA = window.SC_DATA;
    
    if (type === 'weapons') {
        for (let i = 1; i <= 7; i++) {
            if (SC_DATA.weapons[i]) {
                const found = SC_DATA.weapons[i].find(w => w.name === name);
                if (found) return i;
            }
        }
    } else if (type === 'shields') {
        const found = SC_DATA.shields.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'powerPlants') {
        const found = SC_DATA.powerPlants.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'coolers') {
        const found = SC_DATA.coolers.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'quantumDrives') {
        const found = SC_DATA.quantumDrives.find(c => c.name === name);
        if (found) return found.size;
    }
    return null;
}

export function handleStorageSubmit(e) {
    e.preventDefault();

    const indexStr = document.getElementById('storageIndex').value;
    const type = document.getElementById('storageType').value;
    const name = document.getElementById('storageComponent').value;

    if (!name) {
        alert('Please select a component.');
        return;
    }

    const size = getComponentSize(type, name);

    const item = {
        type: type,
        name: name,
        size: size,
        quantity: parseInt(document.getElementById('storageQuantity').value, 10) || 1
    };

    if (indexStr !== '') {
        updateStorageItem(parseInt(indexStr, 10), item);
    } else {
        addStorageItem(item);
    }

    renderStorage();
    closeModal('storageModal');
}
