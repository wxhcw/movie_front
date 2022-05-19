import { createStore } from 'vuex'

export default createStore({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        collapse: false
    },
    mutations: {
        set_token(state, token) {
            state.Authorization = token
            localStorage.setItem('Authorization', token)
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {
    }
})

