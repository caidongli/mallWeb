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

/*
export function baseEnum() {
  return request({
    url: '/base-enum/enums',
    method: 'get',
  })
}
*/

export const baseEnum = data => ajax('/base-enum/enums', data, 'GET');

/*export function updatePassword(params) {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    params:params
  })
}*/

export const updatePassword = data => ajax('/admin/updatePassword', data, 'POST',JSON);

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
