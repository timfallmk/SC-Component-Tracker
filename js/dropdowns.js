// ============ Dropdown Population ============

import { state } from './state.js';
import { getShipSpec, getShipDisplayName } from './ship-crud.js';
import { clearAllSlots, populateSlotsForShip } from './slots.js';

export function populateShipDropdown() {
    const SC_DATA = window.SC_DATA;
    const select = document.getElementById('shipName');
    select.innerHTML = '<option value="">Select a ship...</option>';

    const allShipNames = new Set();

    SC_DATA.ships.forEach(ship => allShipNames.add(ship.name));
    Object.keys(SC_DATA.stockLoadouts).forEach(name => allShipNames.add(name));

    const isExcludedVariant = name => /wikelo|best in show|best-in-show/i.test(name || '');

    const shipList = [];

    allShipNames.forEach(shipName => {
        if (isExcludedVariant(shipName)) return;

        const spec = getShipSpec(shipName);
        if (!spec) return;

        shipList.push({
            name: shipName,
            displayName: getShipDisplayName(shipName),
            manufacturer: spec.manufacturer
        });
    });

    shipList.sort((a, b) => a.displayName.localeCompare(b.displayName));

    shipList.forEach(ship => {
        const option = document.createElement('option');
        option.value = ship.name;
        option.textContent = `${ship.displayName} (${ship.manufacturer})`;
        select.appendChild(option);
    });
}

let _shipSearchAllOptions = [];

export function cacheShipSearchOptions() {
    const select = document.getElementById('shipName');
    _shipSearchAllOptions = [];
    for (const opt of select.options) {
        _shipSearchAllOptions.push({ value: opt.value, text: opt.textContent });
    }
}

export function filterShipDropdown() {
    const searchInput = document.getElementById('shipSearch');
    const select = document.getElementById('shipName');
    const query = searchInput.value.toLowerCase().trim();
    const previousValue = select.value;

    select.innerHTML = '';

    if (!query) {
        _shipSearchAllOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        select.value = '';
        if (previousValue) {
            state.currentShipSpec = null;
            clearAllSlots();
            populateSlotsForShip(null);
        }
        return;
    }

    const matches = _shipSearchAllOptions.filter(opt =>
        opt.value && opt.text.toLowerCase().includes(query)
    );

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = matches.length === 0
        ? 'No matches found'
        : `${matches.length} match${matches.length === 1 ? '' : 'es'} — select below`;
    select.appendChild(placeholder);

    matches.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    if (matches.length === 1) {
        select.value = matches[0].value;
        select.dispatchEvent(new Event('change'));
    } else if (previousValue) {
        state.currentShipSpec = null;
        clearAllSlots();
        populateSlotsForShip(null);
    }
}

export function initShipSearch() {
    cacheShipSearchOptions();

    const form = document.getElementById('shipForm');
    form.addEventListener('input', (e) => {
        if (e.target && e.target.id === 'shipSearch') {
            filterShipDropdown();
        }
    }, true);
    form.addEventListener('keydown', (e) => {
        if (e.target && e.target.id === 'shipSearch' && e.key === 'Enter') {
            e.preventDefault();
        }
    }, true);
}

export function createComponentDropdown(type, size, selectedValue = '') {
    const SC_DATA = window.SC_DATA;
    const select = document.createElement('select');
    select.innerHTML = '<option value="">Empty</option>';

    let components;
    switch (type) {
        case 'shield':
            components = SC_DATA.shields.filter(c => c.size <= size);
            break;
        case 'powerPlant':
            components = SC_DATA.powerPlants.filter(c => c.size <= size);
            break;
        case 'cooler':
            components = SC_DATA.coolers.filter(c => c.size <= size);
            break;
        case 'quantumDrive':
            components = SC_DATA.quantumDrives.filter(c => c.size <= size);
            break;
        case 'weapon':
            components = SC_DATA.weapons[size] || [];
            break;
        default:
            components = [];
    }

    components.sort((a, b) => a.name.localeCompare(b.name));

    components.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.name;
        const isUnknownName = (comp.name || '').toLowerCase() === 'unknown';
        const isUnknownType = (comp.type || '').toLowerCase() === 'unknown';

        if (type === 'weapon') {
            option.textContent = isUnknownName || isUnknownType
                ? 'Unknown'
                : `${comp.name} (${comp.type})`;
        } else {
            option.textContent = isUnknownName
                ? 'Unknown'
                : `${comp.name} (${comp.manufacturer})`;
        }

        if (comp.name === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
}
