export function isSafeExpression(
	expr: string,
	allowedKeys: Set<string>
): boolean {
	const identifiers =
		expr.replace(/`[^`]*`/g, "").match(/\b[a-zA-Z_$][\w$]*\b/g) || [];
	return identifiers.every((id) => allowedKeys.has(id));
}
