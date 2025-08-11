<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Header -->
		<header
			class="border-b border-secondary-200 dark:border-secondary-700 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md"
		>
			<div class="container-fluid h-16 flex items-center justify-between">
				<h1 class="text-lg md:text-xl font-semibold">Gradient Generator</h1>
				<div class="flex items-center gap-2">
					<UiButton
						size="sm"
						variant="ghost"
						@click="copyCSS"
						title="Скопировать CSS"
					>
						<Icon name="heroicons:clipboard" class="w-4 h-4" />
						<span class="sr-only">Копировать CSS</span>
					</UiButton>
					<UiButton
						size="sm"
						variant="outline"
						@click="exportImage"
						title="Экспорт PNG"
					>
						<Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
						<span class="sr-only">PNG</span>
					</UiButton>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<div class="container-fluid py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls -->
				<div class="xl:col-span-1 xl:sticky xl:top-24 space-y-6">
					<div class="card p-6 space-y-4">
						<div>
							<h2 class="text-sm font-medium mb-3">Тип градиента</h2>
							<UiSelect
								:model-value="config.type"
								@update:model-value="onType"
								:options="gradientTypes"
							/>
						</div>

						<div v-if="config.type !== 'radial'">
							<UiSlider
								:model-value="config.angle"
								@update:model-value="onAngle"
								label=""
								:min="0"
								:max="360"
								unit="°"
							/>
						</div>

						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<h2 class="text-sm font-medium">
									Цветовые стопы ({{ config.colors.length }})
								</h2>
								<div class="flex gap-1">
									<UiButton
										size="xs"
										variant="ghost"
										@click="distributeStops"
										title="Равномерно распределить"
									>
										<Icon name="heroicons:sparkles" class="w-4 h-4" />
										<span class="sr-only">Равномерно</span>
									</UiButton>
									<UiButton
										size="xs"
										variant="ghost"
										@click="invertStops"
										title="Инвертировать порядок"
									>
										<Icon name="heroicons:arrows-up-down" class="w-4 h-4" />
										<span class="sr-only">Инвертировать</span>
									</UiButton>
								</div>
							</div>

							<!-- Контейнер списка для SortableJS -->
							<div ref="stopsListRef" class="space-y-3">
								<div
									v-for="(element, index) in config.colors"
									:key="index"
									class="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center"
								>
									<div class="sm:col-span-1 flex items-center gap-1">
										<button
											class="drag-handle cursor-grab p-2 rounded hover:bg-secondary-100 dark:hover:bg-secondary-800"
											title="Перетащить"
										>
											<Icon name="heroicons:bars-3" class="w-4 h-4" />
										</button>
									</div>
									<div class="sm:col-span-2 flex items-center">
										<UiColorPicker
											:model-value="element.color"
											@update:model-value="onStopColorHandler(index)"
										/>
									</div>
									<div class="sm:col-span-2 flex items-center">
										<UiSlider
											:model-value="element.stop"
											@update:model-value="onStopPosHandler(index)"
											label=""
											:min="0"
											:max="100"
											unit="%"
										/>
									</div>
									<div class="sm:col-span-1 flex justify-end">
										<UiButton
											variant="ghost"
											size="sm"
											:title="'Удалить стоп'"
											:disabled="config.colors.length <= 2"
											@click="removeColorStop(index)"
										>
											<Icon
												name="heroicons:trash"
												class="w-4 h-4 text-red-500"
											/>
										</UiButton>
									</div>
								</div>
							</div>

							<UiButton
								variant="outline"
								size="sm"
								@click="addColorStop()"
								title="Добавить стоп"
							>
								<Icon name="heroicons:plus" class="w-4 h-4 mr-1" />Добавить стоп
							</UiButton>
						</div>
					</div>

					<!-- Presets -->
					<div class="card p-6">
						<h2 class="text-sm font-medium mb-3">Пресеты</h2>
						<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
							<UiButton
								v-for="p in builtInPresets"
								:key="p.name"
								variant="ghost"
								size="sm"
								@click="applyPreset(p)"
							>
								{{ p.name }}
							</UiButton>
						</div>
					</div>
				</div>

				<!-- Preview & Code -->
				<div class="xl:col-span-2 space-y-6">
					<!-- Preview -->
					<div ref="previewRef" class="card p-6">
						<div
							class="w-full h-64 sm:h-80 lg:h-96 rounded-lg border"
							:style="{ background: gradientString }"
						/>
					</div>

					<!-- Code -->
					<div class="card p-6">
						<UiCodeBlock :code="formattedCss" language="css" title="CSS" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useHead } from "nuxt/app";
import {
	computed,
	nextTick,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from "vue";
// @ts-ignore - типы подключены через декларацию модуля
import Sortable from "sortablejs";
import { useGradientGenerator } from "~/composables/useGradientGenerator";

useHead({ title: "Gradient Generator" });

const {
	config,
	gradientString,
	cssCode,
	builtInPresets,
	addColorStop,
	removeColorStop,
	updateColorStop,
	applyPreset,
	copyToClipboard,
} = useGradientGenerator();

const gradientTypes = [
	{ label: "Линейный", value: "linear" },
	{ label: "Радиальный", value: "radial" },
	{ label: "Конический", value: "conic" },
];

const previewRef = ref<HTMLElement | null>(null);
const stopsListRef = ref<HTMLElement | null>(null);
let sortable: Sortable | null = null;

const initSortable = () => {
	if (!stopsListRef.value) return;
	sortable?.destroy();
	sortable = Sortable.create(stopsListRef.value, {
		handle: ".drag-handle",
		animation: 150,
		onEnd: (evt: any) => {
			const { oldIndex, newIndex } = evt;
			if (oldIndex == null || newIndex == null || oldIndex === newIndex) return;
			const arr = [...config.value.colors];
			const [item] = arr.splice(oldIndex, 1);
			arr.splice(newIndex, 0, item);
			config.value.colors = arr;
		},
	});
};

onMounted(() => {
	initSortable();
});

watch(
	() => config.value.colors.length,
	async () => {
		await nextTick();
		initSortable();
	}
);

onBeforeUnmount(() => {
	sortable?.destroy();
	sortable = null;
});

const onType = (v: "linear" | "radial" | "conic") => {
	config.value.type = v;
};
const onAngle = (v: number) => {
	config.value.angle = v;
};
const onStopColor = (index: number, val: string) => {
	updateColorStop(index, { color: val });
};
const onStopPos = (index: number, val: number) => {
	updateColorStop(index, { stop: val });
};
const onStopColorHandler = (index: number) => (val: string) =>
	onStopColor(index, val);
const onStopPosHandler = (index: number) => (val: number) =>
	onStopPos(index, val);

const distributeStops = () => {
	const len = config.value.colors.length;
	if (len < 2) return;
	config.value.colors = config.value.colors.map((c, i) => ({
		...c,
		stop: Math.round((i * 100) / (len - 1)),
	}));
};

const invertStops = () => {
	config.value.colors = config.value.colors
		.map((c) => ({ ...c, stop: 100 - c.stop }))
		.reverse();
};

const copyCSS = async () => {
	await copyToClipboard();
};

const exportImage = async () => {
	if (!previewRef.value) return;
	try {
		const canvas = await html2canvas(previewRef.value, { scale: 2 });
		canvas.toBlob((blob) => {
			if (blob) saveAs(blob, "gradient-preview.png");
		});
	} catch (e) {
		console.error(e);
	}
};

// Многострочное форматирование CSS для градиента
const formattedCss = computed(() => {
	if (config.value.colors.length <= 1) return cssCode.value;
	const stops = config.value.colors
		.map((s) => `    ${s.color} ${Math.round(s.stop)}%`)
		.join(",\n");
	if (config.value.type === "linear") {
		return `background: linear-gradient(\n  ${config.value.angle}deg,\n${stops}\n);`;
	}
	if (config.value.type === "radial") {
		return `background: radial-gradient(\n  circle,\n${stops}\n);`;
	}
	return `background: conic-gradient(\n  from ${config.value.angle}deg,\n${stops}\n);`;
});
</script>
