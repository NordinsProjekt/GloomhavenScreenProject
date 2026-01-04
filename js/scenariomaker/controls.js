/**
 * Scenario Maker - Control Panel
 * Manages the tile control panel and tile selection
 */

function selectTile(tileId) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Update selected tile
    selectedTileId = tileId;
    
    // Update visual selection
    document.querySelectorAll('.placed-tile').forEach(t => {
        t.classList.remove('selected');
    });
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.classList.add('selected');
    }
    
    // Show control panel
    showControlPanel(tile);
    
    // Toggle reveal for map sections
    const isMapSection = tile.image.startsWith('mapsections/');
    if (isMapSection) {
        toggleTileReveal(tile.id);
    }
}

// Deselect tile
function deselectTile() {
    selectedTileId = null;
    document.querySelectorAll('.placed-tile').forEach(t => {
        t.classList.remove('selected');
    });
    hideControlPanel();
}

// Show control panel
function showControlPanel(tile) {
    let panel = document.getElementById('tileControlPanel');
    
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'tileControlPanel';
        panel.className = 'tile-control-panel';
        document.body.appendChild(panel);
    }
    
    const isMapSection = tile.image.startsWith('mapsections/');
    
    const rotationButtons = `
        <div class="control-buttons">
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 0)" title="0°">0°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 30)" title="30°">30°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 45)" title="45°">45°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 90)" title="90°">90°</button>
        </div>
        <div class="control-buttons">
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 180)" title="180°">180°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 270)" title="270°">270°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 315)" title="315°">315°</button>
            <button class="control-btn" onclick="setTileRotation('${tile.id}', 330)" title="330°">330°</button>
        </div>
        <div class="control-buttons rotation-fine">
            <button class="control-btn-icon" onclick="rotateTile('${tile.id}', -5)" title="Rotate -5°">↶</button>
            <span class="rotation-display">${tile.rotation}°</span>
            <button class="control-btn-icon" onclick="rotateTile('${tile.id}', 5)" title="Rotate +5°">↷</button>
        </div>
    `;
    
    const movementButtons = `
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 0, -10)" title="Up">⬆</button>
        </div>
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', -10, 0)" title="Left">⬅</button>
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 10, 0)" title="Right">➡</button>
        </div>
        <div class="control-movement">
            <button class="control-btn-icon" onclick="moveTilePixels('${tile.id}', 0, 10)" title="Down">⬇</button>
        </div>
    `;
    
    const isCustomCharTile = tile.tileTypeId === 'custom-red-circle';
    
    const customCharSection = isCustomCharTile ? `
        <div class="control-section">
            <label>Custom Character</label>
            <div class="control-buttons">
                <input type="text" 
                       id="customCharInput" 
                       maxlength="1" 
                       value="${tile.customChar || ''}" 
                       placeholder="1 char" 
                       onchange="updateTileCustomChar('${tile.id}', this.value)"
                       class="custom-char-input" />
            </div>
            <div class="control-hint">Enter a single character to display on the tile</div>
        </div>
    ` : '';
    
    const monsterSection = tile.isMonster ? `
        <div class="control-section">
            <label>Player Count Settings</label>
            ${[2, 3, 4].map(count => `
                <div class="monster-player-row">
                    <label>
                        <input type="checkbox" 
                            ${tile.players[count].enabled ? 'checked' : ''}
                            onchange="toggleMonsterPlayer('${tile.id}', ${count})" />
                        ${count}P
                    </label>
                    <select onchange="toggleMonsterElite('${tile.id}', ${count}, this.value)">
                        <option value="normal" ${!tile.players[count].elite ? 'selected' : ''}>Normal</option>
                        <option value="elite" ${tile.players[count].elite ? 'selected' : ''}>Elite</option>
                    </select>
                </div>
            `).join('')}
        </div>
    ` : '';
    
    const fogSection = isMapSection ? `
        <div class="control-section">
            <label>Fog of War</label>
            <div class="control-buttons">
                <button class="control-btn" onclick="toggleTileRevealFromPanel('${tile.id}')" title="Toggle Fog">
                    ${tile.revealed ? '🌞 Hide' : '🌚 Reveal'}
                </button>
            </div>
        </div>
    ` : '';
    
    panel.innerHTML = `
        <div class="control-panel-header">
            <h4>${tile.name}</h4>
            <button class="control-panel-close" onclick="deselectTile()">✕</button>
        </div>
        <div class="control-panel-content">
            <div class="control-section">
                <label>Rotation</label>
                ${rotationButtons}
            </div>
            
            <div class="control-section">
                <label>Size</label>
                <div class="size-control-group">
                    <div class="size-slider-row">
                        <label class="size-slider-label">Width: <span id="width-value-${tile.id}">${isMapSection ? tile.width : tile.width.toFixed(1)}</span></label>
                        <input type="range" 
                            min="${isMapSection ? '1' : '1.0'}" 
                            max="${isMapSection ? '15' : '5.0'}" 
                            step="${isMapSection ? '1' : '0.2'}" 
                            value="${tile.width}" 
                            class="size-slider"
                            oninput="setTileWidth('${tile.id}', ${isMapSection ? 'parseInt(this.value)' : 'parseFloat(this.value)'})" />
                    </div>
                    <div class="size-slider-row">
                        <label class="size-slider-label">Height: <span id="height-value-${tile.id}">${isMapSection ? tile.height : tile.height.toFixed(1)}</span></label>
                        <input type="range" 
                            min="${isMapSection ? '1' : '1.0'}" 
                            max="${isMapSection ? '15' : '5.0'}" 
                            step="${isMapSection ? '1' : '0.2'}" 
                            value="${tile.height}" 
                            class="size-slider"
                            oninput="setTileHeight('${tile.id}', ${isMapSection ? 'parseInt(this.value)' : 'parseFloat(this.value)'})" />
                    </div>
                    <div class="control-buttons">
                        <button class="control-btn" onclick="resizeTile('${tile.id}', ${isMapSection ? '-1' : '-0.2'})" title="Shrink Both">− Both</button>
                        <button class="control-btn" onclick="resizeTile('${tile.id}', ${isMapSection ? '1' : '0.2'})" title="Grow Both">+ Both</button>
                    </div>
                </div>
            </div>
            
            <div class="control-section">
                <label>Z-Index (Layer)</label>
                <div class="control-buttons">
                    <button class="control-btn" onclick="changeZIndex('${tile.id}', 1)" title="Bring Forward">▲ Forward</button>
                    <button class="control-btn" onclick="changeZIndex('${tile.id}', -1)" title="Send Backward">▼ Backward</button>
                </div>
                <div class="z-index-display">Current: ${tile.zIndex}</div>
            </div>
            
            <div class="control-section">
                <label>Fine Position (10px)</label>
                ${movementButtons}
            </div>
            
            ${customCharSection}
            
            ${monsterSection}
            
            ${fogSection}
            
            <div class="control-section">
                <button class="control-btn-danger" onclick="removeTileFromPanel('${tile.id}')" title="Remove Tile">✕ Remove Tile</button>
            </div>
        </div>
    `;
    
    panel.style.display = 'block';
}

// Hide control panel
function hideControlPanel() {
    const panel = document.getElementById('tileControlPanel');
    if (panel) {
        panel.style.display = 'none';
    }
}

// Set tile to specific rotation
function setTileRotation(tileId, angle) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.rotation = angle % 360;
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel to show new rotation
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Rotate a tile
function rotateTile(tileId, degrees) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.rotation = (tile.rotation + degrees + 360) % 360;
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel if this tile is selected
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Change z-index of a tile
function changeZIndex(tileId, delta) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    tile.zIndex = Math.max(1, Math.min(100, (tile.zIndex || 10) + delta));
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        tileElement.style.zIndex = tile.zIndex;
        updateTileLabel(tileElement, tile);
    }
    
    // Update control panel if this tile is selected
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Resize a tile
function resizeTile(tileId, delta) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    const isMapSection = tile.image.startsWith('mapsections/');
    const minSize = isMapSection ? 1 : 1.0;
    const maxSize = isMapSection ? 15 : 5.0;
    
    let newWidth = tile.width + delta;
    let newHeight = tile.height + delta;
    
    // Round to nearest 0.2 for non-map tiles
    if (!isMapSection) {
        newWidth = Math.round(newWidth * 5) / 5;
        newHeight = Math.round(newHeight * 5) / 5;
    }
    
    tile.width = Math.max(minSize, Math.min(maxSize, newWidth));
    tile.height = Math.max(minSize, Math.min(maxSize, newHeight));
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
    }
    
    // Update slider displays
    updateSizeDisplays(tileId, tile);
}

// Set tile width specifically
function setTileWidth(tileId, width) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    const isMapSection = tile.image.startsWith('mapsections/');
    const minSize = isMapSection ? 1 : 1.0;
    const maxSize = isMapSection ? 15 : 5.0;
    
    tile.width = Math.max(minSize, Math.min(maxSize, width));
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
    }
    
    updateSizeDisplays(tileId, tile);
}

// Set tile height specifically
function setTileHeight(tileId, height) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    const isMapSection = tile.image.startsWith('mapsections/');
    const minSize = isMapSection ? 1 : 1.0;
    const maxSize = isMapSection ? 15 : 5.0;
    
    tile.height = Math.max(minSize, Math.min(maxSize, height));
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePosition(tileElement, tile);
    }
    
    updateSizeDisplays(tileId, tile);
}

// Update size displays in control panel
function updateSizeDisplays(tileId, tile) {
    const widthDisplay = document.getElementById(`width-value-${tileId}`);
    const heightDisplay = document.getElementById(`height-value-${tileId}`);
    
    const isMapSection = tile.image.startsWith('mapsections/');
    
    if (widthDisplay) widthDisplay.textContent = isMapSection ? tile.width : tile.width.toFixed(1);
    if (heightDisplay) heightDisplay.textContent = isMapSection ? tile.height : tile.height.toFixed(1);
}

// Toggle reveal from panel (doesn't deselect)
function toggleTileRevealFromPanel(tileId) {
    toggleTileReveal(tileId);
    const tile = placedTiles.find(t => t.id === tileId);
    if (tile && selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Remove tile from panel
function removeTileFromPanel(tileId) {
    removeTile(tileId);
    deselectTile();
}

// Update custom character on tile
function updateTileCustomChar(tileId, char) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Limit to 1 character
    tile.customChar = char.substring(0, 1).toUpperCase();
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        // Update or create custom character display
        let charDisplay = tileElement.querySelector('.custom-char-display');
        if (charDisplay) {
            charDisplay.textContent = tile.customChar;
            charDisplay.style.display = tile.customChar ? 'flex' : 'none';
        }
    }
    
    // Refresh control panel to show updated character
    if (selectedTileId === tileId) {
        showControlPanel(tile);
    }
}

// Toggle monster player count
function toggleMonsterPlayer(tileId, playerCount) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile || !tile.isMonster) return;
    
    tile.players[playerCount].enabled = !tile.players[playerCount].enabled;
    
    // Re-render to update visual state
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        refreshMonsterIndicators(tileElement, tile);
        showControlPanel(tile); // Refresh control panel
    }
}

// Toggle monster elite status
function toggleMonsterElite(tileId, playerCount, value) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile || !tile.isMonster) return;
    
    tile.players[playerCount].elite = (value === 'elite');
    
    // Re-render to update visual state
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        refreshMonsterIndicators(tileElement, tile);
        showControlPanel(tile); // Refresh control panel
    }
}

// Refresh monster indicators on a tile element
function refreshMonsterIndicators(tileElement, tile) {
    // Remove old indicators
    const oldIndicators = tileElement.querySelector('.monster-indicators');
    if (oldIndicators) {
        oldIndicators.remove();
    }
    
    // Add new indicators
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
        
        tileElement.appendChild(monsterIndicators);
    }
}

// Resize all tiles to a uniform size
function resizeAllTiles() {
    const size = prompt('Enter uniform size for all tiles (1-15):', '3');
    if (!size) return;
    
    const newSize = Math.max(1, Math.min(15, parseInt(size)));
    if (isNaN(newSize)) return;
    
    placedTiles.forEach(tile => {
        tile.width = newSize;
        tile.height = newSize;
        
        const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
        if (tileElement) {
            if (tile.pixelOffsetX !== undefined || tile.pixelOffsetY !== undefined) {
                updateTilePositionWithOffset(tileElement, tile);
            } else {
                updateTilePosition(tileElement, tile);
            }
        }
    });
    
    alert(`All tiles resized to ${newSize}x${newSize}`);
}
