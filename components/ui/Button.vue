<template>
	<button
		:class="[
			'btn',
			variantClasses,
			sizeClasses,
			{
				interactive: !disabled && !loading,
				'opacity-50 cursor-not-allowed': disabled || loading,
			},
		]"
		:disabled="disabled || loading"
		@click="$emit('click', $event)"
	>
		<Icon
			v-if="loading"
			name="heroicons:arrow-path"
			class="animate-spin mr-2"
			:size="iconSize"
		/>
		<Icon v-else-if="icon" :name="icon" class="mr-2" :size="iconSize" />
		<slot />
	</button>
</template>

<script setup lang="ts">
type Variant = "primary" | "secondary" | "accent" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props {
	variant?: Variant;
	size?: Size;
	icon?: string;
	loading?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: "primary" as Variant,
	size: "md" as Size,
	loading: false,
	disabled: false,
});

defineEmits<{
	click: [event: MouseEvent];
}>();

const variantClasses = computed(() => {
	const variants: Record<Variant, string> = {
		primary: "btn-primary",
		secondary: "btn-secondary",
		accent: "btn-accent",
		ghost: "btn-ghost",
		outline: "btn-outline",
	};
	return variants[props.variant];
});

const sizeClasses = computed(() => {
	const sizes: Record<Size, string> = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};
	return sizes[props.size];
});

const iconSize = computed(() => {
	const sizes: Record<Size, string> = {
		sm: "16",
		md: "20",
		lg: "24",
	};
	return sizes[props.size];
});
</script> 