const product = [
  {
    path: 'userList',
    name: 'userList',
    component: () => import('@/views/ums/user/index'),
    meta: {title: '用户列表', icon: 'product-list'}
  },
  {
    path: 'userEdit',
    name: 'userEdit',
    component: () => import('@/views/ums/user/update'),
    meta: {title: '用户编辑', icon: 'product-edit'},
    hidden: true
  },
  {
    path: 'roleList',
    name: 'roleList',
    component: () => import('@/views/ums/role/index'),
    meta: {title: '角色列表', icon: 'product-add'}
  },
  {
    path: 'roleEdit',
    name: 'roleEdit',
    component: () => import('@/views/ums/role/update'),
    meta: {title: '角色编辑', icon: 'product-edit'},
    hidden: true
  },
 /* {
    path: 'updateProduct',
    name: 'updateProduct',
    component: () => import('@/views/pms/product/update'),
    meta: {title: '修改商品', icon: 'product-add'},
    hidden: true
  },
  {
    path: 'productRecycle',
    name: 'productRecycle',
    component: () => import('@/views/pms/product/index'),
    meta: {title: '商品回收站', icon: 'product-recycle'},
    hidden: true
  },
  {
    path: 'productComment',
    name: 'productComment',
    component: () => import('@/views/pms/product/index'),
    meta: {title: '商品评价', icon: 'product-comment'},
    hidden: true
  },
  {
    path: 'productCate',
    name: 'productCate',
    component: () => import('@/views/pms/productCate/index'),
    meta: {title: '商品分类', icon: 'product-cate'}
  },
  {
    path: 'addProductCate',
    name: 'addProductCate',
    component: () => import('@/views/pms/productCate/add'),
    meta: {title: '添加商品分类'},
    hidden: true
  },
  {
    path: 'updateProductCate',
    name: 'updateProductCate',
    component: () => import('@/views/pms/productCate/update'),
    meta: {title: '修改商品分类'},
    hidden: true
  },
  {
    path: 'productAttr',
    name: 'productAttr',
    component: () => import('@/views/pms/productAttr/index'),
    meta: {title: '商品类型', icon: 'product-attr'}
  },
  {
    path: 'productAttrList',
    name: 'productAttrList',
    component: () => import('@/views/pms/productAttr/productAttrList'),
    meta: {title: '商品属性列表'},
    hidden: true
  },
  {
    path: 'addProductAttr',
    name: 'addProductAttr',
    component: () => import('@/views/pms/productAttr/addProductAttr'),
    meta: {title: '添加商品属性'},
    hidden: true
  },
  {
    path: 'updateProductAttr',
    name: 'updateProductAttr',
    component: () => import('@/views/pms/productAttr/updateProductAttr'),
    meta: {title: '修改商品属性'},
    hidden: true
  },
  {
    path: 'brand',
    name: 'brand',
    component: () => import('@/views/pms/brand/index'),
    meta: {title: '品牌管理', icon: 'product-brand'}
  },
  {
    path: 'addBrand',
    name: 'addBrand',
    component: () => import('@/views/pms/brand/add'),
    meta: {title: '添加品牌'},
    hidden: true
  },
  {
    path: 'updateBrand',
    name: 'updateBrand',
    component: () => import('@/views/pms/brand/update'),
    meta: {title: '编辑品牌'},
    hidden: true
  }*/
]

export default product;
