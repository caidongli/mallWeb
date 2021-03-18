const order = [
  {
    path: 'order',
    name: 'order',
    component: () => import('@/views/oms/order/index'),
    meta: {title: '订单列表', icon: 'product-list'}
  },
  {
    path: 'orderDetail',
    name: 'orderDetail',
    component: () => import('@/views/oms/order/orderDetail'),
    meta: {title: '订单详情'},
    hidden:true
  },
  {
    path: 'orderAddress',
    name: 'orderAddress',
    component: () => import('@/views/oms/orderAddress/index'),
    meta: {title: '开发商地址列表', icon: 'product-list'}
  },
  {
    path: 'orderAddressEdit',
    name: 'orderAddressEdit',
    component: () => import('@/views/oms/orderAddress/edit'),
    meta: {title: '开发商地址详情'},
    hidden:true
  },
]

export default order;
