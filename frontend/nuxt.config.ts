export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,

    },
  },

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
    dirs: ['./typescript', './store', './composables/crud', './composables/editor', './constants'],
    presets: [
      {
        from: "./store",
        imports: [
          { name: "usePaginationStore", as: "usePaginationStore" },
          { name: "useLoggedInUserStore", as: "useLoggedInUserStore" },
          { name: "useGeneralStore", as: "useGeneralStore" },
          { name: "usePostStore", as: "usePostStore" },
          { name: "useSearchStore", as: "useSearchStore" }
        ]
      },
      {
        from: 'axios',
        imports: [
          { name: "default", as: "axios" },
          { name: "AxiosResponse", as: 'AxiosResponse', type:true }
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
  ui: {
    global: true,
    icons: ['mdi', 'simple-icons'],
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
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  ssr: false, // client only (single site application) all api fetch on client
});
