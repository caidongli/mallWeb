import request from '@/utils/request'
import ajax from '@/utils/ajax'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}


export const baseEnum = data => ajax('/mall/base-enum/enums', data, 'GET');

export const updatePassword = data => ajax('/mall/admin/updatePassword', data, 'POST',JSON);

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
