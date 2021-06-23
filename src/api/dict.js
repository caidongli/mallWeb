import ajax from '@/utils/ajax'

export const saveOrUpdateDict = data => ajax('/admin/dict/saveOrUpdateDict', data, 'POST',JSON);

export const getDict = data => ajax('/admin/dict/getDict', data, 'POST',JSON);

export const queryDictList = data => ajax('/admin/dict/queryDictList', data, 'POST',JSON);

export const delDict = data => ajax('/admin/dict/delDict', data, 'POST',JSON);
