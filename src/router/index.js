import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import ImageRetrieval from '@/components/ImageRetrieval.vue'
import SketchRetrieval from '@/components/SketchRetrieval.vue'
import TextRetrieval from '@/components/TextRetrieval.vue'
import Group from '@/components/Group.vue'
import Images from '@/components/Images.vue'
import Register from '@/components/Register.vue'



Vue.use(VueRouter)

const routes = [
  {path: '/',redirect:'/login'},
  {path:'/login', component:Login},
  {
    path:'/register',
    component:Register
  },
  
  {path:'/home', component:Home,
    redirect:'/welcome',
    children:[
      {path:'/welcome', component:Welcome},
      {path:'/imageRetrieval', component:ImageRetrieval},
      {path:'/sketchRetrieval', component:SketchRetrieval},
      {path:'/textRetrieval', component:TextRetrieval},
      {path:'/group', component:Group},
      {path:'/images', component:Images}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
