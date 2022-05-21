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
// 购买电影票生成订单（新增订单信息）
export function insertOrder(ticket) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/my/insertOrder", { ...ticket })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 根据用户ID获取订单信息
export function getOrderInfo(customerId, pageData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/my/orderInfo/${customerId}`, { ...pageData })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// 根据ID删除订单信息
export function delOrderInfo(orderId){
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/my/delOrderInfo/${orderId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}