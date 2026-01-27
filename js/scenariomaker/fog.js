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
        // Token belongs to the map tile where the biggest percentage of it is in
        let isUnderFoggedTile = false;
        
        // Find the map tile with the biggest overlap percentage
        const primaryMapTile = findPrimaryMapTile(token, mapSections);
        
        if (primaryMapTile && !primaryMapTile.revealed) {
            // Check if the map tile is ABOVE the token (higher z-index)
            const tokenZIndex = token.zIndex || 10;
            const mapZIndex = primaryMapTile.zIndex || 10;
            
            if (mapZIndex >= tokenZIndex) {
                isUnderFoggedTile = true;
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

// Calculate what percentage of tile1's area overlaps with tile2
function getOverlapPercentage(tile1, tile2) {
    const bounds1 = getTileBounds(tile1);
    const bounds2 = getTileBounds(tile2);
    
    // Calculate intersection bounds
    const overlapLeft = Math.max(bounds1.left, bounds2.left);
    const overlapRight = Math.min(bounds1.right, bounds2.right);
    const overlapTop = Math.max(bounds1.top, bounds2.top);
    const overlapBottom = Math.min(bounds1.bottom, bounds2.bottom);
    
    // Check if there's no overlap
    if (overlapLeft > overlapRight || overlapTop > overlapBottom) {
        return 0;
    }
    
    // Calculate overlap area
    const overlapWidth = overlapRight - overlapLeft;
    const overlapHeight = overlapBottom - overlapTop;
    const overlapArea = overlapWidth * overlapHeight;
    
    // Calculate tile1's area
    const tile1Width = bounds1.right - bounds1.left;
    const tile1Height = bounds1.bottom - bounds1.top;
    const tile1Area = tile1Width * tile1Height;
    
    // Return percentage (0 to 1)
    return tile1Area > 0 ? overlapArea / tile1Area : 0;
}

// Find the map tile that has the biggest overlap with the given token/monster
// Returns the map tile with largest overlap percentage, or null if no overlap
function findPrimaryMapTile(token, mapSections) {
    let maxOverlap = 0;
    let primaryMapTile = null;
    
    for (const mapTile of mapSections) {
        const overlap = getOverlapPercentage(token, mapTile);
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            primaryMapTile = mapTile;
        }
    }
    
    return primaryMapTile;
}
