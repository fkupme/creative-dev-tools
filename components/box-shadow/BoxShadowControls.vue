<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
			Shadow Controls
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

			<BoxShadowLayer
				v-for="(layer, index) in displayLayers"
				:key="index"
				:layer="layer"
				:index="index"
				:can-remove="enableMultipleShadows && displayLayers.length > 1"
				@update="handleLayerUpdate(index, $event)"
				@remove="$emit('remove-layer', index)"
			/>
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
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BoxShadowConfig, BoxShadowPreset } from "~/types";

interface Props {
	shadowConfig: BoxShadowConfig;
	shadowLayers: BoxShadowConfig[];
	enableMultipleShadows: boolean;
	presets: BoxShadowPreset[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update-config": [config: Partial<BoxShadowConfig>];
	"toggle-multiple-shadows": [enabled: boolean];
	"add-layer": [];
	"remove-layer": [index: number];
	"update-layer": [index: number, updates: Partial<BoxShadowConfig>];
	"apply-preset": [preset: BoxShadowPreset];
}>();

// Унифицированный список слоев: либо текущий конфиг как единственный слой, либо все слои
const displayLayers = computed(() => {
	if (props.enableMultipleShadows) {
		return props.shadowLayers;
	} else {
		return [props.shadowConfig];
	}
});

// Обработка обновления слоя
const handleLayerUpdate = (
	index: number,
	updates: Partial<BoxShadowConfig>
) => {
	if (props.enableMultipleShadows) {
		emit("update-layer", index, updates);
	} else {
		emit("update-config", updates);
	}
};
</script> 