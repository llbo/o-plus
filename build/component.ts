import path from "path"
import fs from "fs/promises"
import * as VueCompiler from "@vue/compiler-sfc"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import vue from "rollup-plugin-vue"
import typescript from "rollup-plugin-typescript2"
import { series, parallel, TaskFunction } from "gulp"
import { sync } from "fast-glob"
import glob from "fast-glob"
import { Project, SourceFile } from "ts-morph"
import { compRoot, outDir, projectRoot } from "./common/paths"
import { OutputOptions, rollup } from "rollup"
import { buildConfig } from "./common/config"
import { pathRewriter, run } from "./common"
const ale = "1111"
/**
 * 打包每个组件
 */
const buildEachComponent = async () => {
  const files = sync("*", {
    cwd: compRoot,
    onlyDirectories: true
  })
  const builds = files.map(async (file: string) => {
    const input = path.resolve(compRoot, file, "index.ts") // 每个组件的入口
    const config = {
      input,
      plugins: [nodeResolve(), typescript(), vue(), commonjs()],
      external: (id) => /^vue/.test(id) || /^@o-plus/.test(id)
    }
    const bundle = await rollup(config)
    const options = Object.values(buildConfig).map((config) => ({
      format: config.format,
      file: path.resolve(config.output.path, `components/${file}/index.js`),
      exports: "named",
      paths: pathRewriter(config.output.name) // 重写路径
    }))
    await Promise.all(
      options.map((option) => bundle.write(option as OutputOptions))
    )
  })
  return Promise.all(builds)
}

async function genTypes() {
  const project = new Project({
    // 生成.d.ts配置
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, "types"),
      baseUrl: projectRoot,
      paths: {
        "@o-plus*": ["packages/*"]
      },
      skipLibCheck: true,
      strict: false
    },
    tsConfigFilePath: path.resolve(projectRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true
  })
  const filePaths = await glob("**/*", {
    cwd: compRoot,
    onlyFiles: true,
    absolute: true
  })
  console.log("filePaths", filePaths)
  const sourceFiles: SourceFile[] = []
  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith(".vue")) {
        // .vue文件单独处理
        const content = await fs.readFile(file, "utf8")
        const sfc = VueCompiler.parse(content)
        const { script } = sfc.descriptor
        if (script) {
          let contents = script.content
          const sourceFile = project.createSourceFile(file + ".ts", contents)
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )
  await project.emit({
    emitOnlyDtsFiles: true
  })
  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput()
    const tasks2 = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filePath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filePath), {
        recursive: true
      })
      // 写入到es目录下
      await fs.writeFile(filePath, pathRewriter("es")(outputFile.getText()))
    })
    await Promise.all(tasks2)
  })
  await Promise.all(tasks)
}

// 拷贝到es, lib目录下
const copyTypes = () => {
  const src = path.resolve(outDir, "types/components/")
  const copy = (module) => {
    let output = path.resolve(outDir, module, "components")
    return () => run(`cp -r ${src}/* ${output}`)
  }
  return parallel(copy("es"), copy("lib"))
}

// 打包入口
async function buildComponentEntry() {
  const config = {
    input: path.resolve(compRoot, "index.ts"),
    plugins: [typescript()],
    external: () => true
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => ({
        format: config.format,
        file: path.resolve(config.output.path, "components/index.js")
      }))
      .map((config) => bundle.write(config as OutputOptions))
  )
}
export const buildComponent = series(
  buildEachComponent,
  genTypes,
  copyTypes(),
  buildComponentEntry
)
