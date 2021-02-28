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
      alert("1")
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
