# Auto-Save Feature

## Overview
The Gloomhaven Scenario Viewer now automatically saves the game state to localStorage to prevent data loss when the browser window is closed. This is critical since users place physical 3D printed models on the digital gameboard.

## Auto-Save Triggers
The game state is automatically saved whenever:

1. **Fog of War Changes**
   - When a single tile is revealed/hidden (clicking on map sections)
   - When all fog is toggled at once (Toggle All Fog button)

2. **Obstacle Destruction**
   - When any obstacle is destroyed during gameplay

3. **Player Count Changes**
   - When the number of players is adjusted (2P, 3P, 4P buttons)

4. **Map Reset**
   - When the map is cleared and reset to beginning state

5. **Map Loading**
   - After a new map/scenario is loaded (creates initial backup)

## What Gets Saved
The auto-save includes:
- All placed tiles and their positions
- Fog of war state for each tile
- Destroyed obstacles (removed from state)
- Player count selection
- All scenario information (objectives, loot, text sections, rules, notes)
- Timestamp of the save

## Visual Feedback
- A green **"💾 Auto-saved at [time]"** indicator appears in the header
- The indicator flashes briefly when a save occurs
- If save fails, shows **"⚠️ Auto-save failed"** in red

## Auto-Restore on Page Load
- When the page loads, it automatically checks for an auto-save
- If found, the game state is restored exactly as it was
- If no auto-save exists, falls back to regular saved maps
- No user action required - it just works!

## Storage Location
- Stored in browser's localStorage with key: `gloomhaven_autosave`
- Persists across browser sessions
- Survives browser crashes and unexpected closures
- Does not expire unless localStorage is manually cleared

## Technical Implementation

### Modified Files:
1. **js/viewer/save-load.js**
   - Added `autoSaveGameState()` function
   - Added `loadAutoSave()` function
   - Auto-save triggers after map loading

2. **js/viewer/fog.js**
   - Auto-save after `toggleTileReveal()`
   - Auto-save after `toggleAllFog()`

3. **js/viewer/obstacles.js**
   - Auto-save after `destroyObstacle()`

4. **js/viewer/monsters.js**
   - Auto-save after `setPlayerCount()`

5. **js/viewer/init.js**
   - Modified initialization to check for auto-save first

6. **scenario.html**
   - Added auto-save indicator to UI

7. **scenario.css**
   - Added styling for auto-save indicator with flash animation

## Usage
No special user action required! The feature works automatically in the background. Users can:
- Play the game normally
- Close the browser anytime without worry
- Reopen the page and continue exactly where they left off

## Benefits
- **Prevents data loss** from accidental browser closures
- **Protects physical setup** - no need to move 3D models because of software issues
- **Peace of mind** - players can focus on the game, not saving
- **Seamless experience** - invisible background operation
- **Instant recovery** - automatic restoration on page reload
