import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import Login from "./components/pages/Login.vue"
import Home from "./components/pages/Home.vue"

const routes = [
    {path: '/',component: Home},
    {path: '/login',component: Login}
]

const router =  createRouter({
    history: createWebHistory(),
    routes,
})

export default router;