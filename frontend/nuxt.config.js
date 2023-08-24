export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@formkit/nuxt',
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

})