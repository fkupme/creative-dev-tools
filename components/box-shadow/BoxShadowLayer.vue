<template>
	<div class="mb-4 p-3 bg-white dark:bg-gray-800 rounded border">
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
				Layer {{ index + 1 }}
			</span>
			<UiButton
				v-if="canRemove"
				@click="$emit('remove')"
				variant="ghost"
				size="sm"
			>
				<Icon name="heroicons:trash" class="w-4 h-4 text-red-500" />
			</UiButton>
		</div>

		<div class="space-y-3">
			<!-- Controls Row 1 -->
			<div class="grid grid-cols-2 gap-2 text-xs">
				<div>
					<UiSlider
						:model-value="layer.offsetX"
						@update:model-value="updateLayer({ offsetX: $event })"
						label="X"
						:min="-50"
						:max="50"
						unit="px"
					/>
				</div>
				<div>
					<UiSlider
						:model-value="layer.offsetY"
						@update:model-value="updateLayer({ offsetY: $event })"
						label="Y"
						:min="-50"
						:max="50"
						unit="px"
					/>
				</div>
			</div>

			<!-- Controls Row 2 -->
			<div class="grid grid-cols-2 gap-2 text-xs">
				<div>
					<UiSlider
						:model-value="layer.blur"
						@update:model-value="updateLayer({ blur: $event })"
						label="Blur"
						:min="0"
						:max="25"
						unit="px"
					/>
				</div>
				<div>
					<UiSlider
						:model-value="layer.spread"
						@update:model-value="updateLayer({ spread: $event })"
						label="Spread"
						:min="-25"
						:max="25"
						unit="px"
					/>
				</div>
			</div>

			<!-- Color Picker and Inset Toggle -->
			<div class="grid grid-auto-rows gap-2 text-xs">
				<div>
					<UiColorPicker
						:model-value="layer.color"
						@update:model-value="updateLayer({ color: $event })"
						label="Color"
					/>
				</div>
				<div class="flex items-center justify-between">
					<UiToggle
						class="flex-1"
						:model-value="layer.inset"
						@update:model-value="updateLayer({ inset: $event })"
						label="Inset"
					/>
				</div>
			</div>

			<!-- Opacity Slider -->
			<div class="text-xs">
				<UiSlider
					:model-value="layer.opacity"
					@update:model-value="updateLayer({ opacity: $event })"
					label="Opacity"
					:min="0"
					:max="100"
					unit="%"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { BoxShadowConfig } from "~/types";

interface Props {
	layer: BoxShadowConfig;
	index: number;
	canRemove?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	update: [layer: Partial<BoxShadowConfig>];
	remove: [];
}>();

const updateLayer = (updates: Partial<BoxShadowConfig>) => {
	emit("update", updates);
};
</script> 