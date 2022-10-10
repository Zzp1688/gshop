import Vue from 'vue'

import App from './App'

import router from './router'

import store from './store'

import { Button } from 'mint-ui'

import VueLazyload from 'vue-lazyload'

import './mock/mockServer.js'

import loadimage from './common/imags/loading.gif'

import './filters'

Vue.use(VueLazyload, {
  loading: loadimage
})

Vue.component(Button.name, Button)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
