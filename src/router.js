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
    { path: '/home', component: Home },
    { path: '/login', component: Login, beforeEnter: async () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
        if (currentUser !== undefined) {
            currentUser.isActive = false
            await updateUser(currentUser)
            localStorage.removeItem('currentUser')
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

router.beforeEach(async (to, from) => {
    if (to.path !== '/' && to.path !== '/login' && to.path !== '/signup') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
        if (currentUser === undefined) return '/login'
    }
})

export default router