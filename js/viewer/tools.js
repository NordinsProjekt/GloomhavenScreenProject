/**
 * Scenario Viewer - Measurement Tools
 * Handles the line measurement tool for measuring distances on the map
 */

// Toggle line tool
function toggleLineTool() {
    lineToolActive = !lineToolActive;
    const btn = document.getElementById('lineToolBtn');
    const hexMap = document.getElementById('hexMap');
    
    if (lineToolActive) {
        btn.classList.add('btn-active');
        hexMap.style.cursor = 'crosshair';
    } else {
        btn.classList.remove('btn-active');
        hexMap.style.cursor = 'default';
        clearLineTool();
    }
}

// Clear line tool
function clearLineTool() {
    lineStartPoint = null;
    if (lineElement) {
        lineElement.remove();
        lineElement = null;
    }
}

// Handle map click for line tool
function handleMapClick(e) {
    if (!lineToolActive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (!lineStartPoint) {
        // First click - set start point
        lineStartPoint = { x, y };
        createLineElement();
    } else {
        // Second click - reset for new line
        lineStartPoint = { x, y };
        if (lineElement) {
            lineElement.remove();
        }
        createLineElement();
    }
}

// Handle mouse move for line tool
function handleMapMouseMove(e) {
    if (!lineToolActive || !lineStartPoint || !lineElement) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    updateLineElement(x, y);
}

// Create line element
function createLineElement() {
    const hexMap = document.getElementById('hexMap');
    lineElement = document.createElement('div');
    lineElement.className = 'range-line';
    hexMap.appendChild(lineElement);
}

// Update line element position and rotation
function updateLineElement(endX, endY) {
    const dx = endX - lineStartPoint.x;
    const dy = endY - lineStartPoint.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    lineElement.style.left = lineStartPoint.x + 'px';
    lineElement.style.top = lineStartPoint.y + 'px';
    lineElement.style.width = length + 'px';
    lineElement.style.transform = `rotate(${angle}deg)`;
}
