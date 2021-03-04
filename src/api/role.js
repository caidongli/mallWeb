import ajax from '@/utils/ajax'

export const queryRoleByPage = data => ajax('/admin/role/queryRoleByPage', data, 'POST',JSON);
