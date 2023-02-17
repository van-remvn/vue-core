import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import fs from 'fs'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //Setup name component
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode, ssrBuild }) => {

    await generateLanguage()

    const env = loadEnv(mode, process.cwd(), '')

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
            Icons({
                scale: 1.5, // Scale of icons against 1em
                defaultStyle: '', // Style apply to icons
                defaultClass: 'inline-block h-5 w-5 stroke-current md:h-6 md:w-6', // Class names apply to icons
                compiler: 'vue3', // "vue2", "vue3", "jsx"
                jsx: 'react', // "react" or "preact"
                autoInstall: true,
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
                "~/": `${path.resolve(__dirname, "src")}/`,
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

    console.log(`
╭─────────────────────────────────────────────────╮
│                                                 │
│            Generate Language Success            │
│                                                 │
╰─────────────────────────────────────────────────╯
    `)
    return Promise.resolve()
}
