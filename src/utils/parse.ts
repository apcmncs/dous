import type { Context } from "../types";

function transform(input: string, context: Context): string {
	return input.replace(
		/([a-zA-Z_$][\w$]*)\[((?:[^\[\]]|\[[^\[\]]*\])*)\]/g,
		(_, fnName: string, argsRaw: string) => {
			if (!(fnName in context)) return `{${fnName}[${argsRaw}]}`;

			const args = argsRaw
				.split(",")
				.map((arg) => arg.trim())
				.map((arg) => {
					if (/^\{.*\}$/.test(arg)) {
						const inner = arg.slice(1, -1);
						return JSON.stringify(parse(`{${inner}}`, context));
					}

					if (arg.includes("{") && arg.includes("}")) {
						return JSON.stringify(parse(arg, context));
					}

					if (/^\d+(\.\d+)?$/.test(arg)) return Number(arg);

					return JSON.stringify(arg);
				});

			return `${fnName}(${args.join(", ")})`;
		}
	);
}

export function parse(
	template: string,
	context: Context,
	maxDepth = 10
): string {
	let result = template;
	let loops = 0;
	while (/\{[^{}]+\}/.test(result) && loops < maxDepth) {
		result = result.replace(/\{([^{}]+)\}/g, (_, raw) => {
			const expr = transform(raw.trim(), context);
			try {
				const keys = Object.keys(context);
				const values = Object.values(context);
				const fn = new Function(...keys, `return ${expr};`);
				return String(fn(...values));
			} catch {
				return `{${raw}}`;
			}
		});
		loops++;
	}
	return result;
}
