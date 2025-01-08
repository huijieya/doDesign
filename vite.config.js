import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import path from 'path'
import context from './package'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
          symbolId: '[dir]_[name]'
        }),
        resolve()
    ],
    base: context.baseRoute,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            '@components': '@robot/i/lib/components.es.js',
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8300,
        https: false,
        hmr:  true,
        open: true,
    },
    optimizeDeps: {
        include: [
            'axios',
            'dayjs',
            'normalize-wheel',
            'dayjs/plugin/customParseFormat',
            'pinia',
            'vue-i18n'
        ],
    },
    build: {
        outDir: 'dist',
    }
})
