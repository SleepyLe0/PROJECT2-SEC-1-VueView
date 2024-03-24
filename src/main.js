import { createApp } from 'vue'
import { updateUser } from './libs/FetchAPI'
import './style.css'
import App from './App.vue'
import router  from './router'

window.onunload = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
    if (currentUser !== undefined) {
        currentUser.isActive = false
        await updateUser(currentUser)
    }
}

const app = createApp(App)
app.use(router)
app.mount('#app')
