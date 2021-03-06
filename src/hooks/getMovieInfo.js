import { onMounted, reactive, toRefs } from "vue";
import { getHallSchedule, getAllMovieInfo, getMovSoon, getMovTop, getMovWeek, getMovDetail, getPriMovie, getMovSchedule, updateCollect } from "../server/movie";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import moment from "moment";

//获取影院全部排片信息
export function getScheduleAction(pSize) {
    const dataShow = reactive({
        tableData: [],
        total: 0,
    });
    const page = reactive({
        queryName: "",
        queryHall: "",
        queryDate: [],
        currentPage: 1,
        pageSize: 0,
    });
    page.pageSize = pSize
    const handleCurrentChange = (val) => {
        page.currentPage = val;
        initData();
    };
    const initData = () => {
        if (!page.queryDate) { //为空要重新为其赋空数组
            page.queryDate = []
        }
        getHallSchedule(page).then((res) => {
            res.data.results.forEach(item => {
                //格式化日期
                item.movie_time = moment(item.movie_time).format("YYYY-MM-DD HH:mm")
            })
            dataShow.tableData = res.data.results;
            dataShow.total = res.data.totalCount;
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
        ...toRefs(dataShow),
    };
}
//获取影院全部电影信息
export function getAllMovieInfoAction(pSize) {
    const movieinfo = reactive({
        dataShow: [],
        total: 0,
    });
    const page = reactive({
        queryName: "",
        queryType: "",
        currentPage: 1,
        pageSize: 0,
    });
    page.pageSize = pSize
    const handleCurrentChange = (val) => {
        page.currentPage = val;
        initData();
    };
    const initData = () => {
        getAllMovieInfo(page).then((res) => {
            if (pSize === 14) {
                res.data.results.forEach((item) => {
                    item.movie_score /= 2;
                });
            }
            movieinfo.dataShow = res.data.results;
            movieinfo.total = res.data.totalCount;
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
        ...toRefs(movieinfo),
    };
}
//获取首页电影信息
export function getMovieInfo() {
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
// 根据ID获取某部电影的详细信息(放映时长、导演)
export function getMovieDetail() {
    const route = useRoute();
    const movieId = route.params.movieId;
    const mov = reactive({
        detail: {},
        isEmpty: false,
    });

    getMovDetail(movieId).then((res) => {
        if (res.status) {
            ElMessage.error(res.message);
        } else {
            mov.detail = res.data[0];
            mov.isEmpty = res.data.length && res.data[0].rated ? false : true;
        }
    });
    return mov
}
// 根据ID获取某部电影的基本信息和排片信息(评分、类型、海报)
export function getPrimaryAndSchedule() {
    const route = useRoute();
    const movieId = route.params.movieId;
    const movie = reactive({
        priMovie: {},
        schedule: []
    });

    getPriMovie(movieId).then((res) => {
        if (res.status) {
            ElMessage.error(res.message);
        } else {
            movie.priMovie = res.data[0];
        }
    });
    getMovSchedule(movieId).then((res) => {
        if (res.status) {
            ElMessage.error(res.message);
        } else {
            res.data.forEach(item => {
                //格式化日期
                item.movie_time = moment(item.movie_time).format("YYYY-MM-DD HH:mm")
            })
            movie.schedule = res.data;
        }
    });
    return movie
}
//更新是否收藏某场次
export function updateIsCollect(row) {
    row.schedule_isCollect = !row.schedule_isCollect;
    updateCollect({
        isCollect: row.schedule_isCollect,
        scheduleId: row.schedule_id,
    }).then((res) => {
        if (res.status) {
            ElMessage.error(res.message);
        } else {
            ElMessage.success(res.message);
        }
    });
}