import "./App.css";
import { Generation } from "./components/Generation";
import { CROSS_TILE, TILE_SET } from "./generation/cell/TileSet";
import { makeFibonacciProbabilityVector } from "./generation/stage/ProbabilityVector";
import { StageMap } from "./generation/stage/StageMap";
import { StageMapGenerator } from "./generation/stage/StageMapGenerator";

function App() {
	const width = 20;
	const height = 20;
	const stage = new StageMap(width, height);

	stage.setPositions([{ x: 4, y: 0 }], [CROSS_TILE]);

	const probVector = makeFibonacciProbabilityVector(TILE_SET.length);

	const generator = new StageMapGenerator(stage, TILE_SET, probVector);
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
