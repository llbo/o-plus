import {createApp} from 'vue'
import App from './app.vue'
import {OIcon} from '@o-plus/components/icon'
import '@o-plus/theme-chalk/src/index.scss'
const app = createApp(App)
app.use(OIcon)
app.mount('#app')
