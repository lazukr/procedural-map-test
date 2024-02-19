import { describe, test, expect } from "vitest";
import { Position } from "./Position";

describe("Position tests.", () => {
	test("constructor creates a position object.", () => {
		const x = 1;
		const y = 2;

		const pos = new Position(x, y);

		expect(pos.x).toBe(x);
		expect(pos.y).toBe(y);
	});

	test("add returns the sum of individual components.", () => {
		const x1 = 1;
		const y1 = 2;
		const x2 = 3;
		const y2 = 4;
		const pos1 = new Position(x1, y1);
		const pos2 = new Position(x2, y2);

		const result = pos1.add(pos2);

		expect(result.x).toBe(x1 + x2);
		expect(result.y).toBe(y1 + y2);
	});

	test("to string converts to JSON string.", () => {
		const pos = new Position(1, 2);
		const expectedString = `{"x":1,"y":2}`;

		const result = pos.toString();

		expect(result).toBe(expectedString);
	});

	test("static parse converts JSON string back to position object.", () => {
		const pos = new Position(1, 2);
		const str = pos.toString();

		const result = Position.parse(str);

		expect(result).toEqual(pos);
	});

	test("static origin returns 0, 0.", () => {
		const origin = new Position(0, 0);
		const result = Position.origin();

		expect(result).toEqual(origin);
	});
});
