import { CardinalDirection } from "./CardinalDirection";
import { Edge, replaceEntranceWithUndetermined } from "./Edge";
import * as TileManipulation from "./TileManipulation";

type Sides = {
	[P in CardinalDirection]: Edge;
};

export class Tile implements Sides {
	North: Edge;
	East: Edge;
	South: Edge;
	West: Edge;

	constructor(north: Edge, east: Edge, south: Edge, west: Edge) {
		this[CardinalDirection.North] = north;
		this[CardinalDirection.East] = east;
		this[CardinalDirection.South] = south;
		this[CardinalDirection.West] = west;
	}

	static serialize(tile: Tile): string {
		return JSON.stringify(tile);
	}

	static deserialize(str: string): Tile {
		const parsed = JSON.parse(str) as Tile;
		return new Tile(parsed.North, parsed.East, parsed.South, parsed.West);
	}

	static undetermined(): Tile {
		return new Tile(
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined,
			Edge.Undetermined
		);
	}

	static ignoreEntrance(tile: Tile): Tile {
		return new Tile(
			replaceEntranceWithUndetermined(tile.North),
			replaceEntranceWithUndetermined(tile.East),
			replaceEntranceWithUndetermined(tile.South),
			replaceEntranceWithUndetermined(tile.West)
		);
	}

	static isUndetermined(tile: Tile): boolean {
		return TileManipulation.isSame(tile, Tile.undetermined());
	}
}
