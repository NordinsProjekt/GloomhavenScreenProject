/**
 * Scenario Viewer - Monster Management
 * Handles monster visibility and player count
 */

// Set player count and filter monsters
function setPlayerCount(count) {
    currentPlayerCount = count;
    
    // Update button states
    document.querySelectorAll('.player-count-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.count) === count);
    });
    
    updateMonsterVisibility();
}

// Update monster visibility based on player count
function updateMonsterVisibility() {
    const mapSections = placedTiles.filter(t => t.image.startsWith('mapsections/'));
    
    placedTiles.forEach(tile => {
        if (tile.isMonster) {
            const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
            if (!tileElement) return;
            
            // Check if monster is enabled for current player count
            const isEnabledForPlayerCount = tile.players && 
                                           tile.players[currentPlayerCount] && 
                                           tile.players[currentPlayerCount].enabled;
            
            // Check if monster is under a fogged map section
            let isUnderFoggedTile = false;
            for (const mapTile of mapSections) {
                if (!mapTile.revealed && tilesOverlap(tile, mapTile)) {
                    // Check if the map tile is ABOVE the monster (higher z-index)
                    const monsterZIndex = tile.zIndex || 10;
                    const mapZIndex = mapTile.zIndex || 10;
                    
                    if (mapZIndex >= monsterZIndex) {
                        isUnderFoggedTile = true;
                        break;
                    }
                }
            }
            
            // Hide monster if not enabled for player count OR if monsters are globally hidden OR if under fogged tile
            if (!monstersVisible || !isEnabledForPlayerCount || isUnderFoggedTile) {
                tileElement.setAttribute('data-monster-hidden', 'true');
            } else {
                tileElement.removeAttribute('data-monster-hidden');
            }
            
            // Update border style based on current player count
            tileElement.classList.remove('monster-border-normal', 'monster-border-elite');
            if (isEnabledForPlayerCount && monstersVisible && !isUnderFoggedTile) {
                const isElite = tile.players[currentPlayerCount].elite;
                tileElement.classList.add(isElite ? 'monster-border-elite' : 'monster-border-normal');
            }
        }
    });
}

// Toggle monster visibility (for setup vs play)
function toggleMonsterVisibility() {
    monstersVisible = !monstersVisible;
    const btn = document.getElementById('toggleMonsters');
    btn.textContent = monstersVisible ? '👹 Hide Monsters' : '👹 Show Monsters';
    updateMonsterVisibility();
}
