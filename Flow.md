##### npm i pnpm -g --force

##### pnpm init -y

##### 新建.npmrc 文件

- 在.npmrc 文件内增加 shamefully-hoist = true 默认把包放在 node_modules 下

##### pnpm i vue@next typescript -D

##### npx tsc --init

##### 在根目录下安装当前项目组件

- pnpm install @o-plus/components -w
- pnpm install @o-plus/themeChalk -w
- pnpm install @o-plus/utils -w

##### gulp 打包流程

- pnpm install gulp @types/gulp sucrase -w -D

##### 打包样式

- pnpm install gulp-sass @types/gulp-sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css sass -w -D

##### 合并打包,生成 ts 类型文件

- pnpm install gulp-typescript -D -w

##### 打包组件库

- pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w

##### 匹配所有文件,遍历文件夹

- pnpm install fast-glob -w -D

##### 生成.d.ts 文件

- pnpm install ts-morph -w -D

##### 编译 vue 单文件组件

- pnpm install @vue/compiler-sfc -w -D
