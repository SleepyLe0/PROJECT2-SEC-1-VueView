import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router  from './router'

window.onload = () => {
    localStorage.removeItem('currentUser')
    router.push({ path: '/' })
}

const app = createApp(App)
app.use(router)
app.mount('#app')
