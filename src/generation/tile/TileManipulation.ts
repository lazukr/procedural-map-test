import { POSITION_CARDINAL_MAP, Position } from "../room/Position";
import { CardinalDirection, CardinalDirectionKey } from "./CardinalDirection";
import { Edge, edgeIsOpening } from "./Edge";
import { Tile } from "./Tile";

const FULL_ROTATION = 4;

export function rotateClockwise(tile: Tile): Tile {
	return new Tile(
		tile[CardinalDirection.West],
		tile[CardinalDirection.North],
		tile[CardinalDirection.East],
		tile[CardinalDirection.South]
	);
}

export function contains(tile: Tile, edge: Edge): boolean {
	return Object.values(tile).some((e) => e === edge);
}

export function getEdge(tile: Tile, direction: CardinalDirection): Edge {
	return tile[direction];
}

export function isSame(tile1: Tile, tile2: Tile): boolean {
	return (
		tile1[CardinalDirection.West] === tile2[CardinalDirection.West] &&
		tile1[CardinalDirection.North] === tile2[CardinalDirection.North] &&
		tile1[CardinalDirection.East] === tile2[CardinalDirection.East] &&
		tile1[CardinalDirection.South] === tile2[CardinalDirection.South]
	);
}

export function hasAtLeastOneOpening(tile: Tile): boolean {
	return (
		edgeIsOpening(tile[CardinalDirection.North]) ||
		edgeIsOpening(tile[CardinalDirection.East]) ||
		edgeIsOpening(tile[CardinalDirection.South]) ||
		edgeIsOpening(tile[CardinalDirection.West])
	);
}

export function getValidNeighboursByDeltas(tile: Tile): Position[] {
	const positions: Position[] = [];
	if (edgeIsOpening(tile.North)) {
		positions.push(POSITION_CARDINAL_MAP[CardinalDirection.North]);
	}
	if (edgeIsOpening(tile.East)) {
		positions.push(POSITION_CARDINAL_MAP[CardinalDirection.East]);
	}
	if (edgeIsOpening(tile.South)) {
		positions.push(POSITION_CARDINAL_MAP[CardinalDirection.South]);
	}
	if (edgeIsOpening(tile.West)) {
		positions.push(POSITION_CARDINAL_MAP[CardinalDirection.West]);
	}
	return positions;
}

export function canFill(inputTile: Tile, referenceTile: Tile): boolean {
	const relevantEdges: [CardinalDirectionKey, Edge][] = Object.entries(
		referenceTile
	)
		.filter(([, value]) => value !== Edge.Undetermined)
		.map(([key, value]) => [key as CardinalDirectionKey, value]);

	return relevantEdges.every(([key, value]) => inputTile[key] === value);
}

export function generateAllUniqueRotations(tile: Tile): Tile[] {
	const tileList: Tile[] = [];

	let localTile = tile;
	for (let i = 0; i < FULL_ROTATION; ++i) {
		tileList.push(localTile);
		localTile = rotateClockwise(localTile);
	}

	const serializedTileList = tileList.map((i) => Tile.serialize(i));
	const serializedTileSet = [...new Set(serializedTileList)];
	return serializedTileSet.map((i) => Tile.deserialize(i));
}
