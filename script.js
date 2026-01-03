// Available room tiles (will be loaded from images folder)
const availableTiles = [
    // A-series tiles
    { id: 'A1a', name: 'A1a', image: 'images/A1a.png', width: 3, height: 3 },
    { id: 'A1b', name: 'A1b', image: 'images/A1b.png', width: 3, height: 3 },
    { id: 'A2a', name: 'A2a', image: 'images/A2a.png', width: 3, height: 3 },
    { id: 'A2b', name: 'A2b', image: 'images/A2b.png', width: 3, height: 3 },
    { id: 'A3a', name: 'A3a', image: 'images/A3a.png', width: 3, height: 3 },
    { id: 'A3b', name: 'A3b', image: 'images/A3b.png', width: 3, height: 3 },
    { id: 'A4a', name: 'A4a', image: 'images/A4a.png', width: 3, height: 3 },
    { id: 'A4b', name: 'A4b', image: 'images/A4b.png', width: 3, height: 3 },
    // B-series tiles
    { id: 'B1a', name: 'B1a', image: 'images/B1a.png', width: 3, height: 3 },
    { id: 'B1b', name: 'B1b', image: 'images/B1b.png', width: 3, height: 3 },
    { id: 'B2a', name: 'B2a', image: 'images/B2a.png', width: 3, height: 3 },
    { id: 'B2b', name: 'B2b', image: 'images/B2b.png', width: 3, height: 3 },
    { id: 'B3a', name: 'B3a', image: 'images/B3a.png', width: 3, height: 3 },
    { id: 'B3b', name: 'B3b', image: 'images/B3b.png', width: 3, height: 3 },
    { id: 'B4a', name: 'B4a', image: 'images/B4a.png', width: 3, height: 3 },
    { id: 'B4b', name: 'B4b', image: 'images/B4b.png', width: 3, height: 3 },
    // C-series tiles
    { id: 'C1a', name: 'C1a', image: 'images/C1a.png', width: 3, height: 3 },
    { id: 'C1b', name: 'C1b', image: 'images/C1b.png', width: 3, height: 3 },
    { id: 'C2a', name: 'C2a', image: 'images/C2a.png', width: 3, height: 3 },
    { id: 'C2b', name: 'C2b', image: 'images/C2b.png', width: 3, height: 3 },
    // D-series tiles
    { id: 'D1a', name: 'D1a', image: 'images/D1a.png', width: 3, height: 3 },
    { id: 'D1b', name: 'D1b', image: 'images/D1b.png', width: 3, height: 3 },
    { id: 'D2a', name: 'D2a', image: 'images/D2a.png', width: 3, height: 3 },
    { id: 'D2b', name: 'D2b', image: 'images/D2b.png', width: 3, height: 3 },
    // E-series tiles
    { id: 'E1a', name: 'E1a', image: 'images/E1a.png', width: 3, height: 3 },
    { id: 'E1b', name: 'E1b', image: 'images/E1b.png', width: 3, height: 3 },
    // F-series tiles
    { id: 'F1a', name: 'F1a', image: 'images/F1a.png', width: 3, height: 3 },
    { id: 'F1b', name: 'F1b', image: 'images/F1b.png', width: 3, height: 3 },
    // G-series tiles
    { id: 'G1a', name: 'G1a', image: 'images/G1a.png', width: 3, height: 3 },
    { id: 'G1b', name: 'G1b', image: 'images/G1b.png', width: 3, height: 3 },
    { id: 'G2a', name: 'G2a', image: 'images/G2a.png', width: 3, height: 3 },
    { id: 'G2b', name: 'G2b', image: 'images/G2b.png', width: 3, height: 3 },
    // H-series tiles
    { id: 'H1a', name: 'H1a', image: 'images/H1a.png', width: 3, height: 3 },
    { id: 'H1b', name: 'H1b', image: 'images/H1b.png', width: 3, height: 3 },
    { id: 'H2a', name: 'H2a', image: 'images/H2a.png', width: 3, height: 3 },
    { id: 'H2b', name: 'H2b', image: 'images/H2b.png', width: 3, height: 3 },
    { id: 'H3a', name: 'H3a', image: 'images/H3a.png', width: 3, height: 3 },
    { id: 'H3b', name: 'H3b', image: 'images/H3b.png', width: 3, height: 3 },
    // I-series tiles
    { id: 'I1a', name: 'I1a', image: 'images/I1a.png', width: 3, height: 3 },
    { id: 'I1b', name: 'I1b', image: 'images/I1b.png', width: 3, height: 3 },
    { id: 'I2a', name: 'I2a', image: 'images/I2a.png', width: 3, height: 3 },
    { id: 'I2b', name: 'I2b', image: 'images/I2b.png', width: 3, height: 3 },
    // J-series tiles
    { id: 'J1a', name: 'J1a', image: 'images/J1a.png', width: 3, height: 3 },
    { id: 'J1b', name: 'J1b', image: 'images/J1b.png', width: 3, height: 3 },
    { id: 'J2a', name: 'J2a', image: 'images/J2a.png', width: 3, height: 3 },
    { id: 'J2b', name: 'J2b', image: 'images/J2b.png', width: 3, height: 3 },
    // K-series tiles
    { id: 'K1a', name: 'K1a', image: 'images/K1a.png', width: 3, height: 3 },
    { id: 'K1b', name: 'K1b', image: 'images/K1b.png', width: 3, height: 3 },
    { id: 'K2a', name: 'K2a', image: 'images/K2a.png', width: 3, height: 3 },
    { id: 'K2b', name: 'K2b', image: 'images/K2b.png', width: 3, height: 3 },
    // L-series tiles
    { id: 'L1a', name: 'L1a', image: 'images/L1a.png', width: 3, height: 3 },
    { id: 'L1b', name: 'L1b', image: 'images/L1b.png', width: 3, height: 3 },
    { id: 'L2a', name: 'L2a', image: 'images/L2a.png', width: 3, height: 3 },
    { id: 'L2b', name: 'L2b', image: 'images/L2b.png', width: 3, height: 3 },
    { id: 'L3a', name: 'L3a', image: 'images/L3a.png', width: 3, height: 3 },
    { id: 'L3b', name: 'L3b', image: 'images/L3b.png', width: 3, height: 3 },
    // M-series tiles
    { id: 'M1a', name: 'M1a', image: 'images/M1a.png', width: 3, height: 3 },
    { id: 'M1b', name: 'M1b', image: 'images/M1b.png', width: 3, height: 3 },
    // N-series tiles
    { id: 'N1a', name: 'N1a', image: 'images/N1a.png', width: 3, height: 3 },
    { id: 'N1b', name: 'N1b', image: 'images/N1b.png', width: 3, height: 3 },
];

// Available monster tiles
const availableMonsters = [
    { id: 'bandit-guard', name: 'Bandit Guard', image: 'monsters/bandit-guard.png' },
    { id: 'bandit-archer', name: 'Bandit Archer', image: 'monsters/bandit-archer.png' },
    { id: 'living-bones', name: 'Living Bones', image: 'monsters/living-bones.png' },
    { id: 'living-corpse', name: 'Living Corpse', image: 'monsters/living-corpse.png' },
    { id: 'giant-viper', name: 'Giant Viper', image: 'monsters/giant-viper.png' },
    { id: 'cave-bear', name: 'Cave Bear', image: 'monsters/cave-bear.png' },
    { id: 'stone-golem', name: 'Stone Golem', image: 'monsters/stone-golem.png' },
    { id: 'flame-demon', name: 'Flame Demon', image: 'monsters/flame-demon.png' },
    { id: 'earth-demon', name: 'Earth Demon', image: 'monsters/earth-demon.png' },
    { id: 'wind-demon', name: 'Wind Demon', image: 'monsters/wind-demon.png' },
    { id: 'frost-demon', name: 'Frost Demon', image: 'monsters/frost-demon.png' },
    { id: 'night-demon', name: 'Night Demon', image: 'monsters/night-demon.png' },
    { id: 'sun-demon', name: 'Sun Demon', image: 'monsters/sun-demon.png' },
    { id: 'inox-guard', name: 'Inox Guard', image: 'monsters/inox-guard.png' },
    { id: 'inox-shaman', name: 'Inox Shaman', image: 'monsters/inox-shaman.png' },
];

// Placed tiles on the grid
let placedTiles = [];
let placedMonsters = [];
let nextTileId = 0;
let nextMonsterId = 0;

const GRID_COLS = 25;
const GRID_ROWS = 25;
const CELL_SIZE = 80;

// Drag state for moving tiles
let draggedPlacedTile = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Initialize the map
function initializeMap() {
    createGrid();
    loadTilePalette();
    loadMonsterPalette();
    loadSavedMap();
}

// Create the placement grid
function createGrid() {
    const grid = document.getElementById('placementGrid');
    grid.innerHTML = '';
    grid.classList.add('show-grid'); // Show grid by default
    
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // Drop event handlers
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);
            
            grid.appendChild(cell);
        }
    }
}

// Load tiles into palette
function loadTilePalette() {
    const tileList = document.getElementById('tileList');
    tileList.innerHTML = '';
    
    availableTiles.forEach(tile => {
        const tileItem = document.createElement('div');
        tileItem.className = 'tile-item';
        tileItem.draggable = true;
        tileItem.dataset.tileId = tile.id;
        
        tileItem.innerHTML = `
            <div class="tile-preview" style="background-image: url('${tile.image}')"></div>
            <div class="tile-info">
                <div class="tile-name">${tile.name}</div>
                <div class="tile-size">Adjustable</div>
            </div>
        `;
        
        tileItem.addEventListener('dragstart', handleDragStart);
        tileItem.addEventListener('dragend', handleDragEnd);
        
        tileList.appendChild(tileItem);
    });
}

// Load monsters into palette
function loadMonsterPalette() {
    const monsterList = document.getElementById('monsterList');
    monsterList.innerHTML = '';
    
    availableMonsters.forEach(monster => {
        const monsterItem = document.createElement('div');
        monsterItem.className = 'tile-item monster-item';
        monsterItem.draggable = true;
        monsterItem.dataset.monsterId = monster.id;
        
        monsterItem.innerHTML = `
            <div class="tile-preview" style="background-image: url('${monster.image}')"></div>
            <div class="tile-info">
                <div class="tile-name">${monster.name}</div>
                <div class="tile-size">Token</div>
            </div>
        `;
        
        monsterItem.addEventListener('dragstart', handleMonsterDragStart);
        monsterItem.addEventListener('dragend', handleDragEnd);
        
        monsterList.appendChild(monsterItem);
    });
}

// Drag and drop handlers
let draggedTileId = null;
let draggedMonsterId = null;

function handleDragStart(e) {
    draggedTileId = e.currentTarget.dataset.tileId;
    draggedMonsterId = null;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
}

function handleMonsterDragStart(e) {
    draggedMonsterId = e.currentTarget.dataset.monsterId;
    draggedTileId = null;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const col = parseInt(e.currentTarget.dataset.col);
    const row = parseInt(e.currentTarget.dataset.row);
    
    if (draggedTileId) {
        placeTile(draggedTileId, col, row);
        draggedTileId = null;
    } else if (draggedMonsterId) {
        placeMonster(draggedMonsterId, col, row);
        draggedMonsterId = null;
    }
}

// Place a tile on the grid
function placeTile(tileTypeId, col, row) {
    const tileType = availableTiles.find(t => t.id === tileTypeId);
    if (!tileType) return;
    
    // Check if space is available
    if (!isSpaceAvailable(col, row, tileType.width, tileType.height)) {
        return;
    }
    
    const placedTile = {
        id: `placed_${nextTileId++}`,
        tileTypeId: tileTypeId,
        name: tileType.name,
        image: tileType.image,
        col: col,
        row: row,
        width: tileType.width,
        height: tileType.height,
        revealed: false,
        rotation: 0,
        zIndex: 10
    };
    
    placedTiles.push(placedTile);
    renderPlacedTile(placedTile);
    markCellsOccupied(col, row, tileType.width, tileType.height);
    updatePlacedTilesList();
}

// Check if space is available for tile
function isSpaceAvailable(col, row, width, height) {
    if (col + width > GRID_COLS || row + height > GRID_ROWS) {
        return false;
    }
    
    for (let r = row; r < row + height; r++) {
        for (let c = col; c < col + width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell && cell.classList.contains('occupied')) {
                return false;
            }
        }
    }
    
    return true;
}

// Mark grid cells as occupied
function markCellsOccupied(col, row, width, height) {
    for (let r = row; r < row + height; r++) {
        for (let c = col; c < col + width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('occupied');
            }
        }
    }
}

// Render a placed tile
function renderPlacedTile(tile) {
    const grid = document.getElementById('placementGrid');
    const tileDiv = document.createElement('div');
    tileDiv.className = `placed-tile ${tile.revealed ? 'revealed' : 'fogged'}`;
    tileDiv.dataset.tileId = tile.id;
    updateTilePosition(tileDiv, tile);
    tileDiv.style.backgroundImage = `url('${tile.image}')`;
    
    // Fog overlay
    const fogOverlay = document.createElement('div');
    fogOverlay.className = 'fog-overlay';
    
    // Label
    const label = document.createElement('div');
    label.className = 'tile-label';
    label.textContent = tile.name;
    
    // Controls
    const controls = document.createElement('div');
    controls.className = 'tile-controls';
    controls.innerHTML = `
        <div class="tile-controls-row">
            <button class="tile-btn" onclick="event.stopPropagation(); rotateTile('${tile.id}', -90)" title="Rotate Left">↶</button>
            <button class="tile-btn" onclick="event.stopPropagation(); rotateTile('${tile.id}', 90)" title="Rotate Right">↷</button>
        </div>
        <div class="tile-controls-row">
            <button class="tile-btn" onclick="event.stopPropagation(); resizeTile('${tile.id}', -1)" title="Shrink">−</button>
            <button class="tile-btn" onclick="event.stopPropagation(); resizeTile('${tile.id}', 1)" title="Grow">+</button>
        </div>
        <div class="tile-controls-row">
            <button class="tile-btn" onclick="event.stopPropagation(); changeZIndex('${tile.id}', 1)" title="Bring Forward">▲</button>
            <button class="tile-btn" onclick="event.stopPropagation(); changeZIndex('${tile.id}', -1)" title="Send Backward">▼</button>
        </div>
        <div class="tile-controls-row">
            <button class="tile-btn" onclick="event.stopPropagation(); removeTile('${tile.id}')" title="Remove">✕</button>
        </div>
    `;
    
    tileDiv.appendChild(fogOverlay);
    tileDiv.appendChild(label);
    tileDiv.appendChild(controls);
    
    // Click to reveal (only on the tile itself, not controls)
    tileDiv.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tile-btn') && !e.target.closest('.tile-controls')) {
            toggleTileReveal(tile.id);
        }
    });
    
    // Drag to move
    tileDiv.addEventListener('mousedown', handleTileDragStart);
    
    grid.appendChild(tileDiv);
}

// Update tile position and dimensions
function updateTilePosition(tileDiv, tile) {
    tileDiv.style.left = `${tile.col * (CELL_SIZE + 2)}px`;
    tileDiv.style.top = `${tile.row * (CELL_SIZE + 2)}px`;
    tileDiv.style.zIndex = tile.zIndex || 10;
    
    // Swap width/height if rotated 90 or 270 degrees
    const isRotated90 = tile.rotation === 90 || tile.rotation === 270;
    const displayWidth = isRotated90 ? tile.height : tile.width;
    const displayHeight = isRotated90 ? tile.width : tile.height;
    
    tileDiv.style.width = `${displayWidth * CELL_SIZE + (displayWidth - 1) * 2}px`;
    tileDiv.style.height = `${displayHeight * CELL_SIZE + (displayHeight - 1) * 2}px`;
    tileDiv.style.transform = `rotate(${tile.rotation}deg)`;
    tileDiv.style.transformOrigin = 'center center';
    
    // Counter-rotate controls and label to keep them upright
    const controls = tileDiv.querySelector('.tile-controls');
    const label = tileDiv.querySelector('.tile-label');
    if (controls) {
        controls.style.transform = `rotate(${-tile.rotation}deg)`;
    }
    if (label) {
        label.style.transform = `rotate(${-tile.rotation}deg)`;
    }
}

// Toggle tile reveal
function toggleTileReveal(tileId) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.revealed = !tile.revealed;
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    
    if (tileElement) {
        if (tile.revealed) {
            tileElement.classList.add('revealed');
            tileElement.classList.remove('fogged');
        } else {
            tileElement.classList.remove('revealed');
            tileElement.classList.add('fogged');
        }
    }
    
    updateRevealedRooms();
}

// Place a monster on the grid
function placeMonster(monsterTypeId, col, row) {
    const monsterType = availableMonsters.find(m => m.id === monsterTypeId);
    if (!monsterType) return;
    
    const placedMonster = {
        id: `monster_${nextMonsterId++}`,
        monsterTypeId: monsterTypeId,
        name: monsterType.name,
        image: monsterType.image,
        col: col,
        row: row,
        players: {
            2: { enabled: true, elite: false },
            3: { enabled: true, elite: false },
            4: { enabled: true, elite: false }
        },
        zIndex: 50
    };
    
    placedMonsters.push(placedMonster);
    renderMonster(placedMonster);
}

// Render a placed monster
function renderMonster(monster) {
    const grid = document.getElementById('placementGrid');
    const monsterDiv = document.createElement('div');
    monsterDiv.className = 'placed-monster';
    monsterDiv.dataset.monsterId = monster.id;
    monsterDiv.style.left = `${monster.col * (CELL_SIZE + 2)}px`;
    monsterDiv.style.top = `${monster.row * (CELL_SIZE + 2)}px`;
    monsterDiv.style.zIndex = monster.zIndex || 50;
    monsterDiv.style.backgroundImage = `url('${monster.image}')`;
    
    // Monster info and controls
    // Generate player count rows
    const playerCountRows = [2, 3, 4].map(count => `
        <div class="player-count-row" data-player-count="${count}">
            <label class="player-checkbox">
                <input type="checkbox" 
                    ${monster.players[count].enabled ? 'checked' : ''} 
                    class="player-checkbox-input"
                />
                <span>${count}P</span>
            </label>
            <select class="elite-select">
                <option value="normal" ${!monster.players[count].elite ? 'selected' : ''}>Normal</option>
                <option value="elite" ${monster.players[count].elite ? 'selected' : ''}>Elite</option>
            </select>
        </div>
    `).join('');
    
    monsterDiv.innerHTML = `
        <div class="monster-label">${monster.name}</div>
        <div class="monster-controls">
            <div class="player-count-controls">
                ${playerCountRows}
            </div>
            <button class="tile-btn monster-remove" title="Remove">✕</button>
        </div>
    `;
    
    // Add event listeners for checkboxes and selects
    const playerCountRowElements = monsterDiv.querySelectorAll('.player-count-row');
    playerCountRowElements.forEach(row => {
        const playerCount = parseInt(row.dataset.playerCount);
        const checkbox = row.querySelector('.player-checkbox-input');
        const select = row.querySelector('.elite-select');
        
        checkbox.addEventListener('change', () => {
            toggleMonsterPlayer(monster.id, playerCount);
        });
        
        select.addEventListener('change', (e) => {
            toggleMonsterElite(monster.id, playerCount, e.target.value);
        });
    });
    
    // Add event listener for remove button
    const removeBtn = monsterDiv.querySelector('.monster-remove');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeMonster(monster.id);
    });
    
    grid.appendChild(monsterDiv);
}

// Toggle monster player count
function toggleMonsterPlayer(monsterId, playerCount) {
    const monster = placedMonsters.find(m => m.id === monsterId);
    if (!monster) return;
    
    monster.players[playerCount].enabled = !monster.players[playerCount].enabled;
}

// Toggle monster elite status
function toggleMonsterElite(monsterId, playerCount, value) {
    const monster = placedMonsters.find(m => m.id === monsterId);
    if (!monster) return;
    
    monster.players[playerCount].elite = (value === 'elite');
}

// Remove a monster
function removeMonster(monsterId) {
    placedMonsters = placedMonsters.filter(m => m.id !== monsterId);
    
    const monsterElement = document.querySelector(`[data-monster-id="${monsterId}"]`);
    if (monsterElement) {
        monsterElement.remove();
    }
}

// Remove a tile
function removeTile(tileId) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Free up grid cells
    for (let r = tile.row; r < tile.row + tile.height; r++) {
        for (let c = tile.col; c < tile.col + tile.width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.remove('occupied');
            }
        }
    }
    
    // Remove from array
    placedTiles = placedTiles.filter(t => t.id !== tileId);
    
    // Remove from DOM
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.remove();
    }
    
    updatePlacedTilesList();
    updateRevealedRooms();
}

// Update placed tiles list
function updatePlacedTilesList() {
    const placedTilesDiv = document.getElementById('placedTiles');
    if (placedTiles.length === 0) {
        placedTilesDiv.innerHTML = '<span class="room-tag">None</span>';
    } else {
        placedTilesDiv.innerHTML = placedTiles
            .map(tile => `<span class="room-tag">${tile.name}</span>`)
            .join('');
    }
}

// Update revealed rooms list
function updateRevealedRooms() {
    const revealedRoomsDiv = document.getElementById('revealedRooms');
    const revealedTiles = placedTiles.filter(t => t.revealed);
    
    if (revealedTiles.length === 0) {
        revealedRoomsDiv.innerHTML = '<span class="room-tag">None</span>';
    } else {
        revealedRoomsDiv.innerHTML = revealedTiles
            .map(tile => `<span class="room-tag">${tile.name}</span>`)
            .join('');
    }
}

// Reset fog of war
function resetFog() {
    placedTiles.forEach(tile => {
        tile.revealed = false;
        const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
        if (tileElement) {
            tileElement.classList.remove('revealed');
            tileElement.classList.add('fogged');
        }
    });
    updateRevealedRooms();
}

// Reveal all tiles
function revealAll() {
    placedTiles.forEach(tile => {
        tile.revealed = true;
        const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
        if (tileElement) {
            tileElement.classList.add('revealed');
            tileElement.classList.remove('fogged');
        }
    });
    updateRevealedRooms();
}

// Clear the entire map
function clearMap() {
    if (placedTiles.length === 0 && placedMonsters.length === 0) return;
    
    if (confirm('Clear all tiles and monsters from the map?')) {
        // Clear arrays first
        placedTiles = [];
        placedMonsters = [];
        
        // Batch remove all DOM elements
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('occupied');
        });
        document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
        document.querySelectorAll('.placed-monster').forEach(monster => monster.remove());
        
        updatePlacedTilesList();
        updateRevealedRooms();
    }
}

// Toggle grid visibility
function toggleGrid() {
    const grid = document.getElementById('placementGrid');
    grid.classList.toggle('show-grid');
}

// Save map to localStorage
function saveMap() {
    const mapData = {
        tiles: placedTiles,
        monsters: placedMonsters,
        nextId: nextTileId,
        nextMonsterId: nextMonsterId
    };
    
    localStorage.setItem('gloomhavenMap', JSON.stringify(mapData));
    alert('Map saved successfully!');
}

// Load map from localStorage
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        placedTiles = mapData.tiles || [];
        placedMonsters = mapData.monsters || [];
        nextTileId = mapData.nextId || 0;
        nextMonsterId = mapData.nextMonsterId || 0;
        
        // Clear grid
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('occupied');
        });
        
        // Render all tiles (ensure all properties exist)
        placedTiles.forEach(tile => {
            // Add default values for properties that might not exist in old saves
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = false;
            
            renderPlacedTile(tile);
            markCellsOccupied(tile.col, tile.row, tile.width, tile.height);
        });
        
        // Render all monsters
        placedMonsters.forEach(monster => {
            // Add default values for properties that might not exist in old saves
            if (monster.zIndex === undefined) monster.zIndex = 50;
            if (monster.players === undefined) {
                monster.players = {
                    2: { enabled: true, elite: false },
                    3: { enabled: true, elite: false },
                    4: { enabled: true, elite: false }
                };
            }
            
            renderMonster(monster);
        });
        
        updatePlacedTilesList();
        updateRevealedRooms();
    } catch (e) {
        console.error('Error loading map:', e);
    }
}

// Load map manually
function loadMap() {
    if (confirm('Load saved map? This will replace the current map.')) {
        clearMap();
        loadSavedMap();
    }
}

// Rotate a tile
function rotateTile(tileId, degrees) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.rotation = (tile.rotation + degrees + 360) % 360;
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
    }
}

// Change z-index of a tile
function changeZIndex(tileId, delta) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.zIndex = Math.max(1, Math.min(100, (tile.zIndex || 10) + delta));
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.style.zIndex = tile.zIndex;
    }
}

// Resize a tile
function resizeTile(tileId, delta) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    const newWidth = Math.max(1, Math.min(15, tile.width + delta));
    const newHeight = Math.max(1, Math.min(15, tile.height + delta));
    
    // Check if new size would fit
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    
    // Temporarily remove this tile's occupied cells
    freeTileCells(tile);
    
    // Check if resized tile fits
    if (isSpaceAvailable(tile.col, tile.row, newWidth, newHeight)) {
        tile.width = newWidth;
        tile.height = newHeight;
        
        if (tileElement) {
            updateTilePosition(tileElement, tile);
        }
        markCellsOccupied(tile.col, tile.row, tile.width, tile.height);
    } else {
        // Restore original occupied cells
        markCellsOccupied(tile.col, tile.row, tile.width, tile.height);
    }
}

// Free cells occupied by a tile
function freeTileCells(tile) {
    for (let r = tile.row; r < tile.row + tile.height; r++) {
        for (let c = tile.col; c < tile.col + tile.width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.remove('occupied');
            }
        }
    }
}

// Handle dragging placed tiles to move them
function handleTileDragStart(e) {
    // Don't start drag if clicking on controls
    if (e.target.classList.contains('tile-btn') || e.target.closest('.tile-controls')) {
        return;
    }
    
    const tileElement = e.currentTarget;
    const tileId = tileElement.dataset.tileId;
    const tile = placedTiles.find(t => t.id === tileId);
    
    if (!tile) return;
    
    draggedPlacedTile = tile;
    
    // Calculate offset from tile's top-left corner
    const rect = tileElement.getBoundingClientRect();
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    
    tileElement.classList.add('dragging-tile');
    
    // Free up the cells this tile was occupying
    freeTileCells(tile);
    
    document.addEventListener('mousemove', handleTileDragMove);
    document.addEventListener('mouseup', handleTileDragEnd);
    
    e.preventDefault();
}

function handleTileDragMove(e) {
    if (!draggedPlacedTile) return;
    
    const tileElement = document.querySelector(`[data-tile-id="${draggedPlacedTile.id}"]`);
    if (!tileElement) return;
    
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    // Calculate position relative to grid
    const x = e.clientX - gridRect.left - dragOffsetX;
    const y = e.clientY - gridRect.top - dragOffsetY;
    
    tileElement.style.left = `${x}px`;
    tileElement.style.top = `${y}px`;
    
    e.preventDefault();
}

function handleTileDragEnd(e) {
    if (!draggedPlacedTile) return;
    
    const tileElement = document.querySelector(`[data-tile-id="${draggedPlacedTile.id}"]`);
    if (!tileElement) return;
    
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    // Calculate which cell the tile was dropped on
    const x = e.clientX - gridRect.left - dragOffsetX;
    const y = e.clientY - gridRect.top - dragOffsetY;
    
    const newCol = Math.max(0, Math.min(GRID_COLS - draggedPlacedTile.width, Math.round(x / (CELL_SIZE + 2))));
    const newRow = Math.max(0, Math.min(GRID_ROWS - draggedPlacedTile.height, Math.round(y / (CELL_SIZE + 2))));
    
    // Check if the new position is valid
    if (isSpaceAvailable(newCol, newRow, draggedPlacedTile.width, draggedPlacedTile.height)) {
        // Update tile position
        draggedPlacedTile.col = newCol;
        draggedPlacedTile.row = newRow;
    }
    
    // Snap to grid and update display
    updateTilePosition(tileElement, draggedPlacedTile);
    markCellsOccupied(draggedPlacedTile.col, draggedPlacedTile.row, draggedPlacedTile.width, draggedPlacedTile.height);
    
    tileElement.classList.remove('dragging-tile');
    
    document.removeEventListener('mousemove', handleTileDragMove);
    document.removeEventListener('mouseup', handleTileDragEnd);
    
    draggedPlacedTile = null;
    
    e.preventDefault();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes revealPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(212, 175, 55, 0.6); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    
    document.getElementById('resetFog').addEventListener('click', resetFog);
    document.getElementById('revealAll').addEventListener('click', revealAll);
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
    document.getElementById('saveMap').addEventListener('click', saveMap);
    document.getElementById('loadMap').addEventListener('click', loadMap);
    document.getElementById('clearMap').addEventListener('click', clearMap);
});
