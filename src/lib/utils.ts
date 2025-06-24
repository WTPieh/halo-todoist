import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

function toCamel(s: string): string {
	return s.replace(/([-_][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '');
	});
}

function isObject(o: any): o is Record<string, unknown> {
	return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
}

export function keysToCamel(o: any): any {
	if (isObject(o)) {
		const n: Record<string, unknown> = {};

		Object.keys(o).forEach((k) => {
			n[toCamel(k)] = keysToCamel(o[k]);
		});

		return n;
	} else if (Array.isArray(o)) {
		return o.map((i) => {
			return keysToCamel(i);
		});
	}

	return o;
}
