import ajax from '@/utils/ajax'

export const queryUserByPage = data => ajax('/admin/user/queryUserByPage', data, 'POST',JSON);

export const updateUser = data => ajax('/admin/user/updateUser', data, 'POST',JSON);

export const updateUserBySuper = data => ajax('/admin/user/updateUserBySuper', data, 'POST',JSON);

export const deleteUser = data => ajax('/admin/user/deleteUser', data, 'POST',JSON);

export const deleteUserBatch = data => ajax('/admin/user/deleteUserBatch', data, 'POST',JSON);

export const queryUser = data => ajax('/admin/user/queryUser', data, 'POST',JSON);

export const updateRoleRelation = data => ajax('/admin/user/updateRoleRelation', data, 'POST',JSON);

export const updateRoleRelationBatch = data => ajax('/admin/user/updateRoleRelationBatch', data, 'POST',JSON);

export const updatePassword = data => ajax('/admin/user/updatePassword', data, 'POST',JSON);

export const initPassword = data => ajax('/admin/user/initPassword', data, 'POST',JSON);
