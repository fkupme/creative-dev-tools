<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
			Shadow Controls
		</h2>

		<!-- Shadow Type Toggle -->
		<div class="mb-6">
			<UiToggle
				:model-value="shadowConfig.inset"
				@update:model-value="$emit('update-config', { inset: $event })"
				label="Inset Shadow"
			/>
		</div>

		<!-- Multiple Shadows Toggle -->
		<div class="mb-6">
			<UiToggle
				:model-value="enableMultipleShadows"
				@update:model-value="$emit('toggle-multiple-shadows', $event)"
				label="Multiple Shadows"
			/>
		</div>

		<!-- Multiple Shadows Controls -->
		<div
			v-if="enableMultipleShadows"
			class="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
		>
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
					Shadow Layers ({{ shadowLayers.length }})
				</h3>
				<UiButton @click="$emit('add-layer')" variant="outline" size="sm">
					<Icon name="heroicons:plus" class="w-4 h-4 mr-1" />
					Add Layer
				</UiButton>
			</div>

			<BoxShadowLayer
				v-for="(layer, index) in shadowLayers"
				:key="index"
				:layer="layer"
				:index="index"
				@update="$emit('update-layer', index, $event)"
				@remove="$emit('remove-layer', index)"
			/>
		</div>

		<!-- Single Shadow Controls -->
		<div v-if="!enableMultipleShadows">
			<!-- Horizontal Offset -->
			<div class="mb-6">
				<UiSlider
					:model-value="shadowConfig.offsetX"
					@update:model-value="$emit('update-config', { offsetX: $event })"
					label="Horizontal Offset"
					:min="-100"
					:max="100"
					unit="px"
				/>
			</div>

			<!-- Vertical Offset -->
			<div class="mb-6">
				<UiSlider
					:model-value="shadowConfig.offsetY"
					@update:model-value="$emit('update-config', { offsetY: $event })"
					label="Vertical Offset"
					:min="-100"
					:max="100"
					unit="px"
				/>
			</div>

			<!-- Blur Radius -->
			<div class="mb-6">
				<UiSlider
					:model-value="shadowConfig.blur"
					@update:model-value="$emit('update-config', { blur: $event })"
					label="Blur Radius"
					:min="0"
					:max="50"
					unit="px"
				/>
			</div>

			<!-- Spread Radius -->
			<div class="mb-6">
				<UiSlider
					:model-value="shadowConfig.spread"
					@update:model-value="$emit('update-config', { spread: $event })"
					label="Spread Radius"
					:min="-50"
					:max="50"
					unit="px"
				/>
			</div>

			<!-- Shadow Color -->
			<div class="mb-6">
				<UiColorPicker
					:model-value="shadowConfig.color"
					@update:model-value="$emit('update-config', { color: $event })"
					label="Shadow Color"
				/>
			</div>

			<!-- Opacity -->
			<div class="mb-6">
				<UiSlider
					:model-value="shadowConfig.opacity"
					@update:model-value="$emit('update-config', { opacity: $event })"
					label="Opacity"
					:min="0"
					:max="100"
					unit="%"
				/>
			</div>

			<!-- Quick Presets -->
			<div class="mt-8">
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
	</div>
</template>

<script setup lang="ts">
import type { BoxShadowConfig, BoxShadowPreset } from "~/types";

interface Props {
	shadowConfig: BoxShadowConfig;
	shadowLayers: BoxShadowConfig[];
	enableMultipleShadows: boolean;
	presets: BoxShadowPreset[];
}

defineProps<Props>();

defineEmits<{
	"update-config": [config: Partial<BoxShadowConfig>];
	"toggle-multiple-shadows": [enabled: boolean];
	"add-layer": [];
	"remove-layer": [index: number];
	"update-layer": [index: number, updates: Partial<BoxShadowConfig>];
	"apply-preset": [preset: BoxShadowPreset];
}>();
</script> 