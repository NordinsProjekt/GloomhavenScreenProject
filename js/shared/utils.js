/**
 * Shared Utility Functions
 * Functions used by both scenario maker and viewer
 */

// Player Reference Cards Functions
function openReferenceCards() {
    const modal = document.getElementById('referenceModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeReferenceCards() {
    const modal = document.getElementById('referenceModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Helper function to check if two tiles overlap
function tilesOverlap(tile1, tile2) {
    const bounds1 = getTileBounds(tile1);
    const bounds2 = getTileBounds(tile2);
    
    return !(bounds1.right < bounds2.left || 
             bounds1.left > bounds2.right || 
             bounds1.bottom < bounds2.top || 
             bounds1.top > bounds2.bottom);
}

// Get tile bounds in grid coordinates (accounting for pixel offsets)
function getTileBounds(tile) {
    const isRotated90 = tile.rotation === 90 || tile.rotation === 270;
    const displayWidth = isRotated90 ? tile.height : tile.width;
    const displayHeight = isRotated90 ? tile.width : tile.height;
    
    // Account for pixel offsets (convert to grid units, ~80px per grid cell)
    const GRID_CELL_SIZE = 80;
    const pixelOffsetX = tile.pixelOffsetX || 0;
    const pixelOffsetY = tile.pixelOffsetY || 0;
    const gridOffsetX = pixelOffsetX / GRID_CELL_SIZE;
    const gridOffsetY = pixelOffsetY / GRID_CELL_SIZE;
    
    return {
        left: tile.col + gridOffsetX,
        right: tile.col + gridOffsetX + displayWidth - 1,
        top: tile.row + gridOffsetY,
        bottom: tile.row + gridOffsetY + displayHeight - 1
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
    
    // Calculate overlap area (add 1 because bounds are inclusive)
    const overlapWidth = overlapRight - overlapLeft + 1;
    const overlapHeight = overlapBottom - overlapTop + 1;
    const overlapArea = overlapWidth * overlapHeight;
    
    // Calculate tile1's area
    const tile1Width = bounds1.right - bounds1.left + 1;
    const tile1Height = bounds1.bottom - bounds1.top + 1;
    const tile1Area = tile1Width * tile1Height;
    
    // Return percentage (0 to 1)
    return overlapArea / tile1Area;
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
