import "./App.css";
import { CellStage } from "./components/CellStage";
import { Position } from "./generation/room/Position";
import { RoomGenerator } from "./generation/room/RoomGenerator";
import { RoomGrid } from "./generation/room/RoomGrid";
import { TileSelector } from "./generation/room/TileSelector";
import { ENTRANCE_TILE, TILE_SET, TileSet } from "./generation/tile/TileSet";

function App() {
	const tileSet = new TileSet(TILE_SET);
	const tileSelector = new TileSelector(tileSet, 0.2, 0.6);
	const roomGrid = new RoomGrid([
		{
			tile: ENTRANCE_TILE,
			position: new Position(0, 0),
		},
	]);

	const roomGenerator = new RoomGenerator(roomGrid, tileSelector, 100);

	const room = roomGenerator.generate();
	const gridSize = 60;

	return (
		<CellStage
			room={room}
			gridSize={gridSize}
		/>
	);
}

export default App;
