# JavaScript Module Structure

This directory contains the refactored JavaScript code organized into logical modules for better maintainability and bug fixing.

## Directory Structure

```
js/
├── shared/              # Shared code used by both maker and viewer
│   ├── constants.js     # Grid dimensions and other constants
│   ├── tile-data.js     # Tile and monster definitions
│   └── utils.js         # Shared utility functions
│
├── scenariomaker/       # Scenario Maker specific modules
│   ├── state.js         # State management (placed tiles, selected tile)
│   ├── grid.js          # Grid creation and rendering
│   ├── tiles.js         # Tile rendering and positioning
│   ├── controls.js      # Control panel functionality
│   ├── palette.js       # Tile palette and search
│   ├── dragdrop.js      # Drag and drop handlers
│   ├── save-load.js     # Save/load functionality
│   ├── mission.js       # Mission info management
│   ├── fog.js           # Fog of war controls
│   └── init.js          # Initialization and event setup
│
└── viewer/              # Scenario Viewer specific modules
    ├── state.js         # State management
    ├── grid.js          # Grid creation
    ├── tiles.js         # Tile rendering
    ├── fog.js           # Fog of war system
    ├── monsters.js      # Monster management
    ├── tools.js         # Line tool and measurements
    ├── obstacles.js     # Obstacle destruction
    ├── save-load.js     # Loading functionality
    └── init.js          # Initialization
```

## Module Responsibilities

### Shared Modules

#### `shared/constants.js`
- Grid dimensions (GRID_COLS, GRID_ROWS, CELL_SIZE)
- Other application-wide constants

#### `shared/tile-data.js`
- `availableTiles` - All map tiles and tokens
- `availableMonsters` - All monster definitions

#### `shared/utils.js`
- Utility functions used across modules
- Reference card modal functions

### Scenario Maker Modules

#### `scenariomaker/state.js`
- `placedTiles` - Array of placed tiles
- `selectedTileId` - Currently selected tile
- `nextTileId` - Counter for unique IDs

#### `scenariomaker/grid.js`
- `createGrid()` - Creates the 25x25 grid
- `toggleGrid()` - Shows/hides grid lines

#### `scenariomaker/tiles.js`
- `renderPlacedTile(tile)` - Renders a tile on the grid
- `updateTilePosition(tileDiv, tile)` - Updates tile position
- `updateTilePositionWithOffset(tileDiv, tile)` - Position with pixel offset
- `removeTile(tileId)` - Removes a tile

#### `scenariomaker/controls.js`
- `selectTile(tileId)` - Selects a tile
- `deselectTile()` - Deselects current tile
- `showControlPanel(tile)` - Shows control panel
- `hideControlPanel()` - Hides control panel
- `setTileRotation(tileId, angle)` - Rotates tile
- `adjustTileZIndex(tileId, direction)` - Adjusts z-index
- `updateTilePixelOffset(tileId, axis, delta)` - Adjusts pixel position
- `updateTileCustomChar(tileId, char)` - Updates custom character

#### `scenariomaker/palette.js`
- `loadTilePalette()` - Loads tiles into palette
- `loadMonsterPalette()` - Loads monsters into palette
- `setupTileSearch()` - Sets up search functionality
- `togglePaletteSection(sectionId)` - Toggles palette sections

#### `scenariomaker/dragdrop.js`
- `handleDragStart(e)` - Starts drag from palette
- `handleMonsterDragStart(e)` - Starts monster drag
- `handleDragOver(e)` - Drag over grid cell
- `handleDrop(e)` - Drop tile on grid
- `handleTileDragStart(e, tileId)` - Drag placed tile

#### `scenariomaker/save-load.js`
- `saveMapAs()` - Save map to JSON file
- `saveToLocalStorage()` - Auto-save to localStorage
- `loadSavedMap()` - Load from localStorage
- `loadMap()` - Load from file
- `loadMapData(mapData)` - Load map data
- `clearMap()` - Clear all tiles

#### `scenariomaker/mission.js`
- `updateMissionTitle()` - Updates mission title
- `loadMissionInfo(missionData)` - Loads mission data
- `toggleSection(sectionId)` - Toggles info sections

#### `scenariomaker/fog.js`
- `toggleTileReveal(tileId)` - Toggle fog on tile
- `resetFog()` - Reset all fog
- `revealAll()` - Reveal all tiles
- `resizeAllTiles()` - Resize all tiles

### Scenario Viewer Modules

#### `viewer/state.js`
- `placedTiles` - Array of tiles
- `originalMapData` - Original map for reset
- `currentPlayerCount` - Current player count
- `monstersVisible` - Monster visibility flag
- `lineToolActive` - Line tool state

#### `viewer/grid.js`
- `createGrid()` - Creates viewing grid
- `toggleGrid()` - Shows/hides grid

#### `viewer/tiles.js`
- `renderPlacedTile(tile)` - Renders tile (read-only)
- `updateTilePosition(tileDiv, tile)` - Updates position
- `updateTilePositionWithOffset(tileDiv, tile)` - Position with offset

#### `viewer/fog.js`
- `toggleTileReveal(tileId)` - Toggle fog on tile
- `toggleAllFog()` - Toggle all fog
- `updateTokenVisibility()` - Update token visibility based on fog

#### `viewer/monsters.js`
- `setPlayerCount(count)` - Sets player count
- `toggleMonsterVisibility()` - Shows/hides all monsters

#### `viewer/tools.js`
- `toggleLineTool()` - Activates line tool
- `handleMapClick(event)` - Handles map clicks for measurement
- `handleMapMouseMove(event)` - Updates line during measurement

#### `viewer/obstacles.js`
- `handleObstacleClick(tile, event)` - Handles obstacle clicks
- `showDestroyOption(tile, event)` - Shows destroy menu
- `destroyObstacle(tileId)` - Destroys obstacle
- `closeDestroyMenu()` - Closes destroy menu

#### `viewer/save-load.js`
- `loadMap()` - Load map from file
- `loadMapData(mapData)` - Load map data
- `loadSavedMap()` - Load from localStorage
- `clearMap()` - Clear all tiles

## How to Use

### In HTML Files

The modules are loaded in a specific order to ensure dependencies are available:

**scenariomaker.html:**
```html
<!-- Shared modules -->
<script src="js/shared/constants.js"></script>
<script src="js/shared/tile-data.js"></script>
<script src="js/shared/utils.js"></script>

<!-- Scenario Maker modules -->
<script src="js/scenariomaker/state.js"></script>
<script src="js/scenariomaker/grid.js"></script>
<script src="js/scenariomaker/tiles.js"></script>
<script src="js/scenariomaker/controls.js"></script>
<script src="js/scenariomaker/palette.js"></script>
<script src="js/scenariomaker/dragdrop.js"></script>
<script src="js/scenariomaker/fog.js"></script>
<script src="js/scenariomaker/mission.js"></script>
<script src="js/scenariomaker/save-load.js"></script>
<script src="js/scenariomaker/init.js"></script>
```

**scenario.html:**
```html
<!-- Shared modules -->
<script src="js/shared/constants.js"></script>
<script src="js/shared/tile-data.js"></script>
<script src="js/shared/utils.js"></script>

<!-- Viewer modules -->
<script src="js/viewer/state.js"></script>
<script src="js/viewer/grid.js"></script>
<script src="js/viewer/tiles.js"></script>
<script src="js/viewer/fog.js"></script>
<script src="js/viewer/monsters.js"></script>
<script src="js/viewer/tools.js"></script>
<script src="js/viewer/obstacles.js"></script>
<script src="js/viewer/save-load.js"></script>
<script src="js/viewer/init.js"></script>
```

## Benefits of This Structure

1. **Easier Bug Fixing** - Each module has a specific responsibility, making it easier to locate and fix bugs
2. **Better Organization** - Related functions are grouped together
3. **Reduced Merge Conflicts** - Team members can work on different modules
4. **Easier Testing** - Individual modules can be tested in isolation
5. **Better Maintainability** - Smaller files are easier to understand and maintain
6. **Reusability** - Shared code is in one place
7. **Clear Dependencies** - Module loading order shows dependencies

## Migration Notes

The original `script.js` (1787 lines) and `scenario.js` (860 lines) have been split into:
- 3 shared modules
- 10 scenario maker modules  
- 9 scenario viewer modules

Each module focuses on a single responsibility following the Single Responsibility Principle.

## Adding New Features

When adding new features:

1. Identify which module the feature belongs to
2. If it doesn't fit existing modules, create a new module
3. Update the appropriate HTML file to include the new module
4. Update this README with the new module information

## Debugging Tips

1. **Grid Issues** → Check `grid.js`
2. **Tile Placement** → Check `tiles.js`
3. **Save/Load Problems** → Check `save-load.js`
4. **Fog of War** → Check `fog.js`
5. **Monster Issues** → Check `monsters.js` (viewer) or `palette.js` (maker)
6. **Drag and Drop** → Check `dragdrop.js`
7. **Control Panel** → Check `controls.js`
