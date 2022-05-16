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
// 获取某部电影的详细信息
export function getMovDetail(movname) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/movie/detail/${movname}`, {
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