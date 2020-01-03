export const gz_enums = 'gz_enums'
export const gz_need_reload_enums = 'gz_need_reload_enums'
export const gz_menus = 'gz_menus'
export const gz_sysInfo = 'gz_sysInfo'
export const gz_sysList = 'gz_sysList'
export const gz_userInfo = 'gz_userInfo'
export const gz_identify = 'gz_identify'
export const gz_identifys = 'gz_identifys'
export const gz_operationList = 'gz_operationList'
export const gz_activeRouter = 'gz_activeRouter'
export const gz_current_page_params = 'gz_current_page_params'
export const gz_projectDriverActiveRouter = 'gz_projectDriverActiveRouter'
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
export const gz_system_prefix = gzData.gz_system_prefix // tsf环境设置/ggzy
// 访问后端服务的前缀，最后不需要带"/"
export const gz_prefix_url = gzData.gz_prefix_url // tsf环境设置为空,否则为/api
// 外部统一登录信息配置
// 是否需要外部登录
export const gz_getway_login = gzData.gz_getway_login // tsf环境设置为true
// 系统自身域名，带http，http://jytest.gzggzy.cn
export const gz_self_domain = gzData.gz_self_domain
// 外部代理地址域名，带http，http://aptest.gzggzy.cn
export const gz_getway_domain = gzData.gz_getway_domain
// 外部代理地址(中心环境)，带http，http://10.197.38.113
export const gz_getway_domain_inner = gzData.gz_getway_domain_inner
// 文件服务的域名(生产环境文件上传、下载单独域名)
export const gz_getway_domain_file = gzData.gz_getway_domain_file
// 外部登录地址
export const gz_getway_login_prefix_url = gzData.gz_getway_login_prefix_url
// 外部登出地址
export const gz_getway_login_out_url = gzData.gz_getway_login_out_url

export default {
  gz_enums,
  gz_need_reload_enums,
  gz_menus,
  gz_sysInfo,
  gz_sysList,
  gz_userInfo,
  gz_identify,
  gz_identifys,
  gz_operationList,
  gz_activeRouter,
  gz_current_page_params,
  gz_projectDriverActiveRouter,
  gz_system_prefix,
  gz_prefix_url,
  gz_getway_login,
  gz_self_domain,
  gz_getway_domain,
  gz_getway_domain_file,
  gz_getway_login_prefix_url,
  gz_getway_login_out_url,
  gz_getway_domain_inner
}
