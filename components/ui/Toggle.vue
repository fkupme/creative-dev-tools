<template>
	<div class="flex items-center justify-between">
		<div v-if="label || description" class="flex-1">
			<label v-if="label" :for="toggleId" class="label">
				{{ label }}
			</label>
			<p v-if="description" class="text-small text-secondary-500">
				{{ description }}
			</p>
		</div>

		<Switch
			:id="toggleId"
			:checked="modelValue"
			:disabled="disabled"
			:class="[
				'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
				modelValue
					? 'bg-primary-500'
					: 'bg-secondary-200 dark:bg-secondary-700',
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
			]"
			@update:checked="$emit('update:modelValue', $event)"
		>
			<span
				:class="[
					'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
					modelValue ? 'translate-x-6' : 'translate-x-1',
				]"
			/>
		</Switch>
	</div>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";

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
</script> 