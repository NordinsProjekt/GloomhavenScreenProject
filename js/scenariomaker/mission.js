/**
 * Scenario Maker - Mission Information
 * Manages mission info sidebar
 */

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

// Update placed tiles list
function updatePlacedTilesList() {
    const placedTilesDiv = document.getElementById('placedTiles');
    if (!placedTilesDiv) return;
    
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
    if (!revealedRoomsDiv) return;
    
    const revealedTiles = placedTiles.filter(t => t.revealed);
    
    if (revealedTiles.length === 0) {
        revealedRoomsDiv.innerHTML = '<span class="room-tag">None</span>';
    } else {
        revealedRoomsDiv.innerHTML = revealedTiles
            .map(tile => `<span class="room-tag">${tile.name}</span>`)
            .join('');
    }
}
