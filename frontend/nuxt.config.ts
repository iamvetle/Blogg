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
    dirs: ['./typescript', './store', './composables/crud', './composables/editor']

  },

  modules: [
    //"@nuxtjs/eslint-module",
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
