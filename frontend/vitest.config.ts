import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { alias } from './alias'

export default defineConfig({
    plugins: [
        Vue(),
        AutoImport({
            imports: ['vue'],
            dirs:['./composables', './composables/crud'],
            vueTemplate:true,
        }),
     ], 
    test: {
        globals: true,
        environment:"happy-dom"
    },
    resolve: {
        alias,
    }
})

