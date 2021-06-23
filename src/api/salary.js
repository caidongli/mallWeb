import ajax from '@/utils/ajax'

export const saveOrUpdateSalary = data => ajax('/admin/salary/saveOrUpdateSalary', data, 'POST',JSON);

export const getSalary = data => ajax('/admin/salary/getSalary', data, 'POST',JSON);

export const querySalaryList = data => ajax('/admin/salary/querySalaryList', data, 'POST',JSON);

export const delSalary = data => ajax('/admin/salary/delSalary', data, 'POST',JSON);

export const createSalary = data => ajax('/admin/salary/createSalary', data, 'POST',JSON);

export const sdym = data => ajax('/admin/test/getsdym', data, 'POST',JSON);
