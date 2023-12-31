export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,

		},
		
	},
	debug:true,
	sourcemap: {
		server: true,
		client: true
	  },
	  spaLoadingTemplate:"./app/spa-loading-template.html",
	vite: {
		vue: {
			script: {
				defineModel: true,
			},
		},
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	imports: {
		dirs: ['./typescript', './store', './utils/editor', './composables/crud', './composables/editor', './constants'],
		presets: [
			{
				from: 'axios',
				imports: [
					{ name: "default", as: "axios" },
					{ name: "AxiosResponse", as: 'AxiosResponse', type: true }
				]
			}

		]

	},

	modules: [
		"@formkit/nuxt",
		"@pinia/nuxt",
		"@nuxt/ui",
		"nuxt-icon",
		"nuxt-vitest"
	],
	pinia: {
		autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
		// storesDirs: ['./store/**']
	},
	ui: {
		global: true,
		icons: ['mdi', 'simple-icons', 'solar'],
	},
	tailwindcss: {
		cssPath: "~/assets/css/tailwind.css",
		configPath: "tailwind.config",
		exposeConfig: false,
		exposeLevel: 2,
		config: {
		},
		injectPosition: "first",
		viewer: true,

	},
	// routeRules: {
	// 	"/login": { ssr:true },
	// 	"/registrer": { ssr:true }

	// },
});
