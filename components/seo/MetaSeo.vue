<template>
	<!-- Head-only component -->
	<div style="display: none"></div>
</template>

<script setup lang="ts">
import { useHead, useRoute, useRuntimeConfig, useSeoMeta } from "nuxt/app";

defineOptions({ name: "MetaSeo" });

interface Hreflang {
	lang: string;
	href: string;
}
interface GeoMeta {
	position?: string;
	placename?: string;
}

interface Props {
	title?: string;
	description?: string;
	keywords?: string;
	ogImage?: string;
	ogUrl?: string;
	ogType?: string;
	canonical?: string;
	robots?: string;
	hreflangs?: Hreflang[];
	viewport?: string;
	author?: string;
	published?: string;
	modified?: string;
	geo?: GeoMeta;
}

const props = withDefaults(defineProps<Props>(), {
	title: "Creative Dev Tools — генераторы CSS",
	description:
		"Генераторы CSS для прототипирования: тени, градиенты, палитры, радиусы и анимации — быстро и наглядно.",
	keywords:
		"css, генератор, тени, градиенты, анимации, border radius, web tools, ui",
	ogImage: "/api/og",
	ogUrl: "",
	ogType: "website",
	canonical: "",
	robots: "index, follow",
	viewport: "width=device-width, initial-scale=1",
});

const config = useRuntimeConfig();
const route = useRoute();
const baseUrl = (config.public as any).siteUrl || "";
const currentUrl = props.canonical || `${baseUrl}${route.path}`;

// Используем чистый заголовок, а бренд добавляет глобальный titleTemplate в app.vue
const pageTitle = props.title;

// nuxt-og-image: meta tag is enough; route can render /api/og

useSeoMeta({
	title: pageTitle,
	description: props.description,
	ogTitle: `${props.title} — Creative Dev Tools`,
	ogDescription: props.description,
	ogUrl: currentUrl,
	ogType: props.ogType,
	ogImage: props.ogImage,
	twitterCard: "summary_large_image",
	twitterTitle: `${props.title} — Creative Dev Tools`,
	twitterDescription: props.description,
	twitterImage: props.ogImage,
	robots: props.robots,
});

useHead({
	meta: [
		props.keywords ? { name: "keywords", content: props.keywords } : {},
		props.viewport ? { name: "viewport", content: props.viewport } : {},
		props.author ? { name: "author", content: props.author } : {},
		props.published
			? { property: "article:published_time", content: props.published }
			: {},
		props.modified
			? { property: "article:modified_time", content: props.modified }
			: {},
		props.geo?.position
			? { name: "geo.position", content: props.geo.position }
			: {},
		props.geo?.placename
			? { name: "geo.placename", content: props.geo.placename }
			: {},
	].filter(Boolean as any),
	link: [
		currentUrl ? { rel: "canonical", href: currentUrl } : {},
		...(props.hreflangs
			? (props.hreflangs as Hreflang[]).map((h) => ({
					rel: "alternate",
					hreflang: h.lang,
					href: h.href,
			  }))
			: []),
	].filter(Boolean as any),
});
</script>


