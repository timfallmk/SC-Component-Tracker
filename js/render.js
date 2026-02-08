// ============ UI Rendering ============

import { state } from './state.js';
import { getShipDisplayName, getShipSpec } from './ship-crud.js';

const TYPE_LABELS = {
    weapons: 'Weapons',
    shields: 'Shield Generators',
    powerPlants: 'Power Plants',
    coolers: 'Coolers',
    quantumDrives: 'Quantum Drives'
};

let isCompactView = false;

export function toggleViewMode() {
    isCompactView = !isCompactView;
    const shipsList = document.getElementById('shipsList');
    const toggleBtn = document.getElementById('viewToggleBtn');

    if (isCompactView) {
        shipsList.classList.add('compact-view');
        toggleBtn.textContent = 'Detail View';
    } else {
        shipsList.classList.remove('compact-view');
        toggleBtn.textContent = 'Compact View';
    }
}

export function renderShips() {
    const container = document.getElementById('shipsList');
    const heading = document.getElementById('shipsHeading');

    if (heading) {
        const count = state.appData.ships.length;
        const viewBtnText = isCompactView ? 'Detail View' : 'Compact View';
        heading.innerHTML = `MY SHIPS: <span class="hangar-count">${count} in hangar</span> <button id="viewToggleBtn" class="view-toggle-btn" onclick="window.toggleViewMode()">${viewBtnText}</button>`;
    }

    if (isCompactView) {
        container.classList.add('compact-view');
    }

    if (state.appData.ships.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No ships added yet.</p>
                <button class="btn btn-primary" onclick="window.openShipModal()">Add Your First Ship</button>
            </div>
        `;
        return;
    }

    const sortedShips = [...state.appData.ships].sort((a, b) =>
        getShipDisplayName(a.name).localeCompare(getShipDisplayName(b.name))
    );

    container.innerHTML = sortedShips.map(ship => {
        const components = ship.components || {};
        const nickname = ship.nickname ? ` <span class="ship-nickname">"${ship.nickname}"</span>` : '';
        const spec = getShipSpec(ship.name);
        const mfr = spec?.manufacturer ? ` <span class="ship-manufacturer">(${spec.manufacturer})</span>` : '';

        return `
            <div class="ship-card" data-id="${ship.id}">
                <div class="ship-card-header">
                    <div class="ship-name">${getShipDisplayName(ship.name)}${mfr}${nickname}</div>
                    <div class="ship-actions">
                        <button class="btn btn-secondary btn-small" onclick="window.openShipModal('${ship.id}')">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="window.confirmDeleteShip('${ship.id}')">Delete</button>
                    </div>
                </div>
                <div class="ship-components">
                    <div class="comp-pilot-weapons">${renderComponentList('Pilot Weapons', components.pilotWeapons)}</div>
                    <div class="comp-turrets">${renderTurretList(components.turrets)}</div>
                    <div class="comp-coolers">${renderComponentList('Coolers', components.coolers)}</div>
                    <div class="comp-power">${renderComponentList('Power', components.powerPlants)}</div>
                    <div class="comp-qt">${renderComponentList('QT Drive', components.quantumDrives)}</div>
                    <div class="comp-shields">${renderComponentList('Shields', components.shields)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderComponentList(label, components) {
    if (!components || components.length === 0) {
        return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-empty">None</span></div>`;
    }
    const names = components.map(c => c.name).filter(n => n);
    if (names.length === 0) {
        return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-empty">None</span></div>`;
    }
    return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-value">${names.join(', ')}</span></div>`;
}

function renderTurretList(turrets) {
    if (!turrets || turrets.length === 0) {
        return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-empty">None</span></div>`;
    }

    const turretDescriptions = turrets.map(t => {
        if (!t.weapon) return null;
        const typePrefix = t.type === 'manned' ? 'M' : 'R';
        return `${typePrefix}: ${t.guns}x ${t.weapon} (S${t.size})`;
    }).filter(Boolean);

    if (turretDescriptions.length === 0) {
        return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-empty">None equipped</span></div>`;
    }

    return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-value">${turretDescriptions.join(', ')}</span></div>`;
}

export function renderStorage() {
    const container = document.getElementById('storageList');

    if (state.appData.storage.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No components in storage.</p>
            </div>
        `;
        return;
    }

    const grouped = {};
    const typeOrder = ['weapons', 'coolers', 'powerPlants', 'quantumDrives', 'shields'];

    state.appData.storage.forEach((item, index) => {
        if (!grouped[item.type]) {
            grouped[item.type] = [];
        }
        grouped[item.type].push({ ...item, originalIndex: index });
    });

    let html = '';
    typeOrder.forEach(type => {
        if (grouped[type] && grouped[type].length > 0) {
            grouped[type].sort((a, b) => {
                if (a.size !== b.size) return (a.size || 0) - (b.size || 0);
                return a.name.localeCompare(b.name);
            });

            html += `
                <div class="storage-group">
                    <div class="storage-group-header">${TYPE_LABELS[type] || type}</div>
                    <div class="storage-group-items">
                        ${grouped[type].map(item => {
                            const sizeLabel = item.size ? (type === 'weapons' ? `S${item.size}` : `Size ${item.size}`) : '';
                            return `
                                <div class="storage-item" data-index="${item.originalIndex}">
                                    <div class="storage-info">
                                        <span class="storage-name">${item.name}</span>
                                        ${sizeLabel ? `<span class="storage-type">(${sizeLabel})</span>` : ''}
                                        <span class="storage-quantity">x${item.quantity}</span>
                                    </div>
                                    <div class="storage-actions">
                                        <button class="btn btn-secondary btn-small" onclick="window.openStorageModal(${item.originalIndex})">Edit</button>
                                        <button class="btn btn-danger btn-small" onclick="window.confirmDeleteStorage(${item.originalIndex})">Delete</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

export function renderSearchResults(results) {
    const container = document.getElementById('searchResults');

    if (!results) {
        container.classList.add('hidden');
        return;
    }

    const totalInstalled = results.installed.length;
    const totalStorage = results.storage.reduce((sum, item) => sum + item.quantity, 0);
    const total = totalInstalled + totalStorage;

    if (total === 0) {
        container.innerHTML = '<p>No components found.</p>';
        container.classList.remove('hidden');
        return;
    }

    let html = `<div class="search-result-count">Found ${total} total</div>`;

    if (totalInstalled > 0) {
        const byShip = {};
        results.installed.forEach(r => {
            const key = getShipDisplayName(r.shipName) + (r.shipNickname ? ` "${r.shipNickname}"` : '');
            if (!byShip[key]) byShip[key] = [];
            byShip[key].push(r.component);
        });

        Object.entries(byShip).forEach(([ship, components]) => {
            html += `<div class="search-result-item">${ship}: ${components.length} installed</div>`;
        });
    }

    if (totalStorage > 0) {
        html += `<div class="search-result-item">Storage: ${totalStorage} available</div>`;
    }

    container.innerHTML = html;
    container.classList.remove('hidden');
}
