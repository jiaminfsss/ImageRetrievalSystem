import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import ImageRetrieval from '@/components/ImageRetrieval.vue'
import SketchRetrieval from '@/components/SketchRetrieval.vue'
import TextRetrieval from '@/components/TextRetrieval.vue'
import Group from '@/components/Group.vue'
import PublicGallery from '@/components/PublicGallery.vue'
import PrivateGallery from '@/components/PrivateGallery.vue'
import GroupGallery from '@/components/GroupGallery.vue'
import Register from '@/components/Register.vue'



Vue.use(VueRouter)

const routes = [
  {path: '/',redirect:'/sketchRetrieval'},
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
      {path:'/privateGallery', component:PrivateGallery},
      {path:'/groupGallery', component:GroupGallery},
      {path:'/publicGallery', component:PublicGallery}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
