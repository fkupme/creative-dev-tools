<template>
	<div class="space-y-1">
		<label v-if="label" :for="inputId" class="label">
			{{ label }}
			<span v-if="required" class="text-red-500 ml-1">*</span>
		</label>

		<div class="relative">
			<input
				:id="inputId"
				:value="modelValue"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:min="min"
				:max="max"
				:step="step"
				:class="[
					'input',
					{
						'pl-10': prefixIcon,
						'pr-10': suffixIcon,
						'border-red-500 focus:border-red-500 focus:ring-red-500': error,
						'border-green-500 focus:border-green-500 focus:ring-green-500':
							success,
						'opacity-50 cursor-not-allowed': disabled,
					},
				]"
				@input="handleInput"
				@focus="$emit('focus', $event)"
				@blur="$emit('blur', $event)"
				@keydown="$emit('keydown', $event)"
			/>

			<!-- Prefix Icon -->
			<div
				v-if="prefixIcon"
				class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
			>
				<Icon :name="prefixIcon" class="w-5 h-5 text-secondary-400" />
			</div>

			<!-- Suffix Icon -->
			<div
				v-if="suffixIcon"
				class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
			>
				<Icon :name="suffixIcon" class="w-5 h-5 text-secondary-400" />
			</div>

			<!-- Clear Button -->
			<button
				v-if="clearable && modelValue"
				@click="$emit('update:modelValue', '')"
				class="absolute inset-y-0 right-0 pr-3 flex items-center"
			>
				<Icon
					name="heroicons:x-mark"
					class="w-4 h-4 text-secondary-400 hover:text-secondary-600"
				/>
			</button>
		</div>

		<!-- Help Text -->
		<p v-if="help" class="text-small text-secondary-500">
			{{ help }}
		</p>

		<!-- Error Message -->
		<p v-if="error" class="text-small text-red-500">
			{{ error }}
		</p>

		<!-- Success Message -->
		<p v-if="success" class="text-small text-green-500">
			{{ success }}
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: string | number;
	label?: string;
	type?:
		| "text"
		| "email"
		| "password"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "color";
	placeholder?: string;
	help?: string;
	error?: string;
	success?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	clearable?: boolean;
	prefixIcon?: string;
	suffixIcon?: string;
	min?: number;
	max?: number;
	step?: number;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	disabled: false,
	readonly: false,
	required: false,
	clearable: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: string | number];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
	keydown: [event: KeyboardEvent];
}>();

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
};
</script> 