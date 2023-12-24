import { Tile } from "../cell/Tile";
import { Position, addPosition } from "./Position";

const NORTH: Position = {
	x: 0,
	y: -1,
} as const;

const SOUTH: Position = {
	x: 0,
	y: 1,
} as const;

const EAST: Position = {
	x: 1,
	y: 0,
} as const;

const WEST: Position = {
	x: -1,
	y: 0,
} as const;

export class StageMap {
	readonly width: number;
	readonly height: number;
	readonly map: Array<Array<Tile | null>>;
	private lastCellGenerated: Position[];

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.map = [];
		this.lastCellGenerated = [];
		this.initMap();
	}

	setPositions(positions: Position[], cells: Tile[]) {
		positions.forEach(({ x, y }, index) => {
			this.map[y][x] = cells[index];
		});
		this.lastCellGenerated = positions;
	}

	getNextCandidatePositions(): Position[] {
		const candidates = this.lastCellGenerated
			.map((i) => this.getValidCellNeighbors(i))
			.flat();
		return [...new Set(candidates.flat())].filter(
			({ x, y }) => this.map[y][x] === null
		);
	}

	getTileCandidate(position: Position): Tile {
		return {
			north: this.getPosition(addPosition(position, NORTH))?.south || 0,
			east: this.getPosition(addPosition(position, EAST))?.west || 0,
			south: this.getPosition(addPosition(position, SOUTH))?.north || 0,
			west: this.getPosition(addPosition(position, WEST))?.east || 0,
		};
	}

	getValidCellNeighbors(position: Position) {
		const tile = this.map[position.y][position.x];

		if (tile === null) {
			return [];
		}

		const neighbours = [];

		const northNeighbour = addPosition(position, NORTH);
		const eastNeighbour = addPosition(position, EAST);
		const southNeighbour = addPosition(position, SOUTH);
		const westNeighbour = addPosition(position, WEST);

		if (tile.north > 0 && this.inBound(northNeighbour)) {
			neighbours.push(northNeighbour);
		}
		if (tile.east > 0 && this.inBound(eastNeighbour)) {
			neighbours.push(eastNeighbour);
		}
		if (tile.south > 0 && this.inBound(southNeighbour)) {
			neighbours.push(southNeighbour);
		}
		if (tile.west > 0 && this.inBound(westNeighbour)) {
			neighbours.push(westNeighbour);
		}

		return neighbours;
	}

	private initMap() {
		for (let i = 0; i < this.height; ++i) {
			const row = [];
			for (let j = 0; j < this.width; ++j) {
				row.push(null);
			}
			this.map.push(row);
		}
	}

	private getPosition(position: Position): Tile | null {
		if (!this.inBound(position)) {
			return null;
		}
		return this.map[position.y][position.x];
	}

	private inBound({ x, y }: Position): boolean {
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
			return true;
		}
		return false;
	}
}
