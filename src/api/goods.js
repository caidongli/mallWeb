import ajax from '@/utils/ajax'

export const saveOrUpdateGoods = data => ajax('/admin/goods/saveOrUpdateGoods', data, 'POST',JSON);

export const getGoods = data => ajax('/admin/goods/getGoods', data, 'POST',JSON);

export const queryGoodsPage = data => ajax('/admin/goods/queryGoodsPage', data, 'POST',JSON);

export const queryGoodsList = data => ajax('/admin/goods/queryGoodsList', data, 'POST',JSON);

export const delGoods = data => ajax('/admin/goods/delGoods', data, 'POST',JSON);

export const importExcelData = data => ajax('/admin/goods/importExcelData', data, 'POST',JSON);
