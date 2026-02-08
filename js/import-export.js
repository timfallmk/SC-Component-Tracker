// ============ Import/Export ============

import { state, saveData, generateId, showToast, APP_VERSION } from './state.js';
import { renderShips, renderStorage } from './render.js';
import { openModal, closeModal } from './modals.js';

export function exportData() {
    const exportPayload = {
        formatVersion: "1.0",
        appVersion: APP_VERSION,
        exportDate: new Date().toISOString(),
        data: {
            ships: state.appData.ships,
            storage: state.appData.storage
        }
    };

    const jsonString = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `sc-tracker-backup-${dateStr}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Exported ${state.appData.ships.length} ships and ${state.appData.storage.length} storage items`);
}

export function importData(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            const validationResult = validateImportData(imported);

            if (!validationResult.valid) {
                showToast('Import failed: ' + validationResult.error);
                return;
            }

            showImportConfirmModal(imported, validationResult.summary);
        } catch (err) {
            console.error('Import parse error:', err);
            showToast('Import failed: Invalid JSON file');
        }
    };

    reader.onerror = function() {
        showToast('Import failed: Could not read file');
    };

    reader.readAsText(file);
}

function validateImportData(imported) {
    if (!imported || typeof imported !== 'object') {
        return { valid: false, error: 'Invalid file format' };
    }

    let data = imported.data || imported;

    if (!data.ships || !Array.isArray(data.ships)) {
        return { valid: false, error: 'Missing or invalid ships data' };
    }

    if (!data.storage || !Array.isArray(data.storage)) {
        return { valid: false, error: 'Missing or invalid storage data' };
    }

    for (let i = 0; i < data.ships.length; i++) {
        const ship = data.ships[i];
        if (!ship.name || typeof ship.name !== 'string') {
            return { valid: false, error: `Ship at index ${i} missing valid name` };
        }
        if (ship.components && typeof ship.components !== 'object') {
            return { valid: false, error: `Ship "${ship.name}" has invalid components` };
        }
    }

    for (let i = 0; i < data.storage.length; i++) {
        const item = data.storage[i];
        if (!item.name || !item.type) {
            return { valid: false, error: `Storage item at index ${i} missing name or type` };
        }
        if (typeof item.quantity !== 'number' || item.quantity < 1) {
            return { valid: false, error: `Storage item "${item.name}" has invalid quantity` };
        }
    }

    return {
        valid: true,
        summary: {
            formatVersion: imported.formatVersion || 'legacy',
            appVersion: imported.appVersion || 'unknown',
            exportDate: imported.exportDate || null,
            shipCount: data.ships.length,
            storageCount: data.storage.length,
            data: data
        }
    };
}

export function showImportConfirmModal(imported, summary) {
    const message = document.getElementById('importMessage');

    let html = `<div class="import-summary">`;
    html += `<p><strong>File Info:</strong></p>`;
    html += `<ul>`;
    html += `<li>Format: ${summary.formatVersion}</li>`;
    html += `<li>App Version: ${summary.appVersion}</li>`;
    if (summary.exportDate) {
        html += `<li>Export Date: ${new Date(summary.exportDate).toLocaleString()}</li>`;
    }
    html += `</ul>`;
    html += `<p><strong>File contains:</strong></p>`;
    html += `<ul>`;
    html += `<li>${summary.shipCount} ship(s)</li>`;
    html += `<li>${summary.storageCount} storage item(s)</li>`;
    html += `</ul>`;
    html += `<p><strong>Your current data:</strong></p>`;
    html += `<ul>`;
    html += `<li>${state.appData.ships.length} ship(s)</li>`;
    html += `<li>${state.appData.storage.length} storage item(s)</li>`;
    html += `</ul>`;
    html += `</div>`;

    message.innerHTML = html;

    window._pendingImport = summary.data;

    openModal('importConfirmModal');
}

export function executeImport(importedData, mode) {
    if (mode === 'replace') {
        state.appData.ships = importedData.ships.map(ship => ({
            ...ship,
            id: ship.id || generateId()
        }));
        state.appData.storage = importedData.storage;
    } else if (mode === 'merge') {
        importedData.ships.forEach(importedShip => {
            const exists = state.appData.ships.some(s =>
                s.name === importedShip.name &&
                (s.nickname || '') === (importedShip.nickname || '')
            );
            if (!exists) {
                state.appData.ships.push({
                    ...importedShip,
                    id: generateId()
                });
            }
        });

        importedData.storage.forEach(importedItem => {
            const existing = state.appData.storage.find(s =>
                s.type === importedItem.type &&
                s.name.toLowerCase() === importedItem.name.toLowerCase() &&
                s.size === importedItem.size
            );
            if (existing) {
                existing.quantity += importedItem.quantity;
            } else {
                state.appData.storage.push({ ...importedItem });
            }
        });
    }

    saveData(state.appData);
    renderShips();
    renderStorage();
    closeModal('importConfirmModal');

    const action = mode === 'replace' ? 'Replaced with' : 'Merged';
    showToast(`${action} ${importedData.ships.length} ships, ${importedData.storage.length} storage items`);
}
