import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'http://localhost:3500/products/'

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    selectedProduct: null,
  },
  actions: {
    async getProductsAction(context) {
      (await Axios.get(baseUrl)).data.forEach((p) =>
        context.commit('saveProduct', p)
      )
    },
    async saveProductAction(context, product) {
      let index = context.state.products.findIndex((p) => p.id == product.id)
      if (index == -1) {
        await Axios.post(baseUrl, product)
      } else {
        await Axios.put(`${baseUrl}${product.id}`, product)
      }
      context.commit('saveProduct', product)
    },
    async deleteProductAction(context, product) {
      await Axios.delete(`${baseUrl}${product.id}`)
      context.commit('deleteProduct', product)
    },
  },
  getters: {
    orderedProducts(state) {
      return state.products.concat().sort((p1, p2) => p2.price - p1.price)
    },
    filteredProducts(state, getters) {
      return (amount) => getters.orderedProducts.filter((p) => p.price > amount)
    },
  },
  mutations: {
    deleteProduct(currentState, product) {
      let index = currentState.products.findIndex((p) => p.id == product.id)
      currentState.products.splice(index, 1)
    },
    saveProduct(currentState, product) {
      let index = currentState.products.findIndex((p) => p.id == product.id)
      if (index == -1) {
        currentState.products.push(product)
      } else {
        Vue.set(currentState.products, index, product)
      }
    },
    selectProduct(currentState, product) {
      currentState.selectedProduct = product
    },
  },
})
