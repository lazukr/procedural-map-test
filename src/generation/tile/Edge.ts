export enum Edge {
	Undetermined = "Undetermined",
	Wall = "Wall",
	Entrance = "Entrance",
	Corridor = "Corridor",
	Open = "Open",
}

export function edgeIsOpening(edge: Edge): boolean {
	if (
		edge === Edge.Undetermined ||
		edge === Edge.Wall ||
		edge === Edge.Entrance
	) {
		return false;
	}

	return true;
}

export function replaceEntranceWithUndetermined(edge: Edge): Edge {
	if (edge === Edge.Entrance) {
		return Edge.Undetermined;
	}
	return edge;
}
