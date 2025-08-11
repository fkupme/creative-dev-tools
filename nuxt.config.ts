// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

/** @type {import('nuxt').NuxtConfig} */
export default defineNuxtConfig({
	pathPrefix: '/tools',
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
	colorMode: {
		preference: 'dark',
		fallback: 'light',
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '',
		storageKey: 'nuxt-color-mode',
	},
	tailwindcss: {
		cssPath: '~/assets/css/main.css',
		configPath: 'tailwind.config.js',
		exposeConfig: false,
		injectPosition: 0,
		viewer: true,
	},
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
	],
	fonts: {
		families: [
			{ name: 'Inter', provider: 'google' },
			{ name: 'JetBrains Mono', provider: 'google' },
			{ name: 'Roboto', provider: 'google' },
			{ name: 'Open Sans', provider: 'google' },
			{ name: 'Lato', provider: 'google' },
			{ name: 'Montserrat', provider: 'google' },
			{ name: 'Poppins', provider: 'google' },
			{ name: 'Source Sans Pro', provider: 'google' },
			{ name: 'Oswald', provider: 'google' },
			{ name: 'Raleway', provider: 'google' },
			{ name: 'Ubuntu', provider: 'google' },
			{ name: 'Nunito', provider: 'google' },
			{ name: 'Playfair Display', provider: 'google' },
			{ name: 'Merriweather', provider: 'google' },
			{ name: 'Fira Sans', provider: 'google' },
			{ name: 'Work Sans', provider: 'google' },
			{ name: 'PT Sans', provider: 'google' },
			{ name: 'Libre Franklin', provider: 'google' },
			{ name: 'Crimson Text', provider: 'google' },
			{ name: 'Dancing Script', provider: 'google' },
			{ name: 'Bebas Neue', provider: 'google' },
			{ name: 'Abril Fatface', provider: 'google' },
			{ name: 'Pacifico', provider: 'google' },
			{ name: 'Lobster', provider: 'google' },
			{ name: 'Righteous', provider: 'google' },
		],
	},
	app: {
		head: {
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
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
	runtimeConfig: {
		public: { appName: 'Creative Dev Tools', appVersion: '1.0.0' },
	},
	ssr: false,
	nitro: { prerender: { routes: ['/'] } },
});
