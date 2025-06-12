import { parseTemplate } from "./parseTemplate";
import type { Context } from "../types";

export function parseTemplateObject<T extends Record<string, string>>(
	obj: T,
	context: Context
): { [K in keyof T]: string } {
	const result = {} as { [K in keyof T]: string };
	for (const key in obj) {
		result[key] = parseTemplate(obj[key], context);
	}
	return result;
}
