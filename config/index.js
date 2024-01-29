// develop	开发版	trial	体验版	release	正式版
const env = wx.getAccountInfoSync().miniProgram.envVersion
/**
 * 接口地址
 */
const configs = {
  develop: {
    baseUrl: 'http://127.0.0.1:test',
  },
  trial: {
    baseUrl: 'http://127.0.0.1:trial',
  },
  release: {
    baseUrl: 'http://127.0.0.1:release',
  },
}[env]

export default configs