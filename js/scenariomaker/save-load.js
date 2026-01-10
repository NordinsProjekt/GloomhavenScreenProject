/**
 * Scenario Maker - Save and Load
 * Handles saving, loading, and managing map data
 */

// Save map with custom name
function saveMap() {
    const mapName = prompt('Enter a name for this map:', 'Mission_1');
    if (!mapName) return;
    
    // Get all textarea values
    const scenarioData = {
        missionTitle: document.getElementById('missionTitle').textContent,
        objectives: document.getElementById('objectives')?.value || '',
        loot: document.getElementById('loot')?.value || '',
        intro: document.getElementById('intro')?.value || '',
        room1: document.getElementById('room1')?.value || '',
        room2: document.getElementById('room2')?.value || '',
        room3: document.getElementById('room3')?.value || '',
        rules: document.getElementById('rules')?.value || '',
        conclusion: document.getElementById('conclusion')?.value || '',
        notes: document.getElementById('notes')?.value || ''
    };
    
    const mapData = {
        name: mapName,
        tiles: placedTiles,
        nextId: nextTileId,
        scenario: scenarioData,
        savedAt: new Date().toISOString()
    };
    
    // Get existing saved maps
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    savedMaps[mapName] = mapData;
    
    localStorage.setItem('gloomhavenMaps', JSON.stringify(savedMaps));
    
    // Also save as default for backward compatibility and scenario viewer
    localStorage.setItem('gloomhavenMap', JSON.stringify(mapData));
    
    alert(`Map "${mapName}" saved successfully!`);
}

// Download map as JSON file
function downloadMap() {
    const mapName = prompt('Enter a name for the download file:', 'gloomhaven_map');
    if (!mapName) return;
    
    // Get all textarea values
    const scenarioData = {
        missionTitle: document.getElementById('missionTitle').textContent,
        objectives: document.getElementById('objectives')?.value || '',
        loot: document.getElementById('loot')?.value || '',
        intro: document.getElementById('intro')?.value || '',
        room1: document.getElementById('room1')?.value || '',
        room2: document.getElementById('room2')?.value || '',
        room3: document.getElementById('room3')?.value || '',
        rules: document.getElementById('rules')?.value || '',
        conclusion: document.getElementById('conclusion')?.value || '',
        notes: document.getElementById('notes')?.value || ''
    };
    
    const mapData = {
        name: mapName,
        tiles: placedTiles,
        nextId: nextTileId,
        scenario: scenarioData,
        savedAt: new Date().toISOString()
    };
    
    // Create JSON file and download
    const dataStr = JSON.stringify(mapData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mapName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Map "${mapName}" downloaded successfully!`);
}

// Import map from JSON file
function importMap() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

// Handle file import
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const mapData = JSON.parse(e.target.result);
            
            // Validate map data
            if (!mapData.tiles || !Array.isArray(mapData.tiles)) {
                alert('Invalid map file format.');
                return;
            }
            
            if (confirm(`Import map "${mapData.name || 'Unnamed'}"? This will replace the current map.`)) {
                clearMap();
                
                placedTiles = mapData.tiles || [];
                nextTileId = mapData.nextId || 0;
                
                // Render all tiles
                placedTiles.forEach(tile => {
                    if (tile.rotation === undefined) tile.rotation = 0;
                    if (tile.zIndex === undefined) tile.zIndex = 10;
                    if (tile.revealed === undefined) tile.revealed = true;
                    
                    renderPlacedTile(tile);
                });
                
                // Load scenario data
                if (mapData.scenario) {
                    const s = mapData.scenario;
                    document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
                    if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
                    if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
                    if (document.getElementById('intro')) document.getElementById('intro').value = s.intro || '';
                    if (document.getElementById('room1')) document.getElementById('room1').value = s.room1 || '';
                    if (document.getElementById('room2')) document.getElementById('room2').value = s.room2 || '';
                    if (document.getElementById('room3')) document.getElementById('room3').value = s.room3 || '';
                    if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
                    if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
                    if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
                }
                
                // Also save to localStorage
                const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
                savedMaps[mapData.name] = mapData;
                localStorage.setItem('gloomhavenMaps', JSON.stringify(savedMaps));
                localStorage.setItem('gloomhavenMap', JSON.stringify(mapData));
                
                updateTokenVisibility();
                
                alert(`Map "${mapData.name || 'Unnamed'}" imported successfully!`);
            }
        } catch (error) {
            console.error('Error importing map:', error);
            alert('Error importing map. Please check the file format.');
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// Load map from saved files
function loadMap() {
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    const mapNames = Object.keys(savedMaps);
    
    const modal = document.getElementById('loadMapModal');
    const mapListContainer = document.getElementById('mapListContainer');
    
    if (!modal || !mapListContainer) {
        // Fallback to old loadSavedMap behavior if modal doesn't exist
        if (confirm('Load saved map? This will replace the current map.')) {
            clearMap();
            loadSavedMap();
        }
        return;
    }
    
    if (mapNames.length === 0) {
        mapListContainer.innerHTML = '<div class="no-maps-message">No saved maps found. Create and save a map first!</div>';
    } else {
        // Sort by date, newest first
        mapNames.sort((a, b) => {
            return new Date(savedMaps[b].savedAt) - new Date(savedMaps[a].savedAt);
        });
        
        mapListContainer.innerHTML = mapNames.map(name => {
            const map = savedMaps[name];
            const date = new Date(map.savedAt).toLocaleString();
            const tileCount = (map.tiles || []).length;
            
            return `
                <div class="map-list-item" onclick="loadSelectedMap('${name.replace(/'/g, "\\'")}')">
                    <div class="map-list-item-name">${name}</div>
                    <div class="map-list-item-date">📅 ${date}</div>
                    <div class="map-list-item-tiles">🗺️ ${tileCount} tiles placed</div>
                </div>
            `;
        }).join('');
    }
    
    modal.classList.add('show');
}

// Show load map modal
function showLoadMapModal() {
    loadMap();
}

// Close load map modal
function closeLoadMapModal() {
    const modal = document.getElementById('loadMapModal');
    if (modal) {
        modal.classList.remove('show');
    }
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
    
    if (confirm(`Load map "${mapToLoad.name}"? This will replace the current map.`)) {
        clearMap();
        
        placedTiles = mapToLoad.tiles || [];
        nextTileId = mapToLoad.nextId || 0;
        
        // Render all tiles
        placedTiles.forEach(tile => {
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = false;
            
            renderPlacedTile(tile);
        });
        
        // Load scenario data
        if (mapToLoad.scenario) {
            const s = mapToLoad.scenario;
            document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
            if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
            if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
            if (document.getElementById('intro')) document.getElementById('intro').value = s.intro || '';
            if (document.getElementById('room1')) document.getElementById('room1').value = s.room1 || '';
            if (document.getElementById('room2')) document.getElementById('room2').value = s.room2 || '';
            if (document.getElementById('room3')) document.getElementById('room3').value = s.room3 || '';
            if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
            if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
            if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
        }
        
        // Also save as default for scenario viewer
        localStorage.setItem('gloomhavenMap', JSON.stringify(mapToLoad));
        
        updateTokenVisibility();
        
        alert(`Map "${mapToLoad.name}" loaded successfully!`);
    }
}

// Load default map (for backward compatibility)
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        placedTiles = mapData.tiles || [];
        nextTileId = mapData.nextId || 0;
        
        // Convert old monster format to tiles if present
        if (mapData.monsters && mapData.monsters.length > 0) {
            mapData.monsters.forEach(monster => {
                const monsterTile = {
                    id: monster.id || `tile_${nextTileId++}`,
                    tileTypeId: monster.monsterTypeId || monster.tileTypeId,
                    name: monster.name,
                    image: monster.image,
                    col: monster.col,
                    row: monster.row,
                    x: monster.col * (CELL_SIZE + 2),
                    y: monster.row * (CELL_SIZE + 2),
                    width: 1,
                    height: 1,
                    rotation: 0,
                    zIndex: monster.zIndex || 10,
                    revealed: true,
                    isMonster: true,
                    players: monster.players || {
                        2: { enabled: true, elite: false },
                        3: { enabled: true, elite: false },
                        4: { enabled: true, elite: false }
                    }
                };
                placedTiles.push(monsterTile);
            });
        }
        
        // Render all tiles (ensure all properties exist)
        placedTiles.forEach(tile => {
            // Add default values for properties that might not exist in old saves
            if (tile.rotation === undefined) tile.rotation = 0;
            if (tile.zIndex === undefined) tile.zIndex = 10;
            if (tile.revealed === undefined) tile.revealed = false;
            
            // Ensure monster tiles have player data
            if (tile.isMonster && !tile.players) {
                tile.players = {
                    2: { enabled: true, elite: false },
                    3: { enabled: true, elite: false },
                    4: { enabled: true, elite: false }
                };
            }
            
            renderPlacedTile(tile);
        });
        
        updateTokenVisibility();
    } catch (e) {
        console.error('Error loading map:', e);
    }
}
