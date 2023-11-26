import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

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
      template: {
        transformAssetUrls,
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
    dirs:['./typescript', './store', './composables/crud']

  },
  modules: [
    "@nuxtjs/tailwindcss",
    //"@nuxtjs/eslint-module",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "nuxt-vitest",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
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
