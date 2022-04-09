// series串行打包，parallel并行打包
import { series, parallel } from "gulp";
import { withTaskName, run } from "./common/index";
export default series(
  withTaskName("clean", async () => run('rm -rf ./dist')),
  withTaskName("buildPackages", async () => run('pnpm run --filter ./packages --parallel build'))
);
