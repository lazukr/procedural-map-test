export enum Connection {
	None = 0,
	Isolate = 1 << 0,
	North = 1 << 1,
	South = 1 << 2,
	East = 1 << 3,
	West = 1 << 4,
	NorthSouth = North | South,
	EastWest = East | West,
	NorthWest = North | West,
	NorthEast = North | East,
	SouthWest = South | West,
	SouthEast = South | East,
	NorthSouthEast = North | South | East,
	NorthSouthWest = North | South | West,
	NorthEastWest = North | East | West,
	SouthEastWest = South | East | West,
	All = North | South | East | West,
}

export const ConnectionList = [
	Connection.Isolate,
	Connection.North,
	Connection.South,
	Connection.West,
	Connection.East,
	Connection.NorthSouth,
	Connection.EastWest,
	Connection.NorthWest,
	Connection.NorthEast,
	Connection.SouthWest,
	Connection.SouthEast,
	Connection.NorthSouthEast,
	Connection.NorthSouthWest,
	Connection.NorthEastWest,
	Connection.SouthEastWest,
	Connection.All,
];

export type PrimaryConnections = Connection.All;

export function connectionToValues(n: Connection) {
	const values: Connection[] = [];
	while (n) {
		const bit = n & (~n + 1);
		values.push(Connection[Connection[bit] as keyof typeof Connection]);
		n ^= bit;
	}
	return values;
}

export function connectionInConstraints(n: Connection[]) {
	return ConnectionList.filter((c) => n.every((i) => i & c));
}

export function ConnectionEnumContains(
	current: Connection,
	incoming: Connection
) {
	return (current & incoming) === incoming;
}

export function getOppositeConnection(c: Connection) {
	switch (c) {
		case Connection.North:
			return Connection.South;
		case Connection.South:
			return Connection.North;
		case Connection.East:
			return Connection.West;
		case Connection.West:
			return Connection.East;
		default:
			throw new Error("Not a trivial connection flag.");
	}
}

export function getConnectionDelta(n: Connection) {
	switch (n) {
		case Connection.North:
			return [0, -1];
		case Connection.South:
			return [0, 1];
		case Connection.East:
			return [1, 0];
		case Connection.West:
			return [-1, 0];
		default:
			throw new Error("Invalid connection delta");
	}
}

export function selectRandomConnection(c: Connection[]) {
	return c[Math.floor(Math.random() * c.length)];
}
