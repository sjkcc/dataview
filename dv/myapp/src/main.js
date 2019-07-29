import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入elementUI
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from './axios'
//引入vuex
import Vuex from "vuex"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
