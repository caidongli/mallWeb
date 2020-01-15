import axios from 'axios'
import Vue from 'vue'
import './filter'

// 设置 axios网络配置
axios.defaults.timeout = 30000 // 超时10秒
axios.defaults.withCredentials = true // 前后端同一session
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// 不使用baseURL,将前后端通过统一nginx代理
// axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
/**
 * @param {*} url  地址
 * @param {*} data 数据
 * @param {*} method  方式
 * @param {*} type  提交数据格式 form/json
 */
export default function ajax(url, data = {}, method = 'GET', type = 'FORM') {
  if (url && !url.startsWith('http')) {
    url = url
  }
  return new Promise(function(resolve, reject) {
    // 设置加载动画区域
    let loading = Vue.prototype.$loading({
      lock: true,
      text: 'Loading...',
      background: 'rgba(0, 0, 0, 0.3)'
      // target: document.querySelector('#main-container')
    })
    try {
      let promise
      // get
      if (method === 'GET') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + encodeURIComponent(data[key]) + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
        }
        promise = axios.get(url)
      } else {
        const headers = { 'Cache-Control': 'no-cache', 'If-Modified-Since': '0' }
        // post方法的 表单格式
        if (type === 'FORM') {
          let formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          promise = axios.post(url, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', ...headers }
          })
        } else {
          covertEmpty2Null(data)
          promise = axios.post(url, data, { headers: { 'Content-Type': 'application/json;charset=UTF-8', ...headers } })
        }
      }
      promise
        .then(response => {
          resolve(response.data)
          loading.close()
        })
        .catch(error => {
          reject(error)
          loading.close()
        })
    } catch (e) {
      reject(e)
      loading.close()
    }
  })
}

// 将json中的空字符串替换成null
function covertEmpty2Null(data) {
  if (typeof data === 'object') {
    for (let key in data) {
      if (key === 'webkitRelativePath') continue
      if (data[key] === '') {
        data[key] = null
      } else {
        covertEmpty2Null(data[key])
      }
    }
  }
}
