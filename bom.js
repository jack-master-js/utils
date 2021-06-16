/**
 * @module bom
 */
const jsCookies = require('js-cookie')
const store = require('store')

module.exports = {
  cookie: {
    /**
     * 格式化cookie
     * @param {string} cookieStr - cookie字符串
     * @return {*} 返回cookie值
     */
    parse: function(cookieStr) {
      let cookie = cookieStr.split(';'), cookieObj = {}, cookieArr = [], key = '', value = '';
      for (let i = 0; i < cookie.length; i++) {
        cookieArr = cookie[i].trim().split('=')
        key = cookieArr[0]
        value = cookieArr[1]
        cookieObj[key] = value
      }
      return cookieObj
    },
    /**
     * 从字符串中取cookie
     * @param {string} cookieStr - cookie字符串
     * @param {string} name - key
     * @return {*} 返回cookie值
     */
    getFromString: function (cookieStr,name) {
      var cookieName = encodeURIComponent(name) + "=",
        cookieStart = cookieStr.indexOf(cookieName),
        cookieValue = null
      if(cookieStart > -1){
        var cookieEnd = cookieStr.indexOf(";",cookieStart)
        if(cookieEnd === -1){
          cookieEnd = cookieStr.length
        }
        cookieValue = decodeURIComponent(cookieStr.substring(cookieStart + cookieName.length,cookieEnd))
      }
      return cookieValue
    },
    /**
     * @param key
     * @return {*}
     */
    getJSON: function(key) {
      return jsCookies.getJSON(key)
    },
    /**
     *
     * @param key
     * @return {*}
     */
    get: function(key) {
      return jsCookies.get(key)
    },
    /**
     *
     * @param key
     * @param val
     * @param options
     * @return {*}
     */
    set: function(key,val,options) {
      return jsCookies.set(key,val,options)
    },
    /**
     *
     * @param key
     * @return {*}
     */
    remove: function(key) {
      return jsCookies.remove(key)
    },
  },
  store: store,
  localStorage: {
    /**
     *
     * @param key
     * @param val
     */
    set: function (key, val) {
      let setting = arguments[0];
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (let i in setting) {
          localStorage.setItem(i, JSON.stringify(setting[i]))
        }
      } else {
        localStorage.setItem(key, JSON.stringify(val))
      }
    },
    /**
     *
     * @param key
     * @return {*}
     */
    get: function (key) {
      if (key) return JSON.parse(localStorage.getItem(key))
      return null;
    },
    /**
     *
     * @param key
     * @return {*}
     */
    remove: function (key) {
      localStorage.removeItem(key)
    },
    /**
     * @return {*}
     */
    clear: function () {
      localStorage.clear()
    },
  },
  sessionStorage: {
    /**
     *
     * @param key
     * @param val
     */
    set: function (key, val) {
      let setting = arguments[0];
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (let i in setting) {
          sessionStorage.setItem(i, JSON.stringify(setting[i]))
        }
      } else {
        sessionStorage.setItem(key, JSON.stringify(val))
      }
    },
    /**
     *
     * @param key
     * @return {*}
     */
    get: function (key) {
      if (key) return JSON.parse(sessionStorage.getItem(key))
      return null;
    },
    /**
     *
     * @param key
     * @return {*}
     */
    remove: function (key) {
      sessionStorage.removeItem(key)
    },
    /**
     *
     * @return {*}
     */
    clear: function () {
      sessionStorage.clear()
    }
  },
}