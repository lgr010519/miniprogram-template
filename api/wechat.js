import * as api from '@/api/index'

export const appId = ''

/**
 * 登录
 */
function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: result => {
        // 发送 result.code 到后台换取 openId, sessionKey, unionId, token
        api.getAuthenticate(appId, {
          code: result.code
        }).then(res => {
          if (res.data.code === 0) {
            // token
            wx.setStorageSync('token', res.data.data.token)
            // 用户信息
            wx.setStorageSync('user', res.data.data.user)
            resolve(res)
          } else {
            wx.showToast({
              title: '登录出错',
              icon: 'none',
              duration: 2000
            })
            reject(res)
          }
        }).catch(err => {
          reject(err)
          console.error(err)
        })
      }
    })
  })
}

export default {
  login
}
