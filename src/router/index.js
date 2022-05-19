import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from "element-plus";

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
                    {
                        path: ":movieId/:scheduleId",
                        name: 'userBuyTicket',
                        component: () => import("../movie-user/view/userBuyTicket"),
                    }
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
// 导航守卫：使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/reg') { //登录页
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') { //如果未获取到token
            ElMessage.warning('请您先登录或者注册！')
            next('/');
        } else { // token验证成功
            next();
        }
    }
});

export default router