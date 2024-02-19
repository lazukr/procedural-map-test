import { describe, test, expect } from "vitest";
import { Tile } from "./Tile";
import * as TileManipulation from "./TileManipulation";
import { Edge } from "./Edge";
import { CardinalDirection } from "./CardinalDirection";

describe("Tile tests.", () => {
	test("undetermined returns tile with all undetermined.", () => {
		const emptyTile = new Tile(
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined
		);

		const result = Tile.undetermined();

		expect(result).toEqual(emptyTile);
	});

	test("contains returns true if edge exists in tile.", () => {
		const tile = Tile.undetermined();

		expect(TileManipulation.contains(tile, Edge.Undetermined)).toBe(true);
	});

	test("contains returns false if edge doesn't exist in tile.", () => {
		const tile = Tile.undetermined();

		expect(TileManipulation.contains(tile, Edge.Corridor)).toBe(false);
	});

	test("getEdge returns the edge corresponding to the direction.", () => {
		const tile = new Tile(
			Edge.Corridor,
			Edge.Corridor,
			Edge.Corridor,
			Edge.Entrance
		);

		const result = TileManipulation.getEdge(tile, CardinalDirection.West);

		expect(result).toBe(Edge.Entrance);
	});

	test("rotate clockwises returns a rotated tile.", () => {
		const tile = new Tile(
			Edge.Corridor,
			Edge.Entrance,
			Edge.Open,
			Edge.Corridor
		);

		const expectedRotatedTile = new Tile(
			Edge.Corridor,
			Edge.Corridor,
			Edge.Entrance,
			Edge.Open
		);

		const rotatedTile = TileManipulation.rotateClockwise(tile);
		expect(rotatedTile).toEqual(expectedRotatedTile);
	});

	test("isSame returns true when comparing same tile", () => {
		const tileOne = new Tile(
			Edge.Corridor,
			Edge.Entrance,
			Edge.Open,
			Edge.Wall
		);

		const tileTwo = new Tile(
			Edge.Corridor,
			Edge.Entrance,
			Edge.Open,
			Edge.Wall
		);

		expect(TileManipulation.isSame(tileOne, tileTwo)).toBe(true);
	});

	test("isSame returns false when comparing different tiles", () => {
		const tileOne = new Tile(
			Edge.Corridor,
			Edge.Entrance,
			Edge.Open,
			Edge.Wall
		);

		const tileTwo = new Tile(
			Edge.Corridor,
			Edge.Entrance,
			Edge.Corridor,
			Edge.Wall
		);

		expect(TileManipulation.isSame(tileOne, tileTwo)).toBe(false);
	});

	test("hasAtLeastOneOpening returns true when tile contains an opening", () => {
		const tile = new Tile(Edge.Corridor, Edge.Wall, Edge.Wall, Edge.Wall);

		expect(TileManipulation.hasAtLeastOneOpening(tile)).toBe(true);
	});

	test("hasAtLeastOneOpening returns false when tile contains no opening", () => {
		const tile = new Tile(Edge.Wall, Edge.Wall, Edge.Wall, Edge.Wall);

		expect(TileManipulation.hasAtLeastOneOpening(tile)).toBe(false);
	});

	test("canFill returns true when input tile can fill reference tile's spot", () => {
		const inputTile = new Tile(
			Edge.Wall,
			Edge.Corridor,
			Edge.Corridor,
			Edge.Corridor
		);

		const refTile = new Tile(
			Edge.Wall,
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined
		);

		expect(TileManipulation.canFill(inputTile, refTile)).toBe(true);
	});

	test("canFill returns false when input tile cannot fill reference tile's spot", () => {
		const inputTile = new Tile(
			Edge.Wall,
			Edge.Corridor,
			Edge.Corridor,
			Edge.Corridor
		);

		const refTile = new Tile(
			Edge.Wall,
			Edge.Wall,
			Edge.Undetermined,
			Edge.Undetermined
		);

		expect(TileManipulation.canFill(inputTile, refTile)).toBe(false);
	});

	test("generateAllUniqueRotations removes redundant rotations", () => {
		const inputTile = new Tile(
			Edge.Wall,
			Edge.Corridor,
			Edge.Wall,
			Edge.Corridor
		);

		const expectedSet = [
			new Tile(Edge.Wall, Edge.Corridor, Edge.Wall, Edge.Corridor),
			new Tile(Edge.Corridor, Edge.Wall, Edge.Corridor, Edge.Wall),
		];

		const result = TileManipulation.generateAllUniqueRotations(inputTile);

		expect(result).toEqual(expectedSet);
	});

	test("generateAllUniqueRotations creates all rotations", () => {
		const inputTile = new Tile(
			Edge.Wall,
			Edge.Corridor,
			Edge.Wall,
			Edge.Entrance
		);

		const expectedSet = [
			new Tile(Edge.Wall, Edge.Corridor, Edge.Wall, Edge.Entrance),
			new Tile(Edge.Entrance, Edge.Wall, Edge.Corridor, Edge.Wall),
			new Tile(Edge.Wall, Edge.Entrance, Edge.Wall, Edge.Corridor),
			new Tile(Edge.Corridor, Edge.Wall, Edge.Entrance, Edge.Wall),
		];

		const result = TileManipulation.generateAllUniqueRotations(inputTile);

		expect(result).toEqual(expectedSet);
	});
});
