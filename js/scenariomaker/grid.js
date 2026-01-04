/**
 * Scenario Maker - Grid Management
 * Handles grid creation and grid-related UI
 */

// Create the placement grid
function createGrid() {
    const grid = document.getElementById('placementGrid');
    grid.innerHTML = '';
    grid.classList.add('show-grid'); // Show grid by default
    
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // Drop event handlers
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);
            
            grid.appendChild(cell);
        }
    }
    
    // Click on grid background to deselect
    grid.addEventListener('click', (e) => {
        if (e.target === grid || e.target.classList.contains('grid-cell')) {
            deselectTile();
        }
    });
}

// Toggle grid visibility
function toggleGrid() {
    const grid = document.getElementById('placementGrid');
    grid.classList.toggle('show-grid');
}
