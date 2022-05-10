import {
    userLogin,
} from '../../server/user'

// 查询级联字典
export function userLoginAction(data) {
    return new Promise(function(resolve, reject) {
        userLogin(data)
            .then(response => {
                resolve(response);
            })
            .catch(Error => {
                reject(Error);
            });
    });
}