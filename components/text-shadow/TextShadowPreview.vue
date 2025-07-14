<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
			Preview
		</h2>

		<!-- Preview Controls -->
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center space-x-4">
				<div>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						Background Pattern
					</span>
					<UiToggle
						:model-value="showBackground"
						@update:model-value="$emit('toggle-background', $event)"
						label="Show Grid"
						class="ml-2"
					/>
				</div>
				<div>
					<UiColorPicker
						:model-value="backgroundColor"
						@update:model-value="$emit('update-background-color', $event)"
						label="Background Color"
					/>
				</div>
			</div>
		</div>

		<!-- Editable Text Input -->
		<div class="mb-4">
			<UiInput
				:model-value="previewText"
				@update:model-value="$emit('update-preview-text', $event)"
				label="Preview Text"
				placeholder="Enter your text here..."
			/>
		</div>

		<!-- Preview Container -->
		<div
			ref="previewContainer"
			class="relative min-h-64 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center p-8"
			:class="{
				'bg-preview-pattern': showBackground,
			}"
			:style="{ backgroundColor: !showBackground ? backgroundColor : '' }"
		>
			<!-- Preview Text -->
			<h1
				class="text-center font-bold leading-tight transition-all duration-300 select-none"
				:style="{
					textShadow: computedTextShadow,
					fontSize: fontSize + 'px',
					fontFamily: fontFamily,
					color: textColor,
				}"
			>
				{{ previewText }}
			</h1>
		</div>

		<!-- Text Color Control -->
		<div class="mt-4">
			<UiColorPicker
				:model-value="textColor"
				@update:model-value="$emit('update-text-color', $event)"
				label="Text Color"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	showBackground: boolean;
	backgroundColor: string;
	computedTextShadow: string;
	fontSize: number;
	fontFamily: string;
	previewText: string;
	textColor: string;
}

defineProps<Props>();

const previewContainer = ref<HTMLElement>();

defineEmits<{
	"toggle-background": [enabled: boolean];
	"update-background-color": [color: string];
	"update-preview-text": [text: string];
	"update-text-color": [color: string];
}>();

defineExpose({
	previewContainer,
});
</script>

<style scoped>
.bg-preview-pattern {
	background-image: linear-gradient(45deg, #f3f4f6 25%, transparent 25%),
		linear-gradient(-45deg, #f3f4f6 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #f3f4f6 75%),
		linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.dark .bg-preview-pattern {
	background-image: linear-gradient(45deg, #374151 25%, transparent 25%),
		linear-gradient(-45deg, #374151 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #374151 75%),
		linear-gradient(-45deg, transparent 75%, #374151 75%);
}
</style> 