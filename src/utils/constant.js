export const enums = 'enums'
export const need_reload_enums = 'need_reload_enums'
export const menus = 'menus'
export const sysInfo = 'sysInfo'
export const sysList = 'sysList'
export const userInfo = 'userInfo'
export const identify = 'identify'
export const identifys = 'identifys'
export const operationList = 'operationList'
export const activeRouter = 'activeRouter'
export const current_page_params = 'current_page_params'
export const projectDriverActiveRouter = 'projectDriverActiveRouter'
let envData = require('./envData')
let gzData = {}
switch (process.env.VUE_APP_MODE) {
  case 'dev': gzData = envData.devData; break
  case 'uat': gzData = envData.uatData; break
  case 'test': gzData = envData.testData; break
  case 'prod': gzData = envData.prodData; break
  default:gzData = envData.devData
}
// 部署的系统的访问前缀，最后不需要带"/"
export const system_prefix = gzData.system_prefix // tsf环境设置/ggzy
// 访问后端服务的前缀，最后不需要带"/"
export const prefix_url = gzData.prefix_url // tsf环境设置为空,否则为/api
// 外部统一登录信息配置
// 是否需要外部登录
export const getway_login = gzData.getway_login // tsf环境设置为true
// 系统自身域名，带http，http://jytest.gzggzy.cn
export const self_domain = gzData.self_domain
// 外部代理地址域名，带http，http://aptest.gzggzy.cn
export const getway_domain = gzData.getway_domain
// 外部代理地址(中心环境)，带http，http://10.197.38.113
export const getway_domain_inner = gzData.getway_domain_inner
// 文件服务的域名(生产环境文件上传、下载单独域名)
export const getway_domain_file = gzData.getway_domain_file
// 外部登录地址
export const getway_login_prefix_url = gzData.getway_login_prefix_url
// 外部登出地址
export const getway_login_out_url = gzData.getway_login_out_url

export default {
  enums,
  need_reload_enums,
  menus,
  sysInfo,
  sysList,
  userInfo,
  identify,
  identifys,
  operationList,
  activeRouter,
  current_page_params,
  projectDriverActiveRouter,
  system_prefix,
  prefix_url,
  getway_login,
  self_domain,
  getway_domain,
  getway_domain_file,
  getway_login_prefix_url,
  getway_login_out_url,
  getway_domain_inner
}
