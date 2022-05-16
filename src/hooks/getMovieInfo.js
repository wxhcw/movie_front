import { onMounted, reactive, } from "vue";
import { getMovSoon, getMovTop, getMovWeek } from "../server/movie";
import { ElMessage } from "element-plus";
export default function () {
    let movie = reactive({
        soon: [],
        top: [],
        week: []
    });
    onMounted(() => {
        getMovTop().then(res => {
            if (res.status) {
                ElMessage.error(res.message);
            } else {
                movie.top = res.data
                movie.top.forEach(item => {
                    item.score /= 2
                });
            }
        })
        getMovWeek().then(res => {
            if (res.status) {
                ElMessage.error(res.message);
            } else {
                movie.week = res.data
                movie.week.forEach(item => {
                    item.score /= 2
                });
            }
        })
        getMovSoon().then((res) => {
            if (res.status) {
                ElMessage.error(res.message);
            } else {
                movie.soon = res.data
            }
        });
    });
    return movie;
}