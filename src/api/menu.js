import ajax from '@/utils/ajax'

export const queryMenuList = data => ajax('/admin/sysMenu/queryMenuList', data, 'POST',JSON);

export const deleteMenu = data => ajax('/admin/sysMenu/deleteMenu', data, 'POST',JSON);

export const queryMenuInfo = data => ajax('/admin/sysMenu/queryMenuInfo', data, 'POST',JSON);

export const addMenu = data => ajax('/admin/sysMenu/addMenu', data, 'POST',JSON);

export const deleteMenuBatch = data => ajax('/admin/sysMenu/deleteMenuBatch', data, 'POST',JSON);

export const updateMenu = data => ajax('/admin/sysMenu/updateMenu', data, 'POST',JSON);

export const queryMenuTree = data => ajax('/admin/sysMenu/queryMenuTree', data, 'POST',JSON);

export const queryMenuListByU = data => ajax('/admin/sysMenu/queryMenuListByU', data, 'POST',JSON);

export const queryMenuListByPlatForm = data => ajax('/admin/sysMenu/queryMenuListByPlatForm', data, 'POST',JSON);
