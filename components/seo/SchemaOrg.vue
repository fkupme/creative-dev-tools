<template>
	<div v-if="false"></div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";

defineOptions({ name: "SchemaOrg" });

const props = defineProps<{
	type:
		| "WebPage"
		| "Article"
		| "Product"
		| "SoftwareApplication"
		| "Organization"
		| "BreadcrumbList"
		| "FAQPage"
		| "Review"
		| "AggregateRating"
		| "Blog";
	data: Record<string, any>;
}>();

const jsonLd = {
	"@context": "https://schema.org",
	"@type": props.type,
	...props.data,
};

useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify(jsonLd),
		},
	],
});
</script>


