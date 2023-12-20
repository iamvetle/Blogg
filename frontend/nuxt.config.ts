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
			// {
			// 	from: "./store",
			// 	imports: [
			// 		{ name: "usePaginationStore", as: "usePaginationStore" },
			// 		{ name: "useLoggedInUserStore", as: "useLoggedInUserStore" },
			// 		{ name: "useGeneralStore", as: "useGeneralStore" },
			// 		{ name: "usePostStore", as: "usePostStore" },
			// 		{ name: "useSearchStore", as: "useSearchStore" },
			// 		{ name: "useAuthStore", as: "useAuthStore" }

			// 	]
			// },
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
		"nuxt-vitest",
		"@nuxt/ui",
		"nuxt-icon"
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
	ssr: false
});
