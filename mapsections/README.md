# Room Tile Images

Place your Gloomhaven room tile images in this folder.

## File Naming
The system expects these image files:
- `l-corridor.png`
- `t-junction.png`
- `hallway.png`
- `large-room.png`
- `small-room.png`
- `cross.png`
- `boss-room.png`
- `entrance.png`

## Image Requirements
- Format: PNG, JPG, or WebP
- Recommended size: 400x400px minimum
- Transparent backgrounds work best
- You can use actual Gloomhaven tile scans or create your own

## Adding Custom Tiles
To add more tiles, edit the `availableTiles` array in `script.js`:

```javascript
const availableTiles = [
    { id: 'tile1', name: 'L-Corridor', image: 'images/l-corridor.png', width: 2, height: 2 },
    // Add your custom tile here:
    { id: 'tile9', name: 'My Custom Room', image: 'images/my-room.png', width: 3, height: 2 },
];
```

## Placeholder Images
Until you add real images, the system will show a broken image icon. You can:
1. Scan your physical Gloomhaven tiles
2. Use screenshots from Tabletop Simulator or similar
3. Create simple colored rectangles as placeholders
4. Find fan-made digital assets online
