import { Layer, Rect, Stage } from "react-konva";
import { Cell } from "./Cell";
import { StageMap } from "../generation/stage/StageMap";
import { Tile } from "../generation/cell/Tile";

interface GenerationProps {
	gridSize: number;
	stage: StageMap;
}

export const Generation = ({ stage, gridSize }: GenerationProps) => {
	const realWidth = stage.width * gridSize;
	const realHeight = stage.height * gridSize;
	const currentMap = stage.map;
	const flatMap = [];

	for (let i = 0; i < stage.height; ++i) {
		for (let j = 0; j < stage.width; ++j) {
			flatMap.push(
				<Cell
					key={`${i},${j}`}
					x={j * gridSize}
					y={i * gridSize}
					cell={currentMap[i][j] as Tile}
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
