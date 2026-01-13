/**
 * Responsive Menu Toggle Functionality for Scenario Maker
 * Handles showing/hiding UI elements on smaller screens
 */

// State tracking for menu visibility - Default to collapsed for max map space
const menuState = {
    headerCollapsed: true,
    paletteCollapsed: true,
    sidebarCollapsed: true
};

/**
 * Initialize responsive menu controls
 */
function initializeResponsiveMenus() {
    const headerToggle = document.getElementById('toggleHeader');
    const paletteToggle = document.getElementById('togglePalette');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    if (headerToggle) {
        headerToggle.addEventListener('click', toggleHeader);
    }
    
    if (paletteToggle) {
        paletteToggle.addEventListener('click', togglePalette);
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
 * Toggle header visibility
 */
function toggleHeader() {
    menuState.headerCollapsed = !menuState.headerCollapsed;
    applyMenuState();
    saveMenuState();
}

/**
 * Toggle tile palette visibility
 */
function togglePalette() {
    menuState.paletteCollapsed = !menuState.paletteCollapsed;
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
    const mapHeader = document.querySelector('.map-header');
    const palette = document.querySelector('.tile-palette');
    const sidebar = document.querySelector('.sidebar');
    const headerToggle = document.getElementById('toggleHeader');
    const paletteToggle = document.getElementById('togglePalette');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    // Apply header state
    if (mapHeader && headerToggle) {
        if (menuState.headerCollapsed) {
            mapHeader.classList.add('collapsed');
            headerToggle.classList.add('collapsed');
        } else {
            mapHeader.classList.remove('collapsed');
            headerToggle.classList.remove('collapsed');
        }
    }
    
    // Apply palette state
    if (palette && paletteToggle) {
        if (menuState.paletteCollapsed) {
            palette.classList.add('collapsed');
            paletteToggle.classList.add('collapsed');
        } else {
            palette.classList.remove('collapsed');
            paletteToggle.classList.remove('collapsed');
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
        localStorage.setItem('gloomhaven_maker_menu_state', JSON.stringify(menuState));
    } catch (e) {
        console.warn('Could not save menu state:', e);
    }
}

/**
 * Load menu state from localStorage
 */
function loadMenuState() {
    try {
        const saved = localStorage.getItem('gloomhaven_maker_menu_state');
        if (saved) {
            const loaded = JSON.parse(saved);
            menuState.headerCollapsed = loaded.headerCollapsed || false;
            menuState.paletteCollapsed = loaded.paletteCollapsed || false;
            menuState.sidebarCollapsed = loaded.sidebarCollapsed || false;
        }
    } catch (e) {
        console.warn('Could not load menu state:', e);
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    const width = window.innerWidth;
    
    // On larger screens (> 1280px), auto-expand all menus
    if (width > 1280) {
        if (menuState.headerCollapsed || menuState.paletteCollapsed || menuState.sidebarCollapsed) {
            menuState.headerCollapsed = false;
            menuState.paletteCollapsed = false;
            menuState.sidebarCollapsed = false;
            applyMenuState();
            saveMenuState();
        }
    }
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
