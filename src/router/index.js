import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../view/Login.vue"),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("../view/User.vue")
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../view/Admin.vue")
    }
]
export default createRouter({
    history: createWebHistory(),
    routes: routes
})