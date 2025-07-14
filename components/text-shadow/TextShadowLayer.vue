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
						:model-value="layer.x"
						@update:model-value="updateLayer({ x: $event })"
						label="X"
						:min="-20"
						:max="20"
						unit="px"
					/>
				</div>
				<div>
					<UiSlider
						:model-value="layer.y"
						@update:model-value="updateLayer({ y: $event })"
						label="Y"
						:min="-20"
						:max="20"
						unit="px"
					/>
				</div>
			</div>

			<!-- Blur Control -->
			<div class="text-xs">
				<UiSlider
					:model-value="layer.blur"
					@update:model-value="updateLayer({ blur: $event })"
					label="Blur"
					:min="0"
					:max="25"
					unit="px"
				/>
			</div>

			<!-- Color Picker and Opacity -->
			<div class="grid grid-auto-rows gap-2 text-xs">
				<div>
					<UiColorPicker
						:model-value="layer.color"
						@update:model-value="updateLayer({ color: $event })"
						label="Color"
					/>
				</div>
				<div>
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
	</div>
</template>

<script setup lang="ts">
import type { TextShadowConfig } from "~/types";

interface Props {
	layer: TextShadowConfig;
	index: number;
	canRemove?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	update: [layer: Partial<TextShadowConfig>];
	remove: [];
}>();

const updateLayer = (updates: Partial<TextShadowConfig>) => {
	emit("update", updates);
};
</script> 