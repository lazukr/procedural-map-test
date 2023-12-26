import { Tile } from "./Tile";

const FULL_ROTATION = 4;
const TILE_MATCH_MAP: Record<number, number> = {
	1: 1,
	2: 3,
	3: 2,
	4: 4,
} as const;

export function rotateClockwise(tile: Tile): Tile {
	return {
		north: tile.west,
		east: tile.north,
		south: tile.east,
		west: tile.south,
	};
}

export function isSame(tile1: Tile, tile2: Tile): boolean {
	if (
		tile1.north === tile2.north &&
		tile1.east === tile2.east &&
		tile1.south === tile2.south &&
		tile1.west === tile2.west
	) {
		return true;
	}
	return false;
}

export function hasAtLeastOneOpening(tile: Tile): boolean {
	if (tile.north > 0 || tile.east > 0 || tile.south > 0 || tile.west > 0) {
		return true;
	}
	return false;
}

export function areCompatible(referenceTile: Tile, tile: Tile): boolean {
	const overlappingTile = overLapTile(referenceTile, tile);
	return isSame(referenceTile, overlappingTile);
}

function overLapTile(referenceTile: Tile, tile: Tile): Tile {
	return {
		north:
			TILE_MATCH_MAP[referenceTile.north] === tile.north
				? referenceTile.north
				: 0,
		east:
			TILE_MATCH_MAP[referenceTile.east] === tile.east ? referenceTile.east : 0,
		south:
			TILE_MATCH_MAP[referenceTile.south] === tile.south
				? referenceTile.south
				: 0,
		west:
			TILE_MATCH_MAP[referenceTile.west] === tile.west ? referenceTile.west : 0,
	};
}

export function generateAllUniqueRotations(tile: Tile): Tile[] {
	const tileList: Tile[] = [];

	let localTile = tile;
	for (let i = 0; i < FULL_ROTATION; ++i) {
		tileList.push(localTile);
		localTile = rotateClockwise(localTile);
	}

	const serializedTileList = tileList.map((i) => serializeTile(i));
	const serializedTileSet = [...new Set(serializedTileList)];
	const deserializedTiles = serializedTileSet.map((i) => deserializeTile(i));
	return deserializedTiles;
}

function serializeTile(tile: Tile): string {
	return JSON.stringify(tile);
}

function deserializeTile(serializedTile: string): Tile {
	return JSON.parse(serializedTile) as Tile;
}
