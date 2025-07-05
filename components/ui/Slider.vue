<template>
	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<label v-if="label" :for="sliderId" class="label">
				{{ label }}
			</label>
			<div class="flex items-center space-x-2">
				<input
					v-model.number="displayValue"
					type="number"
					:min="min"
					:max="max"
					:step="step"
					           class="w-16 px-2 py-1 text-sm border border-secondary-200 dark:border-secondary-700 rounded bg-white dark:bg-secondary-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
					@input="updateValue"
				/>
				<span v-if="unit" class="text-sm text-secondary-500">{{ unit }}</span>
			</div>
		</div>

		<div class="relative">
			<input
				:id="sliderId"
				v-model.number="displayValue"
				type="range"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
				class="slider w-full"
				@input="updateValue"
			/>

			<!-- Marks -->
			<div v-if="marks" class="flex justify-between mt-1">
				<span
					v-for="mark in marks"
					:key="mark"
					class="text-xs text-secondary-400"
				>
					{{ mark }}
				</span>
			</div>
		</div>

		<div v-if="description" class="text-small text-secondary-500">
			{{ description }}
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: number;
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	unit?: string;
	description?: string;
	disabled?: boolean;
	marks?: number[];
}

const props = withDefaults(defineProps<Props>(), {
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: number];
}>();

const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;
const displayValue = ref(props.modelValue);

const updateValue = () => {
	emit("update:modelValue", displayValue.value);
};

// Синхронизация с внешним значением
watch(
	() => props.modelValue,
	(newValue) => {
		displayValue.value = newValue;
	}
);
</script> 