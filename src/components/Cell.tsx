import { Group, Rect } from "react-konva";
import { Tile } from "../generation/tile/Tile";
import { Edge } from "../generation/tile/Edge";

interface CellProps {
	x: number;
	y: number;
	size: number;
	tile: Tile;
}

interface EdgeProps {
	size: number;
	edge: Edge;
}

const corridorWidth = 0.5;
const wallWidth = 0.25;

export const Cell = ({ x, y, size, tile }: CellProps) => {
	if (Tile.isUndetermined(tile)) {
		return <></>;
	}

	return (
		<Group
			x={x}
			y={y}
		>
			<Rect
				width={size * corridorWidth}
				height={size * corridorWidth}
				x={size * wallWidth}
				y={size * wallWidth}
				fill={"white"}
			/>
			<North
				size={size}
				edge={tile.North}
			/>
			<East
				size={size}
				edge={tile.East}
			/>
			<South
				size={size}
				edge={tile.South}
			/>
			<West
				size={size}
				edge={tile.West}
			/>
			<Rect
				width={size}
				height={size}
				x={0}
				y={0}
				stroke={"green"}
			/>
		</Group>
	);
};

const North = ({ size, edge }: EdgeProps) => {
	return (
		<Rect
			width={size * corridorWidth}
			height={size * wallWidth}
			x={size * wallWidth}
			y={0}
			fill={getFillColourByEdge(edge)}
		/>
	);
};

const East = ({ size, edge }: EdgeProps) => {
	return (
		<Rect
			width={size * wallWidth}
			height={size * corridorWidth}
			x={size - size * wallWidth}
			y={size * wallWidth}
			fill={getFillColourByEdge(edge)}
		/>
	);
};

const South = ({ size, edge }: EdgeProps) => {
	return (
		<Rect
			width={size * corridorWidth}
			height={size * wallWidth}
			x={size * wallWidth}
			y={size - size * wallWidth}
			fill={getFillColourByEdge(edge)}
		/>
	);
};

const West = ({ size, edge }: EdgeProps) => {
	return (
		<Rect
			width={size * wallWidth}
			height={size * corridorWidth}
			x={0}
			y={size * wallWidth}
			fill={getFillColourByEdge(edge)}
		/>
	);
};

function getFillColourByEdge(edge: Edge): string {
	switch (edge) {
		case Edge.Corridor:
			return "white";
		case Edge.Entrance:
			return "red";
		case Edge.Open:
			return "blue";
		case Edge.Undetermined:
			return "black";
		case Edge.Wall:
			return "black";
		default:
			return "pink";
	}
}
