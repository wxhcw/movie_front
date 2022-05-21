import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, toRefs } from "vue";
import router from "../router";
import { nanoid } from "nanoid";
import moment from "moment";
import { getUserInfo, insertOrder, getOrderInfo } from "../server/user";
import { getAllOrderInfo, getAllUserInfo } from "../server/admin";

export function getUserInfoAction() {
    let user = reactive({
        userinfo: {},
    });
    onMounted(() => {
        getUserInfo().then((res) => {
            if (res.status) { //token校验错误
                ElMessage.error(res.message);
                router.push("/"); //重定向到登录界面
            } else {
                user.userinfo = res.data;
            }
        });
    });
    return user;
}
export function buyTicketAction(row, customer_id) {
    ElMessageBox.confirm(`确定要支付￥${row.price}吗?`, {
        confirmButtonText: "购买",
        cancelButtonText: "取消",
        type: "info",
    })
        .then(() => {
            let ticket = {
                order_id: nanoid(),
                customer_id,
                movie_id: row.movie_id,
                schedule_id: row.schedule_id,
                total_price: row.price,
                order_time: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            insertOrder(ticket).then((data) => {
                if (data.status) {
                    ElMessage.error(data.message);
                } else {
                    ElMessage.success(data.message);
                }
            });
        }).catch(() => {
            ElMessage.info('交易取消');
        })
}
export function getOrderInfoAction(psize, customerId) {
    const orderinfo = reactive({
        dataShow: [],
        total: 0,
    });
    const page = reactive({
        queryName: "",
        queryHall: "",
        currentPage: 1,
        pageSize: 0,
    });
    page.pageSize = psize
    const handleCurrentChange = (val) => {
        page.currentPage = val;
        initData();
    };
    const initData = () => {
        getOrderInfo(customerId, page).then((res) => {
            res.data.results.forEach(item => {
                //格式化日期
                item.movie_time = moment(item.movie_time).format("YYYY-MM-DD HH:mm")
                item.order_time = moment(item.order_time).format("YYYY-MM-DD HH:mm")
            })
            orderinfo.dataShow = res.data.results;
            orderinfo.total = res.data.totalCount;
        });
    };
    onMounted(() => {
        initData();
    });
    const queryMovName = () => {
        initData();
    };
    const clearFn = () => {
        initData();
    };
    return {
        queryMovName,
        handleCurrentChange,
        clearFn,
        ...toRefs(page),
        ...toRefs(orderinfo),
    };
}
export function getAllOrderInfoAction(psize) {
    const orderinfo = reactive({
        dataShow: [],
        total: 0,
    });
    const page = reactive({
        queryName: "",
        queryUsername: "",
        queryHall: "",
        currentPage: 1,
        pageSize: 0,
    });
    page.pageSize = psize
    const handleCurrentChange = (val) => {
        page.currentPage = val;
        initData();
    };
    const initData = () => {
        getAllOrderInfo(page).then((res) => {
            res.data.results.forEach(item => {
                //格式化日期
                item.movie_time = moment(item.movie_time).format("YYYY-MM-DD HH:mm")
                item.order_time = moment(item.order_time).format("YYYY-MM-DD HH:mm")
            })
            orderinfo.dataShow = res.data.results;
            orderinfo.total = res.data.totalCount;
        });
    };
    onMounted(() => {
        initData();
    });
    const queryMovName = () => {
        initData();
    };
    const clearFn = () => {
        initData();
    };
    return {
        queryMovName,
        handleCurrentChange,
        clearFn,
        ...toRefs(page),
        ...toRefs(orderinfo),
    };
}
export function getAllUserInfoAction(psize) {
    const userinfo = reactive({
        dataShow: [],
        total: 0,
    });
    const page = reactive({
        queryUsername: "",
        currentPage: 1,
        pageSize: 0,
    });
    page.pageSize = psize
    const handleCurrentChange = (val) => {
        page.currentPage = val;
        initData();
    };
    const initData = () => {
        getAllUserInfo(page).then((res) => {
            userinfo.dataShow = res.data.results;
            userinfo.total = res.data.totalCount;
        });
    };
    onMounted(() => {
        initData();
    });
    const queryMovName = () => {
        initData();
    };
    const clearFn = () => {
        initData();
    };
    return {
        queryMovName,
        handleCurrentChange,
        clearFn,
        ...toRefs(page),
        ...toRefs(userinfo),
    };
}