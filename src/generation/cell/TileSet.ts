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

export const ROOM_ENTRANCE_TILE: Tile = {
	north: 1,
	east: 3,
	west: 2,
	south: 4,
} as const;

export const ROOM_DOUBLE_ENTRANCE_TILE: Tile = {
	north: 1,
	east: 1,
	south: 3,
	west: 2,
} as const;

export const ROOM_CORNER_TILE: Tile = {
	north: 0,
	east: 0,
	south: 3,
	west: 2,
} as const;

export const ROOM_CORNER_ENTRANCE_TILE: Tile = {
	north: 1,
	east: 3,
	south: 2,
	west: 0,
} as const;

export const ROOM_SIDE_TILE: Tile = {
	north: 0,
	west: 2,
	east: 3,
	south: 4,
} as const;

export const ROOM_CENTER_TILE: Tile = {
	north: 4,
	east: 4,
	south: 4,
	west: 4,
} as const;

export const ISOLATE_TILE: Tile = {
	north: 0,
	east: 0,
	south: 0,
	west: 0,
} as const;

export const TILE_SET = [
	// 4 paths
	[
		...generateAllUniqueRotations(CROSS_TILE),
		...generateAllUniqueRotations(ROOM_CENTER_TILE),
		...generateAllUniqueRotations(ROOM_ENTRANCE_TILE),
		...generateAllUniqueRotations(ROOM_DOUBLE_ENTRANCE_TILE),
	],
	// 3 paths
	[
		...generateAllUniqueRotations(T_SHAPE_TILE),
		...generateAllUniqueRotations(ROOM_SIDE_TILE),
		...generateAllUniqueRotations(ROOM_CORNER_ENTRANCE_TILE),
	],
	// 2 paths
	[
		...generateAllUniqueRotations(CORNER_TILE),
		...generateAllUniqueRotations(LINE_TILE),
		...generateAllUniqueRotations(ROOM_CORNER_TILE),
	],
	// 1 path
	generateAllUniqueRotations(ONE_WAY_TILE),
] as readonly Tile[][];
