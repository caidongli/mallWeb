import ajax from '@/utils/ajax'

export const saveOrUpdateAddress = data => ajax('/admin/orderAddress/saveOrUpdateAddress', data, 'POST',JSON);

export const getOrderAddress = data => ajax('/admin/orderAddress/getOrderAddress', data, 'POST',JSON);

export const queryOrderAddressList = data => ajax('/admin/orderAddress/queryOrderAddressList', data, 'POST',JSON);

export const delOrderAddressBatch = data => ajax('/admin/orderAddress/delOrderAddressBatch', data, 'POST',JSON);

export const delOrderAddress = data => ajax('/admin/orderAddress/delOrderAddress', data, 'POST',JSON);
