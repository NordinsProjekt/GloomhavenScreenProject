# scenario.js - Funktionsdokumentation

Detta dokument beskriver alla funktioner i `scenario.js` som driver Gloomhaven Scenariovisaren.

## Innehållsförteckning

- [Initialisering](#initialisering)
- [Rutnätshantering](#rutnätshantering)
- [Brickrendering](#brickrendering)
- [Fog of War](#fog-of-war)
- [Monsthantering](#monsthantering)
- [Mätverktyg](#mätverktyg)
- [Hinder & Destruktion](#hinder--destruktion)
- [Spara & Ladda](#spara--ladda)
- [Hjälpfunktioner](#hjälpfunktioner)

---

## Initialisering

### `initializeScenario()`
**Beskrivning:** Initialiserar scenariovisaren vid sidladdning.

**Funktionalitet:**
- Skapar rutnätet
- Laddar eventuellt sparad karta från localStorage
- Konfigurerar event listeners

**Anropas:** Automatiskt vid sidladdning via `window.onload`

### `setupEventListeners()`
**Beskrivning:** Konfigurerar alla event listeners för gränssnittet.

**Händelser:**
- Ladda karta-knapp
- Rensa karta-knapp
- Växla fog of war-knapp
- Växla rutnät-knapp
- Växla monster-knapp
- Mätverktyg-knapp
- Spelarantalsknappar
- Kartklick för fog of war och mätverktyg

---

## Rutnätshantering

### `createGrid()`
**Beskrivning:** Skapar det 25x25 rutnät där scenarier visas.

**Funktionalitet:**
- Genererar 625 gridceller (25x25)
- Visar rutnät som standard
- Endast visning (ingen drag-and-drop)

**Konstanter:**
- `GRID_COLS = 25` - Antal kolumner
- `GRID_ROWS = 25` - Antal rader
- `CELL_SIZE = 80` - Pixelstorlek per cell

### `toggleGrid()`
**Beskrivning:** Växlar rutnätets synlighet.

**Funktionalitet:**
- Lägger till/tar bort CSS-klassen `show-grid`
- Användbart för renare visning under spel

---

## Brickrendering

### `renderPlacedTile(tile)`
**Parametrar:**
- `tile` (Object) - Brickobjekt att rendera

**Beskrivning:** Renderar en bricka på rutnätet i skrivskyddat läge.

**Funktionalitet:**
- Skapar ett div-element för brickan
- Applicerar position, storlek, rotation
- Lägger till fog of war-overlay för kartbrickor
- Lägger till etikett för kartbrickor
- Visar monstergränser (normal/elit) baserat på spelarantal
- Visar anpassade tecken för markörer
- Gör kartbrickor klickbara för fog of war
- Gör hinder klickbara för destruktion

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
- Anropar `updateTilePositionWithOffset` om pixel-offset finns

### `updateTilePositionWithOffset(tileDiv, tile)`
**Parametrar:**
- `tileDiv` (HTMLElement) - DOM-elementet för brickan
- `tile` (Object) - Brickobjekt med pixel-offset

**Beskrivning:** Uppdaterar position med pixel-offset för finjusterade brickor.

**Funktionalitet:**
- Lägger till pixelOffsetX och pixelOffsetY till basposition
- Möjliggör pixelprecis visning

---

## Fog of War

### `toggleTileReveal(tileId)`
**Parametrar:**
- `tileId` (String) - ID för brickan att växla

**Beskrivning:** Växlar fog of war-status för en enskild kartbricka.

**Funktionalitet:**
- Ändrar `revealed`-flaggan
- Uppdaterar CSS-klasser (`revealed`/`fogged`)
- Uppdaterar även överlappande tokens synlighet
- Endast för kartbrickor (mapsections)

**Användning:** Klicka på kartbrickor under spel för att avslöja rum

### `toggleAllFog()`
**Beskrivning:** Växlar fog of war för alla kartbrickor samtidigt.

**Funktionalitet:**
- Kontrollerar om alla är avslöjade eller ej
- Växlar alla kartbrickor till motsatt status
- Uppdaterar visuell representation

**Användning:** Snabbt återställa eller avslöja hela kartan

### `updateTokenVisibility()`
**Beskrivning:** Uppdaterar synlighet för tokens/hinder baserat på överlappande kartbrickor.

**Funktionalitet:**
- Kontrollerar om en token överlappar med någon kartbricka
- Visar token endast om minst en överlappande kartbricka är avslöjd
- Döljer token om alla överlappande kartbrickor har fog of war

**Logik:**
- Tokens utan överlapp visas alltid
- Tokens med överlapp visas bara när minst ett rum är avslöjt

---

## Monsthantering

### `setPlayerCount(count)`
**Parametrar:**
- `count` (Number) - Antal spelare (2, 3, eller 4)

**Beskrivning:** Sätter aktuellt spelarantal och uppdaterar monstervisning.

**Funktionalitet:**
- Uppdaterar `currentPlayerCount`-variabeln
- Uppdaterar visuell indikator (aktiv knapp)
- Filtrerar monster baserat på konfiguration
- Uppdaterar monstergränser (normal/elit)

**Användning:** Välj rätt spelarantal innan spelet startar

### `toggleMonsterVisibility()`
**Beskrivning:** Växlar synlighet för alla monster.

**Funktionalitet:**
- Växlar `monstersVisible`-flaggan
- Visar/döljer alla element med `isMonster`-flaggan
- Användbart för att temporärt dölja monster

### Monster-gränser
**Beskrivning:** Visuell indikation av monsterstatus.

**Gränsfärger:**
- **Gul ram** - Normal monster för aktuellt spelarantal
- **Röd ram** - Elit monster för aktuellt spelarantal
- **Ingen ram** - Monster inte aktiverat för aktuellt spelarantal

---

## Mätverktyg

### `toggleLineTool()`
**Beskrivning:** Aktiverar/avaktiverar mätverktyget.

**Funktionalitet:**
- Växlar `lineToolActive`-flaggan
- Uppdaterar knappens visuella status
- Nollställer eventuell pågående mätning

**Användning:** Mät avstånd mellan två punkter på kartan

### `handleMapClick(event)`
**Parametrar:**
- `event` (MouseEvent) - Klickhändelse

**Beskrivning:** Hanterar kartklick för mätverktyget.

**Funktionalitet:**
- **Första klicket:** Sätter startpunkt, skapar linje-element
- **Andra klicket:** Sätter slutpunkt, beräknar avstånd, visar resultat
- Automatisk nollställning efter andra klicket

### `handleMapMouseMove(event)`
**Parametrar:**
- `event` (MouseEvent) - Mushändelse

**Beskrivning:** Uppdaterar linjen i realtid när musen rör sig.

**Funktionalitet:**
- Beräknar aktuell musposition
- Uppdaterar linjens slutpunkt och längd
- Visar preliminärt avstånd

### Avståndsberäkning
**Metod:** Pythagoras sats

**Formel:**
```javascript
const distance = Math.sqrt(dx*dx + dy*dy)
const hexes = distance / (CELL_SIZE + 2)
```

**Visning:** Avstånd i hex-rutor med en decimal

---

## Hinder & Destruktion

### `handleObstacleClick(tile, event)`
**Parametrar:**
- `tile` (Object) - Hinderbricka
- `event` (MouseEvent) - Klickhändelse

**Beskrivning:** Hanterar klick på hinder och tokens (ej kartbrickor).

**Funktionalitet:**
- Kontrollerar om mätverktyget är aktivt (ignorerar då)
- Visar destruktionsmeny vid högerklick eller Ctrl+klick
- Förhindrar spridning av händelse

### `showDestroyOption(tile, event)`
**Parametrar:**
- `tile` (Object) - Hinderbricka
- `event` (MouseEvent) - Klickhändelse

**Beskrivning:** Visar en destruktionsmeny för att förstöra hinder.

**Funktionalitet:**
- Skapar en popup-meny vid musposition
- Visar "Destroy [bricknamn]"-knapp
- Hanterar klick utanför för att stänga menyn
- Förhindrar oavsiktlig destruktion under spel

### `closeDestroyMenu()`
**Beskrivning:** Stänger destruktionsmenyn.

### `destroyObstacle(tileId)`
**Parametrar:**
- `tileId` (String) - ID för brickan att förstöra

**Beskrivning:** Förstör (tar bort) ett hinder från kartan.

**Funktionalitet:**
- Tar bort brickan från `placedTiles`-arrayen
- Tar bort DOM-elementet med fade-out animation
- Sparar ändringar till localStorage
- Stänger destruktionsmenyn

**Användning:** Simulera förstörbara hinder under spel (t.ex., dörrar, lådor)

---

## Spara & Ladda

### `loadMap()`
**Beskrivning:** Öppnar filväljare för att ladda en JSON-scenariofil.

**Funktionalitet:**
- Skapar temporär file input
- Läser vald JSON-fil
- Laddar data via `loadMapData()`
- Tar bort temporär input

### `loadMapData(mapData)`
**Parametrar:**
- `mapData` (Object) - JSON-objekt med scenariodata

**Beskrivning:** Laddar scenariodata från ett JSON-objekt.

**Funktionalitet:**
- Lagrar originaldata för återställning
- Rensar nuvarande karta
- Lägger till alla brickor
- Laddar missionsinformation
- Uppdaterar token-synlighet
- Sparar till localStorage

### `loadSavedMap()`
**Beskrivning:** Laddar scenario från localStorage vid sidladdning.

**Funktionalitet:**
- Kontrollerar om sparad data finns
- Laddar data via `loadMapData()`
- Möjliggör automatisk återhämtning

### `clearMap()`
**Beskrivning:** Rensar hela scenariot.

**Funktionalitet:**
- Tar bort alla brickor från rutnätet
- Rensar `placedTiles`-arrayen
- Återställer missionsinformation
- Nollställer originaldata
- Rensar localStorage

**Användning:** Förbered för att ladda ett nytt scenario

---

## Hjälpfunktioner

### `tilesOverlap(tile1, tile2)`
**Parametrar:**
- `tile1` (Object) - Första brickan
- `tile2` (Object) - Andra brickan

**Returnerar:** Boolean - Sant om brickorna överlappar

**Beskrivning:** Kontrollerar om två brickor överlappar varandra.

**Algoritm:**
- Beräknar gränser för båda brickorna
- Kontrollerar överlapp i både X- och Y-axeln
- Hanterar rotation (swap width/height för 90°/270°)

**Användning:** Avgör om tokens ska visas baserat på avslöjade kartbrickor

### `getTileBounds(tile)`
**Parametrar:**
- `tile` (Object) - Brickobjekt

**Returnerar:** Object - `{left, right, top, bottom}` i gridkoordinater

**Beskrivning:** Beräknar gränserna för en bricka i gridkoordinater.

**Funktionalitet:**
- Hanterar rotation (swap width/height för 90°/270°)
- Returnerar koordinater för brickans hörn

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

**Funktionalitet:**
- Uppdaterar alla textarea-element
- Sätter alla fält till `readonly`
- Förhindrar redigering under spel

### `toggleSection(sectionId)`
**Parametrar:**
- `sectionId` (String) - ID för sektionen

**Beskrivning:** Växlar expanderad/kollapsad status för en informationssektion.

**Funktionalitet:**
- Växlar `collapsed`-klass på innehållet
- Uppdaterar pil-ikon (▶/▼)
- Sparar användarens preferenser visuellt

---

## Globala Variabler

### `placedTiles`
**Typ:** Array
**Beskrivning:** Lista över alla brickor på kartan

### `originalMapData`
**Typ:** Object eller null
**Beskrivning:** Lagrar original scenariodata för återställning

### `currentPlayerCount`
**Typ:** Number (2, 3, eller 4)
**Beskrivning:** Aktuellt antal spelare, påverkar monstervisning
**Standard:** 4

### `monstersVisible`
**Typ:** Boolean
**Beskrivning:** Om monster ska visas eller döljas
**Standard:** true

### `lineToolActive`
**Typ:** Boolean
**Beskrivning:** Om mätverktyget är aktivt

### `lineStartPoint`
**Typ:** Object {x, y} eller null
**Beskrivning:** Startpunkt för aktuell mätning

### `lineElement`
**Typ:** HTMLElement eller null
**Beskrivning:** DOM-element för mätlinjen

---

## Datastrukturer

### Tile Object
```javascript
{
  id: String,           // Unikt ID för brickan
  tileTypeId: String,   // ID för bricktypen
  name: String,         // Bricknamn
  image: String,        // Sökväg till bild
  row: Number,          // Rad (0-24)
  col: Number,          // Kolumn (0-24)
  width: Number,        // Bredd i celler
  height: Number,       // Höjd i celler
  rotation: Number,     // Rotation (0, 90, 180, 270)
  zIndex: Number,       // Lagerordning
  revealed: Boolean,    // Fog of war-status (kartbrickor)
  pixelOffsetX: Number, // X-offset (valfritt)
  pixelOffsetY: Number, // Y-offset (valfritt)
  customChar: String,   // Anpassat tecken (valfritt)
  isMonster: Boolean,   // Om det är ett monster
  players: {            // Monster-konfiguration
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
  text1: String,      // Introduktion
  text2: String,      // Rum 1 avslöjande
  text3: String,      // Rum 2 avslöjande
  text4: String       // Rum 3 avslöjande
}
```

---

## Arbetsflöde för Spelledare

### 1. Förberedelse
```javascript
// Ladda scenario innan spelet
loadMap() // Välj JSON-fil från scenariobyggaren
```

### 2. Under Spel
```javascript
// När spelare utforskar
toggleTileReveal(tileId) // Klicka på kartbricka för att avslöja

// Mät avstånd
toggleLineTool()         // Aktivera mätverktyg
// Klicka två gånger på kartan

// Förstör hinder
handleObstacleClick()    // Högerklicka på hinder
destroyObstacle(tileId)  // Bekräfta destruktion
```

### 3. Anpassa Visning
```javascript
toggleGrid()              // Dölj rutnät för renare visning
toggleMonsterVisibility() // Dölj monster temporärt
setPlayerCount(3)        // Justera för 3 spelare
```

---

## Skillnader från script.js

### Endast Läsläge
- Inga drag-and-drop-funktioner
- Inga redigeringskontroller
- Fokus på visning och spelmekanik

### Spel-specifika Funktioner
- Fog of War-system
- Mätverktyg för avstånd
- Hinderdstruktion
- Spelarantalbaserad monsterfiltrering

### Förenklad UI
- Ingen kontrollpanel
- Ingen brickpalett
- Rensad interface för projektion

---

## Felhantering

### Saknad Kartdata
```javascript
if (!mapData || !mapData.tiles) {
  console.error('Invalid map data');
  return;
}
```

### Ogiltig Brickdata
```javascript
if (!tile || !tile.id) {
  console.warn('Invalid tile data');
  return;
}
```

---

## Prestanda-tips

### Begränsa Uppdateringar
- Uppdatera endast synliga element
- Använd CSS-klasser istället för inline-stilar när möjligt
- Batch DOM-uppdateringar

### LocalStorage
- Spara endast när nödvändigt
- Komprimera data om möjligt
- Rensa gamla sparade scenarier

---

*Senast uppdaterad: 2026-01-04*
