import ajax from '@/utils/ajax'

export const saveOrUpdateCustomer = data => ajax('/admin/customer/saveOrUpdateCustomer', data, 'POST',JSON);

export const getCustomer = data => ajax('/admin/customer/getCustomer', data, 'POST',JSON);

export const queryCustomerList = data => ajax('/admin/customer/queryCustomerList', data, 'POST',JSON);

export const delCustomer = data => ajax('/admin/customer/delCustomer', data, 'POST',JSON);

