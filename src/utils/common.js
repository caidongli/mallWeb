import constant from './constant'
import axios from 'axios'
import {
    Notification
} from 'element-ui'

/**
 * 判断是否有操作权限
 * @param {*} s
 */
function hasOperation(_this, operationCode) {
    const operationCodeList = JSON.parse(sessionStorage.getItem("gz_operationList"))
    return operationCodeList ? (operationCodeList.indexOf(operationCode) !== -1) : false;
}

function getEnum(_this, enumName) {
    const enumList = JSON.parse(sessionStorage.getItem("gz_enums"))
    for (let key in enumList) {
        if (key === enumName) {
            return enumList[key]
        }
    }
    return []
}

function convertEnum2String(jsonObject) {
    if (typeof jsonObject === 'object') {
        for (let key in jsonObject) {
            if (jsonObject[key] && jsonObject[key].name && jsonObject[key].desc) {
                jsonObject[key] = jsonObject[key].name;
            } else {
                convertEnum2String(jsonObject[key])
            }
        }
    }
}

function parseCurrentPageParams(_this) {
    let hasParams = false
    let currentPageParams = {};
    for (let key in _this.$route.params) {
        currentPageParams[key] = _this.$route.params[key]
        hasParams = true
    }
    if (hasParams) {
        sessionStorage.setItem('gz_current_page_params', JSON.stringify(currentPageParams))
    }
}

let result = new Array();

/**
 * 比对两个json的不同
 * @param tag 原目标
 * @param source 需要比对的目标
 * @returns {string|any[]}
 */
function compare(tag, source) {
    try {
        let obj1 = JSON.parse(tag);
        let obj2 = JSON.parse(source);
        return compareObj(obj1, obj2, '');
    } catch (e) {
        return '请检查传入的json对象'
    }
}

function compareObj(obj1, obj2, val) {
    for (let key in obj1) {
        if (typeof obj1[key] === 'object') {
            let p = '';
            if (val === '') {
                p = key
            } else {
                p = val + ':' + key;
            }
            compareObj(obj1[key], obj2[key], p)
        } else {
            if (obj1[key] !== obj2[key]) {
                if (val === '') {
                    result.push(key);
                } else {
                    result.push(val + ':' + key);
                }

            }
        }
    }
    return result
}

let moment = require('moment');
let date = new Date();


/**
 * 获取当月第一天(YYYY-MM-DD一定要大写)
 * @returns {*}
 */
function getMonthStart(dataFormat) {
    if (!dataFormat) {
        dataFormat = "YYYY-MM-DD";
    }
    //获取当前月的第一天
    let monthStart = date.setDate(1);
    //获取当前月第一天和最后一天
    return moment(monthStart).format(dataFormat);
}

/**
 * 获取当月最后一天(YYYY-MM-DD一定要大写)
 * @returns {*}
 */
function getMonthEnd(dataFormat) {
    if (!dataFormat) {
        dataFormat = "YYYY-MM-DD";
    }
    //获取当前月
    let currentMonth = date.getMonth();
    //获取到下一个月，++currentMonth表示本月+1，一元运算
    let nextMonth = ++currentMonth;
    //获取到下个月的第一天
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    //一天时间的毫秒数
    let oneDay = 1000 * 60 * 60 * 24;
    //nextMonthFirstDay-oneDay表示下个月的第一天减一天时间的毫秒数就是本月的最后一天
    return moment(nextMonthFirstDay - oneDay).format(dataFormat);
}

/**
 * 存储sessionStorage
 */
function setStore(name, content) {
    sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
function getStore(name) {
    if (!name) return
    return sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
function removeStore(name) {
    if (!name) return
    sessionStorage.removeItem(name)
}

function goToUnAuthJump(system_code, neddReloadEnums) {
    let routerSystemCode = null;
    let activeRouter = this.getStore(constant.gz_activeRouter);
    if (activeRouter) {
        const keys = activeRouter.split('=');
        if (keys.length == 2) {
            routerSystemCode = keys[0];
            activeRouter = keys[1];
            if (routerSystemCode != undefined && routerSystemCode != null && routerSystemCode != '') {
                const replaceStr = '/' + routerSystemCode
                if (activeRouter.indexOf(replaceStr) == 0) {
                    activeRouter = activeRouter.substring(replaceStr.length)
                }
            }
        }

    } else {
        routerSystemCode = system_code;
        activeRouter = "/";
    }
    this.setStore(constant.gz_need_reload_enums, neddReloadEnums);
    //window.console.log("this routerPath = " + activeRouter);

    let getwayDomainReal = getAccessDomain();
    let selfDomain = constant.gz_self_domain;
    if (getwayDomainReal == constant.gz_getway_domain_inner) {
        selfDomain = getwayDomainReal; //内网访问方式
    }

    return getAccessDomain() + constant.gz_getway_login_prefix_url +
        selfDomain + constant.gz_system_prefix + '/' + routerSystemCode + '/#/index?id=' + activeRouter;
    // return 'http://10.197.38.113/login/#/?redirectUrl=http://10.197.38.113'+systemPrefix+'/'+routerSystemCode+'/#/index?id='+activeRouter;
    //return constant.gz_getway_login_prefix_url + constant.gz_getway_domain +'/'+ routerSystemCode
    //            +'-app/'+routerSystemCode+'/common/gz-getway-pass?routerSystemCode='+systemPrefix+'/'+routerSystemCode+'&activeRouter='+activeRouter;
}

async function getwayPass(system_code) {
    const isLogin = this.getStore(constant.gz_userInfo) ? true : false // 通过 localStorage获取当前的token是否存在
    if (isLogin) {
        //有用户信息，前端跳过检查（转由api请求结果控制有效性）
        return true;
    } else {
        //不存在用户信息了，跳转登录页面或统一网关登录页面
        //window.console.log("jump login path ,,, router.beforeEach path="+to.fullPath);
        if (constant.gz_getway_login == 'true') {
            //发起后台检测与自动登录
            let requestPreFix = getAccessDomain() + "/" + system_code + "-app/" + system_code + "/";
            const loginUrl = requestPreFix + 'common/gz-getway-pass'
            //window.console.log("go start")
            let headerMap = {
                'Content-Type': 'application/json;charset=UTF-8'
            };
            //let headerMap = {'tsf-login-account':'lxl1','Content-Type':'application/json;charset=UTF-8'};
            let loginResult;
            await axios.post(loginUrl, {}, {
                    headers: headerMap
                })
                .then(response => {
                    loginResult = response;
                    //window.console.log("response=="+response);
                    //window.console.log(response);
                })
                .catch(error => {
                    loginResult = null;
                    //window.console.log("error==="+error);
                    //window.console.log(error);
                });
            //window.console.log("go in");
            //window.console.log(loginResult);

            let loginCheck = false;
            if (loginResult && loginResult.data && loginResult.data.code == 0) {
                //window.console.log("go handler")
                //初始登录成功的信息
                await this.initLoginData(system_code);
                return true;
            } else if (loginResult && loginResult.data && loginResult.data.code == 401) {
                loginCheck = false;
                alert(loginResult.data.msg);
            }

            if (loginCheck == false) {
                let jumpPath = this.goToUnAuthJump(system_code, '1');
                //window.console.log("go ejumpPath==="+jumpPath)
                window.location.href = jumpPath;
            }
            //window.console.log("go end")
            //return loginCheck;
        } else {
            //不需要统一登录，返回值由路由判断转发到登录页面
            return false;
        }
    }
}

async function initLoginData(system_code) {
    let requestPreFix = getAccessDomain() + "/" + system_code + "-app/" + system_code + "/";
    const enumsUrl = requestPreFix + 'base-enum/enums'
    let enumsResult = await axios.get(enumsUrl)
    if (enumsResult.data.code === 200) {
        this.setStore(constant.gz_enums, JSON.stringify(enumsResult.data.data));
    }
    //加载动态菜单
    const indexUrl = requestPreFix + 'common/getIndexData'
    const indexResult = await axios.post(indexUrl, {
        dataRange: ''
    }, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
    // 保存菜单树
    if (indexResult.data.code === 0) {
        const userInfo = {
            userName: indexResult.data.userName,
            userId: indexResult.data.userId,
            enterpriseBaseId: indexResult.data.enterpriseBaseId
        };
        this.setStore(constant.gz_menus, JSON.stringify(indexResult.data.menus));
        this.setStore(constant.gz_sysInfo, JSON.stringify(indexResult.data.sysInfo));
        this.setStore(constant.gz_sysList, JSON.stringify(indexResult.data.sysList));
        this.setStore(constant.gz_userInfo, JSON.stringify(userInfo));
        this.setStore(constant.gz_identify, JSON.stringify(indexResult.data.identify));
        this.setStore(constant.gz_identifys, JSON.stringify(indexResult.data.identifys));
        this.setStore(constant.gz_operationList, JSON.stringify(indexResult.data.operationList));
    }
}

function getAccessDomain() {
    let accessDomain = "";
    if (constant.gz_getway_login == 'true') {
        accessDomain = constant.gz_getway_domain;
        if (window.location.hostname.indexOf("10.197") != -1) {
            accessDomain = constant.gz_getway_domain_inner;
        }
    }
    return accessDomain;
}

/**
 * 获取文件上传、下载的域名
 * @returns {string}
 */
function getFileAccessDomain() {
    let accessDomain = "";
    if (constant.gz_getway_login == 'true') {
        accessDomain = constant.gz_getway_domain_file;
        if (window.location.hostname.indexOf("10.197") != -1) {
            accessDomain = constant.gz_getway_domain_inner;
        }
    }
    return accessDomain;
}

/**
 * 万元转元
 */
function tenThousandToYuan(num) {
    let price = "";
    //判断是不是字符串
    if (!(typeof num == "String")) {
        num = num.toString();
    }
    //是不是小数
    if (num.indexOf(".") != -1) {
        let arr = num.split(".");
        if (arr[1] === "") {
            price = arr[0] + "0000";
        } else {
            price = arr[0] + ("0." + arr[1]) * 10000;
        }
    } else {
        price = num + "0000";
    }
    return price;
}

/**
 *元转万元
 */
function yuanToTenThousand(num) {
    let price = "";
    //判断是不是字符串
    if (!(typeof num == "String")) {
        num = num.toString();
    }
    //是不是小数
    if (num.indexOf(".") != -1) {
        let arr = num.split(".");
        price = (arr[0] / 10000) + arr[1];
    } else {
        price = (num / 10000).toString();
    }
    return price;
}

/*
    深拷贝数据
*/
function deepCopyData(data) {
    return JSON.parse(JSON.stringify(data));
}

/*
    导出文件(Excel,PDF)
*/
function exportFile(url, data, filename) {
    axios({
        method: 'post',
        url: url,
        data: data,
        responseType: 'arraybuffer'
    }).then((res) => {
        if (!res.data || res.data.byteLength == 0) {
            Notification({
                title: '错误',
                type: 'error',
                message: '暂无数据可导出！',
            })
        } else {
            let blob = new Blob([res.data], {
                type: 'application/octet-stream'
            });
            if (!filename) {
                filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]);
            }
            if (typeof window.navigator.msSaveBlob !== "undefined") {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                let blobURL = window.URL.createObjectURL(blob);
                let tempLink = document.createElement("a");
                tempLink.style.display = "none";
                tempLink.href = blobURL;
                tempLink.setAttribute("download", filename);
                if (typeof tempLink.download === "undefined") {
                    tempLink.setAttribute("target", "_blank");
                }
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobURL);
            }
        }
    }).catch(error => {
        Notification({
            title: '错误',
            message: '网络异常，请重新操作！',
            type: 'error',
        })
    })
}

/*
    扩展本地存储
*/
function concatSessionParams(storageName, obj) {
    let params = JSON.parse(sessionStorage.getItem(storageName)) || {};
    if (Array.isArray(obj) && Array.isArray(params)) {
        sessionStorage.setItem(storageName, JSON.stringify(params.concat(obj)));
        return;
    }
    sessionStorage.setItem(storageName, JSON.stringify(Object.assign(params, obj)));

}

export default {
    hasOperation,
    getEnum,
    convertEnum2String,
    parseCurrentPageParams,
    compare,
    getMonthStart,
    getMonthEnd,
    moment,
    setStore,
    getStore,
    removeStore,
    goToUnAuthJump,
    getwayPass,
    initLoginData,
    getAccessDomain,
    getFileAccessDomain,
    tenThousandToYuan,
    yuanToTenThousand,
    deepCopyData,
    exportFile,
    concatSessionParams
}