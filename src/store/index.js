import { createStore } from 'vuex'

export default createStore({
    state: {
        token: ''
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.setItem('token',token)
        }
    },
    actions: {},
    modules: {
    }
})

