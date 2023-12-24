import { Tile } from "./Tile";
import { generateAllUniqueRotations } from "./TileManipulation";

export const ONE_WAY_TILE: Tile = {
	north: 1,
	east: 0,
	south: 0,
	west: 0,
} as const;

export const LINE_TILE: Tile = {
	north: 1,
	east: 0,
	south: 1,
	west: 0,
} as const;

export const CORNER_TILE: Tile = {
	north: 1,
	east: 1,
	south: 0,
	west: 0,
} as const;

export const T_SHAPE_TILE: Tile = {
	north: 1,
	east: 1,
	south: 1,
	west: 0,
} as const;

export const CROSS_TILE: Tile = {
	north: 1,
	east: 1,
	south: 1,
	west: 1,
} as const;

export const ISOLATE_TILE: Tile = {
	north: 0,
	east: 0,
	south: 0,
	west: 0,
} as const;

export const TILE_SET = [
	...generateAllUniqueRotations(CROSS_TILE),
	...generateAllUniqueRotations(T_SHAPE_TILE),
	...generateAllUniqueRotations(CORNER_TILE),
	...generateAllUniqueRotations(LINE_TILE),
	...generateAllUniqueRotations(ONE_WAY_TILE),
	ISOLATE_TILE,
] as const;
