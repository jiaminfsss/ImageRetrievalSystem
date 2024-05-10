import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 导入全局样式
import './assets/global.css'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http= axios.create({
  baseURL:'/api' //使用代理
})
// axios.defaults.baseURL='http://127.0.0.1:2020/' //服务器

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
