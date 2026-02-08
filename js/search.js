// ============ Search Functionality ============

import { state } from './state.js';

export function searchComponents(query) {
    if (!query.trim()) return null;

    const searchTerm = query.toLowerCase();
    const results = {
        installed: [],
        storage: []
    };

    state.appData.ships.forEach(ship => {
        const components = ship.components || {};

        (components.pilotWeapons || []).forEach(weapon => {
            if (weapon.name && weapon.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: weapon.name,
                    type: 'pilot weapon'
                });
            }
        });

        (components.turrets || []).forEach(turret => {
            if (turret.weapon && turret.weapon.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: `${turret.guns}x ${turret.weapon}`,
                    type: 'turret'
                });
            }
        });

        (components.shields || []).forEach(shield => {
            if (shield.name && shield.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: shield.name,
                    type: 'shield'
                });
            }
        });

        (components.coolers || []).forEach(cooler => {
            if (cooler.name && cooler.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: cooler.name,
                    type: 'cooler'
                });
            }
        });

        (components.powerPlants || []).forEach(pp => {
            if (pp.name && pp.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: pp.name,
                    type: 'power plant'
                });
            }
        });

        (components.quantumDrives || []).forEach(qd => {
            if (qd.name && qd.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: qd.name,
                    type: 'quantum drive'
                });
            }
        });
    });

    state.appData.storage.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm)) {
            results.storage.push(item);
        }
    });

    return results;
}
