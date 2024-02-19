export function makeFibonacciProbabilityVector(length: number): number[] {
	const fibo = getFibonacciSequenceSum(length);
	const sum = fibo[length - 1];
	const baseProbability = 1 / sum;
	const fiboProbabilityVector = fibo.map((i) => i * baseProbability);
	return fiboProbabilityVector;
}

export function probabilityManipulationVector(
	length: number,
	decay: number = 100
): number[] {
	const probabilityDecay = decay / 10000;
	const vector = [];
	for (let i = 0; i < length; ++i) {
		vector.push(1 - i * probabilityDecay);
	}
	return vector.reverse();
}

export function vectorPower(vector: number[], power: number) {
	return vector.map((i) => Math.pow(i, power));
}

export function multiplyVectors(vec1: number[], vec2: number[]): number[] {
	const result = [];

	for (let i = 0; i < vec1.length; ++i) {
		result.push(vec1[i] * vec2[i]);
	}
	return result;
}

function getFibonacciSequenceSum(length: number): number[] {
	if (length < 2) {
		throw new Error("length cannot be less than 2.");
	}

	const base = [1, 1];

	let i = 2;
	while (i < length) {
		base.push(base[i - 1] + base[i - 2]);
		i++;
	}

	const reverse = base.reverse();
	for (let i = 1; i < reverse.length; ++i) {
		reverse[i] += reverse[i - 1];
	}
	return reverse;
}
