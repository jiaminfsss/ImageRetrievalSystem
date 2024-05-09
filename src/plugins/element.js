import Vue from 'vue'
import { Button,Form,FormItem,Input,Message, Container,Header,Main,Aside,Menu,Submenu,MenuItem,MenuItemGroup } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.prototype.$message = Message

Vue.use(Container).use(Header).use(Main).use(Aside)
Vue.use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup)
