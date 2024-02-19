import { CardinalDirection } from "../tile/CardinalDirection";

export class Position {
	readonly x: number;
	readonly y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(position: Position): Position {
		return new Position(this.x + position.x, this.y + position.y);
	}

	contains(position: Position): boolean {
		return this.x >= position.x && this.y >= position.y;
	}

	toString() {
		return JSON.stringify(this);
	}

	static parse(str: string): Position {
		const { x, y } = JSON.parse(str) as Position;
		return new Position(x, y);
	}

	getAdjacents(direction: CardinalDirection): Position {
		return this.add(POSITION_CARDINAL_MAP[direction]);
	}

	static origin(): Position {
		return new Position(0, 0);
	}
}

type PositionCardinalMap = {
	[P in CardinalDirection]: Position;
};

export const POSITION_CARDINAL_MAP: PositionCardinalMap = {
	North: new Position(0, -1),
	East: new Position(1, 0),
	South: new Position(0, 1),
	West: new Position(-1, 0),
};
