import { createRouter, createWebHistory } from 'vue-router'
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
    { path: '/login', component: Login },
    { path: '/inventory', component: Inventory },
    { path: '/level', component: Level },
    { path: '/setting', component: Setting },
    { path: '/shop', component: Shop },
    { path: '/signup', component: SignUp },
]

const router =  createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:"text-blue-600"
})

export default router