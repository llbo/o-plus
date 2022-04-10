// series串行打包，parallel并行打包
import { series, parallel } from "gulp";
import { withTaskName, run } from "./common/index";
export default series(
  withTaskName("clean", async () => run('rm -rf ./dist')),
  parallel(
    withTaskName("buildPackages", async () => run('pnpm run --filter ./packages --parallel build')),
    // 执行build命令时会调用rollup, 传递参数buildFullComponent, 执行导出任务 
    withTaskName('buildFullComponent', () => run('pnpm run build buildFullComponent')),
    withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
  )
 
);

export * from './full-component'
export * from './component'