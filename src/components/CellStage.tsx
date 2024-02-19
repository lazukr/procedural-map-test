import { Layer, Rect, Stage } from "react-konva";
import { Tile } from "../generation/tile/Tile";
import { Cell } from "./Cell";
import { Room } from "../generation/room/Room";

interface CellStageProps {
	room: Room;
	gridSize: number;
}

export const CellStage = ({ room, gridSize }: CellStageProps) => {
	const realWidth = room.width * gridSize;
	const realHeight = room.height * gridSize;
	const map = room.grid;
	const flatMap = [];

	for (let i = 0; i < room.height; ++i) {
		for (let j = 0; j < room.width; ++j) {
			flatMap.push(
				<Cell
					key={`${i},${j}`}
					x={j * gridSize}
					y={i * gridSize}
					tile={map[i][j] as Tile}
					size={gridSize}
				/>
			);
		}
	}

	return (
		<Stage
			width={realWidth}
			height={realHeight}
		>
			<Layer>
				<Rect
					width={realWidth}
					height={realHeight}
					fill={"#000000"}
				/>
				{flatMap}
			</Layer>
		</Stage>
	);
};
