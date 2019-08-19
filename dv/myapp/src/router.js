import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from "./components/index.vue"
import Index1 from "./components/index1.vue"
import Admin from "./components/admin.vue"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {path:"/",component:Index},
    {path:"/Index1",component:Index1},
    {path:"/admin",component:Admin},
    {path: '/about',component: () => import('./views/About.vue')
    }
  ]
})
