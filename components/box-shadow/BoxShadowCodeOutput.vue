<template>
	<div
		class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
	>
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
			Generated CSS
		</h2>

		<UiCodeBlock :code="cssCode" language="css" />
	</div>
</template>

<script setup lang="ts">
interface Props {
	cssCode: string;
}

defineProps<Props>();
</script> 