import { Connection } from "./ConnectionEnum";

export interface Map {
	cells: Connection[][];
	width: number;
	height: number;
}
