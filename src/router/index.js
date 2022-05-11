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
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });

export default router