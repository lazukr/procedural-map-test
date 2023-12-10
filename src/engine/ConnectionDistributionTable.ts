import { Connection } from "./ConnectionEnum";

export const ConnectionDistributionTable: Record<Connection, Connection[]> = {
	[Connection.None]: [],
	[Connection.Isolate]: [],
	[Connection.North]: [Connection.South],
	[Connection.South]: [Connection.North],
	[Connection.East]: [Connection.West],
	[Connection.West]: [Connection.East],
	[Connection.NorthSouth]: [Connection.North, Connection.South],
	[Connection.EastWest]: [Connection.East, Connection.West],
	[Connection.NorthWest]: [Connection.South, Connection.East],
	[Connection.NorthEast]: [Connection.South, Connection.West],
	[Connection.SouthWest]: [Connection.North, Connection.East],
	[Connection.SouthEast]: [Connection.North, Connection.West],
	[Connection.NorthSouthEast]: [
		Connection.South,
		Connection.North,
		Connection.West,
	],
	[Connection.NorthSouthWest]: [
		Connection.South,
		Connection.North,
		Connection.East,
	],
	[Connection.NorthEastWest]: [
		Connection.South,
		Connection.East,
		Connection.West,
	],
	[Connection.SouthEastWest]: [
		Connection.North,
		Connection.East,
		Connection.West,
	],
	[Connection.All]: [
		Connection.North,
		Connection.South,
		Connection.East,
		Connection.West,
	],
};

export function getValidConnections(connection: Connection) {
	const direction = ConnectionDistributionTable[connection];
	const list = Object.keys(Connection)
		.filter((k) => !isNaN(Number(k)))
		.map((k) => parseInt(k));
	return Array.from(
		new Set(direction.map((d) => list.filter((k) => (k & d) > 0)).flat())
	);
}
