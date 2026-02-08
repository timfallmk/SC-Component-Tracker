// ============ Shared State and Constants ============

export const APP_VERSION = '0.86';
export const STORAGE_KEY = 'sc-component-tracker-data';
export const DATA_VERSION_KEY = 'sc-component-tracker-data-version';
export const PROCESSED_DATA_URL = 'https://raw.githubusercontent.com/Lucky44/SC-Component-Tracker/main/processed-data.json';

const defaultData = {
    ships: [],
    storage: []
};

// Mutable state object for appData
export const state = {
    appData: null,
    currentShipSpec: null
};

export function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error loading data:', e);
            return { ...defaultData };
        }
    }
    return { ...defaultData };
}

export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId() {
    return 'ship-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('toast-visible');

    if (toast._hideTimeout) {
        clearTimeout(toast._hideTimeout);
    }
    toast._hideTimeout = setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 2000);
}

// Initialize state
state.appData = loadData();
