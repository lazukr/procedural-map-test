import { Group, Rect } from "react-konva";
import { Tile } from "../generation/cell/Tile";
import { hasAtLeastOneOpening } from "../generation/cell/TileManipulation";

interface CellProps {
	x: number;
	y: number;
	size: number;
	cell: Tile | null;
}

const corridorWidth = 0.5;
const wallWidth = 0.25;

export const Cell = ({ x, y, size, cell }: CellProps) => {
	if (cell === null) {
		return <></>;
	}

	const northPath = getPath(cell.north);
	const eastPath = getPath(cell.east);
	const southPath = getPath(cell.south);
	const westPath = getPath(cell.west);

	return (
		<Group
			x={x}
			y={y}
		>
			<Rect
				width={size}
				height={size}
				x={0}
				y={0}
				fill={"black"}
			/>
			{hasAtLeastOneOpening(cell) && (
				<Rect
					width={size * corridorWidth}
					height={size * corridorWidth}
					x={size * wallWidth}
					y={size * wallWidth}
					fill={"white"}
				/>
			)}
			{cell.north > 0 && (
				<Rect
					width={size * northPath.width}
					height={size * northPath.height}
					x={size * wallWidth}
					y={0}
					fill={"white"}
				/>
			)}
			{cell.east > 0 && (
				<Rect
					width={size * eastPath.height}
					height={size * eastPath.width}
					x={size - size * wallWidth}
					y={size * wallWidth}
					fill={"white"}
				/>
			)}
			{cell.west > 0 && (
				<Rect
					width={size * westPath.height}
					height={size * westPath.width}
					x={0}
					y={size * wallWidth}
					fill={"white"}
				/>
			)}
			{cell.south > 0 && (
				<Rect
					width={size * southPath.width}
					height={size * southPath.height}
					x={size * wallWidth}
					y={size - size * wallWidth}
					fill={"white"}
				/>
			)}
		</Group>
	);
};

function getPath(path: number) {
	switch (path) {
		case 1:
			return {
				width: corridorWidth,
				height: wallWidth,
			};
		default:
			return {
				width: 0,
				height: 0,
			};
	}
}
