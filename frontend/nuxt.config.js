
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  components: [
    {
      path: '~/components',
     pathPrefix: false,
    },
  ],
  imports: {
    dirs:['./typescript', './store']
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-vitest",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  ssr: false, // client only (single site application) all api fetch on client
});
