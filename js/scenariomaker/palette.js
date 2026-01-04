/**
 * Scenario Maker - Tile Palette
 * Manages the tile palette, search, and palette sections
 */

// Load tiles into palette
function loadTilePalette() {
    const mapTilesList = document.getElementById('mapTiles-list');
    const tokensList = document.getElementById('tokens-list');
    
    if (!mapTilesList || !tokensList) return;
    
    mapTilesList.innerHTML = '';
    tokensList.innerHTML = '';
    
    availableTiles.forEach(tile => {
        const tileItem = document.createElement('div');
        tileItem.className = 'tile-item';
        tileItem.draggable = true;
        tileItem.dataset.tileId = tile.id;
        tileItem.dataset.tileName = tile.name.toLowerCase();
        
        tileItem.innerHTML = `
            <div class="tile-preview" style="background-image: url('${tile.image}')"></div>
            <div class="tile-info">
                <div class="tile-name">${tile.name}</div>
                <div class="tile-size">Adjustable</div>
            </div>
        `;
        
        tileItem.addEventListener('dragstart', handleDragStart);
        tileItem.addEventListener('dragend', handleDragEnd);
        
        // Separate map tiles from tokens/overlays
        if (tile.image.startsWith('mapsections/')) {
            mapTilesList.appendChild(tileItem);
        } else {
            tokensList.appendChild(tileItem);
        }
    });
    
    // Setup search filter
    setupTileSearch();
}

// Load monsters into palette
function loadMonsterPalette() {
    const monsterList = document.getElementById('monsterList');
    if (!monsterList) return; // Skip if element doesn't exist
    
    monsterList.innerHTML = '';
    
    availableMonsters.forEach(monster => {
        const monsterItem = document.createElement('div');
        monsterItem.className = 'tile-item monster-item';
        monsterItem.draggable = true;
        monsterItem.dataset.monsterId = monster.id;
        
        monsterItem.innerHTML = `
            <div class="tile-preview" style="background-image: url('${monster.image}')"></div>
            <div class="tile-info">
                <div class="tile-name">${monster.name}</div>
                <div class="tile-size">Token</div>
            </div>
        `;
        
        monsterItem.addEventListener('dragstart', handleMonsterDragStart);
        monsterItem.addEventListener('dragend', handleDragEnd);
        
        monsterList.appendChild(monsterItem);
    });
}

// Setup tile search functionality
function setupTileSearch() {
    const searchInput = document.getElementById('tileSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allTileItems = document.querySelectorAll('.tile-item');
        
        allTileItems.forEach(item => {
            const tileName = item.dataset.tileName || '';
            if (tileName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// Toggle palette section visibility
function togglePaletteSection(sectionId) {
    const list = document.getElementById(`${sectionId}-list`);
    const button = list.previousElementSibling;
    const icon = button.querySelector('.toggle-icon');
    
    if (list.classList.contains('collapsed')) {
        list.classList.remove('collapsed');
        button.classList.add('active');
        icon.textContent = '▼';
    } else {
        list.classList.add('collapsed');
        button.classList.remove('active');
        icon.textContent = '▶';
    }
}
