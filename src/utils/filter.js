import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

// request拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.code != 0 && res.code != -1) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      // -3:未登录;
      if (res.code === -3) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      if(res.code == -1){
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

