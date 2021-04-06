import ajax from '@/utils/ajax'

export const saveOrUpdateCost = data => ajax('/admin/cost/saveOrUpdateCost', data, 'POST',JSON);

export const getCost = data => ajax('/admin/cost/getCost', data, 'POST',JSON);

export const queryCostPage = data => ajax('/admin/cost/queryCostPage', data, 'POST',JSON);

export const delCost = data => ajax('/admin/cost/delCost', data, 'POST',JSON);

export const importExcelData = data => ajax('/admin/cost/importExcelData', data, 'POST',JSON);

export const saveOrUpdateCostType = data => ajax('/admin/cost/saveOrUpdateCostType', data, 'POST',JSON);

export const saveOrUBatchCostType = data => ajax('/admin/cost/saveOrUBatchCostType', data, 'POST',JSON);

export const getCostType = data => ajax('/admin/cost/getCostType', data, 'POST',JSON);

export const queryCostTypePage = data => ajax('/admin/cost/queryCostTypePage', data, 'POST',JSON);

export const queryCostTypeList = data => ajax('/admin/cost/queryCostTypeList', data, 'POST',JSON);

export const delCostType = data => ajax('/admin/cost/delCostType', data, 'POST',JSON);
