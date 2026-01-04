/**
 * Scenario Maker - Fog of War
 * Manages fog of war controls
 */

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
    updateTokenVisibility();
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
    updateTokenVisibility();
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
        
        // Only hide if token is UNDER a fogged map section (lower z-index)
        for (const mapTile of mapSections) {
            if (!mapTile.revealed && tilesOverlap(token, mapTile)) {
                // Check if the map tile is ABOVE the token (higher z-index)
                const tokenZIndex = token.zIndex || 10;
                const mapZIndex = mapTile.zIndex || 10;
                
                if (mapZIndex >= tokenZIndex) {
                    isUnderFoggedTile = true;
                    break;
                }
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
