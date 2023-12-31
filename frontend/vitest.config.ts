import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        Vue(),
        AutoImport({
            imports: ['vue', "vitest"],
            dts:true,
            dirs: ['./composables', './store', './composables/crud', './components', './constants'],
            vueTemplate: true,
        }),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
    },
    resolve: {
        alias: {
            "~": ".",
            '@/': new URL('./', import.meta.url).pathname,
        }
    }
})