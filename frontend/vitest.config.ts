import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        Vue(),
        '@nuxt/ui',
        AutoImport({
            imports: ['vue', "vitest"],
            dts:true,
            dirs: ['./components', '/testUtils', './services', './composables', './store', './composables/crud', './constants'],
            vueTemplate: true,
        }),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
    },
    resolve: {
        alias: {
            '~':  new URL('.', import.meta.url).pathname,
            '@/': new URL('./', import.meta.url).pathname,
        }
    }
})