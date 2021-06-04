import ajax from '@/utils/ajax'

export const saveOrUpdateOrder = data => ajax('/admin/order/saveOrUpdateOrder', data, 'POST',JSON);

export const queryOrderList = data => ajax('/admin/order/queryOrderList', data, 'POST',JSON);

export const delOrderBatch = data => ajax('/admin/order/delOrderBatch', data, 'POST',JSON);

export const delOrder = data => ajax('/admin/order/delOrder', data, 'POST',JSON);

export const saveOrUpdateGoods = data => ajax('/admin/order/saveOrUpdateGoods', data, 'POST',JSON);

export const saveOrUBatchGoods = data => ajax('/admin/order/saveOrUBatchGoods', data, 'POST',JSON);

export const delGoods = data => ajax('/admin/order/delGoods', data, 'POST',JSON);

export const orderInfo = data => ajax('/admin/order/orderInfo', data, 'POST',JSON);

export const orderInfoByDay = data => ajax('/admin/order/orderInfoByDay', data, 'POST',JSON);

export const updateOrderStatus = data => ajax('/admin/order/updateOrderStatus', data, 'POST',JSON);

export const saveOrderAmount = data => ajax('/admin/order/saveOrderAmount', data, 'POST',JSON);

export const queryOrderAmount = data => ajax('/admin/order/queryOrderAmount', data, 'POST',JSON);

export const delGoodsBatch = data => ajax('/admin/order/delGoodsBatch', data, 'POST',JSON);

export const queryOrderGoodsList = data => ajax('/admin/order/queryOrderGoodsList', data, 'POST',JSON);

export const getOrderInfo = data => ajax('/admin/order/getOrderInfo', data, 'POST',JSON);

export const queryOrderGoods = data => ajax('/admin/order/queryOrderGoods', data, 'POST',JSON);

export const printOrder = data => ajax('/admin/order/printOrder', data, 'POST',JSON);

export const getAddress = data => ajax('/admin/nAddress/getAddress', data, 'POST',JSON);

export const getAllAddress = data => ajax('/admin/nAddress/getAllAddress', data, 'POST',JSON);
