# Gloomhaven Digital Map Builder

A web-based digital companion for creating and displaying custom Gloomhaven scenarios, designed to work seamlessly with 3D printed map tiles and game components.

## 🎯 Overview

This project provides a comprehensive digital toolset for Gloomhaven enthusiasts who use 3D printed tiles. Build, save, and display custom scenarios on any screen or projector, perfect for enhancing your tabletop experience with physical 3D printed components.

## ✨ Features

### 🗺️ Scenario Map Builder
- **Drag-and-drop interface** for placing map tiles and tokens
- **Large grid workspace** (25x25) for creating complex scenarios
- **Tile rotation and positioning** with pixel-precise control
- **Z-index layering** to stack tiles and overlays properly
- **Save/Load functionality** for storing custom scenarios as JSON files
- **Import/Export** scenarios to share with others

### 📺 Scenario Viewer
- **Clean viewing mode** optimized for projection on screens or tablets
- **Fog of War** system - click map sections to reveal as players explore
- **Toggle grid visibility** for cleaner presentation
- **Scenario information sidebar** with:
  - Mission objectives
  - Scenario loot details
  - Special rules and notes
- **Read-only mode** prevents accidental changes during gameplay

### 🎨 Tile Library
- Support for **map sections** from the base game and expansions
- **Tokens and overlays** including:
  - Doors, traps, and obstacles
  - Treasure chests and objectives
  - Monster standees (when using 2D tokens)
- **Search functionality** to quickly find specific tiles
- Organized into collapsible categories

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- 3D printed Gloomhaven map tiles (recommended for physical gameplay)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/GloomhavenScreenProject.git
cd GloomhavenScreenProject
```

2. Open `index.html` in your web browser to access the main menu

3. Or directly open:
   - `scenariomaker.html` - To create new scenarios
   - `scenario.html` - To view saved scenarios during gameplay

No build process or dependencies required - just open and play!

## 📖 How to Use

### Creating a Custom Scenario

1. Open `scenariomaker.html` in your browser
2. Browse or search for tiles in the left palette
3. Drag tiles onto the grid to build your map
4. Click tiles to adjust rotation, z-index, or fine-tune positioning
5. Use "Save Map As..." to export your scenario as a JSON file

### Displaying During Gameplay

1. Open `scenario.html` in your browser
2. Click "Load Map" and select your saved scenario JSON file
3. Position your screen/projector above your 3D printed tiles
4. Click map sections to reveal them as players explore
5. Use the sidebar to track objectives and special rules

### Using with 3D Printed Tiles

This digital overlay is designed to complement physical 3D printed Gloomhaven tiles:

- Project the scenario viewer onto your gaming table
- Align digital map sections with your 3D printed tiles
- Use fog of war digitally while players see the physical layout
- Track objectives, monsters, and scenario rules on-screen while using physical miniatures

## 📁 Project Structure

```
GloomhavenScreenProject/
├── index.html              # Main menu/landing page
├── scenariomaker.html      # Map builder interface
├── scenario.html           # Scenario viewer for gameplay
├── scenario.js             # Viewer logic and fog of war
├── script.js               # Map builder functionality
├── styles.css              # Map builder styles
├── scenario.css            # Viewer styles
├── tiles/                  # Tile images and definitions
│   └── tile-list.txt       # Tile inventory
├── mapsections/            # Map section images
└── images/                 # UI assets and icons
```

## 🎮 Workflow Example

1. **Prepare**: Create your custom scenario using the map builder
2. **Setup**: Arrange your 3D printed tiles according to your digital map
3. **Play**: Display the scenario viewer on a screen/projector positioned above the table
4. **Explore**: Reveal map sections digitally as players move through the dungeon
5. **Track**: Keep objectives and rules visible in the sidebar

## 🔧 Customization

### Adding Custom Tiles

1. Add tile images to the `tiles/` or `mapsections/` directory
2. Update `tile-list.txt` with new tile definitions
3. Follow the naming convention: `tilename-WxH.png` (e.g., `corridor-2x1.png`)

### Modifying Grid Size

Edit the constants in `scenario.js` and `script.js`:
```javascript
const GRID_COLS = 25;  // Number of columns
const GRID_ROWS = 25;  // Number of rows
const CELL_SIZE = 80;  // Pixel size of each cell
```

## 🤝 Contributing

Contributions are welcome! Whether you're adding new tile sets, improving the UI, or fixing bugs, feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is provided as-is for personal use. Gloomhaven is a trademark of Cephalofair Games. This is a fan-made tool and is not affiliated with or endorsed by Cephalofair Games.

## 🙏 Acknowledgments

- **Cephalofair Games** for creating Gloomhaven
- The **3D printing community** for creating amazing Gloomhaven tile STL files
- All contributors and players who help improve this tool

## 💡 Tips

- Use a **projector or large monitor** mounted above your gaming table for best results
- Keep your **3D tiles organized** to match your digital layouts
- **Save frequently** when building complex scenarios
- **Test your scenarios** in viewer mode before game night
- Share your custom scenarios with the community!

---

**Happy Adventuring!** 🗡️🛡️
