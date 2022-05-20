import axios from "axios";
// 获取本周上映和最高票房的电影信息
export function getMovWeek() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/movie/week",)
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
            .get("/api/movie/top",
        )
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
            .get("/api/movie/soon")
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
            .get(`/api/movie/detail/${movieId}`)
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
            .get(`/api/movie/info/${movieId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取影院的全部电影的基本信息
export function getAllMovieInfo(pageData) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/movie/info", { ...pageData })
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
            .post("/api/movie/schedule", { ...pageData })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 更新是否收藏某场次
export function updateCollect(data) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/movie/isCollect", { ...data })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 查看收藏的场次信息
export function getCollectSchedule() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/movie/collect/schedule")
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
            .get(`/api/movie/schedule/${movieId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}