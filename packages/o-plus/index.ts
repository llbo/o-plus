import { OIcon } from "@o-plus/components";
import type { App } from "vue"; 

const components = [
    OIcon
]

/**
 * 
 * @param app 
 * 每个组件都提供install方法
 * 有可能是指令 app.directive()
 * 有可能是方法
 */
const install = (app: App) => {
    components.forEach(component => app.use(component))
}

export default {
    install
}

export * from '@o-plus/components'