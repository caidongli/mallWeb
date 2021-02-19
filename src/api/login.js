import request from '@/utils/request'
import ajax from '@/utils/ajax'

export const getToken = data => ajax('/admin/login/getToken', data, 'POST',JSON);

export const login = data => ajax('/admin/login/login', data, 'POST',JSON);

export const logout = data => ajax('/admin/login/logout', data, 'POST',JSON);

export const updatePassword = data => ajax('/mall/admin/updatePassword', data, 'POST',JSON);

export const baseEnum = data => ajax('/admin/baseEnum/enums', data, 'GET');
