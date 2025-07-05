// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
	],
	css: ['~/assets/css/main.css'],
	colorMode: {
		preference: 'system',
		fallback: 'light',
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '',
		storageKey: 'nuxt-color-mode',
	},
	app: {
		head: {
			title: 'Creative Dev Tools - CSS Generators & Developer Utilities',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content:
						'Professional CSS generators, color palettes, and developer tools for creating stunning web designs.',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
});
