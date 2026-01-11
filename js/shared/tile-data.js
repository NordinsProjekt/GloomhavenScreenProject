/**
 * Tile Data
 * Available tiles, tokens, and monsters for the game
 */

// Available room tiles (will be loaded from images folder)
const availableTiles = [
    // A-series tiles
    { id: 'A1a', name: 'A1a', image: 'mapsections/A1a.png', width: 3, height: 3 },
    { id: 'A1b', name: 'A1b', image: 'mapsections/A1b.png', width: 3, height: 3 },
    { id: 'A2a', name: 'A2a', image: 'mapsections/A2a.png', width: 3, height: 3 },
    { id: 'A2b', name: 'A2b', image: 'mapsections/A2b.png', width: 3, height: 3 },
    { id: 'A3a', name: 'A3a', image: 'mapsections/A3a.png', width: 3, height: 3 },
    { id: 'A3b', name: 'A3b', image: 'mapsections/A3b.png', width: 3, height: 3 },
    { id: 'A4a', name: 'A4a', image: 'mapsections/A4a.png', width: 3, height: 3 },
    { id: 'A4b', name: 'A4b', image: 'mapsections/A4b.png', width: 3, height: 3 },
    // B-series tiles
    { id: 'B1a', name: 'B1a', image: 'mapsections/B1a.png', width: 3, height: 3 },
    { id: 'B1b', name: 'B1b', image: 'mapsections/B1b.png', width: 3, height: 3 },
    { id: 'B2a', name: 'B2a', image: 'mapsections/B2a.png', width: 3, height: 3 },
    { id: 'B2b', name: 'B2b', image: 'mapsections/B2b.png', width: 3, height: 3 },
    { id: 'B3a', name: 'B3a', image: 'mapsections/B3a.png', width: 3, height: 3 },
    { id: 'B3b', name: 'B3b', image: 'mapsections/B3b.png', width: 3, height: 3 },
    { id: 'B4a', name: 'B4a', image: 'mapsections/B4a.png', width: 3, height: 3 },
    { id: 'B4b', name: 'B4b', image: 'mapsections/B4b.png', width: 3, height: 3 },
    // C-series tiles
    { id: 'C1a', name: 'C1a', image: 'mapsections/C1a.png', width: 3, height: 3 },
    { id: 'C1b', name: 'C1b', image: 'mapsections/C1b.png', width: 3, height: 3 },
    { id: 'C2a', name: 'C2a', image: 'mapsections/C2a.png', width: 3, height: 3 },
    { id: 'C2b', name: 'C2b', image: 'mapsections/C2b.png', width: 3, height: 3 },
    // D-series tiles
    { id: 'D1a', name: 'D1a', image: 'mapsections/D1a.png', width: 3, height: 3 },
    { id: 'D1b', name: 'D1b', image: 'mapsections/D1b.png', width: 3, height: 3 },
    { id: 'D2a', name: 'D2a', image: 'mapsections/D2a.png', width: 3, height: 3 },
    { id: 'D2b', name: 'D2b', image: 'mapsections/D2b.png', width: 3, height: 3 },
    // E-series tiles
    { id: 'E1a', name: 'E1a', image: 'mapsections/E1a.png', width: 3, height: 3 },
    { id: 'E1b', name: 'E1b', image: 'mapsections/E1b.png', width: 3, height: 3 },
    // F-series tiles
    { id: 'F1a', name: 'F1a', image: 'mapsections/F1a.png', width: 3, height: 3 },
    { id: 'F1b', name: 'F1b', image: 'mapsections/F1b.png', width: 3, height: 3 },
    // G-series tiles
    { id: 'G1a', name: 'G1a', image: 'mapsections/G1a.png', width: 3, height: 3 },
    { id: 'G1b', name: 'G1b', image: 'mapsections/G1b.png', width: 3, height: 3 },
    { id: 'G2a', name: 'G2a', image: 'mapsections/G2a.png', width: 3, height: 3 },
    { id: 'G2b', name: 'G2b', image: 'mapsections/G2b.png', width: 3, height: 3 },
    // H-series tiles
    { id: 'H1a', name: 'H1a', image: 'mapsections/H1a.png', width: 3, height: 3 },
    { id: 'H1b', name: 'H1b', image: 'mapsections/H1b.png', width: 3, height: 3 },
    { id: 'H2a', name: 'H2a', image: 'mapsections/H2a.png', width: 3, height: 3 },
    { id: 'H2b', name: 'H2b', image: 'mapsections/H2b.png', width: 3, height: 3 },
    { id: 'H3a', name: 'H3a', image: 'mapsections/H3a.png', width: 3, height: 3 },
    { id: 'H3b', name: 'H3b', image: 'mapsections/H3b.png', width: 3, height: 3 },
    // I-series tiles
    { id: 'I1a', name: 'I1a', image: 'mapsections/I1a.png', width: 3, height: 3 },
    { id: 'I1b', name: 'I1b', image: 'mapsections/I1b.png', width: 3, height: 3 },
    { id: 'I2a', name: 'I2a', image: 'mapsections/I2a.png', width: 3, height: 3 },
    { id: 'I2b', name: 'I2b', image: 'mapsections/I2b.png', width: 3, height: 3 },
    // J-series tiles
    { id: 'J1a', name: 'J1a', image: 'mapsections/J1a.png', width: 3, height: 3 },
    { id: 'J1b', name: 'J1b', image: 'mapsections/J1b.png', width: 3, height: 3 },
    { id: 'J2a', name: 'J2a', image: 'mapsections/J2a.png', width: 3, height: 3 },
    { id: 'J2b', name: 'J2b', image: 'mapsections/J2b.png', width: 3, height: 3 },
    // K-series tiles
    { id: 'K1a', name: 'K1a', image: 'mapsections/K1a.png', width: 3, height: 3 },
    { id: 'K1b', name: 'K1b', image: 'mapsections/K1b.png', width: 3, height: 3 },
    { id: 'K2a', name: 'K2a', image: 'mapsections/K2a.png', width: 3, height: 3 },
    { id: 'K2b', name: 'K2b', image: 'mapsections/K2b.png', width: 3, height: 3 },
    // L-series tiles
    { id: 'L1a', name: 'L1a', image: 'mapsections/L1a.png', width: 3, height: 3 },
    { id: 'L1b', name: 'L1b', image: 'mapsections/L1b.png', width: 3, height: 3 },
    { id: 'L2a', name: 'L2a', image: 'mapsections/L2a.png', width: 3, height: 3 },
    { id: 'L2b', name: 'L2b', image: 'mapsections/L2b.png', width: 3, height: 3 },
    { id: 'L3a', name: 'L3a', image: 'mapsections/L3a.png', width: 3, height: 3 },
    { id: 'L3b', name: 'L3b', image: 'mapsections/L3b.png', width: 3, height: 3 },
    // M-series tiles
    { id: 'M1a', name: 'M1a', image: 'mapsections/M1a.png', width: 3, height: 3 },
    { id: 'M1b', name: 'M1b', image: 'mapsections/M1b.png', width: 3, height: 3 },
    // N-series tiles
    { id: 'N1a', name: 'N1a', image: 'mapsections/N1a.png', width: 3, height: 3 },
    { id: 'N1b', name: 'N1b', image: 'mapsections/N1b.png', width: 3, height: 3 },
    
    // === TOKENS & OVERLAYS ===
    // Sorted alphabetically within categories
    
    // Altars
    { id: 'altar-h', name: 'Altar (H)', image: 'tiles/altar-horizontal.png', width: 1, height: 1 },
    { id: 'altar-v', name: 'Altar (V)', image: 'tiles/altar-vertical.png', width: 1, height: 1 },
    
    // Boulders & Rocks
    { id: 'boulder-1h', name: 'Boulder', image: 'tiles/boulder-1h.png', width: 1, height: 1 },
    { id: 'boulder-2h', name: 'Boulder (2H)', image: 'tiles/boulder-2h.png', width: 2, height: 1 },
    { id: 'boulder-3h', name: 'Boulder (3H)', image: 'tiles/boulder-3h.png', width: 3, height: 1 },
    { id: 'rock-column', name: 'Rock Column', image: 'tiles/rock-column.png', width: 1, height: 1 },
    { id: 'stalagmites', name: 'Stalagmites', image: 'tiles/stalagmites.png', width: 1, height: 1 },
    
    // Containers & Furniture
    { id: 'barrel', name: 'Barrel', image: 'tiles/barrel.png', width: 1, height: 1 },
    { id: 'bookcase-2h', name: 'Bookcase', image: 'tiles/bookcase-2h.png', width: 2, height: 1 },
    { id: 'cabinet', name: 'Cabinet', image: 'tiles/cabinet.png', width: 1, height: 1 },
    { id: 'chest', name: 'Treasure Chest', image: 'tiles/chest.png', width: 1, height: 1 },
    { id: 'crate', name: 'Crate', image: 'tiles/crate.png', width: 1, height: 1 },
    { id: 'sarcophagus-2h', name: 'Sarcophagus', image: 'tiles/sarcophagus-2h.png', width: 2, height: 1 },
    { id: 'shelf-2h', name: 'Shelf', image: 'tiles/shelf-2h.png', width: 2, height: 1 },
    { id: 'table-2h', name: 'Table', image: 'tiles/table-2h.png', width: 2, height: 1 },
    
    // Doors
    { id: 'stone-door-h', name: 'Stone Door (H)', image: 'tiles/stone-door-horizontal.png', width: 1, height: 1 },
    { id: 'stone-door-v', name: 'Stone Door (V)', image: 'tiles/stone-door-vertical.png', width: 1, height: 1 },
    { id: 'wood-door-h', name: 'Wood Door (H)', image: 'tiles/wood-door-horizontal.png', width: 1, height: 1 },
    { id: 'wood-door-v', name: 'Wood Door (V)', image: 'tiles/wood-door-vertical.png', width: 1, height: 1 },
    
    // Environmental
    { id: 'bush', name: 'Bush', image: 'tiles/bush.png', width: 1, height: 1 },
    { id: 'crystal', name: 'Crystal', image: 'tiles/crystal.png', width: 1, height: 1 },
    { id: 'dark-pit-2h', name: 'Dark Pit', image: 'tiles/dark-pit-2h.png', width: 2, height: 1 },
    { id: 'fountain', name: 'Fountain', image: 'tiles/fountain.png', width: 1, height: 1 },
    { id: 'hot-coals', name: 'Hot Coals', image: 'tiles/hot-coals.png', width: 1, height: 1 },
    { id: 'nest', name: 'Nest', image: 'tiles/nest.png', width: 1, height: 1 },
    { id: 'rubble', name: 'Rubble', image: 'tiles/rubble.png', width: 1, height: 1 },
    { id: 'stone-pillar', name: 'Stone Pillar', image: 'tiles/stone-pillar.png', width: 1, height: 1 },
    { id: 'stump', name: 'Stump', image: 'tiles/stump.png', width: 1, height: 1 },
    { id: 'thorns', name: 'Thorns', image: 'tiles/thorns.png', width: 1, height: 1 },
    { id: 'totem', name: 'Totem', image: 'tiles/totem.png', width: 1, height: 1 },
    { id: 'tree-3h', name: 'Tree (3H)', image: 'tiles/tree-3h.png', width: 3, height: 1 },
    { id: 'wall-section-2h', name: 'Wall Section', image: 'tiles/wall-section-2h.png', width: 2, height: 1 },
    { id: 'water', name: 'Water', image: 'tiles/water.png', width: 1, height: 1 },
    
    // Stairs & Entrance
    { id: 'entrance', name: 'Entrance', image: 'tiles/entrance.png', width: 1, height: 1 },
    { id: 'stairs-h', name: 'Stairs (H)', image: 'tiles/stairs-horizontal.png', width: 1, height: 1 },
    { id: 'stairs-v', name: 'Stairs (V)', image: 'tiles/stairs-vertical.png', width: 1, height: 1 },
    
    // Tokens & Markers
    { id: 'coin', name: 'Coin', image: 'tiles/coin.png', width: 1, height: 1 },
    { id: 'pressure-plate', name: 'Pressure Plate', image: 'tiles/pressure-plate.png', width: 1, height: 1 },
    
    // Traps
    { id: 'bear-trap', name: 'Bear Trap', image: 'tiles/bear-trap.png', width: 1, height: 1 },
    { id: 'poison-gas-trap', name: 'Poison Gas Trap', image: 'tiles/poison-gas-trap.png', width: 1, height: 1 },
    { id: 'spike-trap', name: 'Spike Trap', image: 'tiles/spike-trap.png', width: 1, height: 1 },
    
    // Custom Character Tile
    { id: 'custom-red-circle', name: 'Custom Red Circle', image: 'tiles/custom-red-circle.png', width: 1, height: 1, customChar: '' },
];

// Available monster tiles
const availableMonsters = [
    { id: 'ancient-artillery', name: 'Ancient Artillery', image: 'monsters/ancient-artillery.png' },
    { id: 'bandit-archer', name: 'Bandit Archer', image: 'monsters/bandit-archer.png' },
    { id: 'bandit-guard', name: 'Bandit Guard', image: 'monsters/bandit-guard.png' },
    { id: 'boss', name: 'Boss', image: 'monsters/boss.svg' },
    { id: 'black-imp', name: 'Black Imp', image: 'monsters/black-imp.png' },
    { id: 'cave-bear', name: 'Cave Bear', image: 'monsters/cave-bear.png' },
    { id: 'city-archer', name: 'City Archer', image: 'monsters/city-archer.png' },
    { id: 'city-guard', name: 'City Guard', image: 'monsters/city-guard.png' },
    { id: 'cultist', name: 'Cultist', image: 'monsters/cultist.png' },
    { id: 'deep-terror', name: 'Deep Terror', image: 'monsters/deep-terror.png' },
    { id: 'earth-demon', name: 'Earth Demon', image: 'monsters/earth-demon.png' },
    { id: 'flame-demon', name: 'Flame Demon', image: 'monsters/flame-demon.png' },
    { id: 'forest-imp', name: 'Forest Imp', image: 'monsters/forest-imp.png' },
    { id: 'frost-demon', name: 'Frost Demon', image: 'monsters/frost-demon.png' },
    { id: 'giant-viper', name: 'Giant Viper', image: 'monsters/giant-viper.png' },
    { id: 'harrower-infester', name: 'Harrower Infester', image: 'monsters/harrower-infester.png' },
    { id: 'hound', name: 'Hound', image: 'monsters/hound.png' },
    { id: 'inox-archer', name: 'Inox Archer', image: 'monsters/inox-archer.png' },
    { id: 'inox-bodyguard', name: 'Inox Bodyguard', image: 'monsters/inox-bodyguard.png' },
    { id: 'inox-guard', name: 'Inox Guard', image: 'monsters/inox-guard.png' },
    { id: 'inox-shaman', name: 'Inox Shaman', image: 'monsters/inox-shaman.png' },
    { id: 'living-bones', name: 'Living Bones', image: 'monsters/living-bones.png' },
    { id: 'living-corpse', name: 'Living Corpse', image: 'monsters/living-corpse.png' },
    { id: 'living-spirit', name: 'Living Spirit', image: 'monsters/living-spirit.png' },
    { id: 'lurker', name: 'Lurker', image: 'monsters/lurker.png' },
    { id: 'night-demon', name: 'Night Demon', image: 'monsters/night-demon.png' },
    { id: 'ooze', name: 'Ooze', image: 'monsters/ooze.png' },
    { id: 'rending-drake', name: 'Rending Drake', image: 'monsters/rending-drake.png' },
    { id: 'savvas-icestorm', name: 'Savvas Icestorm', image: 'monsters/savvas-icestorm.png' },
    { id: 'savvas-lavaflow', name: 'Savvas Lavaflow', image: 'monsters/savvas-lavaflow.png' },
    { id: 'spitting-drake', name: 'Spitting Drake', image: 'monsters/spitting-drake.png' },
    { id: 'stone-golem', name: 'Stone Golem', image: 'monsters/stone-golem.png' },
    { id: 'sun-demon', name: 'Sun Demon', image: 'monsters/sun-demon.png' },
    { id: 'vermling-scout', name: 'Vermling Scout', image: 'monsters/vermling-scout.png' },
    { id: 'vermling-shaman', name: 'Vermling Shaman', image: 'monsters/vermling-shaman.png' },
    { id: 'wind-demon', name: 'Wind Demon', image: 'monsters/wind-demon.png' },
];
