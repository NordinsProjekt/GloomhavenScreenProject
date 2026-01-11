# Gloomhaven Digital Map Builder

En webbaserad digital följeslagare för att skapa och visa anpassade Gloomhaven-scenarier, designad för att fungera sömlöst med 3D-printade kartbrickor och spelkomponenter.

## 🎯 Översikt

Detta projekt tillhandahåller ett komplett digitalt verktygsset för Gloomhaven-entusiaster som använder 3D-printade brickor. Bygg, spara och visa anpassade scenarier på valfri skärm eller projektor, perfekt för att förbättra din bordsspelsupplevelse med fysiska 3D-printade komponenter.

## ✨ Funktioner

### 🗺️ Scenariobyggare (scenariomaker.html)
- **Drag-and-drop-gränssnitt** för placering av kartbrickor och markörer
- **Stort rutnät** (25x25) för att skapa komplexa scenarier
- **Brickorientering och positionering** med pixelprecis kontroll
- **Z-index lagring** för att stapla brickor och överlägg korrekt
- **Kontrollpanel för brickor** - klicka på placerade brickor för att öppna kontroller för:
  - Rotation (0°, 90°, 180°, 270°)
  - Z-index justering (flytta framåt/bakåt)
  - Pixelprecis positionering (X/Y-offset)
  - Fog of War-kontroller
  - Monster-konfiguration (spelare antal, normal/elit)
  - Anpassade tecken för markörer
- **Sök-funktionalitet** för att snabbt hitta specifika brickor
- **Spara/Ladda funktionalitet** för att lagra anpassade scenarier som JSON-filer
- **Import/Export** scenarier för att dela med andra
- **Missionsinformation sidopanel** med:
  - Missionstitel och nummer
  - Uppdragsmål
  - Scenarioskatt detaljer
  - Specialregler och anteckningar (upp till 4 textsektioner)

### 📺 Scenariovisare (scenario.html)
- **Rent visningsläge** optimerat för projektion på skärmar eller surfplattor
- **Fog of War-system** - klicka på kartbrickor för att avslöja när spelare utforskar
- **Växla rutnätssynlighet** för renare presentation
- **Monster synlighetsväxling** - visa/dölj alla monster
- **Spelarantal-väljare** (2P/3P/4P) - påverkar vilka monster som visas
- **Mätverktyg** - klicka två gånger på kartan för att mäta avstånd mellan punkter
- **Missionsinformation sidopanel** med:
  - Missionsmål
  - Scenarioskatt detaljer
  - Introduktion och rum-avslöjanden
  - Specialregler och anteckningar
- **Skrivskyddat läge** förhindrar oavsiktliga ändringar under spelet

### 🎨 Brickbibliotek
- Stöd för **kartbrickor** från grundspelet och expansioner (A-N serier)
- **Markörer och överlägg** inklusive:
  - Dörrar (sten och trä, horisontella och vertikala)
  - Fällor (björnfälla, giftgas, spikfälla)
  - Hinder (stenblock, stenpelare, väggsektioner)
  - Möbler (bord, hyllor, skåp, kistor, sarkofager)
  - Miljöelement (träd, buskar, vatten, taggar, kristaller)
  - Skatter och mål
- **Monsterbrickor** med stöd för:
  - 15+ monstertyper från grundspelet
  - Spelarantal-konfiguration (2-4 spelare)
  - Normal/Elite-status
  - Färgkodade ramar i visaren

### 🏠 Huvudmeny (index.html)
- **Välkomstsida** med enkel navigation
- Snabblänkar till Scenariobyggare och Scenariovisare
- Information om projektets syfte

## 🚀 Komma Igång

### Förutsättningar
- En modern webbläsare (Chrome, Firefox, Edge, eller Safari)
- 3D-printade Gloomhaven kartbrickor (rekommenderat för fysiskt spel)

### Installation

1. Klona detta repository:
```bash
git clone https://github.com/yourusername/GloomhavenScreenProject.git
cd GloomhavenScreenProject
```

2. Öppna `index.html` i din webbläsare för att komma åt huvudmenyn

3. Eller öppna direkt:
   - `scenariomaker.html` - För att skapa nya scenarier
   - `scenario.html` - För att visa sparade scenarier under spelet

Ingen byggprocess eller beroenden krävs - bara öppna och spela!

## 📖 Hur Man Använder

### Skapa ett Anpassat Scenario

1. Öppna `scenariomaker.html` i din webbläsare
2. Bläddra eller sök efter brickor i vänster palett
3. Dra brickor till rutnätet för att bygga din karta
4. Klicka på brickor för att justera rotation, z-index eller finjustera positionering
5. Använd kontrollpanelen för att:
   - Rotera brickor (0°, 90°, 180°, 270°)
   - Justera lagerordning (z-index)
   - Finjustera position med pixeloffset
   - Sätta fog of war-status
   - Konfigurera monster för olika spelarantal
   - Lägga till anpassade tecken på markörer
6. Fyll i missionsinformation i sidopanelen (titel, mål, skatter, regler)
7. Använd "💾 Save Map As..." för att exportera ditt scenario som en JSON-fil

### Visa Under Spel

1. Öppna `scenario.html` i din webbläsare
2. Klicka på "📂 Load Map" och välj din sparade scenario JSON-fil
3. Välj spelarantal (2P/3P/4P) - detta påverkar vilka monster som visas
4. Klicka på kartbrickor för att avslöja dem när spelare utforskar
5. Använd "📏 Line Tool" för att mäta avstånd mellan punkter
6. Använd "👹 Toggle Monsters" för att visa/dölj alla monster
7. Använd sidopanelen för att spåra mål och specialregler
8. Använd "⊞ Toggle Grid" för att dölja rutnätet för renare visning

### Använda med 3D-Printade Brickor

Detta digitala överlägg är designat för att komplettera fysiska 3D-printade Gloomhaven-brickor:

- Projicera scenariovisaren på ditt spelbord
- Justera digitala kartbrickor med dina 3D-printade brickor
- Använd fog of war digitalt medan spelare ser den fysiska layouten
- Spåra mål, monster och scenarioregler på skärmen medan du använder fysiska miniatyrer

## 📁 Projektstruktur

```
GloomhavenScreenProject/
├── index.html              # Huvudmeny/välkomstsida
├── scenariomaker.html      # Kartbyggargränssnitt
├── scenario.html           # Scenariovisare för spel
├── scenario.js             # Visarlogik och fog of war
├── script.js               # Kartbyggarfunktionalitet
├── styles.css              # Kartbyggarstilar
├── scenario.css            # Visarstilar
├── tiles/                  # Brickbilder och definitioner
│   └── tile-list.txt       # Brickinventering
├── mapsections/            # Kartbricksbilder
├── monsters/               # Monsterbilder
├── Missions/               # Sparade scenariofiler
│   ├── CustomMissions/     # Anpassade scenarier
│   └── *.json              # Scenariofiler
└── docs/                   # Funktionsdokumentation
```

## 🎮 Arbetsflödesexempel

1. **Förbered**: Skapa ditt anpassade scenario med kartbyggaren
2. **Sätt upp**: Arrangera dina 3D-printade brickor enligt din digitala karta
3. **Spela**: Visa scenariovisaren på en skärm/projektor placerad ovanför bordet
4. **Utforska**: Avslöja kartbrickor digitalt när spelare rör sig genom fängelsehålan
5. **Spåra**: Håll mål och regler synliga i sidopanelen

## 🔧 Anpassning

### Lägga Till Anpassade Brickor

1. Lägg till brickbilder i katalogen `tiles/` eller `mapsections/`
2. Uppdatera `availableTiles`-arrayen i `script.js`
3. Följ namnkonventionen: `bricknamn-BxH.png` (t.ex., `corridor-2x1.png`)

### Ändra Rutnätsstorlek

Ändra konstanterna i både `script.js` och `scenario.js`:
```javascript
const GRID_COLS = 25;  // Antal kolumner
const GRID_ROWS = 25;  // Antal rader
const CELL_SIZE = 80;  // Pixelstorlek per cell
```

## 📚 Dokumentation

För detaljerad funktionsdokumentation, se [docs/](docs/) katalogen:
- [script.js funktioner](docs/script-functions.md) - Kartbyggarens funktioner
- [scenario.js funktioner](docs/scenario-functions.md) - Scenariovisarens funktioner

## 🤝 Bidrag

Bidrag är välkomna! Skapa gärna en pull request eller öppna en issue för att diskutera nya funktioner.

## 📝 Licens

Detta projekt är licensierat under MIT-licensen - se LICENSE-filen för detaljer.

## 🎲 Ansvarsfriskrivning

Detta projekt är en fan-skapad digital följeslagare för Gloomhaven och är inte officiellt kopplat till Cephalofair Games. Gloomhaven är ett varumärke som tillhör Cephalofair Games.

---

Skapad med ❤️ för Gloomhaven-communityn

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
