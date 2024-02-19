import { Tile } from "../tile/Tile";
import { TileSet } from "../tile/TileSet";

export class TileSelector {
	private tileSet: TileSet;
	private terminationThreshold: number;
	private stableThreshold: number;

	constructor(
		tileSet: TileSet,
		terminationThreshold: number,
		stableThreshold: number
	) {
		this.tileSet = tileSet;

		if (terminationThreshold >= 1 || terminationThreshold <= 0) {
			throw new RangeError(
				"Termination threshold should be between 0 and 1 exclusive."
			);
		}

		if (stableThreshold >= 1 || stableThreshold <= 0) {
			throw new RangeError(
				"Stable threshold should be between 0 and 1 exclusive."
			);
		}

		this.terminationThreshold = terminationThreshold;
		this.stableThreshold = stableThreshold;
	}

	selectConstraint(constraint: Tile): Tile {
		const rand = Math.random();
		const tileSubSet = this.tileSet.getSubset(constraint);
		if (rand < this.terminationThreshold) {
			const tiles = tileSubSet.getTerminatingConnectablePaths();
			return tiles[Math.floor(Math.random() * tiles.length)];
		}

		if (rand < this.stableThreshold) {
			const tiles = tileSubSet.getStableConnectablePaths();
			return tiles[Math.floor(Math.random() * tiles.length)];
		}

		const tiles = tileSubSet.AllPaths;

		if (tiles.length === 0) {
			throw new Error("Shit went down buddy");
		}

		return tiles[Math.floor(Math.random() * tiles.length)];
	}
}
