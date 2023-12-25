import { Tile } from "../cell/Tile";
import { areCompatible } from "../cell/TileManipulation";
import { Position } from "./Position";
import { StageMap } from "./StageMap";

export class StageMapGenerator {
	private stage: StageMap;
	private readonly tileSet: readonly Tile[][];
	private readonly randomFunc: () => number;
	private readonly probabilityVector: number[];

	constructor(
		stage: StageMap,
		tileSet: readonly Tile[][],
		probabilityVector: number[],
		randomFunc = Math.random
	) {
		this.stage = stage;
		this.tileSet = tileSet;
		this.probabilityVector = probabilityVector;
		this.randomFunc = randomFunc;
	}

	selectTiles(candidates: Tile[]): Tile[] {
		const possibleTileSets = candidates.map((c) =>
			this.tileSet.map((t) => t.filter((s) => areCompatible(c, s)))
		);

		return possibleTileSets.map((p) => {
			let i = 0;

			const randomTileSet = this.randomFunc();

			while (randomTileSet > this.probabilityVector[i]) {
				i++;
			}

			while (p[i].length === 0) {
				i--;
			}

			const length = p[i].length;
			const select = Math.floor(this.randomFunc() * length);
			return p[i][select];
		});
	}

	generateIteration(candidatePositions: Position[]): Position[] {
		const candidatePositionTiles = candidatePositions.map((c) =>
			this.stage.getTileCandidate(c)
		);
		const selectionTiles = this.selectTiles(candidatePositionTiles);
		this.stage.setPositions(candidatePositions, selectionTiles);
		return this.stage.getNextCandidatePositions();
	}

	generate() {
		let candidatePositions = this.stage.getNextCandidatePositions();

		while (candidatePositions.length > 0) {
			candidatePositions = this.generateIteration(candidatePositions);
		}
	}
}
