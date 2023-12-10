import { Layer, Rect, Stage } from "react-konva";
import { Cell } from "./Cell";
import { Map } from "../engine/Map";

interface GenerationProps {
	gridSize: number;
	map: Map;
}

export const Generation = ({ map, gridSize }: GenerationProps) => {
	const realWidth = map.width * gridSize;
	const realHeight = map.height * gridSize;
	const currentMap = map.cells;
	const flatMap = [];

	for (let i = 0; i < map.height; ++i) {
		for (let j = 0; j < map.width; ++j) {
			flatMap.push(
				<Cell
					key={`${i},${j}`}
					x={j * gridSize}
					y={i * gridSize}
					connection={currentMap[i][j]}
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
					fill={"#ffffff"}
				/>
				{flatMap}
			</Layer>
		</Stage>
	);
};
