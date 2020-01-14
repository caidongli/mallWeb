import { login, logout, getInfo ,baseEnum} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import constants from '@/utils/constant'
import {getStore,removeStore,setStore} from '@/utils/common'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          baseEnum().then(response => {
            const data = response.data
            setStore(constants.enums, JSON.stringify(data))
          })
          // this.initLoginData();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //初始化登录信息
    async initLoginData () {

    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          setStore(constants.userInfo, JSON.stringify(data));
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeStore(constants.userInfo);
          removeStore(constants.enums)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
