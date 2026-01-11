/**
 * Scenario Viewer - Obstacle Management
 * Handles obstacle clicking and destruction
 */

// Handle obstacle click
function handleObstacleClick(tile, event) {
    // Check if tile is revealed
    if (!tile.revealed) return;
    
    // Check if it's a door
    const isDoor = tile.image.includes('door');
    if (isDoor) return;
    
    // Check if it's a custom-red-circle
    if (tile.tileTypeId === 'custom-red-circle') return;
    
    // Check if it's a monster tile
    if (tile.isMonster) return;
    
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
    
    // Auto-save game state after obstacle destruction
    autoSaveGameState();
}
