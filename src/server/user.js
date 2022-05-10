import axios from "axios";

// 查询产品构建列表信息
export function userLogin(data) {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/reguser`, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}