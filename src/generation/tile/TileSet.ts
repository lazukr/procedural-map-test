import { Edge } from "./Edge";
import { Tile } from "./Tile";
import * as TileManipulation from "./TileManipulation";

export enum PathTile {
	Entrance = "Entrance",
	OnePath = "OnePath",
	TwoPaths = "TwoPaths",
	ThreePaths = "ThreePaths",
	AllPaths = "AllPaths",
	NonEntrancePaths = "NonEntrancePaths",
}

export const ONE_WAY_TILE = new Tile(
	Edge.Corridor,
	Edge.Wall,
	Edge.Wall,
	Edge.Wall
);

export const LINE_TILE = new Tile(
	Edge.Corridor,
	Edge.Wall,
	Edge.Corridor,
	Edge.Wall
);

export const CORNER_TILE = new Tile(
	Edge.Corridor,
	Edge.Corridor,
	Edge.Wall,
	Edge.Wall
);

export const T_SHAPE_TILE = new Tile(
	Edge.Corridor,
	Edge.Corridor,
	Edge.Corridor,
	Edge.Wall
);
export const CROSS_TILE = new Tile(
	Edge.Corridor,
	Edge.Corridor,
	Edge.Corridor,
	Edge.Corridor
);

export const ENTRANCE_TILE = new Tile(
	Edge.Entrance,
	Edge.Corridor,
	Edge.Corridor,
	Edge.Corridor
);

interface TileSetProps {
	entranceTiles: Tile[];
	singlePathTiles: Tile[];
	twoPathTiles: Tile[];
	threePathTiles: Tile[];
	allPathTiles: Tile[];
}

type TileSetType = {
	[T in PathTile]: Tile[];
};

export class TileSet implements TileSetType {
	readonly Entrance: Tile[];
	readonly OnePath: Tile[];
	readonly TwoPaths: Tile[];
	readonly ThreePaths: Tile[];
	readonly AllPaths: Tile[];
	readonly NonEntrancePaths: Tile[];

	constructor({
		entranceTiles,
		singlePathTiles,
		twoPathTiles,
		threePathTiles,
		allPathTiles,
	}: TileSetProps) {
		this[PathTile.Entrance] = entranceTiles;
		this[PathTile.OnePath] = singlePathTiles;
		this[PathTile.TwoPaths] = twoPathTiles;
		this[PathTile.ThreePaths] = threePathTiles;
		this[PathTile.AllPaths] = allPathTiles;
		this[PathTile.NonEntrancePaths] = [
			...this[PathTile.OnePath],
			...this[PathTile.TwoPaths],
			...this[PathTile.ThreePaths],
			...this[PathTile.AllPaths],
		];
	}

	getSubset(criteria: Tile): TileSet {
		return new TileSet({
			entranceTiles: [...this.Entrance].filter((t) =>
				TileManipulation.canFill(t, criteria)
			),
			singlePathTiles: [...this.OnePath].filter((t) =>
				TileManipulation.canFill(t, criteria)
			),
			twoPathTiles: [...this.TwoPaths].filter((t) =>
				TileManipulation.canFill(t, criteria)
			),
			threePathTiles: [...this.ThreePaths].filter((t) =>
				TileManipulation.canFill(t, criteria)
			),
			allPathTiles: [...this.AllPaths].filter((t) =>
				TileManipulation.canFill(t, criteria)
			),
		});
	}

	getTerminatingConnectablePaths(): Tile[] {
		if (this.OnePath.length > 0) {
			return this.OnePath;
		} else if (this.TwoPaths.length > 0) {
			return this.TwoPaths;
		} else if (this.ThreePaths.length > 0) {
			return this.ThreePaths;
		} else {
			return this.AllPaths;
		}
	}

	getStableConnectablePaths(): Tile[] {
		if (this.TwoPaths.length > 0) {
			return this.TwoPaths;
		} else if (this.ThreePaths.length > 0) {
			return this.ThreePaths;
		} else {
			return this.AllPaths;
		}
	}

	getTilesByPaths(
		path: PathTile,
		criteria: Tile | undefined = undefined
	): Tile[] {
		const results = this[path];

		if (criteria === undefined) {
			return [...results];
		}

		return [...results].filter((t) => TileManipulation.canFill(t, criteria));
	}
}

export const TILE_SET: TileSetProps = {
	entranceTiles: TileManipulation.generateAllUniqueRotations(ENTRANCE_TILE),
	singlePathTiles: TileManipulation.generateAllUniqueRotations(ONE_WAY_TILE),
	twoPathTiles: [
		...TileManipulation.generateAllUniqueRotations(CORNER_TILE),
		...TileManipulation.generateAllUniqueRotations(LINE_TILE),
	],
	threePathTiles: TileManipulation.generateAllUniqueRotations(T_SHAPE_TILE),
	allPathTiles: TileManipulation.generateAllUniqueRotations(CROSS_TILE),
};
