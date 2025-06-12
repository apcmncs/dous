import { countBraces } from "./countBraces";
import { compileExpression } from "./compileExpression";
import type { Context } from "../types";

function transformFnStrict(input: string, context: Context): string {
	return input.replace(
		/([a-zA-Z_$][\w$]*)\[((?:[^\[\]]|\[[^\[\]]*\])*)\]/g,
		(_, fnName: string, args: string): string => {
			const parsedArgs = args
				.split(",")
				.map((arg) => arg.trim())
				.map((arg) => {
					if (/^\{.*\}$/.test(arg)) {
						const inner = arg.slice(1, -1);
						const evaluated = parseTemplate(`{${inner}}`, context);
						return /^\d+(\.\d+)?$/.test(evaluated)
							? evaluated
							: JSON.stringify(evaluated);
					}

					return JSON.stringify(arg);
				});

			return `${fnName}(${parsedArgs.join(", ")})`;
		}
	);
}

export function parseTemplate(
	template: string,
	context: Context,
	maxDepth = 10
): string {
	const keys = Object.keys(context);
	const values = keys.map((k) => context[k]);

	let current: string = template;
	let loops = 0;

	while (countBraces(current) > 0 && loops < maxDepth) {
		current = current.replace(/\{([^{}]+)\}/g, (_, rawExpr: string): string => {
			let expr = rawExpr.trim();

			if (/\w+\s*\(/.test(expr)) return `{${rawExpr}}`;

			expr = transformFnStrict(expr, context);

			const fn = compileExpression(expr, keys);
			if (!fn) return `{${rawExpr}}`;
			try {
				return String(fn(...values));
			} catch {
				return `{${rawExpr}}`;
			}
		});

		loops++;
	}

	return current;
}
