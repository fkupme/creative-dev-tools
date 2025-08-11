<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<SeoMetaSeo
			title="Animation Generator"
			description="Конструктор @keyframes, пресеты, предпросмотр и готовый CSS."
			:ogType="'website'"
		/>
		<header
			class="border-b border-secondary-200 dark:border-secondary-700 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md"
		>
			<div class="container-fluid h-16 flex items-center justify-between">
				<h1 class="text-lg md:text-xl font-semibold">Animation Generator</h1>
			</div>
		</header>

		<div class="container-fluid py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls -->
				<div class="xl:col-span-1 xl:sticky xl:top-24 card p-6 space-y-6">
					<UiSelect
						:model-value="preset"
						@update:model-value="presetChange"
						:options="presetOptions"
					/>
					<UiSlider
						:model-value="duration"
						@update:model-value="durationChange"
						label="Длительность"
						:min="100"
						:max="5000"
						:step="50"
						unit="ms"
					/>
					<UiSelect
						:model-value="timing"
						@update:model-value="timingChange"
						:options="timingOptions"
					/>
					<UiSelect
						:model-value="direction"
						@update:model-value="directionChange"
						:options="directionOptions"
					/>
					<UiSlider
						:model-value="delay"
						@update:model-value="delayChange"
						label="Задержка"
						:min="0"
						:max="2000"
						:step="50"
						unit="ms"
					/>
					<UiSelect
						:model-value="fillMode"
						@update:model-value="fillModeChange"
						:options="fillOptions"
					/>
					<UiSelect
						:model-value="iteration"
						@update:model-value="iterationChange"
						:options="iterationOptions"
					/>
				</div>

				<!-- Preview & Code -->
				<div class="xl:col-span-2 space-y-6">
					<div class="card p-6 flex items-center justify-center">
						<div
							class="w-24 h-24 rounded-lg"
							:style="{ ...selectedBaseStyle, animation: previewAnimation }"
						/>
					</div>

					<!-- Keyframes Builder -->
					<div class="card p-6 space-y-4">
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-medium">Конструктор @keyframes</h3>
							<div class="flex gap-2">
								<UiButton size="xs" variant="ghost" @click="addStep()"
									><Icon name="heroicons:plus" class="w-4 h-4 mr-1" />Добавить
									шаг</UiButton
								>
								<UiButton size="xs" variant="ghost" @click="distributeSteps()"
									><Icon
										name="heroicons:sparkles"
										class="w-4 h-4 mr-1"
									/>Равномерно</UiButton
								>
								<UiButton
									size="xs"
									variant="ghost"
									@click="applyStepsToEditor()"
									><Icon
										name="heroicons:arrow-up-tray"
										class="w-4 h-4 mr-1"
									/>Вставить в код</UiButton
								>
							</div>
						</div>
						<div
							v-for="(s, i) in steps"
							:key="i"
							class="grid grid-cols-12 gap-3 items-start"
						>
							<div class="col-span-2">
								<label class="text-xs text-secondary-500">Процент</label>
								<input
									type="number"
									min="0"
									max="100"
									class="w-full px-2 py-1 text-sm rounded border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800"
									v-model.number="s.offset"
								/>
							</div>
							<div class="col-span-8">
								<label class="text-xs text-secondary-500">CSS свойства</label>
								<textarea
									v-model="s.css"
									class="w-full min-h-[64px] px-2 py-1 text-sm rounded border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 font-mono"
									placeholder="opacity: .5; transform: translateY(10px);"
								></textarea>
							</div>
							<div class="col-span-2 flex gap-1 pt-5 justify-end">
								<UiButton
									size="xs"
									variant="ghost"
									:disabled="i === 0"
									@click="moveStep(i, i - 1)"
									><Icon name="heroicons:chevron-up" class="w-4 h-4"
								/></UiButton>
								<UiButton
									size="xs"
									variant="ghost"
									:disabled="i === steps.length - 1"
									@click="moveStep(i, i + 1)"
									><Icon name="heroicons:chevron-down" class="w-4 h-4"
								/></UiButton>
								<UiButton size="xs" variant="ghost" @click="removeStep(i)"
									><Icon name="heroicons:trash" class="w-4 h-4 text-red-500"
								/></UiButton>
							</div>
						</div>
					</div>

					<div class="card p-6">
						<UiCodeBlock
							:code="editorCode"
							language="css"
							title="CSS"
							:editable="true"
							@update:code="onCodeEdited"
						/>
					</div>

					<!-- Preset Cards -->
					<div class="card p-6">
						<h3 class="text-sm font-medium mb-4">Галерея пресетов</h3>
						<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
							<div
								v-for="card in presetsCatalog"
								:key="card.id"
								class="rounded-lg border p-3 bg-white/60 dark:bg-secondary-800 hover:shadow-medium transition cursor-pointer group"
								@click="applyPresetFromCard(card)"
							>
								<div class="h-20 mb-3 flex items-center justify-center">
									<div class="w-10 h-10 rounded" :style="getCardStyle(card)" />
								</div>
								<div class="text-xs font-medium mb-2">{{ card.name }}</div>
								<div class="flex items-center justify-between">
									<UiTooltip text="Код в редактор"
										><UiButton
											size="xs"
											variant="ghost"
											@click.stop="openCardCode(card)"
											><Icon
												name="heroicons:code-bracket"
												class="w-4 h-4" /></UiButton
									></UiTooltip>
									<UiTooltip text="Скопировать CSS"
										><UiButton
											size="xs"
											variant="ghost"
											@click.stop="copyCardCode(card)"
											><Icon
												name="heroicons:clipboard"
												class="w-4 h-4" /></UiButton
									></UiTooltip>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

// Options
const presetOptions = [
	{ label: "fade", value: "fade" },
	{ label: "slide-up", value: "slide-up" },
	{ label: "slide-down", value: "slide-down" },
	{ label: "slide-left", value: "slide-left" },
	{ label: "slide-right", value: "slide-right" },
	{ label: "scale", value: "scale" },
	{ label: "bounce", value: "bounce" },
	{ label: "pulse", value: "pulse" },
	{ label: "spin", value: "spin" },
	{ label: "flip", value: "flip" },
	{ label: "wobble", value: "wobble" },
	{ label: "heartbeat", value: "heartbeat" },
	{ label: "jelly", value: "jelly" },
	{ label: "tilt", value: "tilt" },
	{ label: "grad-shift", value: "grad-shift" },
	{ label: "hue-rotate", value: "hue-rotate" },
	{ label: "neon-glow", value: "neon-glow" },
	{ label: "glass-shimmer", value: "glass-shimmer" },
	{ label: "color-pulse", value: "color-pulse" },
];
const timingOptions = [
	{ label: "ease", value: "ease" },
	{ label: "ease-in", value: "ease-in" },
	{ label: "ease-out", value: "ease-out" },
	{ label: "linear", value: "linear" },
];
const directionOptions = [
	{ label: "normal", value: "normal" },
	{ label: "reverse", value: "reverse" },
	{ label: "alternate", value: "alternate" },
	{ label: "alt-reverse", value: "alternate-reverse" },
];
const fillOptions = [
	{ label: "none", value: "none" },
	{ label: "forwards", value: "forwards" },
	{ label: "backwards", value: "backwards" },
	{ label: "both", value: "both" },
];
const iterationOptions = [
	{ label: "1", value: "1" },
	{ label: "2", value: "2" },
	{ label: "infinite", value: "infinite" },
];

// State
const preset = ref<
	| "fade"
	| "slide-up"
	| "slide-down"
	| "slide-left"
	| "slide-right"
	| "scale"
	| "bounce"
	| "pulse"
	| "spin"
	| "flip"
	| "wobble"
	| "heartbeat"
	| "jelly"
	| "tilt"
	| "grad-shift"
	| "hue-rotate"
	| "neon-glow"
	| "glass-shimmer"
	| "color-pulse"
>("fade");
const duration = ref(800);
const timing = ref<"ease" | "ease-in" | "ease-out" | "linear">("ease");
const iteration = ref<"1" | "2" | "infinite">("infinite");
const direction = ref<"normal" | "reverse" | "alternate" | "alternate-reverse">(
	"alternate"
);
const delay = ref(0);
const fillMode = ref<"none" | "forwards" | "backwards" | "both">("both");

const selectedBaseStyle = ref<Record<string, string>>({
	background: "#0ea5e9",
});

const editorCode = ref(buildKeyframes(preset.value));

const previewAnimation = computed(
	() =>
		`${preset.value} ${duration.value}ms ${timing.value} ${delay.value}ms ${iteration.value} ${direction.value} ${fillMode.value}`
);

function onCodeEdited(v: string) {
	editorCode.value = v;
	injectEditorKeyframes();
	steps.value = parseStepsFromCSS(v, preset.value) || steps.value;
}

// Presets (тип и каталог ниже по файлу)
interface PresetCard {
	id: string;
	name: string;
	css: string;
	style?: Record<string, string>;
}

const presetsCatalog: PresetCard[] = [
	{
		id: "fade",
		name: "Fade",
		css: buildKeyframes("fade"),
		style: { background: "#38bdf8" },
	},
	{
		id: "slide-up",
		name: "Slide Up",
		css: buildKeyframes("slide-up"),
		style: { background: "#38bdf8" },
	},
	{
		id: "slide-down",
		name: "Slide Down",
		css: buildKeyframes("slide-down"),
		style: { background: "#38bdf8" },
	},
	{
		id: "slide-left",
		name: "Slide Left",
		css: buildKeyframes("slide-left"),
		style: { background: "#38bdf8" },
	},
	{
		id: "slide-right",
		name: "Slide Right",
		css: buildKeyframes("slide-right"),
		style: { background: "#38bdf8" },
	},
	{
		id: "scale",
		name: "Scale In",
		css: buildKeyframes("scale"),
		style: { background: "#38bdf8" },
	},
	{
		id: "bounce",
		name: "Bounce",
		css: buildKeyframes("bounce"),
		style: { background: "#38bdf8" },
	},
	{
		id: "pulse",
		name: "Pulse",
		css: buildKeyframes("pulse"),
		style: { background: "#38bdf8" },
	},
	{
		id: "spin",
		name: "Spin",
		css: buildKeyframes("spin"),
		style: { background: "#38bdf8" },
	},
	{
		id: "flip",
		name: "Flip Y",
		css: buildKeyframes("flip"),
		style: { background: "#38bdf8" },
	},
	{
		id: "wobble",
		name: "Wobble",
		css: buildKeyframes("wobble"),
		style: { background: "#38bdf8" },
	},
	{
		id: "heartbeat",
		name: "Heartbeat",
		css: buildKeyframes("heartbeat"),
		style: { background: "#38bdf8" },
	},
	{
		id: "jelly",
		name: "Jelly",
		css: buildKeyframes("jelly"),
		style: { background: "#38bdf8" },
	},
	{
		id: "tilt",
		name: "Tilt",
		css: buildKeyframes("tilt"),
		style: { background: "#38bdf8" },
	},
	// Color/gradient/glass presets
	{
		id: "grad-shift",
		name: "Gradient Shift",
		css: buildKeyframes("grad-shift"),
		style: {
			backgroundImage: "linear-gradient(90deg, #0ea5e9, #8b5cf6, #22c55e)",
			backgroundSize: "200% 200%",
		},
	},
	{
		id: "hue-rotate",
		name: "Hue Rotate",
		css: buildKeyframes("hue-rotate"),
		style: { background: "#8b5cf6", filter: "hue-rotate(0deg)" },
	},
	{
		id: "neon-glow",
		name: "Neon Glow",
		css: buildKeyframes("neon-glow"),
		style: { background: "#111827", boxShadow: "0 0 0 rgba(56,189,248,0.0)" },
	},
	{
		id: "glass-shimmer",
		name: "Glass Shimmer",
		css: buildKeyframes("glass-shimmer"),
		style: {
			background:
				"linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
			backdropFilter: "blur(6px)",
			border: "1px solid rgba(255,255,255,0.2)",
			backgroundSize: "200% 200%",
		},
	},
	{
		id: "color-pulse",
		name: "Color Pulse",
		css: buildKeyframes("color-pulse"),
		style: { background: "#0ea5e9" },
	},
];

function applyPresetFromCard(card: PresetCard) {
	preset.value = card.id as any;
	editorCode.value = buildFullSnippet(card);
	selectedBaseStyle.value = card.style || { background: "#38bdf8" };
	injectAllPresets();
	injectEditorKeyframes();
	steps.value = parseStepsFromCSS(card.css, card.id) || defaultSteps();
}

function openCardCode(card: PresetCard) {
	editorCode.value = buildFullSnippet(card);
	injectEditorKeyframes();
	steps.value = parseStepsFromCSS(card.css, card.id) || defaultSteps();
}

function copyCardCode(card: PresetCard) {
	navigator.clipboard.writeText(buildFullSnippet(card));
}

function getCardStyle(card: PresetCard) {
	return {
		...(card.style || {}),
		animation: `${card.id} 1200ms ease-in-out 0ms infinite alternate both`,
	};
}

onMounted(() => {
	injectAllPresets();
	injectEditorKeyframes();
});

function injectAllPresets() {
	const styleId = "animation-presets-keyframes";
	let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement("style");
		styleEl.id = styleId;
		document.head.appendChild(styleEl);
	}
	styleEl.textContent = presetsCatalog.map((p) => p.css).join("\n\n");
}

function injectEditorKeyframes() {
	const styleId = "animation-editor-keyframes";
	let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement("style");
		styleEl.id = styleId;
		document.head.appendChild(styleEl);
	}
	// ВАЖНО: инжектим только санитизированные keyframes
	styleEl.textContent = sanitizeCSS(extractKeyframes(editorCode.value));
}

function presetChange(v: any) {
	preset.value = v;
}
function durationChange(v: number) {
	duration.value = v;
}
function timingChange(v: any) {
	timing.value = v;
}
function iterationChange(v: any) {
	iteration.value = v;
}
function directionChange(v: any) {
	direction.value = v;
}
function delayChange(v: number) {
	delay.value = v;
}
function fillModeChange(v: any) {
	fillMode.value = v;
}

function buildFullSnippet(card: PresetCard) {
	const usage = `.your-element {\n  animation: ${card.id} ${duration.value}ms ${
		timing.value
	} ${delay.value}ms ${iteration.value} ${direction.value} ${
		fillMode.value
	};\n${
		card.style
			? Object.entries(card.style)
					.map(
						([k, v]) =>
							`  ${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}: ${v};`
					)
					.join("\n")
			: ""
	}\n}`;
	return `${usage}\n\n${card.css}`.trim();
}

// Keyframes Builder
interface KeyframeStep {
	offset: number;
	css: string;
}
const steps = ref<KeyframeStep[]>(defaultSteps());

function defaultSteps(): KeyframeStep[] {
	return [
		{ offset: 0, css: "opacity: 0;" },
		{ offset: 100, css: "opacity: 1;" },
	];
}

function addStep() {
	const last = steps.value.length
		? steps.value[steps.value.length - 1].offset
		: 0;
	steps.value.push({ offset: clampOffset(last + 10), css: "opacity: 1;" });
}
function removeStep(i: number) {
	steps.value.splice(i, 1);
}
function moveStep(from: number, to: number) {
	if (to < 0 || to >= steps.value.length) return;
	const arr = [...steps.value];
	const [it] = arr.splice(from, 1);
	arr.splice(to, 0, it);
	steps.value = arr;
}
function distributeSteps() {
	if (steps.value.length < 2) return;
	const n = steps.value.length - 1;
	steps.value = steps.value.map((s, i) => ({
		...s,
		offset: Math.round((i * 100) / n),
	}));
}
function clampOffset(n: number) {
	return Math.max(0, Math.min(100, n));
}

function applyStepsToEditor() {
	const name = preset.value;
	const body = steps.value
		.sort((a, b) => a.offset - b.offset)
		.map((s) => `  ${s.offset}% { ${sanitizeDeclarationBlock(s.css).trim()} }`)
		.join("\n");
	const kf = `@keyframes ${name} {\n${body}\n}`;
	const usage = `.your-element {\n  animation: ${name} ${duration.value}ms ${timing.value} ${delay.value}ms ${iteration.value} ${direction.value} ${fillMode.value};\n}`;
	editorCode.value = `${usage}\n\n${kf}`;
	injectEditorKeyframes();
}

// Extract keyframes from code editor
function extractKeyframes(css: string): string {
	const matches =
		css.match(/@keyframes[\s\S]*?\}\s*\}/g) ||
		css.match(/@keyframes[\s\S]*?\}/g) ||
		[];
	return matches.join("\n\n");
}

// Parse steps for builder from a specific @keyframes name
interface KeyframeStep {
	offset: number;
	css: string;
}
function parseStepsFromCSS(
	css: string,
	expectedName: string
): KeyframeStep[] | null {
	const re = new RegExp(
		`@keyframes\\s+${expectedName}\\s*\\{([\\s\\S]*?)\\}`,
		"i"
	);
	const m = css.match(re);
	if (!m) return null;
	const body = m[1];
	const stepRe = /(\d+)\%\s*\{([\s\S]*?)\}/g;
	const out: KeyframeStep[] = [];
	let sm: RegExpExecArray | null;
	while ((sm = stepRe.exec(body))) {
		out.push({ offset: Number(sm[1]), css: sm[2].trim() });
	}
	if (out.length === 0) return null;
	return out.sort((a, b) => a.offset - b.offset);
}

// Very defensive CSS sanitizer for our use-case (keyframes only)
function sanitizeCSS(css: string): string {
	let out = css || "";
	// 1) size cap to avoid abuse
	const MAX = 50_000;
	if (out.length > MAX) out = out.slice(0, MAX);
	// 2) strip comments
	out = out.replace(/\/\*[\s\S]*?\*\//g, "");
	// 3) remove control chars except \n\r\t
	out = out.replace(/[\u0000-\u0019\u007F]/g, (m) =>
		"\n\r\t".includes(m) ? m : " "
	);
	// 4) blocklists: @import, expression(), behavior, -moz-binding, javascript: in url()
	out = out.replace(/@import\b[\s\S]*?;/gi, "");
	out = out.replace(/expression\s*\(/gi, "");
	out = out.replace(/behavior\s*:/gi, "");
	out = out.replace(/-moz-binding\s*:/gi, "");
	out = out.replace(/url\(\s*['\"]?javascript:[^\)]*\)/gi, "url(about:blank)");
	// 5) disallow HTML tags just in case (though we use textContent)
	out = out.replace(/<\/?[a-z][^>]*>/gi, "");
	// 6) ensure only @keyframes blocks survive (drop anything else)
	const kfs =
		out.match(/@keyframes[\s\S]*?\}\s*\}/g) ||
		out.match(/@keyframes[\s\S]*?\}/g) ||
		[];
	return kfs.join("\n\n");
}

function sanitizeDeclarationBlock(block: string): string {
	let b = block || "";
	// remove braces and stray at-rules
	b = b.replace(/[{}]/g, "");
	b = b.replace(/@\w+[^;]*;?/g, "");
	// kill dangerous tokens
	b = b.replace(/expression\s*\(/gi, "");
	b = b.replace(/behavior\s*:/gi, "");
	b = b.replace(/-moz-binding\s*:/gi, "");
	b = b.replace(/url\(\s*['\"]?javascript:[^\)]*\)/gi, "url(about:blank)");
	// normalize whitespace
	b = b.replace(/\s+/g, " ").trim();
	return b;
}

// Preset keyframes builder
function buildKeyframes(name: string): string {
	switch (name) {
		case "fade":
			return `@keyframes fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}`;
		case "slide-up":
			return `@keyframes slide-up {\n  0% { transform: translateY(16px); opacity: 0; }\n  100% { transform: translateY(0); opacity: 1; }\n}`;
		case "slide-down":
			return `@keyframes slide-down {\n  0% { transform: translateY(-16px); opacity: 0; }\n  100% { transform: translateY(0); opacity: 1; }\n}`;
		case "slide-left":
			return `@keyframes slide-left {\n  0% { transform: translateX(16px); opacity: 0; }\n  100% { transform: translateX(0); opacity: 1; }\n}`;
		case "slide-right":
			return `@keyframes slide-right {\n  0% { transform: translateX(-16px); opacity: 0; }\n  100% { transform: translateX(0); opacity: 1; }\n}`;
		case "scale":
			return `@keyframes scale {\n  0% { transform: scale(0.9); opacity: 0; }\n  100% { transform: scale(1); opacity: 1; }\n}`;
		case "bounce":
			return `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}`;
		case "pulse":
			return `@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: .5; }\n}`;
		case "spin":
			return `@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}`;
		case "flip":
			return `@keyframes flip {\n  0% { transform: rotateY(0deg); }\n  100% { transform: rotateY(180deg); }\n}`;
		case "wobble":
			return `@keyframes wobble {\n  0% { transform: translateX(0); }\n  25% { transform: translateX(-6px) rotate(-2deg); }\n  50% { transform: translateX(6px) rotate(2deg); }\n  75% { transform: translateX(-4px) rotate(-1deg); }\n  100% { transform: translateX(0); }\n}`;
		case "heartbeat":
			return `@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  10% { transform: scale(1.1); }\n  30% { transform: scale(0.98); }\n  40% { transform: scale(1.04); }\n}`;
		case "jelly":
			return `@keyframes jelly {\n  0% { transform: scale(1, 1); }\n  30% { transform: scale(1.25, 0.75); }\n  40% { transform: scale(0.75, 1.25); }\n  50% { transform: scale(1.15, 0.85); }\n  65% { transform: scale(0.95, 1.05); }\n  75% { transform: scale(1.05, 0.95); }\n  100% { transform: scale(1, 1); }\n}`;
		case "tilt":
			return `@keyframes tilt {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(3deg); }\n  50% { transform: rotate(0deg); }\n  75% { transform: rotate(-3deg); }\n}`;
		case "grad-shift":
			return `@keyframes grad-shift {\n  0% { background-position: 0% 50%; }\n  100% { background-position: 200% 50%; }\n}`;
		case "hue-rotate":
			return `@keyframes hue-rotate {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`;
		case "neon-glow":
			return `@keyframes neon-glow {\n  0%, 100% { box-shadow: 0 0 12px rgba(56,189,248,0.6), 0 0 24px rgba(56,189,248,0.3); }\n  50% { box-shadow: 0 0 24px rgba(56,189,248,0.9), 0 0 48px rgba(56,189,248,0.5); }\n}`;
		case "glass-shimmer":
			return `@keyframes glass-shimmer {\n  0% { background-position: 0% 0%; }\n  100% { background-position: 200% 200%; }\n}`;
		case "color-pulse":
			return `@keyframes color-pulse {\n  0% { background: #0ea5e9; }\n  50% { background: #8b5cf6; }\n  100% { background: #22c55e; }\n}`;
		default:
			return `@keyframes fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}`;
	}
}
</script>
