import path from "path";
import fs from "fs/promises";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import { parallel } from "gulp";
import { oRoot, outDir } from "./common/paths";
import { OutputOptions, rollup } from "rollup";
import { ForStatement } from "ts-morph";
import { buildConfig } from "./common/config";
import { pathRewriter } from "./common";

const buildFull = async () => {
  // rollup打包的配置信息
  const config = {
    input: path.resolve(oRoot, "index.ts"), // 打包的入口
    plugins: [nodeResolve(), vue(), typescript(), commonjs()],
    external: (id) => /^vue/.test(id), // 不需要打包vue
  };
  const buildConfig = [
    {
      format: "umd",
      file: path.resolve(outDir, "index.js"),
      name: "OPlus", // 全局名字
      exports: "named",
      global: {
        vue: "Vue", //使用的vue是全局的
      },
    },
    {
      format: "esm",
      file: path.resolve(outDir, "index.esm.js"),
    },
  ];
  let bundle = await rollup(config);
  return Promise.all(
    buildConfig.map((config) => bundle.write(config as OutputOptions))
  );
  // bundle.write()
};

const buildEntry = async () => {
  const entryFiles = await fs.readdir(oRoot, { withFileTypes: true });
  const entryPoints = entryFiles
    .filter((f) => f.isFile)
    .filter((f) => !["package.json"].includes(f.name))
    .map((f) => path.resolve(oRoot, f.name));
  const config = {
    input: entryPoints,
    plugins: [nodeResolve(), vue(), typescript()],
    external: (id: string) => /^vue/.test(id) || /^@z-plus/.test(id),
  };
  const bundle = await rollup(config);
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => ({
        format: config.format,
        dir: config.output.path,
        paths: pathRewriter(config.output.name)
      }))
      .map((config) => bundle.write(config as OutputOptions))
  );
};

export const buildFullComponent = parallel(buildFull, buildEntry);
