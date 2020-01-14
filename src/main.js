import Vue from 'vue'
import commonJs from './utils/common'
import constants from './utils/constant'
import axios from 'axios'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.prototype.commonJs = commonJs
Vue.prototype.constants = constants
Vue.config.productionTip = false
axios.defaults.baseURL = '/mall'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
