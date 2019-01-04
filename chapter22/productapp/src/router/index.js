import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductDisplay from '../components/ProductDisplay'
import ProductEditor from '../components/ProductEditor'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: ProductDisplay, alias: '/list' },
    { path: '/create', component: ProductEditor },
    { path: '/edit/:id', component: ProductEditor },
    { path: '*', redirect: '/' },
  ],
})
