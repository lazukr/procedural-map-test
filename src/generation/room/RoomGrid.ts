import {
	CardinalDirection,
	getOppositeDirection,
} from "../tile/CardinalDirection";
import {
	Edge,
	edgeIsOpening,
	replaceEntranceWithUndetermined,
} from "../tile/Edge";
import { Tile } from "../tile/Tile";
import * as TileManipulation from "../tile/TileManipulation";
import { Position } from "./Position";
import { Room } from "./Room";

export interface RoomTilePosition {
	tile: Tile;
	position: Position;
}

export class RoomGrid {
	private minX: number = Infinity;
	private minY: number = Infinity;
	private maxX: number = -Infinity;
	private maxY: number = -Infinity;
	readonly grid: Record<string, Tile> = {};

	constructor(initialState: RoomTilePosition[]) {
		if (
			!initialState.some((t) =>
				TileManipulation.contains(t.tile, Edge.Entrance)
			)
		) {
			throw new Error("RoomGrid constructor needs a Tile with Edge.Entrance.");
		}

		initialState.map(({ position, tile }) => {
			this.add(position, tile);
		});
	}

	add(position: Position, tile: Tile) {
		const posString = position.toString();
		if (this.grid[posString] !== undefined) {
			return;
		}

		this.updateMinMax(position);
		this.grid[posString] = tile;
	}

	private getEdgeConcernByDirection(
		position: Position,
		direction: CardinalDirection
	): Edge {
		const directionPosition = position.getAdjacents(direction);
		const tile = this.grid[directionPosition.toString()];

		if (tile === undefined) {
			return Edge.Undetermined;
		}

		const edge = tile[getOppositeDirection(direction)];
		if (edgeIsOpening(edge)) {
			return replaceEntranceWithUndetermined(edge);
		}
		return Edge.Undetermined;
	}

	getCriteria(position: Position): Tile {
		return new Tile(
			this.getEdgeConcernByDirection(position, CardinalDirection.North),
			this.getEdgeConcernByDirection(position, CardinalDirection.East),
			this.getEdgeConcernByDirection(position, CardinalDirection.South),
			this.getEdgeConcernByDirection(position, CardinalDirection.West)
		);
	}

	isFilled(position: Position): boolean {
		const posString = position.toString();
		return this.grid[posString] !== undefined;
	}

	toRoom(): Room {
		const offset = Position.origin().add(new Position(-this.minX, -this.minY));
		const grid = this.createArray();

		Object.entries(this.grid).map(([posString, tile]) => {
			const { x, y } = Position.parse(posString).add(offset);
			grid[y][x] = tile;
		});

		return {
			grid: grid,
			width: this.getlengthX(),
			height: this.getlengthY(),
		};
	}

	private createArray(): Tile[][] {
		const lengthX = this.getlengthX();
		const lengthY = this.getlengthY();
		const grid: Tile[][] = [];

		for (let i = 0; i < lengthY; ++i) {
			const row: Tile[] = [];
			for (let j = 0; j < lengthX; ++j) {
				row.push(Tile.undetermined());
			}
			grid.push(row);
		}

		return grid;
	}

	private getlengthX(): number {
		return this.maxX - this.minX + 1;
	}

	private getlengthY(): number {
		return this.maxY - this.minY + 1;
	}

	private updateMinMax({ x, y }: Position) {
		if (this.minX > x) {
			this.minX = x;
		}

		if (this.maxX < x) {
			this.maxX = x;
		}

		if (this.minY > y) {
			this.minY = y;
		}

		if (this.maxY < y) {
			this.maxY = y;
		}
	}
}
