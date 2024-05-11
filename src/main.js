import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import store from './store/index.js'

Vue.use(ElementUI)
Vue.use(Waterfall)
Vue.use(WaterfallSlot)
// 导入全局样式
import './assets/global.css'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http= axios
axios.defaults.baseURL='' //后端服务器url
Vue.prototype.$http= axios.create({
  baseURL:'/api' //使用代理
})

let vvve = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

console.log('vue实例', vvve);
