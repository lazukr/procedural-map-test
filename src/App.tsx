import "./App.css";
import { Generation } from "./components/Generation";
import { CROSS_TILE, TILE_SET } from "./generation/cell/TileSet";
import { StageMap } from "./generation/stage/StageMap";
import { StageMapGenerator } from "./generation/stage/StageMapGenerator";

function App() {
	const width = 20;
	const height = 20;
	const stage = new StageMap(width, height);

	stage.setPositions([{ x: 4, y: 0 }], [CROSS_TILE]);

	const generator = new StageMapGenerator(stage, TILE_SET);
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
