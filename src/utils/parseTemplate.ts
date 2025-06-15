import { parse } from "./parse";
import type { Context } from "../types";

export function parseTemplate<T>(obj: T, context: Context, depth = 10): T {
	if (typeof obj === "string") {
		return parse(obj, context, depth) as unknown as T;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) =>
			parseTemplate(item, context, depth)
		) as unknown as T;
	}

	if (typeof obj === "object" && obj !== null) {
		const result: any = {};
		for (const key in obj) {
			result[key] = parseTemplate((obj as any)[key], context, depth);
		}
		return result;
	}

	return obj;
}
