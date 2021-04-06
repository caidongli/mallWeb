const cost = [
  {
    path: 'costList',
    name: 'costList',
    component: () => import('@/views/cost/cost/index'),
    meta: {title: '成本管理列表', icon: 'cost-list'}
  },
  {
    path: 'costTypeList',
    name: 'costTypeList',
    component: () => import('@/views/cost/costType/index'),
    meta: {title: '成本管理列表', icon: 'cost-list'}
  },
]

export default cost;
