import { onMounted, reactive, toRefs } from "vue";
import { getUserInfo } from "../server/user";
export default function () {
    let user = reactive({
        userinfo: {},
    });
    onMounted(() => {
        getUserInfo().then((res) => {
            user.userinfo = res.data;
        });
    });
    return {...toRefs(user)};
}