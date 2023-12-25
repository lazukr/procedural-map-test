export function makeFibonacciProbabilityVector(length: number): number[] {
	const fibo = getFibonacciSequenceSum(length);
	const sum = fibo[length - 1];
	const baseProbability = 1 / sum;
	const fiboProbabilityVector = fibo.map((i) => i * baseProbability);
	return fiboProbabilityVector;
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
