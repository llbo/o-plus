##### eslint 安装

- pnpm install eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript -D

名称 说明
eslint： ESLint 是一个用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具
eslint-plugin-vue： Vue 的官方 ESLint 插件
@typescript-eslint/parser： 一个 ESLint 解析器，它利用 TypeScript-ESTree 允许 ESLint 检查 TypeScript 源代码
@typescript-eslint/eslint-plugin： 一个 ESLint 插件，为 TypeScript 代码库提供 lint 规则
@vue/eslint-config-typescript： Vue 的 eslint-config-typescript

##### .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021
  },
  rules: {
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
  globals: {
    defineProps: "readonly"
  }
}
```

##### .eslintignore

```js
node_modules
dist
*.css
*.jpg
*.jpeg
*.png
*.gif
*.d.ts
```

##### package.json

```js
{
    "scripts": {
     "dev": "vite",
     "build": "vue-tsc --noEmit && vite build",
+    "lint": "eslint --ext .ts,.tsx,vue src/** --no-error-on-unmatched-pattern --quiet",
+    "lint:fix": "eslint --ext .ts,.tsx,vue src/** --no-error-on-unmatched-pattern --quiet --fix"
  },
}
```

##### 安装 Prettier

- pnpm install prettier eslint-plugin-prettier @vue/eslint-config-prettier -D

- ESLint 主要解决的是代码质量问题
- 代码质量规则
- no-unused-vars 禁止出现未使用过的变量
- no-implicit-globals 禁止在全局范围内使用变量声明和 function 声明
- prefer-promise-reject-errors 要求使用 Error 对象作为 Promise 拒绝的原因
- prettier 主要解决的是代码风格问题
- max-len 最大长度
- no-mixed-spaces-and-tabs 不允许空格和 tab 混合
- keyword-spacing 关键字的空
- comma-style 冒号风格

名称 说明
prettier 代码格式化
eslint-plugin-prettier 作为 ESLint 规则运行得 prettier
@vue/eslint-config-prettier Vue 的 eslint-config-prettier

##### .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
+   "prettier",
+   "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021
  },
  rules: {
+   "prettier/prettier": [
+     "error",
+     {
+       singleQuote: false,
+       tabWidth: 2,
+       indent: 2,
+       semi: false,
+       trailingComma: "none",
+       endOfLine: "auto"
+     }
+   ],
+   "no-unused-vars": "off",
+   "vue/no-unused-vars": "off",
+   "@typescript-eslint/no-unused-vars": "off"
+ },
  globals: {
    defineProps: "readonly"
  }
}
```

##### .prettierrc.js

```js
module.exports = {
  singleQuote: false, //使用单引号
  semi: false, ////末尾添加分号
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  endOfLine: "auto"
}
```

##### .prettierignore

node_modules
dist

##### editorconfig

editorconfig 帮助开发人员在不同的编辑器和 IDE 之间定义和维护一致的编码样式
不同的开发人员，不同的编辑器，有不同的编码风格，而 EditorConfig 就是用来协同团队开发人员之间的代码的风格及样式规范化的一个工具，而.editorconfig 正是它的默认配置文件
EditorConfig
vscode 这类编辑器，需要自行安装 editorconfig 插件
7.5.1 .editorconfig
Unix 系统里，每行结尾只有换行,即\n LF(Line Feed)
Windows 系统里面，每行结尾是换行 回车，即\r\n CR/LF
Mac 系统里，每行结尾是回车，即\r CR(Carriage Return)

```js
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
```
