import request from '@/utils/request'

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

export function baseEnum() {
  return request({
    url: '/base-enum/enums',
    method: 'get',
  })
}

export function updatePassword() {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    params:params
  })
}

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
