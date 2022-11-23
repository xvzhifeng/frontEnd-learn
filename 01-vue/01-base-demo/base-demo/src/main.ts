import { createApp } from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

// import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
