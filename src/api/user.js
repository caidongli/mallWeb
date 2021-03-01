import request from '@/utils/request'
import ajax from '@/utils/ajax'

export const queryUserByPage = data => ajax('/admin/user/queryUserByPage', data, 'POST',JSON);

export const login = data => ajax('/admin/user/login', data, 'POST',JSON);

export const logout = data => ajax('/admin/user/logout', data, 'POST',JSON);

// user
// queryUser
