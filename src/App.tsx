import { useState } from "react";
import { CellStage } from "./components/CellStage";
import { NavHeader } from "./components/NavHeader";
import { Position } from "./generation/room/Position";
import { RoomGenerator } from "./generation/room/RoomGenerator";
import { RoomGrid } from "./generation/room/RoomGrid";
import { TileSelector } from "./generation/room/TileSelector";
import { ENTRANCE_TILE, TILE_SET, TileSet } from "./generation/tile/TileSet";
import "bootstrap/dist/css/bootstrap.css";
import { Room } from "./generation/room/Room";

const DEFAULT_TERMINATION_PROBABILITY = 0.5;
const DEFAULT_STABLE_GROWTH_PROBABILITY = 0.2;
const DEFAULT_GRID_SIZE = 20;
const DEFAULT_GENERATION_LIMIT = 100;
const TILESET = new TileSet(TILE_SET);

function getNewRoomGrid() {
	return new RoomGrid([
		{
			tile: ENTRANCE_TILE,
			position: new Position(0, 0),
		},
	]);
}

function App() {
	const [room, setRoom] = useState<Room>(null!);
	const [generationLimit, setGenerationLimit] = useState(
		DEFAULT_GENERATION_LIMIT
	);
	const [terminationProbability, setTerminationProbability] = useState(
		DEFAULT_TERMINATION_PROBABILITY
	);
	const [stableGrowthProbability, setStableGrowthProbability] = useState(
		DEFAULT_STABLE_GROWTH_PROBABILITY
	);
	const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
	const [haveBorders, setHaveBorders] = useState(true);

	const generateNewRoom = () => {
		const tileSelector = new TileSelector(
			TILESET,
			terminationProbability,
			stableGrowthProbability
		);
		const roomGenerator = new RoomGenerator(
			getNewRoomGrid(),
			tileSelector,
			generationLimit
		);

		setRoom(roomGenerator.generate());
	};

	return (
		<div>
			<NavHeader
				stableProbability={stableGrowthProbability}
				setStableProbability={setStableGrowthProbability}
				terminationProbability={terminationProbability}
				setTerminationProbability={setTerminationProbability}
				gridSize={gridSize}
				setGridSize={setGridSize}
				generationLimit={generationLimit}
				setGenerationLimit={setGenerationLimit}
				generate={generateNewRoom}
				haveBorders={haveBorders}
				setHaveBorders={() => {
					setHaveBorders((s) => !s);
				}}
			/>
			{room && (
				<CellStage
					room={room}
					gridSize={gridSize}
					borders={haveBorders}
				/>
			)}
		</div>
	);
}

export default App;
