<template>
	<Dialog
		:open="modelValue"
		@close="$emit('update:modelValue', false)"
		class="relative z-50"
	>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
			aria-hidden="true"
		/>

		<!-- Modal Container -->
		<div class="fixed inset-0 flex items-center justify-center p-4">
			<DialogPanel
				:class="[
					'w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-secondary-800 p-6 text-left align-middle shadow-xl transition-all',
					sizeClasses,
				]"
			>
				<!-- Header -->
				<div class="flex items-center justify-between mb-4">
					<DialogTitle
						as="h3"
						class="text-lg font-medium leading-6 text-secondary-900 dark:text-secondary-100"
					>
						{{ title }}
					</DialogTitle>
					<button
						@click="$emit('update:modelValue', false)"
						class="p-1 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
					>
						<Icon name="heroicons:x-mark" class="w-5 h-5 text-secondary-500" />
					</button>
				</div>

				<!-- Content -->
				<div class="space-y-4">
					<DialogDescription
						v-if="description"
						class="text-sm text-secondary-500 dark:text-secondary-400"
					>
						{{ description }}
					</DialogDescription>

					<slot />
				</div>

				<!-- Footer Actions -->
				<div
					v-if="$slots.footer"
					class="flex justify-end space-x-2 mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-700"
				>
					<slot name="footer" />
				</div>
			</DialogPanel>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import {
	Dialog,
	DialogDescription,
	DialogPanel,
	DialogTitle,
} from "@headlessui/vue";

interface Props {
	modelValue: boolean;
	title: string;
	description?: string;
	size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const props = withDefaults(defineProps<Props>(), {
	size: "md",
});

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const sizeClasses = computed(() => {
	const sizes = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
	};
	return sizes[props.size];
});
</script> 