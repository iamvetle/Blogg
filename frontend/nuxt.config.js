export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  experimental: { noVueServer: true }, 
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    'nuxt-vitest',
  ],
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      exposeLevel: 2,
      config: {},
      injectPosition: 'first',
      viewer: true
    },
    pinia: {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ]
    },
    ssr:false, // client only - Single site application is whats "on" now
  })