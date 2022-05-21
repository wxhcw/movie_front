import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive } from "vue";
import router from "../router";
import { nanoid } from "nanoid";
import moment from "moment";
import { getUserInfo, insertOrder } from "../server/user";


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
