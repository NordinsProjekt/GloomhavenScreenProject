// Placed tiles on the grid
let placedTiles = [];

const GRID_COLS = 25;
const GRID_ROWS = 25;
const CELL_SIZE = 80;

// Initialize the scenario viewer
function initializeScenario() {
    createGrid();
    loadSavedMap();
    setupEventListeners();
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
            grid.appendChild(cell);
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('loadMap').addEventListener('click', loadMap);
    document.getElementById('toggleAllFog').addEventListener('click', toggleAllFog);
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
}

// Render a placed tile (read-only)
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
    
    // Label
    const label = document.createElement('div');
    label.className = 'tile-label';
    label.textContent = `${tile.name} (z:${tile.zIndex})`;
    
    tileDiv.appendChild(label);
    
    // Click to reveal/hide fog (only for map sections)
    tileDiv.addEventListener('click', () => {
        if (isMapSection) {
            toggleTileReveal(tile.id);
        }
    });
    
    grid.appendChild(tileDiv);
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
    
    updateTokenVisibility();
}

// Toggle all fog
function toggleAllFog() {
    const anyRevealed = placedTiles.some(t => t.revealed);
    const newState = !anyRevealed;
    
    placedTiles.forEach(tile => {
        tile.revealed = newState;
        const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
        
        if (tileElement) {
            if (newState) {
                tileElement.classList.add('revealed');
                tileElement.classList.remove('fogged');
            } else {
                tileElement.classList.remove('revealed');
                tileElement.classList.add('fogged');
            }
        }
    });
}

// Toggle grid visibility
function toggleGrid() {
    const grid = document.getElementById('placementGrid');
    grid.classList.toggle('show-grid');
}

// Update token visibility based on underlying map tiles
function updateTokenVisibility() {
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
        
        let isUnderFoggedTile = false;
        
        for (const mapTile of mapSections) {
            if (!mapTile.revealed && tilesOverlap(token, mapTile)) {
                isUnderFoggedTile = true;
                break;
            }
        }
        
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

// Load map from localStorage
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        placedTiles = mapData.tiles || [];
        
        // Clear existing tiles
        document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
        
        // Render all tiles
        placedTiles.forEach(tile => {
            // Add default values for properties that might not exist in old saves
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = true;
            
            renderPlacedTile(tile);
        });
        
        // Load scenario data if available
        if (mapData.scenario) {
            const s = mapData.scenario;
            document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
            if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
            if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
            if (document.getElementById('text1')) document.getElementById('text1').value = s.intro || '';
            if (document.getElementById('text2')) document.getElementById('text2').value = s.room1 || '';
            if (document.getElementById('text3')) document.getElementById('text3').value = s.room2 || '';
            if (document.getElementById('text4')) document.getElementById('text4').value = s.room3 || '';
            if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
            if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
            if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
        }
        
        updateTokenVisibility();
        
    } catch (e) {
        console.error('Error loading map:', e);
    }
}

// Show load map modal
function loadMap() {
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    const mapListContainer = document.getElementById('mapListContainer');
    
    if (Object.keys(savedMaps).length === 0) {
        mapListContainer.innerHTML = '<p style="text-align: center; color: #bdc3c7; padding: 20px;">No saved maps found.</p>';
    } else {
        let html = '';
        for (const [key, mapData] of Object.entries(savedMaps)) {
            const date = new Date(mapData.timestamp || Date.now()).toLocaleString();
            const tileCount = mapData.tiles ? mapData.tiles.length : 0;
            html += `
                <div class="map-list-item" onclick="loadSelectedMap('${key}')">
                    <div class="map-item-name">${mapData.name || key}</div>
                    <div class="map-item-details">
                        <span>📅 ${date}</span>
                        <span>🗺️ ${tileCount} tiles</span>
                    </div>
                </div>
            `;
        }
        mapListContainer.innerHTML = html;
    }
    
    const modal = document.getElementById('loadMapModal');
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
    
    placedTiles = mapToLoad.tiles || [];
    
    // Clear existing tiles
    document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
    
    // Render all tiles
    placedTiles.forEach(tile => {
        if (tile.rotation === undefined) tile.rotation = 0;
        if (tile.zIndex === undefined) tile.zIndex = 10;
        if (tile.revealed === undefined) tile.revealed = true;
        
        renderPlacedTile(tile);
    });
    
    // Load scenario data
    if (mapToLoad.scenario) {
        const s = mapToLoad.scenario;
        document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
        if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
        if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
        if (document.getElementById('text1')) document.getElementById('text1').value = s.intro || '';
        if (document.getElementById('text2')) document.getElementById('text2').value = s.room1 || '';
        if (document.getElementById('text3')) document.getElementById('text3').value = s.room2 || '';
        if (document.getElementById('text4')) document.getElementById('text4').value = s.room3 || '';
        if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
        if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
        if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
    }
    
    updateTokenVisibility();
}

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeScenario);
