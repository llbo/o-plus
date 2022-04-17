// series串行打包，parallel并行打包
import { series, parallel } from "gulp";
import { withTaskName, run } from "./common/index";
import { oRoot, outDir } from "./common/paths";
import { buildEntryTypes} from "./entryTypes";
const copySourceCode = () => async () => {
  await run(`cp ${oRoot}/package.json ${outDir}/package.json`)
}
export default series(
  withTaskName("clean", async () => run('rm -rf ./dist')),
  parallel(
    withTaskName("buildPackages", async () => run('pnpm run --filter ./packages --parallel build')),
    // 执行build命令时会调用rollup, 传递参数buildFullComponent, 执行导出任务 
    withTaskName('buildFullComponent', () => run('pnpm run build buildFullComponent')),
    withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
  ),
  parallel(
    buildEntryTypes,
    copySourceCode()
  )
);

export * from './fullComponent'
export * from './component'