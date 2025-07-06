// https://nuxt.com/docs/api/configuration/nuxt-config
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
			path: '~/components/ui',
			prefix: 'Ui',
		},
	],
	fonts: {
		families: [
			{ name: 'Inter', provider: 'google' },
			{ name: 'JetBrains Mono', provider: 'google' },
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
		public: {
			appName: 'Creative Dev Tools',
			appVersion: '1.0.0',
		},
	},
	ssr: false,
	nitro: {
		prerender: {
			routes: ['/'],
		},
	},
});
