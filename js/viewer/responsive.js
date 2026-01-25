/**
 * Responsive Menu Toggle Functionality
 * Handles showing/hiding UI elements on smaller screens
 */

// State tracking for menu visibility - Default control panel open, sidebar collapsed
const menuState = {
    controlPanelCollapsed: false,
    sidebarCollapsed: true
};

/**
 * Initialize responsive menu controls
 */
function initializeResponsiveMenus() {
    const controlPanelToggle = document.getElementById('toggleControlPanel');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    if (controlPanelToggle) {
        controlPanelToggle.addEventListener('click', toggleControlPanel);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Load saved menu state from localStorage
    loadMenuState();
    
    // Apply initial state
    applyMenuState();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

/**
 * Toggle control panel visibility
 */
function toggleControlPanel() {
    menuState.controlPanelCollapsed = !menuState.controlPanelCollapsed;
    applyMenuState();
    saveMenuState();
}

/**
 * Toggle sidebar visibility
 */
function toggleSidebar() {
    menuState.sidebarCollapsed = !menuState.sidebarCollapsed;
    applyMenuState();
    saveMenuState();
}

/**
 * Apply current menu state to DOM
 */
function applyMenuState() {
    const controlPanel = document.querySelector('.control-panel');
    const sidebar = document.querySelector('.scenario-sidebar');
    const controlPanelToggle = document.getElementById('toggleControlPanel');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    // Apply control panel state
    if (controlPanel && controlPanelToggle) {
        if (menuState.controlPanelCollapsed) {
            controlPanel.classList.add('collapsed');
            controlPanelToggle.classList.add('collapsed');
        } else {
            controlPanel.classList.remove('collapsed');
            controlPanelToggle.classList.remove('collapsed');
        }
    }
    
    // Apply sidebar state
    if (sidebar && sidebarToggle) {
        if (menuState.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            sidebarToggle.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            sidebarToggle.classList.remove('collapsed');
        }
    }
}

/**
 * Save menu state to localStorage
 */
function saveMenuState() {
    try {
        localStorage.setItem('gloomhaven_menu_state', JSON.stringify(menuState));
    } catch (e) {
        console.warn('Could not save menu state:', e);
    }
}

/**
 * Load menu state from localStorage
 */
function loadMenuState() {
    try {
        const saved = localStorage.getItem('gloomhaven_menu_state');
        if (saved) {
            const loaded = JSON.parse(saved);
            menuState.controlPanelCollapsed = loaded.controlPanelCollapsed !== undefined ? loaded.controlPanelCollapsed : false;
            menuState.sidebarCollapsed = loaded.sidebarCollapsed !== undefined ? loaded.sidebarCollapsed : true;
        }
    } catch (e) {
        console.warn('Could not load menu state:', e);
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Removed auto-expand on larger screens to allow manual control at all sizes
    // Users can now hide/show UI elements regardless of screen size
}

/**
 * Get screen orientation info for debugging
 */
function getScreenInfo() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        is720p: window.innerWidth <= 1280,
        is1080p: window.innerWidth > 1280 && window.innerWidth <= 1920
    };
}
