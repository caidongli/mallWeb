import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import order from './childRouter/order'
import customer from './childRouter/customer'
import userManager from './childRouter/userManager'
import goods from './childRouter/goods'
import cost from './childRouter/cost'
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manager',
    name: 'user',
    meta: {title: '用户管理', icon: 'home'},
    children: [
      ...userManager,
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单管理', icon: 'order'},
    children: [
      ...order
    ]
  },
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/customer',
    name: 'cms',
    meta: {title: '客户管理', icon: 'order'},
    children: [
      ...customer
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/goods',
    name: 'pms',
    meta: {title: '商品管理', icon: 'order'},
    children: [
      ...goods
    ]
  },
  {
    path: '/cost',
    component: Layout,
    redirect: '/cost/cost',
    name: 'cost',
    meta: {title: '成本管理', icon: 'order'},
    children: [
      ...cost
    ]
  },



  {
    path: '/orderPrint',
    name: 'orderPrint',
    component: () => import('@/views/oms/order/components/order-print-list'),
    meta: {title: '订单打印'},
    hidden:true
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

