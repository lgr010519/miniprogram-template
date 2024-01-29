import configs from '../config/index'
import wechat from './wechat'
// 上传文件地址
export const uploadFileUrl = configs.baseUrl + '/upload'
// 接口地址
export let baseURL = configs.baseUrl

function fetchData (method, url, data) {
  const header = {}
  const token = wx.getStorageSync('token')
  token && (header.Authorization = 'Bearer ' + token)
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      data,
      header,
      success (res) {
        // 成功调用获取获取新的token
        let newToken = res.header.authorization
        // 同步设置token到缓存中
        newToken && wx.setStorageSync('token', newToken)
        // 如果登录失效 token过期、错误，则重新获取
        if (res.data.code === 10102 || res.data.code === 10127 || res.data.code === 10126) {
          // 重新调用 wx.login 获取 code 重新 获取 token
          wechat.login().then(loginRes => {
            // 再次通过正确的token调用方法
            if (loginRes.data.data.token) {
              fetchData(method, url, data).then(res => {
                resolve(res)
              }).catch(err => {
                reject(err)
              })
            }
          })
        } else {
          resolve(res)
        }
      },
      // 全局的封装请求出错
      fail (err) {
        // 全局的网络错误
        wx.showToast({
          title: '请求错误，请重试',
          icon: 'none',
          duration: 2000
        })
        // 失败调用
        reject(err)
      }
    })
  })
}

export function get (url, params) {
  return fetchData('GET', url, params)
}

export function post (url, data) {
  return fetchData('POST', url, data)
}

export function put (url, data) {
  return fetchData('PUT', url, data)
}

export function remove (url, params) {
  return fetchData('DELETE', url, params)
}
