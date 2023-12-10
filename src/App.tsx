import "./App.css";
import { Connection } from "./engine/ConnectionEnum";
import { MapGenerator } from "./engine/MapGenerator";
import { Generation } from "./components/Generation";

function App() {
	const width = 11;
	const height = 10;
	const mapGenerator = new MapGenerator(width, height);
	mapGenerator.setStartingPosition(4, 0, Connection.NorthSouth);
	mapGenerator.startGeneration();
	const gridSize = 60;

	return (
		<>
			<Generation
				gridSize={gridSize}
				map={mapGenerator.Map}
			/>
		</>
	);
}

export default App;
