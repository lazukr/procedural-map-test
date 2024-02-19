// doesn't seem like typescript likes lower case mapping to upper case enum members

export enum CardinalDirection {
	North = "North",
	East = "East",
	South = "South",
	West = "West",
}

export function getOppositeDirection(
	direction: CardinalDirection
): CardinalDirection {
	switch (direction) {
		case CardinalDirection.North:
			return CardinalDirection.South;
		case CardinalDirection.East:
			return CardinalDirection.West;
		case CardinalDirection.South:
			return CardinalDirection.North;
		case CardinalDirection.West:
			return CardinalDirection.East;
	}
}

export type CardinalDirectionKey = keyof typeof CardinalDirection;
