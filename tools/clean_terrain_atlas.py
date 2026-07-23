from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "bunker_terrain_64.png"
TARGET = ROOT / "assets" / "bunker_terrain_clean_64.png"
TILE = 64
DEFAULT_INSET = 8
PATH_INSET = 4

# These frames are repeated directly next to copies of themselves in the map.
# Their painted outer border creates an unintended black grid, so only these
# frames are edge-clamped. Transition and wall frames keep their authored edge.
SEAMLESS_FRAMES = {
    0, 1, 2, 3,        # grass variations
    9, 10, 11,         # dirt variations
    12, 13, 14, 15,    # path connections
    23,                # water
    24, 25,            # solid rock fill
    26, 27,            # rock
    30, 31,            # bunker floors
    33,                # hazard floor
}


def main() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    output = source.copy()
    columns = source.width // TILE

    for index in SEAMLESS_FRAMES:
        x = (index % columns) * TILE
        y = (index // columns) * TILE
        inset = PATH_INSET if index in {12, 13, 14, 15} else DEFAULT_INSET
        interior = source.crop(
            (x + inset, y + inset, x + TILE - inset, y + TILE - inset)
        )
        cleaned = interior.resize((TILE, TILE), Image.Resampling.NEAREST)
        output.paste(cleaned, (x, y))

    output.save(TARGET, optimize=True)
    print(f"Wrote {TARGET.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
