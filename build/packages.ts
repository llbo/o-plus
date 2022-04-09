// 打包utils, 指令, hook等
import path from "path";
import { dest, parallel, series, src } from "gulp";
import ts from "gulp-typescript";
import { buildConfig } from "./common/config";
import { outDir, projectRoot } from "./common/paths";
import { withTaskName } from "./common";
export const buildPackages = (dirname: string, name: string) => {
  // 打包的格式： 模块规范，cjs, es
  // umd在浏览器中使用
  // 将ts转js
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name);
    return series(
      withTaskName(`build: ${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, "tsconfig.json"); // ts配置文件
        const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules"];
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 需要生成配置文件
              strict: false, // 不需要严格模式
              module: config.module,
            })()
          )
          .pipe(dest(output));
      }),
      withTaskName(`copy:${dirname}`, () => {
          return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
      })
    );
  });

  return parallel(...tasks);
};
