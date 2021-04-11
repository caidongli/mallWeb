import Vue from 'vue'
import commonJs from './utils/common'
import constants from './utils/constant'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import Print from 'vue-print-nb'

import '@/icons' // icon
import '@/permission' // permission control


Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(Print)
Vue.prototype.commonJs = commonJs
Vue.prototype.constants = constants
Vue.config.productionTip = false
Vue.use(Viewer)


Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
