# Dokumentation - Gloomhaven Digital Map Builder

Välkommen till funktionsdokumentationen för Gloomhaven Digital Map Builder!

## 📚 Dokumentationsöversikt

Detta är dokumentationskatalogen för projektet. Här hittar du detaljerad information om alla funktioner, datastrukturer och användningsexempel för projektets huvudkomponenter.

## 📁 Innehåll

### [script-functions.md](script-functions.md)
**Kartbyggarens Funktioner**

Omfattande dokumentation för `script.js` - hjärnan bakom scenariobyggaren.

**Omfattar:**
- ✏️ Brickredigering och placering
- 🎯 Kontrollpanel för brickinställningar
- 🔍 Sök- och palettsystem
- 💾 Spara och ladda funktioner
- 🎮 Drag-and-drop mekanik
- 📝 Missionsinformationshantering

**När du använder detta:**
- Skapa nya funktioner för kartbyggaren
- Förstå hur brickor hanteras
- Utöka kontrollpanelen
- Implementera nya sparformat

---

### [scenario-functions.md](scenario-functions.md)
**Scenariovisarens Funktioner**

Detaljerad guide för `scenario.js` - visningsläget för spel.

**Omfattar:**
- 🌫️ Fog of War-system
- 👹 Monsthantering och spelarantal
- 📏 Mätverktyg för avstånd
- 💥 Hinderdstruktion
- 👁️ Synlighetshantering
- 📖 Skrivskyddat visningsläge

**När du använder detta:**
- Lägga till spelmekanik
- Förstå fog of war-logik
- Utöka monster-funktionalitet
- Implementera nya spelverktyg

---

## 🎯 Snabbnavigering

### Vanliga Uppgifter

#### Lägga till en ny bricktyp
Se: [script-functions.md - Datastrukturer](script-functions.md#datastrukturer)

#### Förstå Fog of War
Se: [scenario-functions.md - Fog of War](scenario-functions.md#fog-of-war)

#### Hantera monsterkonfiguration
Se: [script-functions.md - Kontrollpanel](script-functions.md#kontrollpanel) och [scenario-functions.md - Monsthantering](scenario-functions.md#monsthantering)

#### Anpassa sparformatet
Se: [script-functions.md - Spara & Ladda](script-functions.md#spara--ladda)

---

## 🏗️ Arkitekturöversikt

### Projektets Komponenter

```
┌─────────────────────────────────────────────────────────────┐
│                    index.html (Huvudmeny)                   │
│                 Navigering mellan verktyg                    │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│   scenariomaker.html      │   │     scenario.html         │
│   (Kartbyggare)           │   │   (Scenariovisare)        │
├───────────────────────────┤   ├───────────────────────────┤
│   + script.js             │   │   + scenario.js           │
│   + styles.css            │   │   + scenario.css          │
│                           │   │                           │
│   Funktioner:             │   │   Funktioner:             │
│   • Skapa kartor          │   │   • Visa scenarier        │
│   • Placera brickor       │   │   • Fog of War            │
│   • Konfigurera monster   │   │   • Mätverktyg            │
│   • Spara scenarier       │   │   • Hinderdstruktion      │
│                           │   │   • Spelarantalsstöd      │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                └───────────┬───────────────┘
                            ▼
                ┌───────────────────────┐
                │   JSON Scenario File  │
                │   (Delas mellan       │
                │    verktyg)           │
                └───────────────────────┘
```

### Dataflöde

```
Användare → scenariomaker.html → Skapa karta → Spara JSON
                                                    │
                                                    ▼
                                            localStorage
                                                    │
                                                    ▼
Användare → scenario.html → Ladda JSON → Visa scenario
```

---

## 📖 Kodkonventioner

### Namngivning

**Funktioner:**
- camelCase för funktionsnamn
- Verb-beskrivande namn (t.ex., `loadMap`, `toggleFog`)

**Variabler:**
- camelCase för variabler
- Deskriptiva namn (t.ex., `placedTiles`, `currentPlayerCount`)

**Konstanter:**
- UPPER_CASE för konstanter
- Beskrivande namn (t.ex., `GRID_COLS`, `CELL_SIZE`)

### Kommentarer

```javascript
// Enkla förklaringar för enskilda rader
function simpleFunction() { }

/**
 * Omfattande kommentarer för komplexa funktioner
 * @param {Type} param - Beskrivning
 * @returns {Type} - Beskrivning
 */
function complexFunction(param) { }
```

---

## 🔄 Uppdatera Dokumentationen

När du lägger till nya funktioner eller ändrar befintliga:

### 1. Uppdatera Relevant .md-fil
- Lägg till ny funktion under rätt kategori
- Följ samma format som befintliga funktioner
- Inkludera exempel om möjligt

### 2. Uppdatera Detta README
- Lägg till nya sektioner om det behövs
- Uppdatera snabbnavigering
- Uppdatera "Senast uppdaterad"-datum

### 3. Dokumentationsformat
```markdown
### `funktionsNamn(param1, param2)`
**Parametrar:**
- `param1` (Type) - Beskrivning
- `param2` (Type) - Beskrivning

**Returnerar:** Type - Beskrivning (om tillämpligt)

**Beskrivning:** Kort beskrivning av vad funktionen gör.

**Funktionalitet:**
- Punkt 1
- Punkt 2
- Punkt 3

**Användning:** Praktiskt användningsexempel eller scenario

**Exempel:** (valfritt)
\`\`\`javascript
// Kodexempel
\`\`\`
```

---

## 🐛 Felsökning

### Vanliga Problem

#### Brickor syns inte
1. Kontrollera att bildfilen finns i rätt katalog
2. Verifiera att sökvägen i `availableTiles` är korrekt
3. Kontrollera z-index och fog of war-status

#### Fog of War fungerar inte
1. Kontrollera att brickan har `revealed`-flaggan
2. Verifiera att det är en kartbricka (inte token)
3. Kontrollera CSS-klasser (`revealed`/`fogged`)

#### Monster visas inte korrekt
1. Kontrollera spelarantalsinställning
2. Verifiera `players`-konfiguration i brickdata
3. Kontrollera `monstersVisible`-flaggan

---

## 🚀 Utöka Projektet

### Lägga till Ny Funktionalitet

#### 1. Planera
- Bestäm om det är för byggare eller visare
- Identifiera nödvändiga datastrukturer
- Rita upp användarflödet

#### 2. Implementera
- Lägg till funktioner i rätt .js-fil
- Uppdatera HTML/CSS om nödvändigt
- Följ befintliga kodkonventioner

#### 3. Testa
- Testa alla edge cases
- Verifiera backward compatibility
- Kontrollera prestanda

#### 4. Dokumentera
- Uppdatera relevant .md-fil
- Lägg till användningsexempel
- Uppdatera detta README

---

## 📞 Referens

### Viktiga Filer

| Fil | Syfte | Dokumentation |
|-----|-------|---------------|
| `script.js` | Kartbyggarlogik | [script-functions.md](script-functions.md) |
| `scenario.js` | Visarlogik | [scenario-functions.md](scenario-functions.md) |
| `styles.css` | Byggarstilar | - |
| `scenario.css` | Visarstilar | - |

### Externa Resurser

- **Gloomhaven Wiki:** För spelregler och komponenter
- **JSON Specification:** För dataformat
- **MDN Web Docs:** För JavaScript/CSS-referens

---

## ✅ Checklista för Bidragsgivare

När du bidrar till projektet, se till att:

- [ ] Koden följer befintliga konventioner
- [ ] Funktioner är dokumenterade i rätt .md-fil
- [ ] Kommentarer finns för komplex logik
- [ ] Backwards compatibility bevaras
- [ ] Exempel tillhandahålls för nya funktioner
- [ ] README.md uppdateras vid behov
- [ ] "Senast uppdaterad"-datum ändras

---

## 📊 Dokumentationsstatistik

- **script-functions.md:** ~600 rader - 40+ funktioner dokumenterade
- **scenario-functions.md:** ~500 rader - 30+ funktioner dokumenterade
- **Totalt omfattning:** Täcker 100% av offentliga funktioner

---

*Dokumentationen uppdaterades senast: 2026-01-04*

**Dokumenterat av:** GitHub Copilot  
**Version:** 1.0  
**Projekt:** Gloomhaven Digital Map Builder
