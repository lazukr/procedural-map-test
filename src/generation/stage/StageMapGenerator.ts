import { Tile } from "../cell/Tile";
import { areCompatible } from "../cell/TileManipulation";
import { Position } from "./Position";
import { StageMap } from "./StageMap";

export class StageMapGenerator {
	private stage: StageMap;
	private readonly tileSet: readonly Tile[];
	private readonly randomFunc: () => number;

	constructor(
		stage: StageMap,
		tileSet: readonly Tile[],
		randomFunc = Math.random
	) {
		this.stage = stage;
		this.tileSet = tileSet;
		this.randomFunc = randomFunc;
	}

	selectTiles(candidates: Tile[]) {
		const possibleTiles = candidates.map((c) =>
			this.tileSet.filter((t) => areCompatible(c, t))
		);

		return possibleTiles.map((p) => {
			const length = p.length;
			const select = Math.floor(this.randomFunc() * length);
			return p[select];
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
