# Asset-Regeln

## Raster

- Logische Tile-Größe: **64 × 64 Pixel**
- Gelände: immer genau ein 64-Pixel-Frame
- Objekte: Frame-Größe entspricht `footprint.w × 64` und `footprint.h × 64`
- Objekt-Pivot: unten mittig (`0.5, 1.0`)
- Keine Rotation im Atlas

## Rendering

```css
canvas,
img.pixel-art {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

Phaser:

```js
game.config.render.pixelArt = true;
game.config.render.antialias = false;
```

## Kollision

- `solid: true`: Footprint blockiert Bewohner und Bauplätze
- `solid: false`: dekorativ oder begehbar
- Türen sollten im geschlossenen Zustand blockieren und im offenen Zustand
  ihre Kollisionszellen freigeben.

## Terrain

`walkable` und `diggable` stehen in `bunker_terrain_64.json`.

Empfohlene Logik:

- `surface`, `path`, `bunker_floor`, `utility_floor`: begehbar
- `cliff`, `surface_edge`: nicht begehbar
- `underground_wall`: nicht begehbar, aber grabbar
- `underground_floor`: begehbar und als bereits ausgehoben behandeln

## Namenskonvention

- Kleinbuchstaben
- Wörter mit Unterstrich
- Varianten mit zweistelliger oder semantischer Endung
- Frame-Namen sind stabile IDs und sollten nicht als UI-Texte angezeigt werden
