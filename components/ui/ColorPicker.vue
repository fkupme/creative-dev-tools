<template>
	<div class="relative w-full">
		<Menu as="div" class="relative text-left w-full">
			<div>
				<MenuButton
					class="inline-flex w-full justify-between items-center rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					<label v-if="label" class="label mr-2">{{ label }}</label>
					<div class="flex items-center space-x-2">
						<div
							class="w-8 h-8 rounded-lg border-2 border-white dark:border-secondary-600 shadow-sm cursor-pointer"
							:style="{ backgroundColor: modelValue }"
						/>
						<input
							v-model="colorInput"
							type="text"
							class="w-20 px-2 py-1 text-sm border border-secondary-200 dark:border-secondary-700 rounded bg-white dark:bg-secondary-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
							@input="updateColor"
							@focus="showPicker = true"
						/>
					</div>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4 dark:bg-secondary-800 dark:ring-white/10 dark:divide-white/5"
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
					<div class="grid grid-cols-5 grid-rows-5 gap-2 mb-4">
						<button
							v-for="color in presetColors"
							:key="color"
							class="w-8 h-8 rounded border-2 border-white dark:border-secondary-600 shadow-sm hover:scale-110 transition-transform"
							:style="{ backgroundColor: color }"
							@click="selectColor(color)"
						/>
					</div>

					<!-- RGB/HSL Values -->
					<div v-if="showValues" class="text-xs text-secondary-500 space-y-1">
						<div>HEX: {{ colorInput }}</div>
						<div>RGB: {{ rgbValue }}</div>
						<div>HSL: {{ hslValue }}</div>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import chroma from "chroma-js";
import { computed, ref, watch } from "vue";

interface Props {
	modelValue: string;
	label?: string;
	showValues?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

const showPicker = ref(false); // Это будет контролировать состояние открытия/закрытия
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

const selectColor = (color: string) => {
	colorInput.value = color;
	updateColor();
	// showPicker.value = false; // Headless UI сам управляет закрытием
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

// onClickOutside(showPicker, () => {
// 	showPicker.value = false;
// });
</script> 