import { isSafeExpression } from "./isSafeExpression";

export const functionCache = new Map<string, Function>();
export function compileExpression(
	expr: string,
	contextKeys: string[]
): Function | null {
	if (functionCache.has(expr)) return functionCache.get(expr)!;

	const keySet = new Set(contextKeys);
	if (!isSafeExpression(expr, keySet)) return null;

	try {
		const fn = new Function(...contextKeys, `return ${expr}`);
		functionCache.set(expr, fn);
		return fn;
	} catch {
		return null;
	}
}
