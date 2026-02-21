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
    // Setup right-click context menu
    initializeContextMenu();
    
    // Setup sidebar toggle button
    initializeSidebarToggle();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

/**
 * Initialize sidebar toggle button
 */
function initializeSidebarToggle() {
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.querySelector('.scenario-sidebar');
    
    if (!toggleBtn || !sidebar) return;
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        toggleBtn.classList.toggle('sidebar-hidden');
    });
}

/**
 * Initialize context menu (right-click menu)
 */
function initializeContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    
    if (!contextMenu) return;
    
    // Show context menu on right-click
    document.addEventListener('contextmenu', (e) => {
        // Exclude right-click on buttons, inputs, textareas, sidebar, and modals
        const excludeSelectors = ['button', 'input', 'textarea', '.scenario-sidebar', '.modal', '.context-menu'];
        const isExcluded = excludeSelectors.some(selector => 
            e.target.closest(selector)
        );
        
        if (!isExcluded) {
            e.preventDefault();
            
            // Show the menu first so we can get its dimensions
            contextMenu.classList.add('show');
            
            // Position the context menu at cursor
            let menuX = e.pageX;
            let menuY = e.pageY;
            
            // Adjust if menu goes off screen
            const menuRect = contextMenu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            if (menuX + menuRect.width > viewportWidth) {
                menuX = viewportWidth - menuRect.width - 10;
            }
            if (menuY + menuRect.height > viewportHeight) {
                menuY = viewportHeight - menuRect.height - 10;
            }
            
            contextMenu.style.left = menuX + 'px';
            contextMenu.style.top = menuY + 'px';
        }
    });
    
    // Handle context menu item clicks
    const menuItems = contextMenu.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const action = item.dataset.action;
            handleContextMenuAction(action);
            hideContextMenu();
        });
    });
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            hideContextMenu();
        }
    });
    
    // Hide on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideContextMenu();
        }
    });
}

/**
 * Hide context menu
 */
function hideContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
}

/**
 * Handle context menu action
 */
function handleContextMenuAction(action) {
    switch(action) {
        case 'toggleAllFog':
            toggleAllFog();
            break;
        case 'toggleGrid':
            toggleGrid();
            break;
        case 'toggleMonsters':
            toggleMonsterVisibility();
            break;
        case 'lineTool':
            toggleLineTool();
            break;
        case 'loadMap':
            loadMap();
            break;
        case 'clearMap':
            clearMap();
            break;
        case 'library':
            openReferenceCards();
            break;
        case 'llmChat':
            if (typeof openLLMChat === 'function') {
                openLLMChat();
            }
            break;
        case 'llmSettings':
            if (typeof openLLMSettings === 'function') {
                openLLMSettings();
            }
            break;
        default:
            console.warn('Unknown context menu action:', action);
    }
}

/**
 * Apply current menu state to DOM (sidebar always visible)
 */
function applyMenuState() {
    // Sidebar is always visible - no state to apply
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
