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

// Get tile bounds in grid coordinates
function getTileBounds(tile) {
    const isRotated90 = tile.rotation === 90 || tile.rotation === 270;
    const displayWidth = isRotated90 ? tile.height : tile.width;
    const displayHeight = isRotated90 ? tile.width : tile.height;
    
    return {
        left: tile.col,
        right: tile.col + displayWidth - 1,
        top: tile.row,
        bottom: tile.row + displayHeight - 1
    };
}
