<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
			Text Shadow Controls
		</h2>

		<!-- Multiple Shadows Toggle -->
		<div class="mb-6">
			<UiToggle
				:model-value="enableMultipleShadows"
				@update:model-value="$emit('toggle-multiple-shadows', $event)"
				label="Multiple Shadows"
			/>
		</div>

		<!-- Shadow Layers (Unified Interface) -->
		<div class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
					Shadow Layers ({{ displayLayers.length }})
				</h3>
				<UiButton
					v-if="enableMultipleShadows"
					@click="$emit('add-layer')"
					variant="outline"
					size="sm"
				>
					<Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
					Add Layer
				</UiButton>
			</div>

			<TextShadowLayer
				v-for="(layer, index) in displayLayers"
				:key="index"
				:layer="layer"
				:index="index"
				:can-remove="enableMultipleShadows && displayLayers.length > 1"
				@update="handleLayerUpdate(index, $event)"
				@remove="$emit('remove-layer', index)"
			/>
		</div>

		<!-- Font Controls -->
		<div class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
			<h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
				Font Settings
			</h3>
			<div class="grid grid-cols-2 gap-3">
				<div>
					<UiSlider
						:model-value="fontSize"
						@update:model-value="$emit('update-font-size', $event)"
						label="Font Size"
						:min="12"
						:max="72"
						unit="px"
					/>
				</div>
				<div>
					<UiSelect
						:model-value="fontFamily"
						@update:model-value="$emit('update-font-family', $event)"
						label="Font Family"
						:options="fontFamilyOptions"
					/>
				</div>
			</div>
		</div>

		<!-- Quick Presets -->
		<div class="mt-8" v-if="presets.length > 0 && !enableMultipleShadows">
			<h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
				Quick Presets
			</h3>
			<div class="grid grid-cols-2 gap-2">
				<UiButton
					v-for="preset in presets"
					:key="preset.name"
					@click="$emit('apply-preset', preset)"
					variant="ghost"
					size="sm"
					class="text-xs"
				>
					{{ preset.name }}
				</UiButton>
			</div>
		</div>

		<!-- Multiple Shadow Presets -->
		<div class="mt-8" v-if="multiPresets.length > 0 && enableMultipleShadows">
			<h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
				Multi-Shadow Effects
			</h3>
			<div class="space-y-2">
				<UiButton
					v-for="preset in multiPresets"
					:key="preset.name"
					@click="$emit('apply-multi-preset', preset)"
					variant="ghost"
					size="sm"
					class="w-full text-left justify-start text-xs"
				>
					<div>
						<div class="font-medium">{{ preset.name }}</div>
						<div class="text-xs text-gray-500 dark:text-gray-400">
							{{ preset.description }}
						</div>
					</div>
				</UiButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type {
	MultiTextShadowPreset,
	TextShadowConfig,
	TextShadowPreset,
} from "~/types";

interface Props {
	shadowConfig: TextShadowConfig;
	shadowLayers: TextShadowConfig[];
	enableMultipleShadows: boolean;
	presets: TextShadowPreset[];
	multiPresets: MultiTextShadowPreset[];
	fontSize: number;
	fontFamily: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update-config": [config: Partial<TextShadowConfig>];
	"toggle-multiple-shadows": [enabled: boolean];
	"add-layer": [];
	"remove-layer": [index: number];
	"update-layer": [index: number, updates: Partial<TextShadowConfig>];
	"apply-preset": [preset: TextShadowPreset];
	"apply-multi-preset": [preset: MultiTextShadowPreset];
	"update-font-size": [size: number];
	"update-font-family": [family: string];
}>();

// Font family options
const fontFamilyOptions = [
	{ value: "Arial, sans-serif", label: "Arial" },
	{ value: "Helvetica, sans-serif", label: "Helvetica" },
	{ value: '"Times New Roman", serif', label: "Times New Roman" },
	{ value: "Georgia, serif", label: "Georgia" },
	{ value: '"Courier New", monospace', label: "Courier New" },
	{ value: '"Trebuchet MS", sans-serif', label: "Trebuchet MS" },
	{ value: "Verdana, sans-serif", label: "Verdana" },
	{ value: '"Comic Sans MS", cursive', label: "Comic Sans MS" },
	{ value: "Impact, sans-serif", label: "Impact" },
	{ value: '"Lucida Console", monospace', label: "Lucida Console" },
	// Google Fonts
	{ value: "Inter, sans-serif", label: "Inter" },
	{ value: '"JetBrains Mono", monospace', label: "JetBrains Mono" },
	{ value: "Roboto, sans-serif", label: "Roboto" },
	{ value: '"Open Sans", sans-serif', label: "Open Sans" },
	{ value: "Lato, sans-serif", label: "Lato" },
	{ value: "Montserrat, sans-serif", label: "Montserrat" },
	{ value: "Poppins, sans-serif", label: "Poppins" },
	{ value: '"Source Sans Pro", sans-serif', label: "Source Sans Pro" },
	{ value: "Oswald, sans-serif", label: "Oswald" },
	{ value: "Raleway, sans-serif", label: "Raleway" },
	{ value: "Ubuntu, sans-serif", label: "Ubuntu" },
	{ value: "Nunito, sans-serif", label: "Nunito" },
	{ value: '"Playfair Display", serif', label: "Playfair Display" },
	{ value: "Merriweather, serif", label: "Merriweather" },
	{ value: '"Fira Sans", sans-serif', label: "Fira Sans" },
	{ value: '"Work Sans", sans-serif', label: "Work Sans" },
	{ value: '"PT Sans", sans-serif', label: "PT Sans" },
	{ value: '"Libre Franklin", sans-serif', label: "Libre Franklin" },
	{ value: '"Crimson Text", serif', label: "Crimson Text" },
	{ value: '"Dancing Script", cursive', label: "Dancing Script" },
	{ value: '"Bebas Neue", cursive', label: "Bebas Neue" },
	{ value: '"Abril Fatface", cursive', label: "Abril Fatface" },
	{ value: "Pacifico, cursive", label: "Pacifico" },
	{ value: "Lobster, cursive", label: "Lobster" },
	{ value: "Righteous, cursive", label: "Righteous" },
];

// Unified layer display logic
const displayLayers = computed(() => {
	if (props.enableMultipleShadows) {
		return props.shadowLayers;
	} else {
		return [props.shadowConfig];
	}
});

// Handle layer updates
const handleLayerUpdate = (
	index: number,
	updates: Partial<TextShadowConfig>
) => {
	if (props.enableMultipleShadows) {
		emit("update-layer", index, updates);
	} else {
		emit("update-config", updates);
	}
};
</script> 