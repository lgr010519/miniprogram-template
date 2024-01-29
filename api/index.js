/**
 * 登录，获取token等
 * @param {*} data
 */
export const getAuthenticate = (data) => post(`/mapi/v1/authenticate`, data)
