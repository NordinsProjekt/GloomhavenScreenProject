/**
 * Responsive Menu Toggle Functionality
 * Handles showing/hiding UI elements on smaller screens
 */

// State tracking for menu visibility - Default sidebar collapsed
const menuState = {
    sidebarCollapsed: true
};

/**
 * Initialize responsive menu controls
 */
function initializeResponsiveMenus() {
    const sidebarToggle = document.getElementById('toggleSidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Setup right-click context menu for control panel
    initializeControlPanelContextMenu();
    
    // Load saved menu state from localStorage
    loadMenuState();
    
    // Apply initial state
    applyMenuState();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

/**
 * Initialize control panel as right-click context menu
 */
function initializeControlPanelContextMenu() {
    const controlPanel = document.querySelector('.control-panel');
    
    if (!controlPanel) return;
    
    // Show control panel on right-click anywhere on the map area
    document.addEventListener('contextmenu', (e) => {
        // Exclude right-click on buttons, inputs, textareas, and sidebar
        const excludeSelectors = ['button', 'input', 'textarea', '.scenario-sidebar', '.control-panel'];
        const isExcluded = excludeSelectors.some(selector => 
            e.target.closest(selector)
        );
        
        if (!isExcluded) {
            e.preventDefault();
            
            // Position the control panel at cursor
            controlPanel.style.left = e.pageX + 'px';
            controlPanel.style.top = e.pageY + 'px';
            
            // Show the panel
            controlPanel.classList.add('show');
        }
    });
    
    // Hide control panel when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!controlPanel.contains(e.target)) {
            controlPanel.classList.remove('show');
        }
    });
    
    // Hide on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            controlPanel.classList.remove('show');
        }
    });
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
    const sidebar = document.querySelector('.scenario-sidebar');
    const sidebarToggle = document.getElementById('toggleSidebar');
    
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
