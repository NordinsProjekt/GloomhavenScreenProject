/**
 * Scenario Viewer - State Management
 * Manages the application state for the scenario viewer
 */

// Placed tiles on the grid
let placedTiles = [];
let originalMapData = null; // Store original map data for resetting

// Current player count for monster filtering
let currentPlayerCount = 4;
let monstersVisible = true;

// Line tool state
let lineToolActive = false;
let lineStartPoint = null;
let lineElement = null;
