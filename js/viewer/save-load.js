/**
 * Scenario Viewer - Save and Load
 * Handles loading maps and mission info
 */

// Load map data (shared function for localStorage and file upload)
function loadMapData(mapData) {
    // Store original map data for reset functionality
    originalMapData = JSON.parse(JSON.stringify(mapData)); // Deep copy
    
    placedTiles = mapData.tiles || [];
    
    // Clear existing tiles
    document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
    
    // Render all tiles
    placedTiles.forEach(tile => {
        // Add default values for properties that might not exist in old saves
        if (tile.rotation === undefined) tile.rotation = 0;
        if (tile.zIndex === undefined) tile.zIndex = 10;
        if (tile.revealed === undefined) tile.revealed = true;
        
        renderPlacedTile(tile);
    });
    
    // Load scenario data if available
    if (mapData.scenario) {
        const s = mapData.scenario;
        document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
        if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
        if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
        if (document.getElementById('text1')) document.getElementById('text1').value = s.intro || '';
        if (document.getElementById('text2')) document.getElementById('text2').value = s.room1 || '';
        if (document.getElementById('text3')) document.getElementById('text3').value = s.room2 || '';
        if (document.getElementById('text4')) document.getElementById('text4').value = s.room3 || '';
        if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
        if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
        if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
    }
    
    updateTokenVisibility();
    updateMonsterVisibility();
}

// Load map from localStorage
function loadSavedMap() {
    const saved = localStorage.getItem('gloomhavenMap');
    if (!saved) return;
    
    try {
        const mapData = JSON.parse(saved);
        loadMapData(mapData);
    } catch (e) {
        console.error('Error loading map:', e);
    }
}

// Clear the current map
function clearMap() {
    if (!confirm('Clear the current map and reset all fog? This will reload the scenario from the beginning.')) {
        return;
    }
    
    // Reload from original map data to restore destroyed obstacles
    if (originalMapData) {
        // Create a fresh copy from original
        const resetData = JSON.parse(JSON.stringify(originalMapData));
        
        // Reset only map sections to fogged, keep obstacles visible
        resetData.tiles.forEach(tile => {
            const isMapSection = tile.image.startsWith('mapsections/');
            tile.revealed = !isMapSection; // Map sections fogged, obstacles revealed
        });
        
        placedTiles = resetData.tiles;
        
        // Clear and re-render
        document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
        placedTiles.forEach(tile => renderPlacedTile(tile));
        updateTokenVisibility();
    }
}

// Show load map modal
function loadMap() {
    showSavedMaps();
    const modal = document.getElementById('loadMapModal');
    modal.classList.add('show');
}

// Show saved maps view
function showSavedMaps() {
    document.getElementById('savedMapsView').style.display = 'block';
    document.getElementById('fileUploadView').style.display = 'none';
    
    const savedMaps = JSON.parse(localStorage.getItem('gloomhavenMaps') || '{}');
    const mapListContainer = document.getElementById('mapListContainer');
    
    if (Object.keys(savedMaps).length === 0) {
        mapListContainer.innerHTML = '<p style=\"text-align: center; color: #bdc3c7; padding: 20px;\">No saved maps found.</p>';
    } else {
        let html = '';
        for (const [key, mapData] of Object.entries(savedMaps)) {
            const date = new Date(mapData.timestamp || Date.now()).toLocaleString();
            const tileCount = mapData.tiles ? mapData.tiles.length : 0;
            html += `
                <div class=\"map-list-item\" onclick=\"loadSelectedMap('${key}')\">
                    <div class=\"map-item-name\">${mapData.name || key}</div>
                    <div class=\"map-item-details\">
                        <span>📅 ${date}</span>
                        <span>🗺️ ${tileCount} tiles</span>
                    </div>
                </div>
            `;
        }
        mapListContainer.innerHTML = html;
    }
}

// Show file upload view
function showFileUpload() {
    document.getElementById('savedMapsView').style.display = 'none';
    document.getElementById('fileUploadView').style.display = 'block';
}

let missionsDirectoryHandle = null;

async function selectMissionsFolder() {
    try {
        // Request directory picker
        const dirHandle = await window.showDirectoryPicker();
        
        // Verify it's the Missions folder or contains it
        if (dirHandle.name !== 'Missions') {
            // Check if Missions exists as a subdirectory
            let foundMissions = false;
            try {
                const missionsHandle = await dirHandle.getDirectoryHandle('Missions');
                missionsDirectoryHandle = missionsHandle;
                foundMissions = true;
            } catch {
                // Not found, use selected folder anyway
                missionsDirectoryHandle = dirHandle;
            }
            
            if (!foundMissions) {
                const useAnyway = confirm(`Selected folder is "${dirHandle.name}". Continue anyway?\n\n(Recommended: Select the "Missions" folder or its parent folder)`);
                if (!useAnyway) return;
            }
        } else {
            missionsDirectoryHandle = dirHandle;
        }
        
        await displayMissionFiles();
    } catch (error) {
        if (error.name !== 'AbortError') {
            alert('Error accessing folder: ' + error.message);
        }
    }
}

async function displayMissionFiles() {
    const fileList = document.getElementById('missionFileList');
    fileList.innerHTML = '<p style="color: #8b6f47; margin: 15px 0;">Loading files...</p>';
    
    const files = [];
    await collectJSONFiles(missionsDirectoryHandle, files, '');
    
    if (files.length === 0) {
        fileList.innerHTML = '<p style="color: #8b6f47; margin: 15px 0;">No .json files found in selected folder</p>';
        return;
    }
    
    let html = '<div class="mission-files-container">';
    for (const file of files) {
        html += `
            <div class="mission-file-item" onclick="loadMissionFile('${file.path.replace(/'/g, "\\'")}')">
                <span class="mission-file-icon">📄</span>
                <span class="mission-file-name">${file.path}</span>
            </div>
        `;
    }
    html += '</div>';
    
    fileList.innerHTML = html;
}

async function collectJSONFiles(dirHandle, files, currentPath) {
    for await (const entry of dirHandle.values()) {
        const entryPath = currentPath ? `${currentPath}/${entry.name}` : entry.name;
        
        if (entry.kind === 'file' && entry.name.endsWith('.json')) {
            files.push({ handle: entry, path: entryPath });
        } else if (entry.kind === 'directory') {
            await collectJSONFiles(entry, files, entryPath);
        }
    }
}

window.missionFileHandles = {};

async function loadMissionFile(path) {
    try {
        // Find the file handle
        const files = [];
        await collectJSONFiles(missionsDirectoryHandle, files, '');
        const fileInfo = files.find(f => f.path === path);
        
        if (!fileInfo) {
            alert('File not found: ' + path);
            return;
        }
        
        const file = await fileInfo.handle.getFile();
        const text = await file.text();
        const mapData = JSON.parse(text);
        
        loadMapData(mapData);
        closeLoadMapModal();
    } catch (error) {
        alert('Error loading file: ' + error.message);
    }
}

// Close load map modal
function closeLoadMapModal() {
    const modal = document.getElementById('loadMapModal');
    modal.classList.remove('show');
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
    
    placedTiles = mapToLoad.tiles || [];
    
    // Clear existing tiles
    document.querySelectorAll('.placed-tile').forEach(tile => tile.remove());
    
    // Render all tiles
    placedTiles.forEach(tile => {
        if (tile.rotation === undefined) tile.rotation = 0;
        if (tile.zIndex === undefined) tile.zIndex = 10;
        if (tile.revealed === undefined) tile.revealed = true;
        
        renderPlacedTile(tile);
    });
    
    // Load scenario data
    if (mapToLoad.scenario) {
        const s = mapToLoad.scenario;
        document.getElementById('missionTitle').textContent = s.missionTitle || 'Mission';
        if (document.getElementById('objectives')) document.getElementById('objectives').value = s.objectives || '';
        if (document.getElementById('loot')) document.getElementById('loot').value = s.loot || '';
        if (document.getElementById('text1')) document.getElementById('text1').value = s.intro || '';
        if (document.getElementById('text2')) document.getElementById('text2').value = s.room1 || '';
        if (document.getElementById('text3')) document.getElementById('text3').value = s.room2 || '';
        if (document.getElementById('text4')) document.getElementById('text4').value = s.room3 || '';
        if (document.getElementById('rules')) document.getElementById('rules').value = s.rules || '';
        if (document.getElementById('conclusion')) document.getElementById('conclusion').value = s.conclusion || '';
        if (document.getElementById('notes')) document.getElementById('notes').value = s.notes || '';
    }
    
    updateTokenVisibility();
    updateMonsterVisibility();
}

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
