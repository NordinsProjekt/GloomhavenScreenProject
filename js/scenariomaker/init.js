/**
 * Scenario Maker - Initialization
 * Entry point for the scenario maker application
 */

// Initialize the map when page loads
function initializeMap() {
    createGrid();
    loadTilePalette();
    loadMonsterPalette();
    loadSavedMap();
}

// Setup all event listeners
window.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    setupTileSearch();
    
    // Setup button event listeners
    document.getElementById('saveMap').addEventListener('click', saveMap);
    document.getElementById('loadMap').addEventListener('click', loadMap);
    document.getElementById('resetFog').addEventListener('click', resetFog);
    document.getElementById('revealAll').addEventListener('click', revealAll);
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
    document.getElementById('downloadMap').addEventListener('click', downloadMap);
    document.getElementById('importMap').addEventListener('click', importMap);
    document.getElementById('fileInput').addEventListener('change', handleFileImport);
    document.getElementById('resizeAll').addEventListener('click', resizeAllTiles);
    document.getElementById('clearMap').addEventListener('click', clearMap);
    document.getElementById('libraryBtn').addEventListener('click', openReferenceCards);
});
