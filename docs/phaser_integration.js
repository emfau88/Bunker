// Phaser 3 integration example for Bunker Asset Pack v1.

export function preloadBunkerAssets(scene) {
  scene.load.spritesheet(
    "bunkerTerrain",
    "assets/bunker_terrain_64.png",
    { frameWidth: 64, frameHeight: 64 }
  );

  scene.load.json(
    "bunkerTerrainManifest",
    "assets/bunker_terrain_64.json"
  );

  scene.load.atlas(
    "bunkerObjects",
    "assets/bunker_objects_64.png",
    "assets/bunker_objects_64.json"
  );
}

export function terrainIndex(scene, tileName) {
  const manifest = scene.cache.json.get("bunkerTerrainManifest");
  const tile = manifest.tiles.find((entry) => entry.name === tileName);
  if (!tile) throw new Error(`Unknown terrain tile: ${tileName}`);
  return tile.index;
}

export function placeTerrain(scene, tileName, gridX, gridY) {
  return scene.add
    .image(gridX * 64, gridY * 64, "bunkerTerrain", terrainIndex(scene, tileName))
    .setOrigin(0, 0);
}

export function getObjectDefinition(scene, frameName) {
  const texture = scene.textures.get("bunkerObjects");
  const source = texture.source[0];
  const json = scene.cache.json.get("bunkerObjects");
  // When using scene.load.atlas, custom top-level fields are not always copied
  // into TextureManager. Import the JSON separately as needed:
  return json?.bunker?.objects?.[frameName] ?? null;
}

export function placeBunkerObject(scene, frameName, gridX, gridY, definition) {
  const { w, h } = definition.footprint;
  return scene.add
    .image(
      gridX * 64 + w * 32,
      gridY * 64 + h * 64,
      "bunkerObjects",
      frameName
    )
    .setOrigin(0.5, 1);
}
