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
]

export default order;
