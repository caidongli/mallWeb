const ems = [
  {
    path: 'employeesList',
    name: 'employeesList',
    component: () => import('@/views/ems/emp/index'),
    meta: {title: '员工列表', icon: 'cost-list'}
  },
  {
    path: 'salaryList',
    name: 'salaryList',
    component: () => import('@/views/ems/salary/index'),
    meta: {title: '薪资列表', icon: 'salary-list'}
  },
]

export default ems;
