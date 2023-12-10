import { Group, Rect } from "react-konva";
import { Connection, connectionToValues } from "../engine/ConnectionEnum";

interface CellProps {
	x: number;
	y: number;
	size: number;
	connection: Connection;
}

export const Cell = ({ x, y, size, connection }: CellProps) => {
	const wallSize = size * 0.3;
	const walkSize = size * 0.4;

	const list = connectionToValues(connection);
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
				fill={"#000000"}
			/>

			{list.length !== 0 && (
				<Rect
					width={walkSize}
					height={walkSize}
					x={wallSize}
					y={wallSize}
					fill={"#ffffff"}
				/>
			)}
			{list.includes(Connection.North) && (
				<Rect
					width={walkSize}
					height={walkSize}
					x={wallSize}
					y={0}
					fill={"#ffffff"}
				/>
			)}
			{list.includes(Connection.South) && (
				<Rect
					width={walkSize}
					height={walkSize}
					x={wallSize}
					y={size - wallSize}
					fill={"#ffffff"}
				/>
			)}
			{list.includes(Connection.East) && (
				<Rect
					width={walkSize}
					height={walkSize}
					x={size - wallSize}
					y={wallSize}
					fill={"#ffffff"}
				/>
			)}
			{list.includes(Connection.West) && (
				<Rect
					width={walkSize}
					height={walkSize}
					x={0}
					y={wallSize}
					fill={"#ffffff"}
				/>
			)}
		</Group>
	);
};
