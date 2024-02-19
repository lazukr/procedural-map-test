import { describe, test, expect } from "vitest";
import { RoomGrid } from "./RoomGrid";
import { Position } from "./Position";
import { Tile } from "../tile/Tile";
import { Edge } from "../tile/Edge";

describe("RoomGrid Tests.", () => {
	const tile = new Tile(
		Edge.Entrance,
		Edge.Corridor,
		Edge.Corridor,
		Edge.Corridor
	);

	const inputTile = new Tile(
		Edge.Corridor,
		Edge.Corridor,
		Edge.Corridor,
		Edge.Corridor
	);

	const undetermined = Tile.undetermined();

	const validInitialState = [
		{
			position: Position.origin(),
			tile: tile,
		},
	];

	test("RoomGrid throws error when not given a tile with entrance.", () => {
		const initialState = [
			{
				position: Position.origin(),
				tile: Tile.undetermined(),
			},
		];

		expect(() => new RoomGrid(initialState)).toThrowError();
	});

	test("RoomGrid creates room with entrance when nothing else is added.", () => {
		// 2d array
		const expectedRoom = [[tile]];

		const roomGrid = new RoomGrid(validInitialState);
		const room = roomGrid.toRoom();

		expect(room.grid).toEqual(expectedRoom);
	});

	test("RoomGrid creates room with all initial tiles.", () => {
		const multiTileInitialState = [
			{
				position: Position.origin(),
				tile: tile,
			},
			{
				position: new Position(1, 1),
				tile: inputTile,
			},
		];

		const expectedRoom = [
			[tile, undetermined],
			[undetermined, inputTile],
		];

		const roomGrid = new RoomGrid(multiTileInitialState);
		const room = roomGrid.toRoom();

		expect(room.grid).toEqual(expectedRoom);
	});

	test("RoomGrid creates room that accounts for negative position tiles.", () => {
		// 2d array
		const expectedRoom = [
			[inputTile, undetermined, undetermined],
			[undetermined, undetermined, undetermined],
			[undetermined, undetermined, tile],
		];

		const roomGrid = new RoomGrid(validInitialState);
		roomGrid.add(new Position(-2, -2), inputTile);
		const room = roomGrid.toRoom();

		expect(room.grid).toEqual(expectedRoom);
	});

	test("RoomGrid creates room that accounts for positive position tiles.", () => {
		const undetermined = Tile.undetermined();

		// 2d array
		const expectedRoom = [
			[tile, undetermined, undetermined],
			[undetermined, undetermined, undetermined],
			[undetermined, undetermined, inputTile],
		];

		const roomGrid = new RoomGrid(validInitialState);
		roomGrid.add(new Position(2, 2), inputTile);
		const room = roomGrid.toRoom();

		expect(room.grid).toEqual(expectedRoom);
	});

	test("isFilled returns false when position is not filled.", () => {
		const roomGrid = new RoomGrid(validInitialState);
		expect(roomGrid.isFilled(new Position(1, 2))).toBe(false);
	});

	test("isFilled returns true when position is filled.", () => {
		const roomGrid = new RoomGrid(validInitialState);
		expect(roomGrid.isFilled(Position.origin())).toBe(true);
	});
});
