import axios from "axios";

// 用户注册
export function userReg(data) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/api/reguser", data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err.response.data);
            });
    });
}

// 用户登录
export function userLogin(data) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/api/login", data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}