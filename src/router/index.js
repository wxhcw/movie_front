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
        component: () => import("../movie-admin/index"),
        redirect: '/admin/mgrUser',
        children: [
            {
                path: "mgrUser",
                name: "mgrUser",
                component: () => import("../movie-admin/view/mgrUser"),
            },
            {
                path: "mgrInfo",
                name: "mgrInfo",
                component: () => import("../movie-admin/view/mgrInfo"),
            },
            {
                path: "mgrDetail",
                name: "mgrDetail",
                component: () => import("../movie-admin/view/mgrDetail"),
            },
            {
                path: "mgrSchedule",
                name: "mgrSchedule",
                component: () => import("../movie-admin/view/mgrSchedule"),
            },
            {
                path: "mgrHall",
                name: "mgrHall",
                component: () => import("../movie-admin/view/mgrHall"),
            },
            {
                path: "mgrOrder",
                name: "mgrOrder",
                component: () => import("../movie-admin/view/mgrOrder"),
            },
            {
                path: "mgrScore",
                name: "mgrScore",
                component: () => import("../movie-admin/view/mgrScore"),
            },
        ]
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
// ????????????????????? router.beforeEach ?????????????????????????????????????????????????????????
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/reg') { //?????????
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') { //??????????????????token
            ElMessage.warning('??????????????????????????????')
            next('/');
        } else { // token????????????
            next();
        }
    }
});

export default router