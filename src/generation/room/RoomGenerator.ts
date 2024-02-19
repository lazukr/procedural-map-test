import { Position } from "./Position";
import { Room } from "./Room";
import { RoomGrid } from "./RoomGrid";
import { TileSelector } from "./TileSelector";
import * as TileManipulation from "../tile/TileManipulation";

export class RoomGenerator {
	private roomGrid: RoomGrid;
	private tileSelector: TileSelector;
	private trackedTilePositions: Position[];
	private currentSteps: number;
	private readonly maxSteps: number;

	constructor(
		roomGrid: RoomGrid,
		tileSelector: TileSelector,
		maxSteps: number
	) {
		this.tileSelector = tileSelector;
		this.roomGrid = roomGrid;
		this.maxSteps = maxSteps;
		this.currentSteps = 0;
		this.trackedTilePositions = this.getTilesToGenerate(
			Object.keys(roomGrid.grid).map((i) => Position.parse(i))
		);
	}

	private getTilesToGenerate(positions: Position[]): Position[] {
		const candidates = positions.flatMap((i) => {
			const tile = this.roomGrid.grid[i.toString()];
			const neighbours = TileManipulation.getValidNeighboursByDeltas(tile);
			return neighbours.map((n) => i.add(n));
		});
		const valids = candidates.filter((c) => !this.roomGrid.isFilled(c));
		return valids;
	}

	private step(position: Position) {
		const criteria = this.roomGrid.getCriteria(position);
		const selection = this.tileSelector.selectConstraint(criteria);
		this.roomGrid.add(position, selection);
	}

	generate(): Room {
		while (
			this.trackedTilePositions.length > 0 &&
			this.currentSteps !== this.maxSteps
		) {
			this.trackedTilePositions.map((pos) => {
				this.step(pos);
			});
			this.currentSteps++;
			this.trackedTilePositions = this.getTilesToGenerate(
				this.trackedTilePositions
			);
		}

		return this.roomGrid.toRoom();
	}
}
