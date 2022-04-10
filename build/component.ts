
import path from 'path'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { series } from "gulp"
import {sync} from 'fast-glob'
import { compRoot } from "./common/paths"
import { OutputOptions, rollup } from 'rollup'
import { buildConfig } from './common/config'
import { pathRewriter } from './common'
/**
 * 打包每个组件
 */
const buildEachComponent = async () => {
    const files = sync('*', {
        cwd: compRoot,
        onlyDirectories: true,
    })
    const builds = files.map(async (file: string) => {
        const input = path.resolve(compRoot, file, 'index.ts') // 每个组件的入口
        const config = {
            input,
            plugins: [nodeResolve(), typescript(), vue(), commonjs()],
            external: (id) => /^vue/.test(id) || /^@o-plus/.test(id)
        }
        const bundle = await rollup(config)
        const options = Object.values(buildConfig).map(config => ({
            format: config.format,
            file: path.resolve(config.output.path, `components/${file}/index.js`),
            exports: 'named',
            paths: pathRewriter(config.output.name) // 重写路径
        }))
        await Promise.all(options.map(option => bundle.write(option as OutputOptions)))
    })
    return Promise.all(builds)
}

export const buildComponent = series(buildEachComponent)