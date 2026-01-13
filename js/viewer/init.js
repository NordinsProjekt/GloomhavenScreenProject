/**
 * Scenario Viewer - Initialization
 * Entry point for the scenario viewer application
 */

// Initialize the scenario viewer
function initializeScenario() {
    createGrid();
    
    // Try to load auto-save first, fallback to regular saved map
    const autoSaveLoaded = loadAutoSave();
    if (!autoSaveLoaded) {
        loadSavedMap();
    }
    
    setupEventListeners();
    
    // Initialize responsive menu controls
    if (typeof initializeResponsiveMenus === 'function') {
        initializeResponsiveMenus();
    }
}

// Debounce function for scroll events
let scrollSaveTimeout = null;
function debounceScrollSave() {
    if (scrollSaveTimeout) {
        clearTimeout(scrollSaveTimeout);
    }
    scrollSaveTimeout = setTimeout(() => {
        autoSaveGameState();
    }, 500); // Save 500ms after user stops scrolling
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
    
    // LLM Integration buttons
    if (typeof initializeLLMUI === 'function') {
        initializeLLMUI();
    }
    
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
    
    // Scroll event listener for auto-save (debounced)
    hexMap.addEventListener('scroll', debounceScrollSave);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeScenario);
