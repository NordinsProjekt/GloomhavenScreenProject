/**
 * Scenario Viewer - Initialization
 * Entry point for the scenario viewer application
 */

// Initialize the scenario viewer
function initializeScenario() {
    createGrid();
    loadSavedMap();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('loadMap').addEventListener('click', loadMap);
    document.getElementById('clearMap').addEventListener('click', clearMap);
    document.getElementById('toggleAllFog').addEventListener('click', toggleAllFog);
    document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
    document.getElementById('toggleMonsters').addEventListener('click', toggleMonsterVisibility);
    document.getElementById('lineToolBtn').addEventListener('click', toggleLineTool);
    document.getElementById('libraryBtn').addEventListener('click', openReferenceCards);
    
    // Player count buttons
    document.querySelectorAll('.player-count-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const count = parseInt(e.target.dataset.count);
            setPlayerCount(count);
        });
    });
    
    // Map click and mouse move for line tool
    const hexMap = document.getElementById('hexMap');
    hexMap.addEventListener('click', handleMapClick);
    hexMap.addEventListener('mousemove', handleMapMouseMove);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeScenario);
