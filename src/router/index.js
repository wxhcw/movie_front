import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../view/Login"),
    },
    {
        path: "/reg",
        name: "registry",
        component: () => import("../view/Register"),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("../movie-user/index")
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../movie-admin/index")
    }
]
export default createRouter({
    history: createWebHistory(),
    routes: routes
})