# script.js - Funktionsdokumentation

Detta dokument beskriver alla funktioner i `script.js` som driver Gloomhaven Scenariobyggaren.

## Innehållsförteckning

- [Initialisering](#initialisering)
- [Rutnätshantering](#rutnätshantering)
- [Brickhantering](#brickhantering)
- [Kontrollpanel](#kontrollpanel)
- [Palett & Sökning](#palett--sökning)
- [Drag & Drop](#drag--drop)
- [Spara & Ladda](#spara--ladda)
- [Missionsinformation](#missionsinformation)
- [Hjälpfunktioner](#hjälpfunktioner)

---

## Initialisering

### `initializeMap()`
**Beskrivning:** Initialiserar kartbyggaren vid sidladdning.

**Funktionalitet:**
- Skapar rutnätet
- Laddar brickpaletten
- Laddar monsterpaletten
- Laddar eventuellt sparad karta från localStorage

**Anropas:** Automatiskt vid sidladdning via `window.onload`

---

## Rutnätshantering

### `createGrid()`
**Beskrivning:** Skapar det 25x25 rutnät där brickor placeras.

**Funktionalitet:**
- Genererar 625 gridceller (25x25)
- Lägger till drag-and-drop event handlers på varje cell
- Visar rutnät som standard

**Konstanter:**
- `GRID_COLS = 25` - Antal kolumner
- `GRID_ROWS = 25` - Antal rader
- `CELL_SIZE = 80` - Pixelstorlek per cell

### `toggleGrid()`
**Beskrivning:** Växlar rutnätets synlighet.

**Funktionalitet:**
- Lägger till/tar bort CSS-klassen `show-grid`
- Visar/döljer rutnätslinjer för enklare placering

---

## Brickhantering

### `renderPlacedTile(tile)`
**Parametrar:**
- `tile` (Object) - Brickobjekt med position, rotation, z-index, etc.

**Beskrivning:** Renderar en placerad bricka på rutnätet.

**Funktionalitet:**
- Skapar ett div-element för brickan
- Applicerar position, storlek, rotation
- Lägger till fog of war-overlay för kartbrickor
- Lägger till etikett med namn och z-index
- Hanterar monstergränser (normal/elit)
- Hanterar anpassade tecken för markörer
- Gör brickan klickbar och dragbar

### `updateTilePosition(tileDiv, tile)`
**Parametrar:**
- `tileDiv` (HTMLElement) - DOM-elementet för brickan
- `tile` (Object) - Brickobjekt med positionsdata

**Beskrivning:** Uppdaterar en bricks position och orientering.

**Funktionalitet:**
- Beräknar position baserat på rad/kolumn
- Hanterar rotation (0°, 90°, 180°, 270°)
- Byter bredd/höjd för 90°/270° rotation
- Sätter z-index för lagerordning

### `updateTilePositionWithOffset(tileDiv, tile)`
**Parametrar:**
- `tileDiv` (HTMLElement) - DOM-elementet för brickan
- `tile` (Object) - Brickobjekt med pixel-offset

**Beskrivning:** Uppdaterar position med finjustering via pixel-offset.

**Funktionalitet:**
- Lägger till pixelOffsetX och pixelOffsetY till basposition
- Möjliggör pixelprecis placering utanför rutnätet

### `removeTile(tileId)`
**Parametrar:**
- `tileId` (String) - ID för brickan att ta bort

**Beskrivning:** Tar bort en bricka från kartan.

**Funktionalitet:**
- Hittar och tar bort brickan från `placedTiles`-arrayen
- Tar bort DOM-elementet
- Sparar ändringar till localStorage

---

## Kontrollpanel

### `selectTile(tileId)`
**Parametrar:**
- `tileId` (String) - ID för brickan att välja

**Beskrivning:** Väljer en bricka och visar dess kontrollpanel.

**Funktionalitet:**
- Markerar vald bricka visuellt med `selected`-klass
- Visar kontrollpanelen med alla inställningar
- Avmarkerar eventuell tidigare vald bricka

### `deselectTile()`
**Beskrivning:** Avmarkerar den aktuellt valda brickan.

**Funktionalitet:**
- Tar bort `selected`-klass från brickan
- Döljer kontrollpanelen
- Nollställer `selectedTileId`

### `showControlPanel(tile)`
**Parametrar:**
- `tile` (Object) - Brickobjekt att visa kontroller för

**Beskrivning:** Visar kontrollpanelen med alla tillgängliga inställningar.

**Sektioner:**
1. **Rotation** - Knappar för 0°, 90°, 180°, 270°
2. **Z-Index** - Justera lagerordning
3. **Position** - Pixel-offset X/Y för finjustering
4. **Fog of War** - Växla avslöjad/dold status
5. **Monster-kontroller** - Spelarantal och normal/elit (endast monster)
6. **Anpassat tecken** - Lägg till 1 tecken på markörer (endast custom-red-circle)
7. **Ta bort** - Knapp för att ta bort brickan

### `hideControlPanel()`
**Beskrivning:** Döljer kontrollpanelen.

### `setTileRotation(tileId, angle)`
**Parametrar:**
- `tileId` (String) - ID för brickan
- `angle` (Number) - Rotationsvinkel (0, 90, 180, 270)

**Beskrivning:** Roterar en bricka till specificerad vinkel.

### `adjustTileZIndex(tileId, direction)`
**Parametrar:**
- `tileId` (String) - ID för brickan
- `direction` (String) - 'up' eller 'down'

**Beskrivning:** Justerar brickans z-index för att flytta den framåt/bakåt i lagerordningen.

### `updateTilePixelOffset(tileId, axis, delta)`
**Parametrar:**
- `tileId` (String) - ID för brickan
- `axis` (String) - 'x' eller 'y'
- `delta` (Number) - Förändring i pixlar

**Beskrivning:** Justerar brickans position med pixlar för finjustering.

### `toggleTileReveal(tileId)`
**Parametrar:**
- `tileId` (String) - ID för brickan

**Beskrivning:** Växlar fog of war-status för en kartbricka.

**Funktionalitet:**
- Ändrar `revealed`-flaggan
- Uppdaterar CSS-klasser (`revealed`/`fogged`)
- Endast för kartbrickor (mapsections)

### `updateTileCustomChar(tileId, char)`
**Parametrar:**
- `tileId` (String) - ID för brickan
- `char` (String) - Tecken att visa (begränsat till 1 tecken)

**Beskrivning:** Lägger till ett anpassat tecken på en markör.

**Användning:** För att märka specifika positioner (t.ex., 'A', 'B', '1', '2')

---

## Palett & Sökning

### `loadTilePalette()`
**Beskrivning:** Laddar alla tillgängliga brickor och markörer i paletten.

**Funktionalitet:**
- Separerar kartbrickor (mapsections) och markörer (tokens)
- Skapar klickbara miniatyrbilder
- Gör brickor dragbara

### `loadMonsterPalette()`
**Beskrivning:** Laddar monster-brickor i paletten.

**Funktionalitet:**
- Skapar miniatyrbilder för alla monster
- Gör monster dragbara till rutnätet

### `setupTileSearch()`
**Beskrivning:** Konfigurerar sökfunktionaliteten för brickpaletten.

**Funktionalitet:**
- Filtrerar brickor baserat på sökinmatning
- Söker på bricknamn (case-insensitive)
- Uppdaterar synlighet i realtid

### `togglePaletteSection(sectionId)`
**Parametrar:**
- `sectionId` (String) - ID för sektionen ('mapTiles', 'tokens', 'monster')

**Beskrivning:** Växlar expanderad/kollapsad status för en palettsktion.

---

## Drag & Drop

### `handleDragStart(e)`
**Parametrar:**
- `e` (DragEvent) - Drag-händelsen

**Beskrivning:** Startar drag-operation för en bricka från paletten.

**Funktionalitet:**
- Lagrar brickens ID i dataTransfer
- Sätter visuell feedback

### `handleMonsterDragStart(e)`
**Parametrar:**
- `e` (DragEvent) - Drag-händelsen

**Beskrivning:** Startar drag-operation för ett monster från paletten.

### `handleDragOver(e)`
**Parametrar:**
- `e` (DragEvent) - Drag-över händelsen

**Beskrivning:** Hanterar när en bricka dras över en gridcell.

**Funktionalitet:**
- Förhindrar standard-beteende
- Markerar cellen som drop-mål

### `handleDrop(e)`
**Parametrar:**
- `e` (DragEvent) - Drop-händelsen

**Beskrivning:** Hanterar släppning av en bricka på rutnätet.

**Funktionalitet:**
- Hämtar brickdata från dataTransfer
- Skapar ny bricka på rätt position
- Lägger till i `placedTiles`-arrayen
- Sparar till localStorage

### `handleTileDragStart(e, tileId)`
**Parametrar:**
- `e` (DragEvent) - Drag-händelsen
- `tileId` (String) - ID för den placerade brickan

**Beskrivning:** Startar drag-operation för att flytta en redan placerad bricka.

**Funktionalitet:**
- Lagrar offset från musposition till brickposition
- Möjliggör frihandsflytt av brickor

---

## Spara & Ladda

### `saveMapAs()`
**Beskrivning:** Sparar den aktuella kartan som en JSON-fil.

**Funktionalitet:**
- Samlar kartdata (brickor, missionsinformation)
- Skapar JSON-blob
- Triggar nedladdning med tidsstämpel i filnamnet
- Format: `gloomhaven-map-YYYYMMDD-HHMMSS.json`

### `saveToLocalStorage()`
**Beskrivning:** Sparar kartan till webbläsarens localStorage.

**Funktionalitet:**
- Automatisk sparning vid varje ändring
- Sparar brickor och missionsinformation
- Möjliggör återhämtning vid siduppdatering

### `loadSavedMap()`
**Beskrivning:** Laddar karta från localStorage vid sidladdning.

**Funktionalitet:**
- Kontrollerar om sparad data finns
- Återställer alla brickor
- Återställer missionsinformation

### `loadMap()`
**Beskrivning:** Öppnar filväljare för att ladda en JSON-kartfil.

**Funktionalitet:**
- Triggar filuppladdningsdialog
- Läser JSON-fil
- Laddar kartdata via `loadMapData()`

### `loadMapData(mapData)`
**Parametrar:**
- `mapData` (Object) - JSON-objekt med kartdata

**Beskrivning:** Laddar kartdata från ett JSON-objekt.

**Funktionalitet:**
- Rensar nuvarande karta
- Lägger till alla brickor från data
- Återställer missionsinformation
- Sparar till localStorage

### `clearMap()`
**Beskrivning:** Rensar hela kartan.

**Funktionalitet:**
- Tar bort alla brickor
- Återställer missionsinformation till standardvärden
- Rensar localStorage

---

## Missionsinformation

### `updateMissionTitle()`
**Beskrivning:** Uppdaterar missionstitel från input-fältet.

### `loadMissionInfo(missionData)`
**Parametrar:**
- `missionData` (Object) - Objekt med missionsinformation

**Beskrivning:** Laddar all missionsinformation till sidopanelen.

**Data:**
- `title` - Missionstitel
- `number` - Missionsnummer
- `objectives` - Uppdragsmål
- `loot` - Skattinformation
- `text1-4` - Textfält för introduktion och rumavslöjanden

### `toggleSection(sectionId)`
**Parametrar:**
- `sectionId` (String) - ID för sektionen

**Beskrivning:** Växlar expanderad/kollapsad status för en informationssektion.

---

## Hjälpfunktioner

### `resetFog()`
**Beskrivning:** Återställer fog of war på alla kartbrickor.

**Funktionalitet:**
- Sätter alla kartbrickor till `revealed: false`
- Uppdaterar visuell representation

### `revealAll()`
**Beskrivning:** Avslöjar alla kartbrickor.

**Funktionalitet:**
- Sätter alla kartbrickor till `revealed: true`
- Tar bort fog of war från alla brickor

### `resizeAllTiles()`
**Beskrivning:** Öppnar dialog för att ändra storlek på alla brickor proportionellt.

**Användning:** För att justera hela kartans skala

---

## Datastrukturer

### Tile Object
```javascript
{
  id: String,           // Unikt ID för den placerade brickan
  tileTypeId: String,   // ID för bricktypen (referens till availableTiles)
  name: String,         // Bricknamn (t.ex., 'A1a', 'Barrel')
  image: String,        // Sökväg till brickbild
  row: Number,          // Rad på rutnätet (0-24)
  col: Number,          // Kolumn på rutnätet (0-24)
  width: Number,        // Bredd i gridceller
  height: Number,       // Höjd i gridceller
  rotation: Number,     // Rotation i grader (0, 90, 180, 270)
  zIndex: Number,       // Lagerordning (högre = ovanpå)
  revealed: Boolean,    // Fog of war-status (endast kartbrickor)
  pixelOffsetX: Number, // X-offset i pixlar (valfritt)
  pixelOffsetY: Number, // Y-offset i pixlar (valfritt)
  customChar: String,   // Anpassat tecken (endast custom-red-circle)
  isMonster: Boolean,   // Sant om det är ett monster
  players: {            // Monster-konfiguration (endast monster)
    2: {enabled: Boolean, elite: Boolean},
    3: {enabled: Boolean, elite: Boolean},
    4: {enabled: Boolean, elite: Boolean}
  }
}
```

### Mission Data Object
```javascript
{
  title: String,      // Missionstitel
  number: String,     // Missionsnummer
  objectives: String, // Uppdragsmål
  loot: String,       // Skattinformation
  text1: String,      // Introduktionstext
  text2: String,      // Rum 1 avslöjande
  text3: String,      // Rum 2 avslöjande
  text4: String       // Rum 3 avslöjande
}
```

---

## Användningsexempel

### Lägga till en ny bricktyp
```javascript
// Lägg till i availableTiles-arrayen
const availableTiles = [
  // ... befintliga brickor
  { 
    id: 'new-obstacle', 
    name: 'Nytt Hinder', 
    image: 'tiles/new-obstacle.png', 
    width: 2, 
    height: 1 
  }
];
```

### Programmatiskt placera en bricka
```javascript
const newTile = {
  id: `tile-${nextTileId++}`,
  tileTypeId: 'A1a',
  name: 'A1a',
  image: 'mapsections/A1a.png',
  row: 10,
  col: 10,
  width: 3,
  height: 3,
  rotation: 0,
  zIndex: 10,
  revealed: false
};

placedTiles.push(newTile);
renderPlacedTile(newTile);
saveToLocalStorage();
```

---

*Senast uppdaterad: 2026-01-04*
