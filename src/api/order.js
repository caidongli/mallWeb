import ajax from '@/utils/ajax'

export const saveOrUpdateOrder = data => ajax('/admin/order/saveOrUpdateOrder', data, 'POST',JSON);

export const queryOrderList = data => ajax('/admin/order/queryOrderList', data, 'POST',JSON);

export const delOrderBatch = data => ajax('/admin/order/delOrderBatch', data, 'POST',JSON);

export const delOrder = data => ajax('/admin/order/delOrder', data, 'POST',JSON);

export const updateGoods = data => ajax('/admin/order/updateGoods', data, 'POST',JSON);

export const delGoods = data => ajax('/admin/order/delGoods', data, 'POST',JSON);

export const delGoodsBatch = data => ajax('/admin/order/delGoodsBatch', data, 'POST',JSON);

export const queryOrderGoodsList = data => ajax('/admin/order/queryOrderGoodsList', data, 'POST',JSON);

export const getOrderInfo = data => ajax('/admin/order/getOrderInfo', data, 'POST',JSON);

export const queryOrderGoods = data => ajax('/admin/order/queryOrderGoods', data, 'POST',JSON);

