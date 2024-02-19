import { Tile } from "../tile/Tile";

export interface Room {
	readonly grid: Tile[][];
	readonly width: number;
	readonly height: number;
}
