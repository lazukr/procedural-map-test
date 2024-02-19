import { Tile } from "../tile/Tile";
import { TileSet } from "../tile/TileSet";

export class TileSelector {
	private tileSet: TileSet;
	private growthThreshold: number;

	constructor(tileSet: TileSet, growthThreshold: number) {
		this.tileSet = tileSet;

		if (growthThreshold >= 1 || growthThreshold <= 0) {
			throw new RangeError(
				"Grow threshold should be between 0 and 1 exclusive."
			);
		}

		this.growthThreshold = growthThreshold;
	}

	selectConstraint(constraint: Tile): Tile {
		const rand = Math.random();
		const tileSubSet = this.tileSet.getSubset(constraint);
		if (rand < this.growthThreshold) {
			const tiles = tileSubSet.getMinimumConnectablePaths();
			return tiles[Math.floor(Math.random() * tiles.length)];
		}
		const tiles = tileSubSet.AllPaths;

		if (tiles.length === 0) {
			throw new Error("Shit went down buddy");
		}

		return tiles[Math.floor(Math.random() * tiles.length)];
	}
}
