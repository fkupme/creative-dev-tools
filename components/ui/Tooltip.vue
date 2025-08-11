<template>
	<div class="relative inline-block group/tt" :class="wrapperClass">
		<slot />
		<div
			class="pointer-events-none absolute z-50 px-2 py-1 rounded bg-secondary-900 text-white text-xs whitespace-nowrap opacity-0 group-hover/tt:opacity-100 transition-opacity duration-150 shadow-soft"
			:class="positionClass"
			role="tooltip"
		>
			{{ text }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
	text: string;
	placement?: "top" | "bottom" | "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
	placement: "top",
});

const wrapperClass = "";

const positionClass = computed(() => {
	switch (props.placement) {
		case "bottom":
			return "left-1/2 -translate-x-1/2 top-full mt-2";
		case "left":
			return "right-full mr-2 top-1/2 -translate-y-1/2";
		case "right":
			return "left-full ml-2 top-1/2 -translate-y-1/2";
		default:
			return "left-1/2 -translate-x-1/2 bottom-full mb-2";
	}
});
</script>
