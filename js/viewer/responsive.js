/**
 * Responsive Menu Toggle Functionality
 * Handles showing/hiding UI elements on smaller screens
 */

// State tracking for menu visibility - Default to collapsed for max map space
const menuState = {
    headerCollapsed: true,
    sidebarCollapsed: true
};

/**
 * Initialize responsive menu controls
 */
function initializeResponsiveMenus() {
    const headerToggle = document.getElementById('toggleHeader');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    if (headerToggle) {
        headerToggle.addEventListener('click', toggleHeader);
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
    const sidebar = document.querySelector('.scenario-sidebar');
    const headerToggle = document.getElementById('toggleHeader');
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
            menuState.headerCollapsed = loaded.headerCollapsed || false;
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
