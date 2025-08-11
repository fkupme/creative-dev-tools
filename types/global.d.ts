declare module '@headlessui/vue' {
	import { Component } from 'vue';

	export const Switch: Component;
	export const Dialog: Component;
	export const Listbox: Component;
	export const Menu: Component;
	export const Popover: Component;
	export const Tab: Component;
	export const Disclosure: Component;
	export const RadioGroup: Component;
	export const Combobox: Component;
}

declare module 'chroma-js' {
	interface ChromaStatic {
		(color: string | number | number[]): ChromaInstance;
		hex(color: string): ChromaInstance;
		rgb(r: number, g: number, b: number): ChromaInstance;
		hsl(h: number, s: number, l: number): ChromaInstance;
		random(): ChromaInstance;
		mix(a: string, b: string, ratio?: number): ChromaInstance;
		scale(colors: string[]): ChromaScale;
		valid(color: string): boolean;
	}

	interface ChromaInstance {
		hex(): string;
		rgb(): [number, number, number];
		hsl(): [number, number, number];
		alpha(): number;
		alpha(value: number): ChromaInstance;
		darken(value?: number): ChromaInstance;
		brighten(value?: number): ChromaInstance;
		saturate(value?: number): ChromaInstance;
		desaturate(value?: number): ChromaInstance;
	}

	interface ChromaScale {
		(value: number): ChromaInstance;
		colors(count: number): string[];
	}

	const chroma: ChromaStatic;
	export default chroma;
}

declare module 'file-saver' {
	export function saveAs(blob: Blob, filename: string): void;
}

declare module 'nanoid' {
	export function nanoid(size?: number): string;
}

declare module 'colord' {
	export interface Colord {
		toHex(): string;
		toRgb(): { r: number; g: number; b: number; a: number };
		toHsl(): { h: number; s: number; l: number; a: number };
		toHsv(): { h: number; s: number; v: number; a: number };
		alpha(): number;
		alpha(value: number): Colord;
		lighten(value: number): Colord;
		darken(value: number): Colord;
		saturate(value: number): Colord;
		desaturate(value: number): Colord;
		rotate(value: number): Colord;
	}

	export function colord(color: string | number | object): Colord;
	export function random(): Colord;
	export function getFormat(color: string): string | null;
}

declare module 'sortablejs';

// Глобальные типы для Vue 3
declare global {
	// Эти типы должны быть доступны автоматически в Vue 3
	// но иногда нужно их явно объявить
	interface Window {
		// Дополнительные свойства окна при необходимости
	}
}

export {};

declare module '#app' {
	export function useColorMode(): {
		value: 'light' | 'dark' | 'system';
		preference: 'light' | 'dark' | 'system';
	};
}

declare module '#imports' {
	export function useColorMode(): {
		value: 'light' | 'dark' | 'system';
		preference: 'light' | 'dark' | 'system';
	};
}
