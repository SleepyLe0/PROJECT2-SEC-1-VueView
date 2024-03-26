import { createRouter, createWebHistory } from 'vue-router'
import { updateUser } from './libs/FetchAPI'
import Welcome from './components/pages/Welcome.vue'
import Home from './components/pages/Home.vue'
import Login from './components/pages/Login.vue'
import Inventory from './components/pages/Inventory.vue'
import Level from './components/pages/Level.vue'
import Setting from './components/pages/Setting.vue'
import Shop from './components/pages/Shop.vue'
import SignUp from './components/pages/SignUp.vue'

const routes = [
    { path: '/', component: Welcome },
    { path: '/home', component: Home, beforeEnter: () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
        if (currentUser === undefined) return '/login'
    } },
    { path: '/login', component: Login, beforeEnter: async (to, from) => {
        if (from.path === '/home') {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            if (currentUser !== undefined) {
                localStorage.removeItem('currentUser')
                currentUser.isActive = false
                await updateUser(currentUser)
            }
        }
    } },
    { path: '/inventory', component: Inventory },
    { path: '/level', component: Level },
    { path: '/setting', component: Setting },
    { path: '/shop', component: Shop },
    { path: '/signup', component: SignUp }
]

const router =  createRouter({
    history: createWebHistory(),
    routes
})

export default router