/**
 * Scenario Maker - Drag and Drop
 * Handles all drag and drop functionality
 */

// Drag and drop state
let draggedTileId = null;
let draggedMonsterId = null;
let draggedPlacedTile = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function handleDragStart(e) {
    draggedTileId = e.currentTarget.dataset.tileId;
    draggedMonsterId = null;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
}

function handleMonsterDragStart(e) {
    draggedMonsterId = e.currentTarget.dataset.monsterId;
    draggedTileId = null;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const col = parseInt(e.currentTarget.dataset.col);
    const row = parseInt(e.currentTarget.dataset.row);
    
    if (draggedTileId) {
        placeTile(draggedTileId, col, row);
        draggedTileId = null;
    } else if (draggedMonsterId) {
        placeMonster(draggedMonsterId, col, row);
        draggedMonsterId = null;
    }
}

// Place a tile on the grid
function placeTile(tileTypeId, col, row) {
    const tileType = availableTiles.find(t => t.id === tileTypeId);
    if (!tileType) return;
    
    const isMapSection = tileType.image.startsWith('mapsections/');
    
    const placedTile = {
        id: `placed_${nextTileId++}`,
        tileTypeId: tileTypeId,
        name: tileType.name,
        image: tileType.image,
        col: col,
        row: row,
        width: isMapSection ? tileType.width : 1.0,
        height: isMapSection ? tileType.height : 1.0,
        revealed: true,
        rotation: 0,
        zIndex: 10,
        customChar: tileType.customChar || ''
    };
    
    placedTiles.push(placedTile);
    renderPlacedTile(placedTile);
    updatePlacedTilesList();
}

// Place a monster on the grid
function placeMonster(monsterTypeId, col, row) {
    const monsterType = availableMonsters.find(m => m.id === monsterTypeId);
    if (!monsterType) return;
    
    const placedMonster = {
        id: `tile_${nextTileId++}`,
        tileTypeId: monsterTypeId,
        name: monsterType.name,
        image: monsterType.image,
        col: col,
        row: row,
        x: col * (CELL_SIZE + 2),
        y: row * (CELL_SIZE + 2),
        width: 1.0,
        height: 1.0,
        rotation: 0,
        zIndex: 10,
        revealed: true,
        isMonster: true,
        players: {
            2: { enabled: true, elite: false },
            3: { enabled: true, elite: false },
            4: { enabled: true, elite: false }
        }
    };
    
    placedTiles.push(placedMonster);
    renderPlacedTile(placedMonster);
    updatePlacedTilesList();
}

// Check if space is available for tile
function isSpaceAvailable(col, row, width, height) {
    if (col + width > GRID_COLS || row + height > GRID_ROWS) {
        return false;
    }
    
    for (let r = row; r < row + height; r++) {
        for (let c = col; c < col + width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell && cell.classList.contains('occupied')) {
                return false;
            }
        }
    }
    
    return true;
}

// Mark grid cells as occupied
function markCellsOccupied(col, row, width, height) {
    for (let r = row; r < row + height; r++) {
        for (let c = col; c < col + width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('occupied');
            }
        }
    }
}

// Free cells occupied by a tile
function freeTileCells(tile) {
    for (let r = tile.row; r < tile.row + tile.height; r++) {
        for (let c = tile.col; c < tile.col + tile.width; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.remove('occupied');
            }
        }
    }
}

// Handle dragging placed tiles to move them
function handleTileDragStart(e) {
    // Don't start drag if clicking on controls
    if (e.target.classList.contains('tile-btn') || e.target.closest('.tile-controls')) {
        return;
    }
    
    // Find the tile element (could be the currentTarget or its parent)
    const tileElement = e.currentTarget.closest('.placed-tile') || e.currentTarget;
    const tileId = tileElement.dataset.tileId;
    const tile = placedTiles.find(t => t.id === tileId);
    
    if (!tile) return;
    
    draggedPlacedTile = tile;
    
    // Calculate offset from tile's top-left corner
    const rect = tileElement.getBoundingClientRect();
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    
    tileElement.classList.add('dragging-tile');
    
    // Free up the cells this tile was occupying
    freeTileCells(tile);
    
    document.addEventListener('mousemove', handleTileDragMove);
    document.addEventListener('mouseup', handleTileDragEnd);
    
    e.preventDefault();
}

function handleTileDragMove(e) {
    if (!draggedPlacedTile) return;
    
    const tileElement = document.querySelector(`[data-tile-id="${draggedPlacedTile.id}"]`);
    if (!tileElement) return;
    
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    // Calculate position relative to grid
    const x = e.clientX - gridRect.left - dragOffsetX;
    const y = e.clientY - gridRect.top - dragOffsetY;
    
    tileElement.style.left = `${x}px`;
    tileElement.style.top = `${y}px`;
    
    e.preventDefault();
}

function handleTileDragEnd(e) {
    if (!draggedPlacedTile) return;
    
    const tileElement = document.querySelector(`[data-tile-id="${draggedPlacedTile.id}"]`);
    if (!tileElement) return;
    
    const gridRect = document.getElementById('placementGrid').getBoundingClientRect();
    
    // Calculate which cell the tile was dropped on
    const x = e.clientX - gridRect.left - dragOffsetX;
    const y = e.clientY - gridRect.top - dragOffsetY;
    
    const newCol = Math.max(0, Math.min(GRID_COLS - draggedPlacedTile.width, Math.round(x / (CELL_SIZE + 2))));
    const newRow = Math.max(0, Math.min(GRID_ROWS - draggedPlacedTile.height, Math.round(y / (CELL_SIZE + 2))));
    
    // Update tile position
    draggedPlacedTile.col = newCol;
    draggedPlacedTile.row = newRow;
    
    // Clear pixel offsets when snapping to grid (dragging resets to grid alignment)
    delete draggedPlacedTile.pixelOffsetX;
    delete draggedPlacedTile.pixelOffsetY;
    
    // Snap to grid and update display
    updateTilePosition(tileElement, draggedPlacedTile);
    
    tileElement.classList.remove('dragging-tile');
    
    document.removeEventListener('mousemove', handleTileDragMove);
    document.removeEventListener('mouseup', handleTileDragEnd);
    
    draggedPlacedTile = null;
    
    e.preventDefault();
}

// Move tile by pixels (fine-tuning)
function moveTilePixels(tileId, deltaX, deltaY) {
    const tile = placedTiles.find(t => t.id === tileId);
    if (!tile) return;
    
    // Store pixel offset (or initialize if not exists)
    if (!tile.pixelOffsetX) tile.pixelOffsetX = 0;
    if (!tile.pixelOffsetY) tile.pixelOffsetY = 0;
    
    tile.pixelOffsetX += deltaX;
    tile.pixelOffsetY += deltaY;
    
    const tileElement = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (tileElement) {
        updateTilePositionWithOffset(tileElement, tile);
    }
    
    updateTokenVisibility();
}
