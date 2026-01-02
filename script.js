// Selected tile management
let selectedTileId = null;

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
    
    // Stairs
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

// Placed tiles on the grid
let placedTiles = [];
let nextTileId = 0;

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
    
    // Click on grid background to deselect
    grid.addEventListener('click', (e) => {
        if (e.target === grid || e.target.classList.contains('grid-cell')) {
            deselectTile();
        }
    });
}

// Select a tile
function selectTile(tileId) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Update selected tile
    selectedTileId = tileId;
    
    // Update visual selection
    document.querySelectorAll('.placed-tile').forEach(t => {
        t.classList.remove('selected');
    });
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.classList.add('selected');
    }
    
    // Show control panel
    showControlPanel(tile);
    
    // Toggle reveal for map sections
    const isMapSection = tile.image.startsWith('mapsections/');
    if (isMapSection) {
        toggleTileReveal(tile.id);
    }
}

// Deselect tile
function deselectTile() {
    selectedTileId = null;
    document.querySelectorAll('.placed-tile').forEach(t => {
        t.classList.remove('selected');
    });
    hideControlPanel();
}

// Show control panel
function showControlPanel(tile) {
    let panel = document.getElementById('tileControlPanel');
    
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'tileControlPanel';
        panel.className = 'tile-control-panel';
        document.body.appendChild(panel);
    }
    
    const isMapSection = tile.image.startsWith('mapsections/');
    
    const rotationButtons = `
        <div class="control-buttons">
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 0)" title="0°">0°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 30)" title="30°">30°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 45)" title="45°">45°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 90)" title="90°">90°</button>
        </div>
        <div class="control-buttons">
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 180)" title="180°">180°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 270)" title="270°">270°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 315)" title="315°">315°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 330)" title="330°">330°</button>
        </div>
        <div class="control-buttons rotation-fine">
            <button class="control-btn-icon" onclick="rotateTile('${tile.id}', -5)" title="Rotate -5°">↶</button>
            <span class="rotation-display">${tile.rotation}°</span>
            <button class="control-btn-icon" onclick="rotateTile('${tile.id}', 5)" title="Rotate +5°">↷</button>
        </div>
    `;
    
    const movementButtons = `
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 0, -10)" title="Up">⬆</button>
        </div>
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', -10, 0)" title="Left">⬅</button>
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 10, 0)" title="Right">➡</button>
        </div>
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 0, 10)" title="Down">⬇</button>
        </div>
    `;
    
    const isCustomCharTile = tile.tileTypeId === 'custom-red-circle';
    
    const customCharSection = isCustomCharTile ? `
        <div class="control-section">
            <label>Custom Character</label>
            <div class="control-buttons">
                <input type="text" 
                       id="customCharInput" 
                       maxlength="1" 
                       value="${tile.customChar || ''}" 
                       placeholder="1 char" 
                       onchange="updateTileCustomChar('${tile.id}', this.value)"
                       class="custom-char-input" />
            </div>
            <div class="control-hint">Enter a single character to display on the tile</div>
        </div>
    ` : '';
    
    const fogSection = isMapSection ? `
        <div class="control-section">
            <label>Fog of War</label>
            <div class="control-buttons">
                <button class="control-btn" onclick="toggleTileRevealFromPanel('${tile.id}')" title="Toggle Fog">
                    ${tile.revealed ? '🌞 Hide' : '🌚 Reveal'}
                </button>
            </div>
        </div>
    ` : '';
    
    panel.innerHTML = `
        <div class="control-panel-header">
            <h4>${tile.name}</h4>
            <button class="control-panel-close" onclick="deselectTile()">✕</button>
        </div>
        <div class="control-panel-content">
            <div class="control-section">
                <label>Rotation</label>
                ${rotationButtons}
            </div>
            
            <div class="control-section">
                <label>Size</label>
                <div class="control-buttons">
                    <button class="control-btn" onclick="resizeTile('${tile.id}', -1)" title="Shrink">− Shrink</button>
                    <button class="control-btn" onclick="resizeTile('${tile.id}', 1)" title="Grow">+ Grow</button>
                </div>
            </div>
            
            <div class="control-section">
                <label>Z-Index (Layer)</label>
                <div class="control-buttons">
                    <button class="control-btn" onclick="changeZIndex('${tile.id}', 1)" title="Bring Forward">▲ Forward</button>
                    <button class="control-btn" onclick="changeZIndex('${tile.id}', -1)" title="Send Backward">▼ Backward</button>
                </div>
                <div class="z-index-display">Current: ${tile.zIndex}</div>
            </div>
            
            <div class="control-section">
                <label>Fine Position (10px)</label>
                ${movementButtons}
            </div>
            
            ${customCharSection}
            
            ${fogSection}
            
            <div class="control-section">
                <button class="control-btn-danger" onclick="removeTileFromPanel('${tile.id}')" title="Remove Tile">✕ Remove Tile</button>
            </div>
        </div>
    `;
    
    panel.style.display = 'block';
}

// Hide control panel
function hideControlPanel() {
    const panel = document.getElementById('tileControlPanel');
    if (panel) {
        panel.style.display = 'none';
    }
}

// Set tile to specific rotation
function setTileRotation(tileId, angle) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.rotation = angle % 360;
    const tileElement = document.querySelector(`[data-tile-id=\"${tileId}\"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel to show new rotation
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Toggle reveal from panel (doesn't deselect)
function toggleTileRevealFromPanel(tileId) {
    toggleTileReveal(tileId);
    const tile = placedTiles.find(t => t.id === tileId);
    if (tile && selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Remove tile from panel
function removeTileFromPanel(tileId) {
    removeTile(tileId);
    deselectTile();
}

// Update tile label
function updateTileLabel(tileElement, tile) {
    const label = tileElement.querySelector('.tile-label');
    if (label) {
        label.textContent = `${tile.name} (z:${tile.zIndex})`;
    }
}

// Update custom character on tile
function updateTileCustomChar(tileId, char) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Limit to 1 character
    tile.customChar = char.substring(0, 1).toUpperCase();
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        // Update or create custom character display
        let charDisplay = tileElement.querySelector('.custom-char-display');
        if (charDisplay) {
            charDisplay.textContent = tile.customChar;
            charDisplay.style.display = tile.customChar ? 'flex' : 'none';
        }
    }
    
    // Refresh control panel to show updated character
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Load tiles into palette
function loadTilePalette() {
    const mapTilesList = document.getElementById('mapTiles-list');
    const tokensList = document.getElementById('tokens-list');
    
    if (!mapTilesList || !tokensList) return;
    
    mapTilesList.innerHTML = '';
    tokensList.innerHTML = '';
    
    availableTiles.forEach(tile => {
        const tileItem = document.createElement('div');
        tileItem.className = 'tile-item';
        tileItem.draggable = true;
        tileItem.dataset.tileId = tile.id;
        tileItem.dataset.tileName = tile.name.toLowerCase();
        
        tileItem.innerHTML = `
            <div class="tile-preview" style="background-image: url('${tile.image}')"></div>
            <div class="tile-info">
                <div class="tile-name">${tile.name}</div>
                <div class="tile-size">Adjustable</div>
            </div>
        `;
        
        tileItem.addEventListener('dragstart', handleDragStart);
        tileItem.addEventListener('dragend', handleDragEnd);
        
        // Separate map tiles from tokens/overlays
        if (tile.image.startsWith('mapsections/')) {
            mapTilesList.appendChild(tileItem);
        } else {
            tokensList.appendChild(tileItem);
        }
    });
    
    // Setup search filter
    setupTileSearch();
}

// Setup tile search functionality
function setupTileSearch() {
    const searchInput = document.getElementById('tileSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allTileItems = document.querySelectorAll('.tile-item');
        
        allTileItems.forEach(item => {
            const tileName = item.dataset.tileName || '';
            if (tileName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// Toggle palette section visibility
function togglePaletteSection(sectionId) {
    const list = document.getElementById(`${sectionId}-list`);
    const button = list.previousElementSibling;
    const icon = button.querySelector('.toggle-icon');
    
    if (list.classList.contains('collapsed')) {
        list.classList.remove('collapsed');
        button.classList.add('active');
        icon.textContent = '▼';
    } else {
        list.classList.add('collapsed');
        button.classList.remove('active');
        icon.textContent = '▶';
    }
}

// Drag and drop handlers
let draggedTileId = null;

function handleDragStart(e) {
    draggedTileId = e.currentTarget.dataset.tileId;
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
    
    placeTile(draggedTileId, col, row);
    draggedTileId = null;
}

// Place a tile on the grid
function placeTile(tileTypeId, col, row) {
    const tileType = availableTiles.find(t => t.id === tileTypeId);
    if (!tileType) return;
    
    const placedTile = {
        id: `placed_${nextTileId++}`,
        tileTypeId: tileTypeId,
        name: tileType.name,
        image: tileType.image,
        col: col,
        row: row,
        width: tileType.width,
        height: tileType.height,
        revealed: true,
        rotation: 0,
        zIndex: 10,
        customChar: tileType.customChar || ''
    };
    
    placedTiles.push(placedTile);
    renderPlacedTile(placedTile);
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
    const isMapSection = tile.image.startsWith('mapsections/');
    
    tileDiv.className = `placed-tile ${tile.revealed ? 'revealed' : 'fogged'}`;
    tileDiv.dataset.tileId = tile.id;
    tileDiv.dataset.isMapSection = isMapSection;
    updateTilePosition(tileDiv, tile);
    tileDiv.style.backgroundImage = `url('${tile.image}')`;
    
    // Fog overlay - only for map sections
    if (isMapSection) {
        const fogOverlay = document.createElement('div');
        fogOverlay.className = 'fog-overlay';
        tileDiv.appendChild(fogOverlay);
    }
    
    // Drag handle
    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.title = 'Drag to move tile';
    
    // Label with z-index
    const label = document.createElement('div');
    label.className = 'tile-label';
    label.textContent = `${tile.name} (z:${tile.zIndex})`;
    
    // Selection indicator
    const selectionIndicator = document.createElement('div');
    selectionIndicator.className = 'selection-indicator';
    
    // Custom character display for custom-red-circle tiles
    const isCustomCharTile = tile.tileTypeId === 'custom-red-circle';
    if (isCustomCharTile) {
        const charDisplay = document.createElement('div');
        charDisplay.className = 'custom-char-display';
        charDisplay.textContent = tile.customChar || '';
        charDisplay.style.display = tile.customChar ? 'flex' : 'none';
        tileDiv.appendChild(charDisplay);
    }
    
    tileDiv.appendChild(dragHandle);
    tileDiv.appendChild(label);
    tileDiv.appendChild(selectionIndicator);
    
    // Click to select tile or reveal (for map sections)
    tileDiv.addEventListener('click', (e) => {
        if (!e.target.closest('.drag-handle')) {
            e.stopPropagation();
            selectTile(tile.id);
        }
    });
    
    // Drag to move - only from drag handle or label
    dragHandle.addEventListener('mousedown', handleTileDragStart);
    label.addEventListener('mousedown', handleTileDragStart);
    
    grid.appendChild(tileDiv);
    
    // Update token visibility after adding tile
    updateTokenVisibility();
}

// Update tile position and dimensions
function updateTilePosition(tileDiv, tile) {
    // Use offset version if tile has pixel offsets
    if (tile.pixelOffsetX !== undefined || tile.pixelOffsetY !== undefined) {
        updateTilePositionWithOffset(tileDiv, tile);
        return;
    }
    
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
    
    // Counter-rotate controls to keep them upright (but let label rotate with tile)
    const controls = tileDiv.querySelector('.tile-controls');
    if (controls) {
        controls.style.transform = `rotate(${-tile.rotation}deg)`;
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
    updateTokenVisibility();
}

// Update token visibility based on underlying map tiles
function updateTokenVisibility() {
    // Get all tokens (non-map-section tiles)
    const tokens = placedTiles.filter(t => !t.image.startsWith('mapsections/'));
    const mapSections = placedTiles.filter(t => t.image.startsWith('mapsections/'));
    
    tokens.forEach(token => {
        const tokenElement = document.querySelector(`[data-tile-id="${token.id}"]`);
        if (!tokenElement) return;
        
        // Doors always visible - check if tile is a door
        const isDoor = token.image.includes('door');
        if (isDoor) {
            tokenElement.style.opacity = '1';
            tokenElement.style.pointerEvents = 'auto';
            return;
        }
        
        // Check if token is under any fogged map section
        let isUnderFoggedTile = false;
        
        for (const mapTile of mapSections) {
            if (!mapTile.revealed && tilesOverlap(token, mapTile)) {
                isUnderFoggedTile = true;
                break;
            }
        }
        
        // Hide or show token based on fog state
        if (isUnderFoggedTile) {
            tokenElement.style.opacity = '0';
            tokenElement.style.pointerEvents = 'none';
        } else {
            tokenElement.style.opacity = '1';
            tokenElement.style.pointerEvents = 'auto';
        }
    });
}

// Check if two tiles overlap
function tilesOverlap(tile1, tile2) {
    const rect1 = getTileBounds(tile1);
    const rect2 = getTileBounds(tile2);
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Get tile bounds in pixels
function getTileBounds(tile) {
    const pixelOffsetX = tile.pixelOffsetX || 0;
    const pixelOffsetY = tile.pixelOffsetY || 0;
    
    const left = tile.col * (CELL_SIZE + 2) + pixelOffsetX;
    const top = tile.row * (CELL_SIZE + 2) + pixelOffsetY;
    
    const isRotated90 = tile.rotation === 90 || tile.rotation === 270;
    const displayWidth = isRotated90 ? tile.height : tile.width;
    const displayHeight = isRotated90 ? tile.width : tile.height;
    
    const width = displayWidth * CELL_SIZE + (displayWidth - 1) * 2;
    const height = displayHeight * CELL_SIZE + (displayHeight - 1) * 2;
    
    return {
        left: left,
        top: top,
        right: left + width,
        bottom: top + height
    };
}

// Remove a tile
function removeTile(tileId) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Remove from array
    placedTiles = placedTiles.filter(t => t.id !== tileId);
    
    // Remove from DOM
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.remove();
    }
    
    updatePlacedTilesList();
    updateRevealedRooms();
    updateTokenVisibility();
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
    if (placedTiles.length === 0) return;
    
    if (confirm('Clear all tiles from the map?')) {
        placedTiles.forEach(tile => removeTile(tile.id));
        placedTiles = [];
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('occupied');
        });
        document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
        updatePlacedTilesList();
        updateRevealedRooms();
    }
}

// Toggle grid visibility
function toggleGrid() {
    const grid = document.getElementById('placementGrid');
    grid.classList.toggle('show-grid');
}

// Save map with custom name
function saveMap() {
    const mapName = prompt('Enter a name for this map:', 'Mission_1');
    if (!mapName) return;
    
    // Get all textarea values
    const scenarioData = {
        missionTitle: document.getElementById('missionTitle').textContent,
        objectives: document.getElementById('objectives')?.value || '',
        loot: document.getElementById('loot')?.value || '',
        intro: document.getElementById('intro')?.value || '',
        room1: document.getElementById('room1')?.value || '',
        room2: document.getElementById('room2')?.value || '',
        room3: document.getElementById('room3')?.value || '',
        rules: document.getElementById('rules')?.value || '',
        conclusion: document.getElementById('conclusion')?.value || '',
        notes: document.getElementById('notes')?.value || ''
    };
    
    const mapData = {
        name: mapName,
        tiles: placedTiles,
        nextId: nextTileId,
        scenario: scenarioData,
        savedAt: new Date().toISOString()
    };
    
    // Get existing saved maps
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    savedMaps[mapName] = mapData;
    
    localStorage.setItem('gloomhavenMaps', JSON.stringify(savedMaps));
    
    // Also save as default for backward compatibility and scenario viewer
    localStorage.setItem('gloomhavenMap', JSON.stringify(mapData));
    
    alert(`Map "${mapName}" saved successfully!`);
}

// Download map as JSON file
function downloadMap() {
    const mapName = prompt('Enter a name for the download file:', 'gloomhaven_map');
    if (!mapName) return;
    
    // Get all textarea values
    const scenarioData = {
        missionTitle: document.getElementById('missionTitle').textContent,
        objectives: document.getElementById('objectives')?.value || '',
        loot: document.getElementById('loot')?.value || '',
        intro: document.getElementById('intro')?.value || '',
        room1: document.getElementById('room1')?.value || '',
        room2: document.getElementById('room2')?.value || '',
        room3: document.getElementById('room3')?.value || '',
        rules: document.getElementById('rules')?.value || '',
        conclusion: document.getElementById('conclusion')?.value || '',
        notes: document.getElementById('notes')?.value || ''
    };
    
    const mapData = {
        name: mapName,
        tiles: placedTiles,
        nextId: nextTileId,
        scenario: scenarioData,
        savedAt: new Date().toISOString()
    };
    
    // Create JSON file and download
    const dataStr = JSON.stringify(mapData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mapName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Map "${mapName}" downloaded successfully!`);
}

// Import map from JSON file
function importMap() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

// Handle file import
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const mapData = JSON.parse(e.target.result);
            
            // Validate map data
            if (!mapData.tiles || !Array.isArray(mapData.tiles)) {
                alert('Invalid map file format.');
                return;
            }
            
            if (confirm(`Import map "${mapData.name || 'Unnamed'}"? This will replace the current map.`)) {
                clearMap();
                
                placedTiles = mapData.tiles || [];
                nextTileId = mapData.nextId || 0;
                
                // Render all tiles
                placedTiles.forEach(tile => {
                    if (tile.rotation === undefined) tile.rotation = 0;
                    if (tile.zIndex === undefined) tile.zIndex = 10;
                    if (tile.revealed === undefined) tile.revealed = true;
                    
                    renderPlacedTile(tile);
                });
                
                // Load scenario data
                if (mapData.scenario) {
                    const s = mapData.scenario;
                    document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
                    if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
                    if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
                    if (document.getElementById('intro')) document.getElementById('intro').value = s.intro || '';
                    if (document.getElementById('room1')) document.getElementById('room1').value = s.room1 || '';
                    if (document.getElementById('room2')) document.getElementById('room2').value = s.room2 || '';
                    if (document.getElementById('room3')) document.getElementById('room3').value = s.room3 || '';
                    if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
                    if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
                    if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
                }
                
                // Also save to localStorage
                const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
                savedMaps[mapData.name] = mapData;
                localStorage.setItem('gloomhavenMaps', JSON.stringify(savedMaps));
                localStorage.setItem('gloomhavenMap', JSON.stringify(mapData));
                
                updatePlacedTilesList();
                updateRevealedRooms();
                updateTokenVisibility();
                
                alert(`Map "${mapData.name || 'Unnamed'}" imported successfully!`);
            }
        } catch (error) {
            console.error('Error importing map:', error);
            alert('Error importing map. Please check the file format.');
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// Load map from saved files
function loadMap() {
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    const mapNames = Object.keys(savedMaps);
    
    const modal = document.getElementById('loadMapModal');
    const mapListContainer = document.getElementById('mapListContainer');
    
    if (mapNames.length === 0) {
        mapListContainer.innerHTML = '<div class="no-maps-message">No saved maps found. Create and save a map first!</div>';
    } else {
        // Sort by date, newest first
        mapNames.sort((a, b) => {
            return new Date(savedMaps[b].savedAt) - new Date(savedMaps[a].savedAt);
        });
        
        mapListContainer.innerHTML = mapNames.map(name => {
            const map = savedMaps[name];
            const date = new Date(map.savedAt).toLocaleString();
            const tileCount = (map.tiles || []).length;
            
            return `
                <div class="map-list-item" onclick="loadSelectedMap('${name.replace(/'/g, "\\'")}')">
                    <div class="map-list-item-name">${name}</div>
                    <div class="map-list-item-date">📅 ${date}</div>
                    <div class="map-list-item-tiles">🗺️ ${tileCount} tiles placed</div>
                </div>
            `;
        }).join('');
    }
    
    modal.classList.add('show');
}

// Close load map modal
function closeLoadMapModal() {
    const modal = document.getElementById('loadMapModal');
    modal.classList.remove('show');
}

// Load selected map
function loadSelectedMap(mapName) {
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    const mapToLoad = savedMaps[mapName];
    
    if (!mapToLoad) {
        alert('Map not found.');
        return;
    }
    
    closeLoadMapModal();
    
    if (confirm(`Load map "${mapToLoad.name}"? This will replace the current map.`)) {
        clearMap();
        
        placedTiles = mapToLoad.tiles || [];
        nextTileId = mapToLoad.nextId || 0;
        
        // Render all tiles
        placedTiles.forEach(tile => {
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = false;
            
            renderPlacedTile(tile);
        });
        
        // Load scenario data
        if (mapToLoad.scenario) {
            const s = mapToLoad.scenario;
            document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
            if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
            if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
            if (document.getElementById('intro')) document.getElementById('intro').value = s.intro || '';
            if (document.getElementById('room1')) document.getElementById('room1').value = s.room1 || '';
            if (document.getElementById('room2')) document.getElementById('room2').value = s.room2 || '';
            if (document.getElementById('room3')) document.getElementById('room3').value = s.room3 || '';
            if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
            if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
            if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
        }
        
        // Also save as default for scenario viewer
        localStorage.setItem('gloomhavenMap', JSON.stringify(mapToLoad));
        
        updatePlacedTilesList();
        updateRevealedRooms();
        updateTokenVisibility();
        
        alert(`Map "${mapToLoad.name}" loaded successfully!`);
    }
}

// Load default map (for backward compatibility)
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        placedTiles = mapData.tiles || [];
        nextTileId = mapData.nextId || 0;
        
        // Render all tiles (ensure all properties exist)
        placedTiles.forEach(tile => {
            // Add default values for properties that might not exist in old saves
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = false;
            
            renderPlacedTile(tile);
        });
        
        updatePlacedTilesList();
        updateRevealedRooms();
        updateTokenVisibility();
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
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel if this tile is selected
    if (selectedTileId === tileId) {
        showControlPanel(tile);
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
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel if this tile is selected
    if (selectedTileId === tileId) {
        showControlPanel(tile);
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
    
    tile.width = newWidth;
    tile.height = newHeight;
    
    if (tileElement) {
        updateTilePosition(tileElement, tile);
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
    
    // Find the tile element (could be the currentTarget or its parent)
    const tileElement = e.currentTarget.closest('.placed-tile') || e.currentTarget;
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
    
    // Update tile position
    draggedPlacedTile.col = newCol;
    draggedPlacedTile.row = newRow;
    
    // Snap to grid and update display
    updateTilePosition(tileElement, draggedPlacedTile);
    
    tileElement.classList.remove('dragging-tile');
    
    document.removeEventListener('mousemove', handleTileDragMove);
    document.removeEventListener('mouseup', handleTileDragEnd);
    
    draggedPlacedTile = null;
    
    e.preventDefault();
}

// Move tile by pixels (fine-tuning)
function moveTilePixels(tileId, deltaX, deltaY) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Store pixel offset (or initialize if not exists)
    if (!tile.pixelOffsetX) tile.pixelOffsetX = 0;
    if (!tile.pixelOffsetY) tile.pixelOffsetY = 0;
    
    tile.pixelOffsetX += deltaX;
    tile.pixelOffsetY += deltaY;
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePositionWithOffset(tileElement, tile);
    }
    
    updateTokenVisibility();
}

// Update tile position with pixel offset
function updateTilePositionWithOffset(tileDiv, tile) {
    const baseX = tile.col * (CELL_SIZE + 2);
    const baseY = tile.row * (CELL_SIZE + 2);
    const offsetX = tile.pixelOffsetX || 0;
    const offsetY = tile.pixelOffsetY || 0;
    
    tileDiv.style.left = `${baseX + offsetX}px`;
    tileDiv.style.top = `${baseY + offsetY}px`;
    tileDiv.style.zIndex = tile.zIndex || 10;
    
    // Swap width/height if rotated 90 or 270 degrees
    const isRotated90 = tile.rotation === 90 || tile.rotation === 270;
    const displayWidth = isRotated90 ? tile.height : tile.width;
    const displayHeight = isRotated90 ? tile.width : tile.height;
    
    tileDiv.style.width = `${displayWidth * CELL_SIZE + (displayWidth - 1) * 2}px`;
    tileDiv.style.height = `${displayHeight * CELL_SIZE + (displayHeight - 1) * 2}px`;
    tileDiv.style.transform = `rotate(${tile.rotation}deg)`;
    tileDiv.style.transformOrigin = 'center center';
    
    // Counter-rotate controls to keep them upright (but let label rotate with tile)
    const controls = tileDiv.querySelector('.tile-controls');
    if (controls) {
        controls.style.transform = `rotate(${-tile.rotation}deg)`;
    }
}

// Resize all tiles to a uniform size
function resizeAllTiles() {
    const size = prompt('Enter uniform size for all tiles (1-15):', '3');
    if (!size) return;
    
    const newSize = Math.max(1, Math.min(15, parseInt(size)));
    if (isNaN(newSize)) return;
    
    placedTiles.forEach(tile => {
        tile.width = newSize;
        tile.height = newSize;
        
        const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
        if (tileElement) {
            if (tile.pixelOffsetX !== undefined || tile.pixelOffsetY !== undefined) {
                updateTilePositionWithOffset(tileElement, tile);
            } else {
                updateTilePosition(tileElement, tile);
            }
        }
    });
    
    alert(`All tiles resized to ${newSize}x${newSize}`);
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

// Toggle section visibility
function toggleSection(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const button = content.previousElementSibling;
    const icon = button.querySelector('.toggle-icon');
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        button.classList.add('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('collapsed');
        button.classList.remove('active');
        icon.textContent = '▶';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    
    document.getElementById('resetFog').addEventListener('click', resetFog);
    document.getElementById('revealAll').addEventListener('click', revealAll);
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
    document.getElementById('saveMap').addEventListener('click', saveMap);
    document.getElementById('loadMap').addEventListener('click', loadMap);
    document.getElementById('downloadMap').addEventListener('click', downloadMap);
    document.getElementById('importMap').addEventListener('click', importMap);
    document.getElementById('fileInput').addEventListener('change', handleFileImport);
    document.getElementById('resizeAll').addEventListener('click', resizeAllTiles);
    document.getElementById('clearMap').addEventListener('click', clearMap);
});

