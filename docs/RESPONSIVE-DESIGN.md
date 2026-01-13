# Responsive Design Implementation

## Overview
The Gloomhaven app has been optimized for both 1080p (1920x1080) and 720p (1280x720) resolutions. On smaller screens (≤1280px width), collapsible menu toggle buttons appear to maximize screen real estate for the main map area.

## Features

### Resolution Support
- **1080p (1920x1080)**: Full layout with all UI elements visible
- **720p (1280x720 and below)**: Collapsible menus with toggle buttons

### Toggle Buttons (720p and below)

#### Scenario Viewer (scenario.html)
- **Header Toggle**: Collapses/expands the top header with controls and title
- **Sidebar Toggle**: Collapses/expands the right sidebar with mission info

#### Scenario Maker (scenariomaker.html)
- **Header Toggle**: Collapses/expands the top header with controls
- **Palette Toggle**: Collapses/expands the left tile palette
- **Sidebar Toggle**: Collapses/expands the right mission info sidebar

### State Persistence
Menu toggle states are saved to localStorage and automatically restored on page reload, preserving user preferences.

### Auto-Expand
When the browser window is resized to > 1280px width, all menus automatically expand to show full content.

## Usage

### For Users
1. **On 720p screens**: Look for toggle buttons at screen edges (top, left, right)
2. **Click toggle buttons** to show/hide UI panels as needed
3. **Focus on the map** while hiding unnecessary panels
4. **States are saved** - your preferences persist across sessions

### Button Locations
- **Header Toggle**: Top center of screen
- **Palette Toggle** (Scenario Maker only): Left edge, vertically centered
- **Sidebar Toggle**: Right edge, vertically centered

### Visual Indicators
- Arrow icons on toggle buttons indicate expand/collapse direction
- Icons rotate when panels are collapsed
- Smooth animations for a polished experience

## Technical Implementation

### Files Modified

#### HTML Files
- `scenario.html` - Added header and sidebar toggle buttons
- `scenariomaker.html` - Added header, palette, and sidebar toggle buttons

#### CSS Files
- `scenario.css` - Added responsive styles and media queries
- `styles.css` - Added responsive styles and media queries

#### JavaScript Files
- `js/viewer/responsive.js` - New file for scenario viewer menu controls
- `js/scenariomaker/responsive.js` - New file for scenario maker menu controls
- `js/viewer/init.js` - Updated to initialize responsive menus
- `js/scenariomaker/init.js` - Updated to initialize responsive menus

### Key CSS Classes
- `.menu-toggle-btn` - Base styling for toggle buttons
- `.header-toggle`, `.palette-toggle`, `.sidebar-toggle` - Specific button positioning
- `.collapsed` - Applied to panels when hidden
- Media queries at `@media (max-width: 1280px)` for 720p mode
- Media queries at `@media (max-width: 1920px) and (min-width: 1281px)` for 1080p optimization

### Key Functions

#### Scenario Viewer (responsive.js)
- `initializeResponsiveMenus()` - Sets up event listeners and loads saved state
- `toggleHeader()` - Toggles header visibility
- `toggleSidebar()` - Toggles sidebar visibility
- `applyMenuState()` - Applies current state to DOM elements
- `saveMenuState()` - Persists state to localStorage
- `loadMenuState()` - Loads state from localStorage
- `handleResize()` - Auto-expands menus on larger screens

#### Scenario Maker (responsive.js)
Similar functions with additional:
- `togglePalette()` - Toggles tile palette visibility

## Browser Compatibility
- Modern browsers with CSS3 and localStorage support
- Chrome, Firefox, Edge, Safari
- Mobile browsers (responsive design scales appropriately)

## Testing Checklist
- [x] Toggle buttons appear at ≤1280px width
- [x] Toggle buttons hidden at >1280px width
- [x] Header collapse/expand works correctly
- [x] Sidebar collapse/expand works correctly
- [x] Palette collapse/expand works correctly (Scenario Maker)
- [x] State persists across page reloads
- [x] Auto-expand on window resize to >1280px
- [x] Smooth animations and transitions
- [x] Visual indicators (arrow rotation) work correctly

## Future Enhancements
- Touch gesture support for mobile devices
- Keyboard shortcuts for toggle actions
- Accessibility improvements (ARIA labels, keyboard navigation)
- Additional breakpoints for mobile and tablet sizes
- Customizable toggle button positions
