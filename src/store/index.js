import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const url = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    signin (context, payload) {
      return axios({
        method: 'post',
        url: `${url}/signin`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: `${url}/products`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
