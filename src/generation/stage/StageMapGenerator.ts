import { Tile } from "../cell/Tile";
import { areCompatible } from "../cell/TileManipulation";
import { ISOLATE_TILE } from "../cell/TileSet";
import { Position } from "./Position";
import { multiplyVectors, vectorPower } from "./ProbabilityVector";
import { StageMap } from "./StageMap";

export class StageMapGenerator {
	private stage: StageMap;
	private readonly tileSet: readonly Tile[][];
	private readonly randomFunc: () => number;
	private readonly probabilityVector: number[];
	private readonly probabilityManipulationVector: number[];

	constructor(
		stage: StageMap,
		tileSet: readonly Tile[][],
		probabilityVector: number[],
		probabilityManipulationVector: number[],
		randomFunc = Math.random
	) {
		this.stage = stage;
		this.tileSet = tileSet;
		this.probabilityVector = probabilityVector;
		this.probabilityManipulationVector = probabilityManipulationVector;
		this.randomFunc = randomFunc;
	}

	selectTiles(candidates: Tile[], probabilityVector: number[]): Tile[] {
		const possibleTileSets = candidates.map((c) =>
			this.tileSet.map((t) => t.filter((s) => areCompatible(c, s)))
		);

		return possibleTileSets.map((p) => {
			let i = 0;

			const randomTileSet = this.randomFunc();

			while (randomTileSet > probabilityVector[i]) {
				i++;
			}

			while (i > -1 && p[i].length === 0) {
				i--;
			}

			if (i < 0 || p[i].length === 0) {
				return ISOLATE_TILE;
			}

			const length = p[i].length;
			const select = Math.floor(this.randomFunc() * length);
			return p[i][select];
		});
	}

	generateIteration(
		candidatePositions: Position[],
		iteration: number
	): Position[] {
		const candidatePositionTiles = candidatePositions.map((c) =>
			this.stage.getTileCandidate(c)
		);

		const manipulationVector = vectorPower(
			this.probabilityManipulationVector,
			iteration
		);
		const probabilityVector = multiplyVectors(
			this.probabilityVector,
			manipulationVector
		);

		const selectionTiles = this.selectTiles(
			candidatePositionTiles,
			probabilityVector
		);
		this.stage.setPositions(candidatePositions, selectionTiles);
		return this.stage.getNextCandidatePositions();
	}

	generate(iterations: number = -1) {
		let candidatePositions = this.stage.getNextCandidatePositions();

		if (iterations < 0) {
			let i = 0;
			while (candidatePositions.length > 0) {
				candidatePositions = this.generateIteration(candidatePositions, i);
				i++;
			}
		} else {
			for (let i = 0; i < iterations; ++i) {
				candidatePositions = this.generateIteration(candidatePositions, i);
			}
		}
	}
}
