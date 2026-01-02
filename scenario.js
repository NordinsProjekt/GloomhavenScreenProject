// Placed tiles on the grid
let placedTiles = [];
let originalMapData = null; // Store original map data for resetting

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
    document.getElementById('clearMap').addEventListener('click', clearMap);
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
    
    // Custom character display for custom-red-circle tiles
    const isCustomCharTile = tile.tileTypeId === 'custom-red-circle';
    if (isCustomCharTile && tile.customChar) {
        const charDisplay = document.createElement('div');
        charDisplay.className = 'custom-char-display';
        charDisplay.textContent = tile.customChar || '';
        charDisplay.style.display = tile.customChar ? 'flex' : 'none';
        tileDiv.appendChild(charDisplay);
    }
    
    // Click to reveal/hide fog (only for map sections)
    tileDiv.addEventListener('click', (e) => {
        if (isMapSection) {
            toggleTileReveal(tile.id);
        } else {
            // For non-map tiles (obstacles, tokens, etc.)
            handleObstacleClick(tile, e);
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

// Handle obstacle click
function handleObstacleClick(tile, event) {
    // Check if tile is revealed
    if (!tile.revealed) return;
    
    // Check if it's a door
    const isDoor = tile.image.includes('door');
    if (isDoor) return;
    
    // Check if it's a custom-red-circle
    if (tile.tileTypeId === 'custom-red-circle') return;
    
    // Show destroy option
    showDestroyOption(tile, event);
}

// Show destroy obstacle option
function showDestroyOption(tile, event) {
    event.stopPropagation();
    
    // Remove any existing destroy menu
    const existingMenu = document.querySelector('.destroy-menu');
    if (existingMenu) existingMenu.remove();
    
    // Create destroy menu
    const menu = document.createElement('div');
    menu.className = 'destroy-menu';
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
    
    menu.innerHTML = `
        <div class="destroy-menu-content">
            <div class="destroy-menu-header">Destroy Obstacle?</div>
            <div class="destroy-menu-info">${tile.name}</div>
            <div class="destroy-menu-buttons">
                <button class="destroy-btn destroy-confirm" onclick="destroyObstacle('${tile.id}')">
                    💥 Destroy
                </button>
                <button class="destroy-btn destroy-cancel" onclick="closeDestroyMenu()">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeDestroyMenu, { once: true });
    }, 10);
}

// Close destroy menu
function closeDestroyMenu() {
    const menu = document.querySelector('.destroy-menu');
    if (menu) menu.remove();
}

// Destroy obstacle
function destroyObstacle(tileId) {
    // Find and remove the tile
    const tileIndex = placedTiles.findIndex(t => t.id === tileId);
    if (tileIndex === -1) return;
    
    // Remove from array
    placedTiles.splice(tileIndex, 1);
    
    // Remove from DOM
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.style.transition = 'opacity 0.3s, transform 0.3s';
        tileElement.style.opacity = '0';
        tileElement.style.transform = tileElement.style.transform + ' scale(0.5)';
        
        setTimeout(() => {
            tileElement.remove();
        }, 300);
    }
    
    closeDestroyMenu();
}

// Update token visibility based on underlying map tiles
function updateTokenVisibility() {
    const tokens = placedTiles.filter(t => !t.image.startsWith('mapsections/'));
    const mapSections = placedTiles.filter(t => t.image.startsWith('mapsections/'));
    
    tokens.forEach(token => {
        const tokenElement = document.querySelector(`[data-tile-id="${token.id}"]`);
        if (!tokenElement) return;
        
        // Doors, custom-red-circles, and traps always visible
        const isDoor = token.image.includes('door');
        const isCustomRedCircle = token.tileTypeId === 'custom-red-circle';
        const isTrap = token.tileTypeId && (token.tileTypeId.includes('trap') || token.tileTypeId === 'bear-trap' || token.tileTypeId === 'spike-trap' || token.tileTypeId === 'poison-gas-trap');
        
        if (isDoor || isCustomRedCircle || isTrap) {
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

// Load map data (shared function for localStorage and file upload)
function loadMapData(mapData) {
    // Store original map data for reset functionality
    originalMapData = JSON.parse(JSON.stringify(mapData)); // Deep copy
    
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
}

// Load map from localStorage
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        loadMapData(mapData);
    } catch (e) {
        console.error('Error loading map:', e);
    }
}

// Clear the current map
function clearMap() {
    if (!confirm('Clear the current map and reset all fog? This will reload the scenario from the beginning.')) {
        return;
    }
    
    // Reload from original map data to restore destroyed obstacles
    if (originalMapData) {
        // Create a fresh copy from original
        const resetData = JSON.parse(JSON.stringify(originalMapData));
        
        // Reset only map sections to fogged, keep obstacles visible
        resetData.tiles.forEach(tile => {
            const isMapSection = tile.image.startsWith('mapsections/');
            tile.revealed = !isMapSection; // Map sections fogged, obstacles revealed
        });
        
        placedTiles = resetData.tiles;
        
        // Clear and re-render
        document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
        placedTiles.forEach(tile => renderPlacedTile(tile));
        updateTokenVisibility();
    }
}

// Show load map modal
function loadMap() {
    showSavedMaps();
    const modal = document.getElementById('loadMapModal');
    modal.classList.add('show');
}

// Show saved maps view
function showSavedMaps() {
    document.getElementById('savedMapsView').style.display = 'block';
    document.getElementById('fileUploadView').style.display = 'none';
    
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
}

// Show file upload view
function showFileUpload() {
    document.getElementById('savedMapsView').style.display = 'none';
    document.getElementById('fileUploadView').style.display = 'block';
}

let missionsDirectoryHandle = null;

async function selectMissionsFolder() {
    try {
        // Request directory picker
        const dirHandle = await window.showDirectoryPicker();
        
        // Verify it's the Missions folder or contains it
        if (dirHandle.name !== 'Missions') {
            // Check if Missions exists as a subdirectory
            let foundMissions = false;
            try {
                const missionsHandle = await dirHandle.getDirectoryHandle('Missions');
                missionsDirectoryHandle = missionsHandle;
                foundMissions = true;
            } catch {
                // Not found, use selected folder anyway
                missionsDirectoryHandle = dirHandle;
            }
            
            if (!foundMissions) {
                const useAnyway = confirm(`Selected folder is "${dirHandle.name}". Continue anyway?\n\n(Recommended: Select the "Missions" folder or its parent folder)`);
                if (!useAnyway) return;
            }
        } else {
            missionsDirectoryHandle = dirHandle;
        }
        
        await displayMissionFiles();
    } catch (error) {
        if (error.name !== 'AbortError') {
            alert('Error accessing folder: ' + error.message);
        }
    }
}

async function displayMissionFiles() {
    const fileList = document.getElementById('missionFileList');
    fileList.innerHTML = '<p style="color: #8b6f47; margin: 15px 0;">Loading files...</p>';
    
    const files = [];
    await collectJSONFiles(missionsDirectoryHandle, files, '');
    
    if (files.length === 0) {
        fileList.innerHTML = '<p style="color: #8b6f47; margin: 15px 0;">No .json files found in selected folder</p>';
        return;
    }
    
    let html = '<div class="mission-files-container">';
    for (const file of files) {
        html += `
            <div class="mission-file-item" onclick="loadMissionFile('${file.path.replace(/'/g, "\\'")}')">
                <span class="mission-file-icon">📄</span>
                <span class="mission-file-name">${file.path}</span>
            </div>
        `;
    }
    html += '</div>';
    
    fileList.innerHTML = html;
}

async function collectJSONFiles(dirHandle, files, currentPath) {
    for await (const entry of dirHandle.values()) {
        const entryPath = currentPath ? `${currentPath}/${entry.name}` : entry.name;
        
        if (entry.kind === 'file' && entry.name.endsWith('.json')) {
            files.push({ handle: entry, path: entryPath });
        } else if (entry.kind === 'directory') {
            await collectJSONFiles(entry, files, entryPath);
        }
    }
}

window.missionFileHandles = {};

async function loadMissionFile(path) {
    try {
        // Find the file handle
        const files = [];
        await collectJSONFiles(missionsDirectoryHandle, files, '');
        const fileInfo = files.find(f => f.path === path);
        
        if (!fileInfo) {
            alert('File not found: ' + path);
            return;
        }
        
        const file = await fileInfo.handle.getFile();
        const text = await file.text();
        const mapData = JSON.parse(text);
        
        loadMapData(mapData);
        closeLoadMapModal();
    } catch (error) {
        alert('Error loading file: ' + error.message);
    }
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
