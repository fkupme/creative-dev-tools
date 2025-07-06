<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
			Preview
		</h2>

		<!-- Background Pattern Toggle -->
		<div class="flex items-center justify-between mb-4">
			<span class="text-sm text-gray-600 dark:text-gray-400">
				Background Pattern
			</span>
			<UiToggle
				:model-value="showBackground"
				@update:model-value="$emit('toggle-background', $event)"
				label="Show Grid"
			/>
		</div>

		<!-- Preview Container -->
		<div
			ref="previewContainer"
			class="relative min-h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden"
			:class="{
				'bg-preview-pattern': showBackground,
				'bg-gray-100 dark:bg-gray-700': !showBackground,
			}"
		>
			<!-- Preview Element -->
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300"
				:style="{ boxShadow: computedBoxShadow }"
			>
				<div class="text-center">
					<Icon
						name="heroicons:check-circle"
						class="w-8 h-8 mx-auto mb-2 text-gray-400"
					/>
					<p class="text-sm text-gray-500 dark:text-gray-400">Shadow Preview</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
	showBackground: boolean;
	computedBoxShadow: string;
}

defineProps<Props>();

const previewContainer = ref<HTMLElement>();

defineEmits<{
	"toggle-background": [enabled: boolean];
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