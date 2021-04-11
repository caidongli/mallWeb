import ajax from '@/utils/ajax'

export const saveOrUpdateEmployees = data => ajax('/admin/employees/saveOrUpdateEmployees', data, 'POST',JSON);

export const getEmployees = data => ajax('/admin/employees/getEmployees', data, 'POST',JSON);

export const queryEmployeesList = data => ajax('/admin/employees/queryEmployeesList', data, 'POST',JSON);

export const delEmployees = data => ajax('/admin/employees/delEmployees', data, 'POST',JSON);
