import axios from "axios"
import { error } from "@/utils/error"
const token_key = 'jwt-token'
export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(token_key)
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(token_key, token)
        },
        logout(state) {
            state.token = null,
                localStorage.removeItem(token_key)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const { data } = await axios.post(url, {...payload, returnSecureToken: true})
                console.log(payload + 'Clown');
                commit('setToken', data.idToken)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'

                }, {root: true})
                
                throw new Error()
            }

            

        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}