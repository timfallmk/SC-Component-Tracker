// ============ Ship Data Updates ============

import { DATA_VERSION_KEY, PROCESSED_DATA_URL, showToast } from './state.js';
import { populateShipDropdown } from './dropdowns.js';
import { renderShips } from './render.js';
import { openModal, closeModal } from './modals.js';

function getStoredDataVersion() {
    return localStorage.getItem(DATA_VERSION_KEY) || null;
}

function setStoredDataVersion(version) {
    localStorage.setItem(DATA_VERSION_KEY, version);
}

export async function checkForUpdate() {
    const btn = document.getElementById('checkUpdateBtn');
    if (!btn) return;

    btn.classList.add('checking');
    btn.textContent = 'Checking...';

    try {
        const response = await fetch(PROCESSED_DATA_URL + '?t=' + Date.now(), {
            method: 'GET',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const remoteVersion = data.version || data.lastUpdated;
        const localVersion = getStoredDataVersion();

        btn.classList.remove('checking');
        btn.textContent = 'Check for Update';

        const SC_DATA = window.SC_DATA;
        const remoteShipCount = data.ships ? data.ships.length : 0;
        const localShipCount = SC_DATA.ships ? SC_DATA.ships.length : 0;
        const remoteLoadoutCount = data.stockLoadouts ? Object.keys(data.stockLoadouts).length : 0;
        const localLoadoutCount = SC_DATA.stockLoadouts ? Object.keys(SC_DATA.stockLoadouts).length : 0;

        const hasNewerVersion = localVersion && remoteVersion > localVersion;
        const hasMoreData = remoteShipCount > localShipCount || remoteLoadoutCount > localLoadoutCount;

        console.log('Update check:', {
            localShipCount, remoteShipCount,
            localLoadoutCount, remoteLoadoutCount,
            hasNewerVersion, hasMoreData
        });

        if (hasNewerVersion || hasMoreData) {
            showUpdateModal(data, localVersion, remoteVersion);
            btn.classList.add('has-update');
        } else {
            if (!localVersion) {
                setStoredDataVersion(remoteVersion);
            }
            console.log('Showing toast: Ship data is up to date');
            showToast('Ship data is up to date');
        }
    } catch (error) {
        console.error('Update check failed:', error);
        btn.classList.remove('checking');
        btn.textContent = 'Check for Update';
        showToast('Update check failed: ' + error.message);
    }
}

function showUpdateModal(newData, localVersion, remoteVersion) {
    const SC_DATA = window.SC_DATA;
    const message = document.getElementById('updateMessage');

    const remoteDate = new Date(remoteVersion).toLocaleDateString();
    const newShipCount = newData.ships ? newData.ships.length : 0;
    const newLoadoutCount = newData.stockLoadouts ? Object.keys(newData.stockLoadouts).length : 0;
    const currentShipCount = SC_DATA.ships ? SC_DATA.ships.length : 0;
    const currentLoadoutCount = SC_DATA.stockLoadouts ? Object.keys(SC_DATA.stockLoadouts).length : 0;

    const shipDiff = newShipCount - currentShipCount;
    const loadoutDiff = newLoadoutCount - currentLoadoutCount;

    let changes = [];
    if (shipDiff > 0) {
        changes.push(`+${shipDiff} new ships with hardpoints`);
    }
    if (loadoutDiff > 0) {
        changes.push(`+${loadoutDiff} new stock loadouts`);
    }
    if (changes.length === 0) {
        changes.push('Updated ship specifications');
    }

    message.innerHTML = `
        <div class="update-info">
            <p><strong>Update available</strong> (${remoteDate})</p>
            <p><strong>Changes:</strong></p>
            <ul>
                ${changes.map(c => `<li>${c}</li>`).join('')}
            </ul>
            <p class="update-summary">Current: ${currentShipCount} ships → New: ${newShipCount} ships</p>
        </div>
    `;

    window._pendingUpdate = newData;

    openModal('updateModal');
}

export function applyUpdate() {
    const SC_DATA = window.SC_DATA;
    const data = window._pendingUpdate;
    if (!data) return;

    try {
        if (data.ships && Array.isArray(data.ships)) {
            SC_DATA.ships = data.ships;
        }
        if (data.stockLoadouts && typeof data.stockLoadouts === 'object') {
            SC_DATA.stockLoadouts = data.stockLoadouts;
        }

        setStoredDataVersion(data.version || data.lastUpdated);

        localStorage.setItem('sc-ships-data', JSON.stringify(data));

        populateShipDropdown();
        renderShips();

        window._pendingUpdate = null;

        const btn = document.getElementById('checkUpdateBtn');
        if (btn) {
            btn.classList.remove('has-update');
        }

        closeModal('updateModal');
        showToast('Ship data updated successfully');
    } catch (error) {
        console.error('Failed to apply update:', error);
        showToast('Update failed: ' + error.message);
    }
}

export function loadCachedShipData() {
    const SC_DATA = window.SC_DATA;
    try {
        const cached = localStorage.getItem('sc-ships-data');
        if (cached) {
            const data = JSON.parse(cached);
            if (data.ships && Array.isArray(data.ships)) {
                SC_DATA.ships = data.ships;
            }
            if (data.stockLoadouts && typeof data.stockLoadouts === 'object') {
                SC_DATA.stockLoadouts = data.stockLoadouts;
            }
            console.log('Loaded cached ship data:', data.version || 'unknown version');
        }
    } catch (error) {
        console.error('Failed to load cached ship data:', error);
    }
}
