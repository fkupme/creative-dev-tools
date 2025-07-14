// Базовые типы для всех генераторов
export interface BoxShadowConfig {
	inset: boolean;
	offsetX: number;
	offsetY: number;
	blur: number;
	spread: number;
	color: string;
	opacity: number;
}

export interface TextShadowConfig {
	x: number;
	y: number;
	blur: number;
	color: string;
	opacity: number;
}

export interface TextShadowPreset {
	name: string;
	x: number;
	y: number;
	blur: number;
	color: string;
	opacity: number;
}

export interface MultiTextShadowPreset {
	name: string;
	description: string;
	layers: TextShadowConfig[];
}

export interface GradientConfig {
	type: 'linear' | 'radial' | 'conic';
	angle: number;
	colors: Array<{ color: string; stop: number }>;
}

export interface BorderRadiusConfig {
	topLeft: number;
	topRight: number;
	bottomLeft: number;
	bottomRight: number;
	unit: 'px' | 'rem' | '%';
}

export interface ColorPaletteConfig {
	baseColor: string;
	type:
		| 'complementary'
		| 'triadic'
		| 'analogous'
		| 'monochromatic'
		| 'tetradic';
	count: number;
	saturation: number;
	lightness: number;
}

export interface AnimationConfig {
	name: string;
	duration: number;
	timingFunction: string;
	delay: number;
	iterationCount: number | 'infinite';
	direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
	fillMode: 'none' | 'forwards' | 'backwards' | 'both';
}

// Общие типы
export interface GeneratorPreset {
	id: string;
	name: string;
	description: string;
	config: Record<string, unknown>;
	tags: string[];
	created: Date;
}

export interface ExportOptions {
	format: 'css' | 'scss' | 'json' | 'png' | 'svg';
	minify: boolean;
	includeComment: boolean;
}

export interface ToolInfo {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	route: string;
	featured: boolean;
}

// Утилитарные типы
export type RGBAColor = {
	r: number;
	g: number;
	b: number;
	a: number;
};

export type HSLColor = {
	h: number;
	s: number;
	l: number;
	a: number;
};

export type HEXColor = string;

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv';

// Типы для настроек приложения
export interface AppSettings {
	theme: 'light' | 'dark' | 'system';
	language: 'en' | 'ru';
	autoSave: boolean;
	exportFormat: ExportOptions['format'];
	showCodePreview: boolean;
	showGridLines: boolean;
}

// Типы для истории действий
export interface HistoryEntry {
	id: string;
	action: string;
	config: Record<string, unknown>;
	timestamp: Date;
}

export interface UndoRedoState {
	history: HistoryEntry[];
	currentIndex: number;
	maxHistory: number;
}

// Box Shadow Generator Types
export interface BoxShadowPreset {
	name: string;
	inset: boolean;
	offsetX: number;
	offsetY: number;
	blur: number;
	spread: number;
	color: string;
	opacity: number;
}

export interface BoxShadowExportOptions {
	format: 'css' | 'scss' | 'less' | 'stylus';
	includeVendorPrefixes: boolean;
	minify: boolean;
}

// Box Shadow Components Types (удалены так как теперь используются основные типы BoxShadowConfig и BoxShadowPreset)
