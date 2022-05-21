import axios from "axios";

// 添加电影基本信息
export function insertMovInfo(movie) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/admin/insertMovInfo", { ...movie })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 更新电影基本信息
export function updateMovInfo(movie) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/admin/updateMovInfo", { ...movie })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 删除电影基本信息
export function delMovInfo(movieId){
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/admin/delMovInfo/${movieId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 获取全部订单信息
export function getAllOrderInfo(pageData) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/admin/orderInfo", { ...pageData })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
