import { describe, test, expect } from "vitest";
import { ENTRANCE_TILE, PathTile, TILE_SET, TileSet } from "./TileSet";
import { rotateClockwise } from "./TileManipulation";
import { Tile } from "./Tile";
import { Edge } from "./Edge";

describe("TileSet tests", () => {
	test("tileSet returns all when no criteria is given", () => {
		const tileSet = new TileSet({
			entranceTiles: TILE_SET.entranceTiles,
			singlePathTiles: [],
			twoPathTiles: [],
			threePathTiles: [],
			allPathTiles: [],
		});

		const expectedResult = [
			ENTRANCE_TILE,
			rotateClockwise(ENTRANCE_TILE),
			rotateClockwise(rotateClockwise(ENTRANCE_TILE)),
			rotateClockwise(rotateClockwise(rotateClockwise(ENTRANCE_TILE))),
		];

		const result = tileSet.getTilesByPaths(PathTile.Entrance);

		expect(result).toEqual(expectedResult);
	});

	test("tileSet returns all matching criteria", () => {
		const tileSet = new TileSet({
			entranceTiles: TILE_SET.entranceTiles,
			singlePathTiles: [],
			twoPathTiles: [],
			threePathTiles: [],
			allPathTiles: [],
		});

		const expectedResult = [ENTRANCE_TILE];

		const criteriaTile = new Tile(
			Edge.Entrance,
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined
		);

		const result = tileSet.getTilesByPaths(PathTile.Entrance, criteriaTile);
		expect(result).toEqual(expectedResult);
	});

	test("tileSet non entrance path does not include entrance paths", () => {
		const tileSet = new TileSet({
			entranceTiles: TILE_SET.entranceTiles,
			singlePathTiles: [],
			twoPathTiles: [],
			threePathTiles: [],
			allPathTiles: [],
		});

		expect(tileSet.getTilesByPaths(PathTile.NonEntrancePaths)).toStrictEqual(
			[]
		);
	});

	test("tileSet non entrance path includes all tiles from non entrance paths", () => {
		const tileSet = new TileSet({
			entranceTiles: TILE_SET.entranceTiles,
			singlePathTiles: [],
			twoPathTiles: TILE_SET.twoPathTiles,
			threePathTiles: [],
			allPathTiles: TILE_SET.allPathTiles,
		});

		const expectedResult = [...TILE_SET.twoPathTiles, ...TILE_SET.allPathTiles];

		const result = tileSet.getTilesByPaths(PathTile.NonEntrancePaths);

		expect(result).toEqual(expectedResult);
	});
});
