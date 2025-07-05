<template>
	<div class="space-y-1">
		<label v-if="label" class="label">{{ label }}</label>

		<Listbox
			:model-value="modelValue"
			@update:model-value="$emit('update:modelValue', $event)"
			:disabled="disabled"
		>
			<div class="relative">
				<ListboxButton
					:class="[
						'input flex items-center justify-between cursor-pointer',
						{
							'opacity-50 cursor-not-allowed': disabled,
							'border-red-500 focus:border-red-500 focus:ring-red-500': error,
						},
					]"
				>
					<span v-if="selectedOption" class="block truncate">
						{{ selectedOption.label }}
					</span>
					<span v-else class="block truncate text-secondary-400">
						{{ placeholder }}
					</span>
					<Icon
						name="heroicons:chevron-up-down"
						class="h-4 w-4 text-secondary-400"
						aria-hidden="true"
					/>
				</ListboxButton>

				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						             class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-lg py-1 focus:outline-none"
					>
						<ListboxOption
							v-for="option in options"
							:key="option.value"
							v-slot="{ active, selected }"
							:value="option.value"
							as="template"
						>
							<li
								:class="[
									'relative cursor-pointer select-none py-2 pl-10 pr-4',
									active
										? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
										: 'text-secondary-900 dark:text-secondary-100',
								]"
							>
								<span
									:class="[
										'block truncate',
										selected ? 'font-medium' : 'font-normal',
									]"
								>
									{{ option.label }}
								</span>
								<span
									v-if="selected"
									class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400"
								>
									<Icon
										name="heroicons:check"
										class="h-4 w-4"
										aria-hidden="true"
									/>
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>

		<p v-if="error" class="text-small text-red-500">{{ error }}</p>
		<p v-if="help" class="text-small text-secondary-500">{{ help }}</p>
	</div>
</template>

<script setup lang="ts">
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/vue";

interface Option {
	value: string | number;
	label: string;
	disabled?: boolean;
}

interface Props {
	modelValue: string | number | null;
	options: Option[];
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	help?: string;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: "Выберите опцию...",
	disabled: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: string | number | null];
}>();

const selectedOption = computed(() => {
	return props.options.find((option) => option.value === props.modelValue);
});
</script> 