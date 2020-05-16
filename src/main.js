import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexible'

import 'vue-social-share/dist/client.css';
import Share from 'vue-social-share'
Vue.use(Share);

import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant'

import 'element-ui/lib/theme-chalk/index.css';
import { Tree,Menu,MenuItem,MenuItemGroup,Row,Col,Submenu } from 'element-ui';
Vue.use(Tree)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Submenu)


Vue.use(Lazyload)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
