import { Group, Rect } from "react-konva";
import { Tile } from "../generation/cell/Tile";
import { hasAtLeastOneOpening } from "../generation/cell/TileManipulation";

interface CellProps {
	x: number;
	y: number;
	size: number;
	cell: Tile | null;
}

interface PathDefinition {
	width: number;
	height: number;
	x: number;
	y: number;
	color: string;
}

const corridorWidth = 0.5;
const wallWidth = 0.25;

export const Cell = ({ x, y, size, cell }: CellProps) => {
	if (cell === null) {
		return <></>;
	}

	const northPath = getPath(cell.north);
	const eastPath = eastify(getPath(cell.east));
	const southPath = southify(getPath(cell.south));
	const westPath = westify(getPath(cell.west));

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
				stroke={"green"}
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
					x={size * northPath.x}
					y={size * northPath.y}
					fill={northPath.color}
				/>
			)}
			{cell.east > 0 && (
				<Rect
					width={size * eastPath.width}
					height={size * eastPath.height}
					x={size * eastPath.x}
					y={size * eastPath.y}
					fill={eastPath.color}
				/>
			)}
			{cell.west > 0 && (
				<Rect
					width={size * westPath.width}
					height={size * westPath.height}
					x={size * westPath.x}
					y={size * westPath.y}
					fill={westPath.color}
				/>
			)}
			{cell.south > 0 && (
				<Rect
					width={size * southPath.width}
					height={size * southPath.height}
					x={size * southPath.x}
					y={size * southPath.y}
					fill={southPath.color}
				/>
			)}
		</Group>
	);
};

function eastify(path: PathDefinition): PathDefinition {
	return {
		width: path.height,
		height: path.width,
		x: 1 - wallWidth,
		y: path.x,
		color: path.color,
	};
}

function southify(path: PathDefinition): PathDefinition {
	return {
		width: path.width,
		height: path.height,
		x: 1 - path.x - path.width,
		y: 1 - wallWidth,
		color: path.color,
	};
}

function westify(path: PathDefinition): PathDefinition {
	return {
		width: path.height,
		height: path.width,
		x: 0,
		y: 1 - path.x - path.width,
		color: path.color,
	};
}

function getPath(path: number): PathDefinition {
	switch (path) {
		case 1:
			return {
				width: corridorWidth,
				height: wallWidth,
				x: wallWidth,
				y: 0,
				color: "white",
			};
		case 2:
			return {
				width: corridorWidth + wallWidth,
				height: wallWidth,
				x: 0,
				y: 0,
				color: "white",
			};
		case 3:
			return {
				width: corridorWidth + wallWidth,
				height: wallWidth,
				x: wallWidth,
				y: 0,
				color: "white",
			};
		case 4:
			return {
				width: 1,
				height: wallWidth,
				x: 0,
				y: 0,
				color: "white",
			};

		default:
			return {
				width: 0,
				height: 0,
				x: 0,
				y: 0,
				color: "white",
			};
	}
}
