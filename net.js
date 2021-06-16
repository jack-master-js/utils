/**
 * @module net
 */

module.exports = {
    /**
   * 获取ws IP
   * @param {string} request - 请求对象
   */
  getWsClientIp: function (request) {
    let ip = ''
    if(request.headers['x-forwarded-for']) {
        ip = request.headers['x-forwarded-for'].split(/\s*, \s*/)[0]
    }else if (request.connection.remoteAddress) {
        ip = request.connection.remoteAddress.split(':').pop()
    }
    return ip
  },
      /**
   * 获取请求参数字符串
   * @param {string} url - 地址
   */
  getQueryStr: function (url) {
    let index = url.indexOf('?')
    if(index >= 0) return url.slice(index + 1)
    return ''
  },
  /**
   * 获取面包屑
   *
   * @param {string} route - 路径
   * @return {array} 返回path数组
   */
  getBreadcrumbs: function (route) {
    return route.split('/')
  },
  /**
   * 获取地址参数
   *
   * @param {string} name - key
   * @return {*} 返回值或null
   */
  getParam: function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = decodeURI(window.location.search).substr(1).match(reg);
    if (r !== null) return r[2];
    return null;
  },
  /**
   * 获取地址所有参数
   *
   * @param {string} href - 地址
   * @return {object} 返回所有参数对象
   */
  getParams: function (href) {
    let url = href ? href : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1),
      _arrS = _pa.split('&'),
      _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
      let pos = _arrS[i].indexOf('=');
      if (pos === -1) {
        continue;
      }
      let name = _arrS[i].substring(0, pos),
        value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  },
  /**
   * ajax请求
   *
   * @param {object} setting - 选项设置
   * @return {*}
   */
  ajax: function (setting) {
    //设置参数的初始值
    let opts = {
      method: (setting.method || "GET").toUpperCase(), //请求方式
      url: setting.url || "", // 请求地址
      async: setting.async || true, // 是否异步
      dataType: setting.dataType || "json", // 解析方式
      data: setting.data || "", // 参数
      success: setting.success || function () {
      }, // 请求成功回调
      error: setting.error || function () {
      } // 请求失败回调
    }

    // 参数格式化
    function params_format(obj) {
      let str = ''
      for (let i in obj) {
        str += i + '=' + obj[i] + '&'
      }
      return str.split('').slice(0, -1).join('')
    }

    // 创建ajax对象
    let xhr = new XMLHttpRequest();

    // 连接服务器open(方法GET/POST，请求地址， 异步传输)
    if (opts.method === 'GET') {
      xhr.open(opts.method, opts.url + "?" + params_format(opts.data), opts.async);
      xhr.send();
    } else {
      xhr.open(opts.method, opts.url, opts.async);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(opts.data);
    }

    /*
    ** 每当readyState改变时，就会触发onreadystatechange事件
    ** readyState属性存储有XMLHttpRequest的状态信息
    ** 0 ：请求未初始化
    ** 1 ：服务器连接已建立
    ** 2 ：请求已接受
    ** 3 : 请求处理中
    ** 4 ：请求已完成，且相应就绪
    */
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        switch (opts.dataType) {
          case "json":
            let json = JSON.parse(xhr.responseText);
            opts.success(json);
            break;
          case "xml":
            opts.success(xhr.responseXML);
            break;
          default:
            opts.success(xhr.responseText);
            break;
        }
      }
    }

    xhr.onerror = function (err) {
      opts.error(err);
    }
  },
  /**
   * fetch请求
   * @param url
   * @param setting
   * @return {Promise<any>}
   */
  fetch: function (url, setting) {
    //设置参数的初始值
    let opts = {
      method: (setting.method || 'GET').toUpperCase(), //请求方式
      headers: setting.headers || {}, // 请求头设置
      credentials: setting.credentials || true, // 设置cookie是否一起发送
      body: setting.body || {},
      mode: setting.mode || 'no-cors', // 可以设置 cors, no-cors, same-origin
      redirect: setting.redirect || 'follow', // follow, error, manual
      cache: setting.cache || 'default' // 设置 cache 模式 (default, reload, no-cache)
    }
    let dataType = setting.dataType || "json", // 解析方式
      data = setting.data || "" // 参数

    // 参数格式化
    function params_format(obj) {
      let str = ''
      for (let i in obj) {
        str += `${i}=${obj[i]}&`
      }
      return str.split('').slice(0, -1).join('')
    }

    if (opts.method === 'GET') {
      url = url + (data ? `?${params_format(data)}` : '')
    } else {
      setting.body = data || {}
    }

    return new Promise((resolve, reject) => {
      fetch(url, opts)
        .then(async res => {
          let data = dataType === 'text' ? await res.text() : dataType === 'blob' ? await res.blob() : await res.json()
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
}
