import {
	Connection,
	ConnectionEnumContains,
	connectionInConstraints,
	connectionToValues,
	getConnectionDelta,
	getOppositeConnection,
	selectRandomConnection,
} from "./ConnectionEnum";
import { Map } from "./Map";

export class MapGenerator {
	readonly width: number;
	readonly height: number;
	map: Connection[][];
	startingPoints: [number, number][];
	unfilledCells: number;

	get Map(): Map {
		return {
			width: this.width,
			height: this.height,
			cells: this.map,
		};
	}

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.startingPoints = [];
		this.unfilledCells = width * height;

		this.map = [];
		for (let i = 0; i < height; ++i) {
			const row = [];
			for (let j = 0; j < width; ++j) {
				row.push(Connection.None);
			}
			this.map.push(row);
		}
	}

	setStartingPosition(width: number, height: number, connection: Connection) {
		if (width > this.width || width < 0) {
			throw new RangeError(
				`width is less than 0 or greater than ${this.width}`
			);
		}

		if (height > this.height || height < 0) {
			throw new RangeError(
				`width is less than 0 or greater than ${this.height}`
			);
		}

		this.map[height][width] = connection;
		this.unfilledCells -= 1;
		this.startingPoints.push([width, height]);
	}

	startGeneration() {
		let result = this.identifyNextGenerationCells();

		while (result.length > 0) {
			this.startingPoints = result.map(([x, y]) => [x, y]);
			const data = result.map((i) => this.getSurroundingConnections(i));
			data.map((i) => this.selectCandidate(i));
			result = this.identifyNextGenerationCells();
		}
	}

	selectCandidate(cell: [x: number, y: number, constraints: Connection[]]) {
		const [x, y, constraints] = cell;
		const candidates = connectionInConstraints(constraints);
		if (candidates.length === 0) {
			this.map[y][x] = Connection.Isolate;
		}
		const selection = selectRandomConnection(candidates);
		this.map[y][x] = selection;
	}

	getSurroundingConnections(
		cell: [x: number, y: number]
	): [x: number, y: number, c: Connection[]] {
		const delta = [
			[-1, 0, Connection.East],
			[1, 0, Connection.West],
			[0, -1, Connection.South],
			[0, 1, Connection.North],
		];
		const [x, y] = cell;
		const pontentialConnections = delta
			.map(([dx, dy, c]) => {
				return [x + dx, y + dy, c] as [number, number, Connection];
			})
			.filter(([x, y]) => {
				return x >= 0 && x < this.width && y >= 0 && y < this.height;
			})
			.filter(([x, y]) => this.map[y][x] !== Connection.None)
			.filter(([x, y, c]) => ConnectionEnumContains(this.map[y][x], c))
			.map(([, , c]) => getOppositeConnection(c));
		return [x, y, pontentialConnections];
	}

	identifyNextGenerationCells() {
		// look through list of current starting points
		const candidates = this.startingPoints.map(([x, y]) => {
			// if the delta to the connections fit within the map range
			// include it as a point to make the next connection for
			const connections = connectionToValues(this.map[y][x]);
			return this.getValidConnections(connections, x, y);
		});
		return [...new Set(candidates.flat())].filter(
			([x, y]) => this.map[y][x] === Connection.None
		);
	}

	// get all deltas around the cells and see if they are within range
	getValidConnections(connections: Connection[], x: number, y: number) {
		return connections
			.map((c) => {
				const [dx, dy] = getConnectionDelta(c);
				return [x + dx, y + dy] as [number, number];
			})
			.filter(([x, y]) => {
				return x >= 0 && x < this.width && y >= 0 && y < this.height;
			});
	}
}

/**
 * What does the generator care about?
 * - what cell classifications are used
 * - how the generation algorithm will behave
 * - dimensions?
 */

/**
 * process of generation
 * - look through identified points
 * - find all valid connections to continue off of that point
 * - consolidate this into one array of coordinates
 * - for each coordinate
 * - consolidate all surrounding connections
 * - use this to figure out what connection fits best
 */
