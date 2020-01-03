import service from "./request";


/**
 * @param {*} url  地址
 * @param {*} data 数据
 * @param {*} method  方式
 * @param {*} type  提交数据格式 form/json
 */
export default function ajax(url, data = {}, method = 'GET', type = 'FORM') {
  console.log('ajax提交')
  if(url && !url.startsWith("http://")){
    url = router.app.commonJs.getAccessDomain() + router.app.constants.gz_prefix_url + url;
  }
  return new Promise(function(resolve, reject) {
    //设置加载动画区域
    let loading = Vue.prototype.$loading({
      lock: true,
      text: 'Loading...',
      background: 'rgba(0, 0, 0, 0.3)'
      // target: document.querySelector('#main-container')
    })
    try {
      let promise
      //get
      if (method === 'GET') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + encodeURIComponent(data[key]) + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
        }
        promise = service.get(url)
      } else {
        //post方法的 表单格式
        if (type === 'FORM') {
          let formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          promise = service.post(url, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        } else {
          covertEmpty2Null(data)
          promise = service.post(url, data, {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
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

//将json中的空字符串替换成null
function covertEmpty2Null(data) {
  if (typeof data === 'object') {
    for (let key in data) {
      if (key == "webkitRelativePath") continue;
      if (data[key] === "") {
        data[key] = null;
      } else {
        covertEmpty2Null(data[key])
      }
    }
  }
}
