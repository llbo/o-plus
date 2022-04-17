import {createApp} from 'vue'
import App from './app.vue'
// import {OIcon} from '@o-plus/components/icon'
import OPlus from '../dist/index.esm.js'
// import '@o-plus/theme-chalk/src/index.scss'
import '../dist/themeChalk/index.css'
const app = createApp(App)
app.use(OPlus)
app.mount('#app')
