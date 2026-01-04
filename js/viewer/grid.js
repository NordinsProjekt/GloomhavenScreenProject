/**
 * Scenario Viewer - Grid Management
 * Handles grid creation for the viewer
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
            grid.appendChild(cell);
        }
    }
}

// Toggle grid visibility
function toggleGrid() {
    const grid = document.getElementById('placementGrid');
    grid.classList.toggle('show-grid');
}
