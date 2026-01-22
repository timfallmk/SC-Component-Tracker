// Star Citizen Ships and Components Database
// Component sizes: 1=Small, 2=Medium, 3=Large, 4=Capital
// Weapon sizes: 1-7 (S1-S7)

const SC_DATA = {
    // ============ WEAPONS BY SIZE ============
    weapons: {
        1: [ // Size 1
            { name: "CF-117 Bulldog", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ1", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-1", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "Strife Mass Driver", manufacturer: "Apocalypse Arms", type: "Mass Driver" },
            { name: "SW16BR2 Sawbuck", manufacturer: "Behring", type: "Ballistic Repeater" },
            { name: "Suckerpunch", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
            { name: "NN-13 Neutron Cannon", manufacturer: "MaxOx", type: "Neutron Cannon" },
            { name: "M3A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky III", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "9-Series Longsword", manufacturer: "Behring", type: "Ballistic Cannon" },
            { name: "YellowJacket GT-210", manufacturer: "Gallenson Tactical", type: "Gatling" },
        ],
        2: [ // Size 2
            { name: "CF-227 Badger", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ2", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-2", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "NDB-28 Neutron", manufacturer: "MaxOx", type: "Neutron Repeater" },
            { name: "M4A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky VI", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Scorpion GT-215", manufacturer: "Gallenson Tactical", type: "Gatling" },
            { name: "SW16BR3 Sawbuck", manufacturer: "Behring", type: "Ballistic Repeater" },
            { name: "Suckerpunch-2", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
            { name: "Attrition-2", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "11-Series Broadsword", manufacturer: "Behring", type: "Ballistic Cannon" },
            { name: "Quarreler", manufacturer: "Esperia", type: "Laser Cannon" },
        ],
        3: [ // Size 3
            { name: "CF-337 Panther", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ3", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-3", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "GT-870 Tarantula", manufacturer: "Gallenson Tactical", type: "Ballistic Cannon" },
            { name: "M5A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky IX", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "NDB-30 Neutron", manufacturer: "MaxOx", type: "Neutron Repeater" },
            { name: "Mantis GT-220", manufacturer: "Gallenson Tactical", type: "Gatling" },
            { name: "Attrition-3", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Predator", manufacturer: "KRIG", type: "Ballistic Gatling" },
            { name: "C-788 Combine", manufacturer: "KRIG", type: "Ballistic Cannon" },
            { name: "Tigerstrike T-19P", manufacturer: "Kruger", type: "Gatling" },
            { name: "Deadbolt III", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "Suckerpunch-3", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        4: [ // Size 4
            { name: "CF-447 Rhino", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "M6A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XII", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Revenant Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "GT-870 Tarantula Mk2", manufacturer: "Gallenson Tactical", type: "Ballistic Cannon" },
            { name: "Attrition-4", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Dominance-4", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "Tigerstrike T-21", manufacturer: "Kruger", type: "Gatling" },
            { name: "S4 Laser Repeater", manufacturer: "BEHR", type: "Repeater" },
            { name: "Deadbolt IV", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "Suckerpunch-4", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        5: [ // Size 5
            { name: "M7A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XV", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "AD5B Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "CF-557 Galdereen", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "Attrition-5", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Deadbolt V", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "C-788 Ballistic Cannon", manufacturer: "KRIG", type: "Ballistic Cannon" },
            { name: "SF7E Laser Cannon", manufacturer: "Kruger", type: "Laser Cannon" },
            { name: "Absolution Distortion", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        6: [ // Size 6
            { name: "CF-667 Mammoth", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "M8A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XVIII", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Attrition-6", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "AD6B Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "S6 Laser Repeater", manufacturer: "Behring", type: "Repeater" },
            { name: "Revanent Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
        ],
        7: [ // Size 7
            { name: "SF7B Ballistic Gatling", manufacturer: "Ares", type: "Gatling" },
            { name: "SF7E Laser Cannon", manufacturer: "Ares", type: "Laser Cannon" },
            { name: "A03 Sledge Mass Driver", manufacturer: "Klaus & Werner", type: "Mass Driver" },
        ],
    },

    // ============ SHIPS WITH COMPONENT SLOTS ============
    // shields/powerPlants/coolers: { count: N, size: 1|2|3 } where 1=S, 2=M, 3=L
    // quantumDrive: { size: 1|2|3 }
    // weapons: array of { size: N } for each hardpoint
    ships: [
        // ===== AEGIS =====
        {
            name: "Aegis Avenger Stalker",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Titan",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Warlock",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Eclipse",
            manufacturer: "Aegis",
            size: "Medium",
            weapons: [{ size: 2 }, { size: 2 }],
            missiles: 3,
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Gladius",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Hammerhead",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Reclaimer",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Redeemer",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 4 },
            coolers: { count: 1, size: 3 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Retaliator Bomber",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Sabre",
            manufacturer: "Aegis",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Vanguard Harbinger",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Sentinel",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Warden",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== ANVIL =====
        {
            name: "Anvil Arrow",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8 Pisces",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8X Pisces Expedition",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Carrack",
            manufacturer: "Anvil",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Anvil F7C Hornet Mk I",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C-M Super Hornet",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7A Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F8C Lightning",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Hawk",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Hurricane",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Terrapin",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Valkyrie",
            manufacturer: "Anvil",
            size: "Large",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== ARGO =====
        {
            name: "ARGO MOLE",
            manufacturer: "ARGO",
            size: "Large",
            weapons: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "ARGO RAFT",
            manufacturer: "ARGO",
            size: "Medium",
            weapons: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== BANU =====
        {
            name: "Banu Defender",
            manufacturer: "Banu",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 2 }
        },

        // ===== CONSOLIDATED OUTLAND =====
        {
            name: "C.O. Mustang Alpha",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Delta",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Nomad",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== CRUSADER =====
        {
            name: "Crusader A2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Ares Inferno",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 7 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Ares Ion",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 7 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader C2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader M2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Mercury Star Runner",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit A1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 4 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit C1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit E1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== DRAKE =====
        {
            name: "Drake Buccaneer",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Caterpillar",
            manufacturer: "Drake",
            size: "Large",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 3, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Drake Corsair",
            manufacturer: "Drake",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutter",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Cutlass Black",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Blue",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Red",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Steel",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Herald",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Vulture",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== ESPERIA =====
        {
            name: "Esperia Blade",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Glaive",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Prowler",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Talon",
            manufacturer: "Esperia",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== GATAC =====
        {
            name: "Gatac Railen",
            manufacturer: "Gatac",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Gatac Syulen",
            manufacturer: "Gatac",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== MISC =====
        {
            name: "MISC Freelancer",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer DUR",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MAX",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MIS",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Hull A",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Hull C",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Prospector",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 1 }],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Razor",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Kore",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Tana",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Starfarer",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Starfarer Gemini",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },

        // ===== ORIGIN =====
        {
            name: "Origin 100i",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 125a",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 135c",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 300i",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 315p",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 325a",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 350r",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 400i",
            manufacturer: "Origin",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Origin 600i Explorer",
            manufacturer: "Origin",
            size: "Large",
            weapons: [{ size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 600i Touring",
            manufacturer: "Origin",
            size: "Large",
            weapons: [{ size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 890 Jump",
            manufacturer: "Origin",
            size: "Capital",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 3, size: 3 },
            powerPlants: { count: 3, size: 3 },
            coolers: { count: 3, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin M50",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== RSI =====
        {
            name: "RSI Aurora CL",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora ES",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LN",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LX",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora MR",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Constellation Andromeda",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Aquila",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Phoenix",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Taurus",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Mantis",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Scorpius",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II CL",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II ES",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II MR",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
    ],

    // ============ COMPONENTS ============
    // size: 1=Small, 2=Medium, 3=Large

    shields: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "AllStop", manufacturer: "Gorgon Defender", size: 1, grade: "C" },
        { name: "Bulwark", manufacturer: "Basilisk", size: 1, grade: "B" },
        { name: "FR-66", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "ForceWall", manufacturer: "Gorgon Defender", size: 1, grade: "D" },
        { name: "Guardian", manufacturer: "Gorgon Defender", size: 1, grade: "C" },
        { name: "INK", manufacturer: "Seal Corp", size: 1, grade: "C" },
        { name: "Mirage", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "Palisade", manufacturer: "Basilisk", size: 1, grade: "A" },
        { name: "SecureHyde", manufacturer: "Seal Corp", size: 1, grade: "C" },
        { name: "Shimmer", manufacturer: "Seal Corp", size: 1, grade: "D" },
        { name: "Targa", manufacturer: "Targa", size: 1, grade: "C" },
        { name: "Veil", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "WEB", manufacturer: "Yorm", size: 1, grade: "C" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Aspis", manufacturer: "Gorgon Defender", size: 2, grade: "C" },
        { name: "5MA 'Chimalli'", manufacturer: "Imperial Starwerks", size: 2, grade: "C" },
        { name: "FR-76", manufacturer: "Gorgon Defender", size: 2, grade: "A" },
        { name: "FullStop", manufacturer: "Gorgon Defender", size: 2, grade: "B" },
        { name: "Rampart", manufacturer: "Basilisk", size: 2, grade: "A" },
        { name: "STOP", manufacturer: "Gorgon Defender", size: 2, grade: "C" },
        { name: "Sukoran", manufacturer: "Banu Souli", size: 2, grade: "C" },
        { name: "Umbra", manufacturer: "Seal Corp", size: 2, grade: "D" },
        { name: "Citadel", manufacturer: "Basilisk", size: 2, grade: "A" },
        { name: "Shroud", manufacturer: "Seal Corp", size: 2, grade: "B" },

        // Size 3 (Large) - verified from starcitizen.tools
        { name: "5CA 'Akura'", manufacturer: "Imperial Starwerks", size: 3, grade: "C" },
        { name: "Stronghold", manufacturer: "Basilisk", size: 3, grade: "A" },
        { name: "Barbican", manufacturer: "Basilisk", size: 3, grade: "B" },
        { name: "FR-86", manufacturer: "Gorgon Defender", size: 3, grade: "A" },
        { name: "FullBlock", manufacturer: "Gorgon Defender", size: 3, grade: "B" },
        { name: "GUARD", manufacturer: "Gorgon Defender", size: 3, grade: "C" },
        { name: "Parapet", manufacturer: "Basilisk", size: 3, grade: "B" },
        { name: "Ward", manufacturer: "Gorgon Defender", size: 3, grade: "C" },
    ],

    coolers: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "ArcticStorm", manufacturer: "J-Span", size: 1, grade: "A" },
        { name: "Bracer", manufacturer: "Wen/Cassel", size: 1, grade: "C" },
        { name: "Endo", manufacturer: "Lightning Power", size: 1, grade: "C" },
        { name: "Frost-Star", manufacturer: "Tyler Design", size: 1, grade: "C" },
        { name: "HeatSafe", manufacturer: "Wen/Cassel", size: 1, grade: "D" },
        { name: "Polar", manufacturer: "J-Span", size: 1, grade: "C" },
        { name: "Ultra-Flow", manufacturer: "J-Span", size: 1, grade: "B" },
        { name: "VaporBlock", manufacturer: "J-Span", size: 1, grade: "B" },
        { name: "Winter-Star", manufacturer: "Tyler Design", size: 1, grade: "A" },
        { name: "ZeroRush", manufacturer: "Wen/Cassel", size: 1, grade: "A" },
        { name: "Thermax", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "SnowBlind", manufacturer: "Tyler Design", size: 1, grade: "A" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Avalanche", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "ColdSnap", manufacturer: "J-Span", size: 2, grade: "C" },
        { name: "CoolCore", manufacturer: "J-Span", size: 2, grade: "D" },
        { name: "Frost-Star EX", manufacturer: "Tyler Design", size: 2, grade: "C" },
        { name: "Graupel", manufacturer: "J-Span", size: 2, grade: "C" },
        { name: "Snowfall", manufacturer: "Tyler Design", size: 2, grade: "B" },
        { name: "Snowpack", manufacturer: "Tyler Design", size: 2, grade: "A" },
        { name: "Winter-Star EX", manufacturer: "Tyler Design", size: 2, grade: "A" },
        { name: "Arctic", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "IceBox", manufacturer: "J-Span", size: 2, grade: "C" },

        // Size 3 (Large) - common large coolers
        { name: "Ice-Flush", manufacturer: "J-Span", size: 3, grade: "B" },
        { name: "Mercury", manufacturer: "J-Span", size: 3, grade: "C" },
        { name: "ThermalCore", manufacturer: "Lightning Power", size: 3, grade: "C" },
        { name: "Cryo-Star XL", manufacturer: "Tyler Design", size: 3, grade: "A" },
    ],

    powerPlants: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "DeltaMax", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "Endurance", manufacturer: "Amon & Reese", size: 1, grade: "B" },
        { name: "Fierell Cascade", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "Fortitude", manufacturer: "Amon & Reese", size: 1, grade: "B" },
        { name: "IonBurst", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "JS-300", manufacturer: "J-Span", size: 1, grade: "C" },
        { name: "LumaCore", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "OverDrive", manufacturer: "J-Span", size: 1, grade: "D" },
        { name: "PowerBolt", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "QuadraCell", manufacturer: "Lightning Power", size: 1, grade: "C" },
        { name: "Regulus", manufacturer: "ACOM", size: 1, grade: "A" },
        { name: "Roughneck", manufacturer: "Sakura Sun", size: 1, grade: "C" },
        { name: "Slipstream", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "SonicLite", manufacturer: "Lightning Power", size: 1, grade: "B" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Bolide", manufacturer: "Lightning Power", size: 2, grade: "D" },
        { name: "DayBreak", manufacturer: "ACOM", size: 2, grade: "A" },
        { name: "Diligence", manufacturer: "ACOM", size: 2, grade: "B" },
        { name: "Genoa", manufacturer: "ACOM", size: 2, grade: "C" },
        { name: "JS-400", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "Lotus", manufacturer: "Tyler Design", size: 2, grade: "B" },
        { name: "Maelstrom", manufacturer: "Lightning Power", size: 2, grade: "A" },
        { name: "Sedulity", manufacturer: "Sakura Sun", size: 2, grade: "A" },
        { name: "Trommel", manufacturer: "Amon & Reese", size: 2, grade: "D" },
        { name: "TurboDrive", manufacturer: "J-Span", size: 2, grade: "B" },

        // Size 3 (Large) - common large power plants
        { name: "Durable-Series", manufacturer: "Sakura Sun", size: 3, grade: "C" },
        { name: "Reliance", manufacturer: "Amon & Reese", size: 3, grade: "B" },
        { name: "Ginzel", manufacturer: "Amon & Reese", size: 3, grade: "C" },
        { name: "JS-500", manufacturer: "J-Span", size: 3, grade: "B" },
        { name: "SuperDrive", manufacturer: "J-Span", size: 3, grade: "C" },
        { name: "Durango", manufacturer: "ACOM", size: 3, grade: "A" },
    ],

    quantumDrives: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "Atlas", manufacturer: "Tarsus", size: 1, grade: "B" },
        { name: "Beacon", manufacturer: "Tarsus", size: 1, grade: "D" },
        { name: "Colossus", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Drift", manufacturer: "Roberts", size: 1, grade: "D" },
        { name: "Eos", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Expedition", manufacturer: "Wei-Tek", size: 1, grade: "B" },
        { name: "FoxFire", manufacturer: "Tarsus", size: 1, grade: "C" },
        { name: "Goliath", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Rush", manufacturer: "Wei-Tek", size: 1, grade: "A" },
        { name: "Siren", manufacturer: "Roberts", size: 1, grade: "C" },
        { name: "Spectre", manufacturer: "Roberts", size: 1, grade: "B" },
        { name: "VK-00", manufacturer: "Tarsus", size: 1, grade: "C" },
        { name: "Voyage", manufacturer: "Wei-Tek", size: 1, grade: "C" },
        { name: "Vulcan", manufacturer: "RAMP", size: 1, grade: "A" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Hemera", manufacturer: "Roberts", size: 2, grade: "B" },
        { name: "Huracan", manufacturer: "RAMP", size: 2, grade: "A" },
        { name: "Odyssey", manufacturer: "Wei-Tek", size: 2, grade: "C" },
        { name: "XL-1", manufacturer: "Tarsus", size: 2, grade: "C" },
        { name: "Yeager", manufacturer: "RAMP", size: 2, grade: "B" },
        { name: "Crossfield", manufacturer: "Roberts", size: 2, grade: "B" },
        { name: "Bolt", manufacturer: "Tarsus", size: 2, grade: "C" },
        { name: "Cascade", manufacturer: "RAMP", size: 2, grade: "A" },
        { name: "Nova", manufacturer: "Roberts", size: 2, grade: "A" },
        { name: "Quest", manufacturer: "Wei-Tek", size: 2, grade: "B" },

        // Size 3 (Large) - common large quantum drives
        { name: "Erebos", manufacturer: "Roberts", size: 3, grade: "C" },
        { name: "TS-2", manufacturer: "Tarsus", size: 3, grade: "B" },
        { name: "Vortex", manufacturer: "RAMP", size: 3, grade: "A" },
        { name: "Pontes", manufacturer: "RAMP", size: 3, grade: "C" },
        { name: "Kama", manufacturer: "ArcCorp", size: 3, grade: "C" },
    ],
};

// Helper to get size label
SC_DATA.getSizeLabel = function(size) {
    const labels = { 1: 'Small (S1)', 2: 'Medium (S2)', 3: 'Large (S3)', 4: 'Capital' };
    return labels[size] || `Size ${size}`;
};

SC_DATA.getComponentSizeLabel = function(size) {
    const labels = { 1: 'S', 2: 'M', 3: 'L' };
    return labels[size] || `S${size}`;
};

// Generate default loadout for a ship based on its slot specifications
// Uses common stock C-grade components that ships typically come with
SC_DATA.getDefaultComponents = function(shipSpec) {
    if (!shipSpec) return null;

    // Default weapons by size (K&W laser repeaters are common stock)
    const defaultWeapons = {
        1: "CF-117 Bulldog",
        2: "CF-227 Badger",
        3: "CF-337 Panther",
        4: "CF-447 Rhino",
        5: "CF-557 Galdereen",
        6: "CF-667 Mammoth",
        7: "SF7E Laser Cannon"
    };

    // Default components by size (C-grade stock components)
    const defaultShields = { 1: "INK", 2: "STOP", 3: "Ward" };
    const defaultCoolers = { 1: "Bracer", 2: "Graupel", 3: "Mercury" };
    const defaultPowerPlants = { 1: "JS-300", 2: "Genoa", 3: "Ginzel" };
    const defaultQuantumDrives = { 1: "VK-00", 2: "XL-1", 3: "Erebos" };

    const defaults = {
        weapons: [],
        shields: [],
        coolers: [],
        powerPlants: [],
        quantumDrives: []
    };

    // Populate weapons
    if (shipSpec.weapons && shipSpec.weapons.length > 0) {
        defaults.weapons = shipSpec.weapons.map(w => ({
            name: defaultWeapons[w.size] || "",
            size: w.size
        }));
    }

    // Populate shields
    if (shipSpec.shields) {
        for (let i = 0; i < shipSpec.shields.count; i++) {
            defaults.shields.push({
                name: defaultShields[shipSpec.shields.size] || "",
                size: shipSpec.shields.size
            });
        }
    }

    // Populate coolers
    if (shipSpec.coolers) {
        for (let i = 0; i < shipSpec.coolers.count; i++) {
            defaults.coolers.push({
                name: defaultCoolers[shipSpec.coolers.size] || "",
                size: shipSpec.coolers.size
            });
        }
    }

    // Populate power plants
    if (shipSpec.powerPlants) {
        for (let i = 0; i < shipSpec.powerPlants.count; i++) {
            defaults.powerPlants.push({
                name: defaultPowerPlants[shipSpec.powerPlants.size] || "",
                size: shipSpec.powerPlants.size
            });
        }
    }

    // Populate quantum drive
    if (shipSpec.quantumDrive) {
        defaults.quantumDrives.push({
            name: defaultQuantumDrives[shipSpec.quantumDrive.size] || "",
            size: shipSpec.quantumDrive.size
        });
    }

    return defaults;
};

window.SC_DATA = SC_DATA;
