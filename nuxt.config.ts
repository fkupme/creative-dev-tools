// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

/** @type {import('nuxt').NuxtConfig} */
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/fonts',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxt/devtools',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	plugins: ['~/plugins/vue-draggable.client.ts'],
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
		{
			path: '~/components/box-shadow',
			prefix: 'BoxShadow',
		},
		{
			path: '~/components/text-shadow',
			prefix: 'TextShadow',
		},
		{
			path: '~/components/ui',
			prefix: 'Ui',
		},
		{
			path: '~/components/seo',
			prefix: 'Seo',
		},
	],
	app: {
		head: {
			base: { href: '/' },
			title: 'Creative Dev Tools',
			meta: [
				{
					name: 'description',
					content:
						'Комплексный набор инструментов для веб-разработчиков и дизайнеров',
				},
				{
					name: 'keywords',
					content:
						'css, generator, shadow, gradient, color, palette, web development, tools',
				},
				{ property: 'og:title', content: 'Creative Dev Tools' },
				{
					property: 'og:description',
					content: 'Современные инструменты для веб-разработки',
				},
				{ property: 'og:type', content: 'website' },
				{ name: 'twitter:card', content: 'summary_large_image' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'mask-icon', href: '/favicon.svg', color: '#00DC82' },
			],
		},
	},
	runtimeConfig: {
		public: {
			appName: 'Creative Dev Tools',
			appVersion: '1.0.0',
			siteUrl: 'https://creative-dev-tools.vercel.app',
		},
	},
	// Site config moved to site.config.ts for better type support
	// Module-specific options live in module defaults; keep config minimal
	// nuxt-og-image will use defaults; override via route rules if needed
	ssr: false,
	nitro: {
		preset: 'vercel',
		compatibilityDate: '2025-08-11',
		prerender: {
			routes: [
				'/',
				'/colors',
				'/gradients',
				'/shadows',
				'/text-shadows',
				'/border-radius',
				'/animations',
			],
		},
	},
});
