import Tailwind from '@tailwindcss/vite';

export default defineNuxtConfig({
	// span mode start
	ssr: false,
	hooks: {
		'prerender:routes'({ routes }) {
			routes.clear(); // Не создает никаких маршрутов (кроме значений по умолчанию)
		},
	},
	spaLoadingTemplate: 'spa-loading-template.html',

	// app configs
	devtools: { enabled: true },
	compatibilityDate: '2024-11-01',
	future: {
		compatibilityVersion: 4,
	},
	runtimeConfig: {
		public: {
			twaToken: process.env.TELEGRAM_BOT_TOKEN,
			apiUrl: process.env.BACKEND_API_URL,
		},
	},
	app: {
		rootTag: 'main',
		head: {
			title: 'TMA bodyline support',
			script: [
				{
					src: 'https://telegram.org/js/telegram-web-app.js',
				},
			],
		},
		rootAttrs: {
			'vaul-drawer-wrapper': '',
			class: 'bg-[var(--ui-bg)]',
		},
	},

	modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [Tailwind()],
	},

	ui: {
		theme: {
			colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'],
		},
	},
});
