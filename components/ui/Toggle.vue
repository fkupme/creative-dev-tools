<template>
	<div class="flex items-center justify-between">
		<div v-if="label || description" class="flex-1">
			<label
				v-if="label"
				:for="toggleId"
				class="block text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				{{ label }}
			</label>
			<p v-if="description" class="text-xs text-gray-500 dark:text-gray-400">
				{{ description }}
			</p>
		</div>

		<button
			:id="toggleId"
			type="button"
			:disabled="disabled"
			:class="[
				'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
				modelValue ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
			]"
			@click="toggle"
		>
			<span
				:class="[
					'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
					modelValue ? 'translate-x-6' : 'translate-x-1',
				]"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: boolean;
	label?: string;
	description?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`;

const toggle = () => {
	if (!props.disabled) {
		emit("update:modelValue", !props.modelValue);
	}
};
</script> 