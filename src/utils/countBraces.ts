export function countBraces(input: string): number {
	const matches = input.match(/\{[^{}]+\}/g);
	return matches ? matches.length : 0;
}
