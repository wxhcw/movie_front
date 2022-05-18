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
        component: () => import("../movie-user/index"),
        children: [
            {
                path: "",
                name: "movieIndex",
                component: () => import("../movie-user/view/movieIndex")
            },
            {
                path: "movie/detail/:movieId",
                name: "movieDetail",
                component: () => import("../movie-user/view/movieDetail")
            },
            {
                path: "center",
                name: "userCenter",
                component: () => import("../movie-user/view/userCenter"),
                redirect: '/user/center/settings',
                children: [
                    {
                        path: "settings",
                        name: "userSetting",
                        component: () => import("../movie-user/view/userSetting"),
                    },
                    {
                        path: "collect",
                        name: "userCollect",
                        component: () => import("../movie-user/view/userCollect"),
                    },
                    {
                        path: "order",
                        name: "userOrder",
                        component: () => import("../movie-user/view/userOrder"),
                    },
                    {
                        path: "movHall",
                        name: "userHall",
                        component: () => import("../movie-user/view/userHall"),
                    },
                    {
                        path: "movName",
                        name: "userMovie",
                        component: () => import("../movie-user/view/userMovie"),
                    },
                    {
                        path: ":movieId",
                        name: "userMovDetail",
                        component: () => import("../movie-user/view/userMovDetail"),
                    },
                ]
            },
        ]
    },


    {
        path: "/admin",
        name: "admin",
        component: () => import("../movie-admin/index")
    },

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