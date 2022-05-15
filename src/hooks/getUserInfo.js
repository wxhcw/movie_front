import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import { getUserInfo } from "../server/user";
export default function () {
    let user = reactive({
        userinfo: {},
    });
    onMounted(() => {
        getUserInfo().then((res) => {
            if (res.status) {
                ElMessage.error(res.message);
            } else {
                user.userinfo = res.data;
            }
        });
    });
    return user;
}