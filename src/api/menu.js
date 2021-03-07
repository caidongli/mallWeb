import ajax from '@/utils/ajax'

export const queryRoleByPage = data => ajax('/admin/role/queryRoleByPage', data, 'POST',JSON);

export const queryRole = data => ajax('/admin/role/queryRole', data, 'POST',JSON);

export const addRole = data => ajax('/admin/role/addRole', data, 'POST',JSON);

export const updateRole = data => ajax('/admin/role/updateRole', data, 'POST',JSON);

export const deleteRole = data => ajax('/admin/role/deleteRole', data, 'POST',JSON);

export const deleteRoleBatch = data => ajax('/admin/role/deleteRoleBatch', data, 'POST',JSON);

export const updatePermissionRelation = data => ajax('/admin/role/updatePermissionRelation', data, 'POST',JSON);

export const updatePermissionRelationBatch = data => ajax('/admin/role/updatePermissionRelationBatch', data, 'POST',JSON);

export const queryPermissionTree = data => ajax('/admin/permission/queryPermissionTree', data, 'POST',JSON);

