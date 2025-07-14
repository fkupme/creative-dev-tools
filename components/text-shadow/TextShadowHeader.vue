<template>
	<div
		class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-4">
					<NuxtLink
						to="/"
						class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
					>
						<Icon name="heroicons:arrow-left" class="w-5 h-5" />
					</NuxtLink>
					<h1 class="text-xl font-bold text-gray-900 dark:text-white">
						Text Shadow Generator
					</h1>
				</div>
				<div class="flex items-center space-x-3">
					<UiButton @click="$emit('export-css')" variant="outline" size="sm">
						<Icon name="heroicons:clipboard" class="w-4 h-4 mr-2" />
						Copy CSS
					</UiButton>
					<UiButton @click="$emit('export-image')" variant="primary" size="sm">
						<Icon name="heroicons:photo" class="w-4 h-4 mr-2" />
						Export PNG
					</UiButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits<{
	"export-css": [];
	"export-image": [];
}>();
</script> 