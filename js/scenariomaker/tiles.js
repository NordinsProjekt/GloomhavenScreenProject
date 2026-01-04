/**
 * Scenario Maker - Tile Rendering and Management
 * Handles rendering tiles on the grid and updating their positions
 */

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
    
    // Monster indicators - show colored circles for each player count
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

// Update tile label
function updateTileLabel(tileElement, tile) {
    const label = tileElement.querySelector('.tile-label');
    if (label) {
        label.textContent = `${tile.name} (z:${tile.zIndex})`;
    }
}
