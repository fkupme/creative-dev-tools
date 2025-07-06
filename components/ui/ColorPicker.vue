<template>
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<label v-if="label" class="label">{{ label }}</label>
			<div class="flex items-center space-x-2">
				<div
					class="w-8 h-8 rounded-lg border-2 border-white dark:border-secondary-600 shadow-sm cursor-pointer"
					:style="{ backgroundColor: modelValue }"
					@click="showPicker = !showPicker"
				/>
				<input
					v-model="colorInput"
					type="text"
					class="w-20 px-2 py-1 text-sm border border-secondary-200 dark:border-secondary-700 rounded bg-white dark:bg-secondary-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
					@input="updateColor"
				/>
			</div>
		</div>

		<!-- Color Picker -->
		<div
			v-if="showPicker"
			class="p-4 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg"
		>
			<!-- HTML Color Input -->
			<div class="mb-4">
				<input
					v-model="colorInput"
					type="color"
					class="w-full h-10 border border-secondary-200 dark:border-secondary-700 rounded cursor-pointer"
					@input="updateColor"
				/>
			</div>

			<!-- Preset Colors -->
			<div class="grid grid-cols-8 gap-2 mb-4">
				<button
					v-for="color in presetColors"
					:key="color"
					class="w-8 h-8 rounded border-2 border-white dark:border-secondary-600 shadow-sm hover:scale-110 transition-transform"
					:style="{ backgroundColor: color }"
					@click="selectColor(color)"
				/>
			</div>


		</div>

		<!-- RGB/HSL Values -->
		<div v-if="showValues" class="text-xs text-secondary-500 space-y-1">
			<div>HEX: {{ colorInput }}</div>
			<div>RGB: {{ rgbValue }}</div>
			<div>HSL: {{ hslValue }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import chroma from "chroma-js";

interface Props {
	modelValue: string;
	label?: string;
	showValues?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

const showPicker = ref(false);
const colorInput = ref(props.modelValue);

const presetColors = [
	"#ffffff",
	"#f8f9fa",
	"#e9ecef",
	"#dee2e6",
	"#ced4da",
	"#adb5bd",
	"#6c757d",
	"#495057",
	"#343a40",
	"#212529",
	"#000000",
	"#fd7e14",
	"#ffc107",
	"#28a745",
	"#20c997",
	"#17a2b8",
	"#007bff",
	"#6f42c1",
	"#e83e8c",
	"#dc3545",
	"#f8d7da",
	"#d4edda",
	"#d1ecf1",
	"#d6f5d6",
];

const commonColors = [
	{ name: "Красный", value: "#ef4444" },
	{ name: "Оранжевый", value: "#f97316" },
	{ name: "Желтый", value: "#eab308" },
	{ name: "Зеленый", value: "#22c55e" },
	{ name: "Синий", value: "#3b82f6" },
	{ name: "Фиолетовый", value: "#a855f7" },
	{ name: "Розовый", value: "#ec4899" },
	{ name: "Серый", value: "#6b7280" },
];

const selectColor = (color: string) => {
	colorInput.value = color;
	updateColor();
	showPicker.value = false;
};

const updateColor = () => {
	try {
		const validColor = chroma(colorInput.value).hex();
		emit("update:modelValue", validColor);
	} catch (error) {
		console.warn("Invalid color:", colorInput.value);
	}
};

const rgbValue = computed(() => {
	try {
		const rgb = chroma(colorInput.value).rgb();
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	} catch {
		return "Invalid";
	}
});

const hslValue = computed(() => {
	try {
		const hsl = chroma(colorInput.value).hsl();
		return `hsl(${Math.round(hsl[0] || 0)}, ${Math.round(
			hsl[1] * 100
		)}%, ${Math.round(hsl[2] * 100)}%)`;
	} catch {
		return "Invalid";
	}
});

// Синхронизация с внешним значением
watch(
	() => props.modelValue,
	(newValue) => {
		colorInput.value = newValue;
	}
);

// Закрытие picker при клике вне
onClickOutside(showPicker, () => {
	showPicker.value = false;
});
</script> 