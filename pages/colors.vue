<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<SeoMetaSeo
			title="Color Palette"
			description="Создание цветовых палитр и дизайн‑тем. Копирование CSS‑переменных и градиентов."
			:ogType="'website'"
		/>
		<header
			class="border-b border-secondary-200 dark:border-secondary-700 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md"
		>
			<div class="container-fluid h-16 flex items-center justify-between">
				<h1 class="text-lg md:text-xl font-semibold">Color Palette</h1>
				<div class="flex items-center gap-2">
					<UiButton size="sm" variant="ghost" @click="copyCSS">
						<Icon name="heroicons:clipboard" class="w-4 h-4 mr-1" />Копировать
						CSS Vars
					</UiButton>
				</div>
			</div>
		</header>

		<div class="container-fluid py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls -->
				<div class="xl:col-span-1 xl:sticky xl:top-24 space-y-6 card p-6">
					<UiColorPicker
						:model-value="baseColor"
						label="Базовый цвет"
						@update:model-value="onBaseColor"
					/>
					<UiSelect
						:model-value="harmony"
						@update:model-value="onHarmony"
						:options="harmonyOptions"
					/>
					<UiSlider
						:model-value="count"
						@update:model-value="onCount"
						label="Количество"
						:min="3"
						:max="12"
					/>

					<!-- Theme presets -->
					<div>
						<h3 class="text-sm font-medium mb-2">Дизайн-пресеты тем</h3>
						<div class="flex gap-3 items-center mb-2">
							<span class="text-xs text-secondary-500">Вариант:</span>
							<UiToggle
								:model-value="darkVariant"
								@update:model-value="onDarkToggle"
								label="Dark"
							/>
						</div>
						<div
							class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4"
						>
							<button
								v-for="preset in computedThemePresets"
								:key="preset.name + (darkVariant ? '-dark' : '-light')"
								class="rounded-lg border bg-white dark:bg-secondary-800 p-3 text-left hover:shadow-medium transition-all"
								@click="applyThemePreset(preset)"
							>
								<div
									class="h-28 grid grid-rows-[auto_1fr_auto] gap-2"
									:style="{
										color: preset.text,
										backgroundColor: preset.surface,
									}"
								>
									<div
										class="h-4 rounded"
										:style="{
											background: preset.gradients[0] || preset.primary,
										}"
									></div>
									<div class="grid grid-cols-3 gap-2">
										<div
											class="h-16 rounded"
											:style="{ backgroundColor: preset.secondary }"
										></div>
										<div
											class="h-16 rounded"
											:style="{ backgroundColor: preset.tertiary }"
										></div>
										<div
											class="h-16 rounded"
											:style="{ backgroundColor: preset.accent2 }"
										></div>
									</div>
									<div
										class="h-4 rounded"
										:style="{ backgroundColor: preset.accent1 }"
									></div>
								</div>
								<div class="mt-2 text-xs font-medium">
									{{ preset.name }} {{ darkVariant ? "(Dark)" : "(Light)" }}
								</div>
							</button>
						</div>
					</div>
				</div>

				<!-- Preview & Code -->
				<div class="xl:col-span-2 space-y-6">
					<!-- Role colors OR generated palette -->
					<div class="card p-6">
						<div
							class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
						>
							<div
								v-for="c in displayColors"
								:key="c.label"
								class="rounded-lg border overflow-hidden"
							>
								<div class="h-20" :style="{ backgroundColor: c.value }" />
								<div class="p-2 text-xs flex items-center justify-between">
									<span class="font-medium">{{ c.label }}</span>
									<button
										class="text-secondary-500 hover:text-secondary-700"
										@click="copySingle(c.value)"
									>
										<Icon name="heroicons:clipboard" class="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Theme gradients -->
					<div class="card p-6" v-if="themeGradients.length">
						<h3 class="text-sm font-medium mb-3">Градиенты пресета</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div
								v-for="(g, i) in themeGradients"
								:key="i"
								class="rounded-lg border h-24"
								:style="{ background: g }"
								@click="copySingle(g)"
								title="Скопировать градиент"
							/>
						</div>
					</div>

					<div class="card p-6">
						<UiCodeBlock
							:code="cssVars"
							language="css"
							title=":root переменные"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import chroma from "chroma-js";
import { computed, ref } from "vue";

const baseColor = ref("#0ea5e9");
const harmony = ref<
	"complementary" | "triadic" | "analogous" | "tetradic" | "monochromatic"
>("analogous");
const count = ref(6);
const darkVariant = ref(false);

const onBaseColor = (c: string) => {
	baseColor.value = c;
};
const onHarmony = (v: any) => {
	harmony.value = v;
};
const onCount = (v: number) => {
	count.value = v;
};
const onDarkToggle = (v: boolean) => {
	darkVariant.value = v;
};

const harmonyOptions = [
	{ label: "Analogous", value: "analogous" },
	{ label: "Complementary", value: "complementary" },
	{ label: "Triadic", value: "triadic" },
	{ label: "Tetradic", value: "tetradic" },
	{ label: "Monochromatic", value: "monochromatic" },
];

// Дизайн-пресеты тем
interface ThemePreset {
	name: string;
	primary: string;
	secondary: string;
	tertiary: string;
	accent1: string;
	accent2: string;
	surface: string;
	text: string;
	gradients: string[];
}

// База (light)
const baseThemePresets: ThemePreset[] = [
	{
		name: "Ocean Breeze",
		primary: "#0ea5e9",
		secondary: "#1e293b",
		tertiary: "#334155",
		accent1: "#22c55e",
		accent2: "#8b5cf6",
		surface: "#ffffff",
		text: "#0f172a",
		gradients: [
			"linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 100%)",
			"radial-gradient(circle, #22c55e 0%, #0ea5e9 100%)",
		],
	},
	{
		name: "Sunset Pop",
		primary: "#fb7185",
		secondary: "#111827",
		tertiary: "#374151",
		accent1: "#f59e0b",
		accent2: "#a78bfa",
		surface: "#ffffff",
		text: "#0f172a",
		gradients: [
			"linear-gradient(135deg, #fb7185 0%, #f59e0b 100%)",
			"linear-gradient(90deg, #a78bfa 0%, #fb7185 100%)",
		],
	},
	{
		name: "Clean Light",
		primary: "#3b82f6",
		secondary: "#e5e7eb",
		tertiary: "#cbd5e1",
		accent1: "#10b981",
		accent2: "#f43f5e",
		surface: "#ffffff",
		text: "#0f172a",
		gradients: [
			"linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
			"radial-gradient(circle, #e5e7eb 0%, #cbd5e1 100%)",
		],
	},
	{
		name: "Emerald Night",
		primary: "#10b981",
		secondary: "#0f172a",
		tertiary: "#1f2937",
		accent1: "#22d3ee",
		accent2: "#f59e0b",
		surface: "#0b1323",
		text: "#e5e7eb",
		gradients: [
			"linear-gradient(120deg, #10b981 0%, #22d3ee 100%)",
			"conic-gradient(from 0deg, #0f172a 0%, #1f2937 50%, #10b981 100%)",
		],
	},
	{
		name: "Royal Grape",
		primary: "#7c3aed",
		secondary: "#1f2937",
		tertiary: "#374151",
		accent1: "#06b6d4",
		accent2: "#f43f5e",
		surface: "#ffffff",
		text: "#0f172a",
		gradients: [
			"linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%)",
			"radial-gradient(circle, #f43f5e 0%, #7c3aed 100%)",
		],
	},
	{
		name: "Neutral Pro",
		primary: "#0ea5e9",
		secondary: "#e2e8f0",
		tertiary: "#94a3b8",
		accent1: "#ef4444",
		accent2: "#22c55e",
		surface: "#ffffff",
		text: "#0f172a",
		gradients: [
			"linear-gradient(90deg, #0ea5e9 0%, #22c55e 100%)",
			"linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%)",
		],
	},
	// Новые 7 пресетов
	{
		name: "Nord",
		primary: "#88c0d0",
		secondary: "#2e3440",
		tertiary: "#3b4252",
		accent1: "#8fbcbb",
		accent2: "#bf616a",
		surface: "#eceff4",
		text: "#2e3440",
		gradients: [
			"linear-gradient(90deg, #88c0d0 0%, #8fbcbb 100%)",
			"linear-gradient(90deg, #bf616a 0%, #88c0d0 100%)",
		],
	},
	{
		name: "Solarized",
		primary: "#268bd2",
		secondary: "#073642",
		tertiary: "#586e75",
		accent1: "#b58900",
		accent2: "#d33682",
		surface: "#fdf6e3",
		text: "#002b36",
		gradients: [
			"linear-gradient(90deg, #268bd2 0%, #b58900 100%)",
			"linear-gradient(90deg, #d33682 0%, #268bd2 100%)",
		],
	},
	{
		name: "Dracula",
		primary: "#bd93f9",
		secondary: "#282a36",
		tertiary: "#44475a",
		accent1: "#50fa7b",
		accent2: "#ff5555",
		surface: "#f8f8f2",
		text: "#282a36",
		gradients: [
			"linear-gradient(90deg, #bd93f9 0%, #50fa7b 100%)",
			"linear-gradient(90deg, #ff5555 0%, #bd93f9 100%)",
		],
	},
	{
		name: "Forest Mint",
		primary: "#16a34a",
		secondary: "#064e3b",
		tertiary: "#065f46",
		accent1: "#34d399",
		accent2: "#60a5fa",
		surface: "#f0fdf4",
		text: "#052e2b",
		gradients: [
			"linear-gradient(90deg, #16a34a 0%, #34d399 100%)",
			"linear-gradient(90deg, #16a34a 0%, #60a5fa 100%)",
		],
	},
	{
		name: "Coral Reef",
		primary: "#fb7185",
		secondary: "#0c4a6e",
		tertiary: "#164e63",
		accent1: "#f59e0b",
		accent2: "#22d3ee",
		surface: "#fff7ed",
		text: "#0f172a",
		gradients: [
			"linear-gradient(90deg, #fb7185 0%, #22d3ee 100%)",
			"linear-gradient(90deg, #f59e0b 0%, #fb7185 100%)",
		],
	},
	{
		name: "Berry Pie",
		primary: "#a78bfa",
		secondary: "#312e81",
		tertiary: "#4338ca",
		accent1: "#f472b6",
		accent2: "#22d3ee",
		surface: "#f5f3ff",
		text: "#1f2937",
		gradients: [
			"linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)",
			"linear-gradient(90deg, #4338ca 0%, #22d3ee 100%)",
		],
	},
	{
		name: "Coffee Cream",
		primary: "#a16207",
		secondary: "#292524",
		tertiary: "#44403c",
		accent1: "#fbbf24",
		accent2: "#ef4444",
		surface: "#fafaf9",
		text: "#1c1917",
		gradients: [
			"linear-gradient(90deg, #a16207 0%, #fbbf24 100%)",
			"linear-gradient(90deg, #ef4444 0%, #a16207 100%)",
		],
	},
];

const toDarkPreset = (p: ThemePreset): ThemePreset => {
	return {
		...p,
		surface: chroma(p.surface).darken(2).hex(),
		text: chroma(p.text).brighten(2).hex(),
		secondary: chroma(p.secondary).darken(2).hex(),
		tertiary: chroma(p.tertiary).darken(1).hex(),
		primary: chroma(p.primary).darken(0.4).saturate(0.2).hex(),
		accent1: chroma(p.accent1).darken(0.4).hex(),
		accent2: chroma(p.accent2).darken(0.4).hex(),
		gradients: p.gradients.slice(),
	};
};

const computedThemePresets = computed(() =>
	darkVariant.value ? baseThemePresets.map(toDarkPreset) : baseThemePresets
);

// Выбор темы по имени + эффективная тема, чтобы реагировать на смену light/dark
const selectedThemeName = ref<string | null>(null);
const applyThemePreset = (p: ThemePreset) => {
	selectedThemeName.value = p.name;
	baseColor.value = p.primary;
};

const effectiveTheme = computed<ThemePreset | null>(() => {
	if (!selectedThemeName.value) return null;
	const base =
		baseThemePresets.find((t) => t.name === selectedThemeName.value) || null;
	if (!base) return null;
	return darkVariant.value ? toDarkPreset(base) : base;
});

// Генеративная палитра на случай отсутствия выбранной темы
const palette = computed(() => {
	try {
		const base = chroma(baseColor.value);
		const h = base.get("hsl.h") as number;
		switch (harmony.value) {
			case "complementary": {
				const comp = chroma(baseColor.value).set("hsl.h", h + 180);
				return chroma.scale([base, comp]).mode("lab").colors(count.value);
			}
			case "triadic": {
				const hues = [0, 120, 240].map((d) => h + d);
				return hues
					.map((H) => chroma(baseColor.value).set("hsl.h", H).hex())
					.slice(0, count.value);
			}
			case "tetradic": {
				const hues = [0, 90, 180, 270].map((d) => h + d);
				return hues
					.map((H) => chroma(baseColor.value).set("hsl.h", H).hex())
					.slice(0, count.value);
			}
			case "monochromatic": {
				return chroma
					.scale([base.brighten(1), base.darken(2)])
					.mode("lab")
					.colors(count.value);
			}
			default: {
				return chroma
					.scale([
						chroma(baseColor.value).set("hsl.h", h - 30),
						chroma(baseColor.value).set("hsl.h", h + 30),
					])
					.mode("lab")
					.colors(count.value);
			}
		}
	} catch {
		return Array.from({ length: count.value }, () => "#cccccc");
	}
});

const displayColors = computed(() => {
	if (effectiveTheme.value) {
		const t = effectiveTheme.value;
		return [
			{ label: "Primary", value: t.primary },
			{ label: "Secondary", value: t.secondary },
			{ label: "Tertiary", value: t.tertiary },
			{ label: "Accent 1", value: t.accent1 },
			{ label: "Accent 2", value: t.accent2 },
			{ label: "Surface", value: t.surface },
			{ label: "Text", value: t.text },
		];
	}
	return palette.value.map((c, i) => ({ label: `Palette ${i + 1}`, value: c }));
});

const themeGradients = computed(() => effectiveTheme.value?.gradients ?? []);

type Vars = Record<string, string>;
const cssVars = computed(() => {
	const theme = effectiveTheme.value;
	const themeVars: Vars = theme
		? {
				"--color-primary": theme.primary,
				"--color-secondary": theme.secondary,
				"--color-tertiary": theme.tertiary,
				"--color-accent-1": theme.accent1,
				"--color-accent-2": theme.accent2,
				"--color-surface": theme.surface,
				"--color-text": theme.text,
				"--gradient-1": theme.gradients[0] ?? "",
				"--gradient-2": theme.gradients[1] ?? "",
		  }
		: {};

	const paletteVars: Vars = Object.fromEntries(
		palette.value.map((c, i) => [`--palette-${i + 1}`, c])
	);

	const allVars = { ...themeVars, ...paletteVars };
	const lines = Object.entries(allVars)
		.filter(([_, v]) => v && v.length)
		.map(([k, v]) => `  ${k}: ${v};`)
		.join("\n");
	return `:root {\n${lines}\n}`;
});

const copyCSS = async () => {
	try {
		await navigator.clipboard.writeText(cssVars.value);
	} catch (e) {
		console.error(e);
	}
};
const copySingle = async (c: string) => {
	try {
		await navigator.clipboard.writeText(c);
	} catch (e) {
		console.error(e);
	}
};
</script>
