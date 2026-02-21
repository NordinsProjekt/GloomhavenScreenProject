/**
 * Scenario Viewer - Tile Rendering
 * Handles rendering tiles in read-only mode
 */

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
    
    // Label - only for map sections
    if (isMapSection) {
        const label = document.createElement('div');
        label.className = 'tile-label';
        label.textContent = `${tile.name} (z:${tile.zIndex})`;
        tileDiv.appendChild(label);
    }
    
    // Custom character display for custom-red-circle tiles
    const isCustomCharTile = tile.tileTypeId === 'custom-red-circle';
    if (isCustomCharTile && tile.customChar) {
        const charDisplay = document.createElement('div');
        charDisplay.className = 'custom-char-display';
        charDisplay.textContent = tile.customChar || '';
        charDisplay.style.display = tile.customChar ? 'flex' : 'none';
        tileDiv.appendChild(charDisplay);
    }
    
    // Monster indicators - show colored circles for each player count (like scenariomaker)
    if (tile.isMonster && tile.players) {
        const monsterIndicators = document.createElement('div');
        monsterIndicators.className = 'monster-indicators';
        
        [2, 3, 4].forEach(playerCount => {
            if (tile.players[playerCount] && tile.players[playerCount].enabled) {
                const indicator = document.createElement('div');
                indicator.className = `monster-indicator player-${playerCount}`;
                indicator.classList.add(tile.players[playerCount].elite ? 'elite' : 'normal');
                indicator.textContent = playerCount;
                indicator.dataset.playerCount = playerCount;
                monsterIndicators.appendChild(indicator);
            }
        });
        
        tileDiv.appendChild(monsterIndicators);
    }
    
    // Click to reveal/hide fog (only for map sections)
    tileDiv.addEventListener('click', (e) => {
        // Prevent tile interactions when line tool is active
        if (lineToolActive) {
            return;
        }
        
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
