import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import router from "../router";
import { getUserInfo } from "../server/user";
export default function () {
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