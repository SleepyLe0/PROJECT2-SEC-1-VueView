import { createRouter, createWebHistory } from "vue-router"
import Login from "./components/pages/Login.vue"
import Home from "./components/pages/Home.vue"
import Inventory from "./components/pages/Inventory.vue"
import Level from "./components/pages/Level.vue"
import Setting from "./components/pages/Setting.vue"
import Shop from "./components/pages/Shop.vue"

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/inventory', component: Inventory },
    { path: '/level', component: Level },
    { path: '/setting', component: Setting },
    { path: '/shop', component: Shop }
]

const router =  createRouter({
    history: createWebHistory(),
    routes,
})

export default router