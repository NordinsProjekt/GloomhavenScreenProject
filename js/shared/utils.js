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

// Get tile pixel center (where the tile visually appears, accounting for pixel offsets)
function getTilePixelCenter(tile) {
    const baseX = tile.col * (CELL_SIZE + 2) + (tile.pixelOffsetX || 0);
    const baseY = tile.row * (CELL_SIZE + 2) + (tile.pixelOffsetY || 0);
    // The tile's CSS dimensions (before rotation)
    const cssWidth = tile.width * CELL_SIZE + (tile.width - 1) * 2;
    const cssHeight = tile.height * CELL_SIZE + (tile.height - 1) * 2;
    return {
        x: baseX + cssWidth / 2,
        y: baseY + cssHeight / 2
    };
}

// Get tile bounds in grid coordinates (accounting for pixel offsets)
// NOTE: This does NOT account for rotation - use isPointInRotatedTile for rotation-aware checks
function getTileBounds(tile) {
    // Account for pixel offsets (convert to grid units, ~80px per grid cell)
    const GRID_CELL_SIZE = 80;
    const pixelOffsetX = tile.pixelOffsetX || 0;
    const pixelOffsetY = tile.pixelOffsetY || 0;
    const gridOffsetX = pixelOffsetX / GRID_CELL_SIZE;
    const gridOffsetY = pixelOffsetY / GRID_CELL_SIZE;
    
    return {
        left: tile.col + gridOffsetX,
        right: tile.col + gridOffsetX + tile.width - 1,
        top: tile.row + gridOffsetY,
        bottom: tile.row + gridOffsetY + tile.height - 1
    };
}

// Check if a point (px, py) is inside a rotated tile's visual rectangle
// The tile is rotated around its CSS center (transform-origin: center center)
function isPointInRotatedTile(px, py, tile) {
    const center = getTilePixelCenter(tile);
    const rotation = ((tile.rotation || 0) % 360 + 360) % 360;
    const radians = rotation * Math.PI / 180;
    
    // CSS dimensions of the tile (before rotation)
    const cssWidth = tile.width * CELL_SIZE + (tile.width - 1) * 2;
    const cssHeight = tile.height * CELL_SIZE + (tile.height - 1) * 2;
    
    // Transform the point into the tile's local (unrotated) coordinate system
    const dx = px - center.x;
    const dy = py - center.y;
    const localX = dx * Math.cos(-radians) - dy * Math.sin(-radians);
    const localY = dx * Math.sin(-radians) + dy * Math.cos(-radians);
    
    // Check if the point is within the unrotated rectangle bounds
    const halfW = cssWidth / 2;
    const halfH = cssHeight / 2;
    
    return localX >= -halfW && localX <= halfW && localY >= -halfH && localY <= halfH;
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

// Find the map tile that a token/monster belongs to.
// Uses rotation-aware point-in-rectangle testing to correctly handle
// map tiles with arbitrary CSS rotations (e.g., 115°, 230°, 350°).
// Falls back to simple overlap if rotation-aware check finds nothing.
function findPrimaryMapTile(token, mapSections) {
    const tokenCenter = getTilePixelCenter(token);
    
    // First: check if the token's center is inside any rotated map tile
    let bestMapTile = null;
    let bestDistance = Infinity;
    
    for (const mapTile of mapSections) {
        if (isPointInRotatedTile(tokenCenter.x, tokenCenter.y, mapTile)) {
            // Token center is inside this map tile - pick the closest center
            const mapCenter = getTilePixelCenter(mapTile);
            const distance = Math.sqrt(
                Math.pow(tokenCenter.x - mapCenter.x, 2) +
                Math.pow(tokenCenter.y - mapCenter.y, 2)
            );
            if (distance < bestDistance) {
                bestDistance = distance;
                bestMapTile = mapTile;
            }
        }
    }
    
    if (bestMapTile) return bestMapTile;
    
    // Fallback: use simple bounding-box overlap (for unrotated or edge cases)
    let maxOverlap = 0;
    for (const mapTile of mapSections) {
        const overlap = getOverlapPercentage(token, mapTile);
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestMapTile = mapTile;
        }
    }
    
    return bestMapTile;
}
