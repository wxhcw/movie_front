import axios from "axios";

// 获取用户信息
export function getMovWeekly() {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/my/movie/weekly", {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}