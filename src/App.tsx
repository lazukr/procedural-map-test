import "./App.css";
import { Generation } from "./components/Generation";
import { CROSS_TILE, TILE_SET } from "./generation/cell/TileSet";
import {
	makeFibonacciProbabilityVector,
	probabilityManipulationVector,
} from "./generation/stage/ProbabilityVector";
import { StageMap } from "./generation/stage/StageMap";
import { StageMapGenerator } from "./generation/stage/StageMapGenerator";

function App() {
	const width = 20;
	const height = 20;
	const stage = new StageMap(width, height);

	/*
	verify shapes

	const pos = [];
	const tiles = [];
	for (let i = 0; i < TILE_SET.length; ++i) {
		for (let j = 0; j < TILE_SET[i].length; ++j) {
			pos.push({ x: j, y: i });
			tiles.push(TILE_SET[i][j]);
		}
	}

	stage.setPositions(pos, tiles);
	*/

	stage.setPositions([{ x: 4, y: 0 }], [CROSS_TILE]);
	const probVector = makeFibonacciProbabilityVector(TILE_SET.length);

	const maniVector = probabilityManipulationVector(probVector.length, 155);
	const generator = new StageMapGenerator(
		stage,
		TILE_SET,
		probVector,
		maniVector
	);
	generator.generate();

	const gridSize = 60;

	return (
		<>
			<Generation
				gridSize={gridSize}
				stage={stage}
			/>
		</>
	);
}

export default App;
