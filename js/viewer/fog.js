/**
 * Scenario Viewer - Fog of War
 * Manages fog of war system for the viewer
 */

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
    updateMonsterVisibility();
    
    // Auto-save game state
    autoSaveGameState();
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
    
    updateTokenVisibility();
    updateMonsterVisibility();
    
    // Auto-save game state
    autoSaveGameState();
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
        
        if (isUnderFoggedTile) {
            tokenElement.style.opacity = '0';
            tokenElement.style.pointerEvents = 'none';
        } else {
            tokenElement.style.opacity = '1';
            tokenElement.style.pointerEvents = 'auto';
        }
    });
}
