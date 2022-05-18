import axios from "axios";
const headers = {
    'Authorization': localStorage.getItem('token')
}
// 获取本周上映和最高票房的电影信息
export function getMovWeek() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/movie/week", {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取最高票房的电影信息
export function getMovTop() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/movie/top", {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取即将上映的电影信息
export function getMovSoon() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/movie/soon", {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 根据movieID获取某部电影的详细信息(放映时长、导演)
export function getMovDetail(movieId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/movie/detail/${movieId}`, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 根据movieID获取某部电影的基本信息(评分、类型、海报)
export function getPriMovie(movieId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/movie/info/${movieId}`, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取影院的全部电影的基本信息
export function getHallMovie(pageData) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/movie/info", { ...pageData }, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取影院的全部排片信息
export function getHallSchedule(pageData) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/movie/schedule", { ...pageData }, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 更新某部电影是否想看
export function updateCollect(data) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/movie/isCollect", { ...data }, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 根据movieID获取这部电影的排片信息
export function getMovSchedule(movieId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/movie/schedule/${movieId}`, {
                headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}