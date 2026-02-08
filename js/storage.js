// ============ Storage CRUD Operations ============

import { state, saveData } from './state.js';

export function addStorageItem(item) {
    const existing = state.appData.storage.find(
        s => s.type === item.type && s.name.toLowerCase() === item.name.toLowerCase() && s.size === item.size
    );
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        state.appData.storage.push(item);
    }
    saveData(state.appData);
}

export function updateStorageItem(index, updatedItem) {
    if (index >= 0 && index < state.appData.storage.length) {
        state.appData.storage[index] = updatedItem;
        saveData(state.appData);
    }
}

export function deleteStorageItem(index) {
    state.appData.storage.splice(index, 1);
    saveData(state.appData);
}
