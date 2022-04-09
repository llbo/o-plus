##### npm i pnpm -g --force
##### pnpm init -y
##### 新建.npmrc文件
  - 在.npmrc文件内增加 shamefully-hoist = true 默认把包放在node_modules下
##### pnpm i vue@next typescript -D
##### npx tsc --init
#####  在根目录下安装当前项目组件
 - pnpm install @o-plus/components -w
 - pnpm install @o-plus/theme-chalk -w
 - pnpm install @o-plus/utils -w

##### gulp打包流程
  - pnpm install gulp @types/gulp sucrase -w -D
##### 打包样式
  - pnpm install gulp-sass @types/gulp-sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css sass -w -D
##### 合并打包,生成ts类型文件
  - pnpm install gulp-typescript -D -w  