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

// 获取用户信息
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/my/userinfo")
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 更新用户信息
export function updateUserInfo(user) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/my/userinfo", { ...user })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
