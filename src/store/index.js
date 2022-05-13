import { createStore } from 'vuex'

export default createStore({
    state: {
        token: '',
        collapse: false
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.setItem('token', token)
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

