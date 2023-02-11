import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import fs from 'fs'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //Setup name component

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {

    const env = loadEnv(mode, process.cwd(), '')

    generateLanguage()
        .then()
        .catch()

    return {
        base: './',
        plugins: [
            splitVendorChunkPlugin(),
            vue(),
            vueJsx(),
            VueSetupExtend(),
            AutoImport({
                imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
                dts: 'src/@types/auto-imports.d.ts',
            }),
        ],
        node: {
            fs: 'empty',
            module: 'empty',
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '~node_modules': path.resolve(__dirname, 'node_modules'),
            },
        },
        define: {
            'process.env': env,
        },
        server: {
            port: +env.VITE_PORT || 1111,
            host: '0.0.0.0',
        },
    }
})


const generateLanguage = async () => {
    const publicLocalePath = path.resolve(__dirname, 'public', 'locales')
    const localePath = path.resolve(__dirname, 'src', 'locales')

    if (!fs.existsSync(publicLocalePath))
        fs.mkdirSync(publicLocalePath, { recursive: true })

    const folders = fs.readdirSync(localePath)

    for (const locale of ['en', 'vi']) {
        if (!fs.existsSync(`${publicLocalePath}/${locale}.json`)) {
            fs.closeSync(fs.openSync(`${publicLocalePath}/${locale}.json`, 'w'))
        }
    }

    const dataLanguages: any = {}

    for (const folder of folders) {
        const files = fs.readdirSync(path.resolve(localePath, folder))

        if (files) {
            for (const file of files) {
                const pathFile = `${folder}/${file}`
                const prefixName = file.replace('.json', '')
                const content = fs.readFileSync(path.resolve(localePath, pathFile), 'utf-8')

                dataLanguages[prefixName] = Object.assign({}, dataLanguages[prefixName], { [folder]: JSON.parse(content) })
            }
        }
    }

    if (Object.keys(dataLanguages).length) {
        for (const item in dataLanguages) {
            fs.writeFileSync(`${publicLocalePath}/${item}.json`, JSON.stringify(dataLanguages[item], null, 2))
        }
    }

    console.log(`Generate Language Success`)
    return Promise.resolve()
}
