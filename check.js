/**
 * @module check
 */
module.exports = {
  getBrowsers: function(){
        const u = navigator.userAgent;
    let result = [];
    if (u.includes('Trident')) result.push('ie');
    if (u.includes('Presto')) result.push('opera');
    if (u.includes('AppleWebKit')) result.push('webkit');
    if (u.includes('Gecko') && u.indexOf('KHTML') === -1)
        result.push('firefox');
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) result.push('mobile');
    if (u.includes('Android') || u.includes('Adr')) result.push('android');
    if (u.includes('iPhone') || u.includes('iPad')) result.push('ios');
    if (u.includes('iPhone')) result.push('iphone');
    if (u.includes('iPad')) result.push('ipad');
    if (u.includes('Safari')) result.push('mac');
    if (u.includes('MicroMessenger')) result.push('weixin');
    if (u.match(/\sQQ/i) === ' qq') result.push('qq');
    return result;
  },
  /**
   * @returns {string} 返回浏览器厂商
   */
  isBrowser: function(){
    let userAgent = navigator.userAgent,
      isOpera = userAgent.indexOf("Opera") > -1,
      isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera,
      isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1,
      isEdge = userAgent.indexOf("Edge") > -1 && !isIE,
      isFF = userAgent.indexOf("Firefox") > -1,
      isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1,
      isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;

    // console.log(userAgent)
    if (isIE) {
      let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      let fIEVersion = parseFloat(RegExp["$1"]);
      return {name: 'IE', version: fIEVersion}
    }
    if (isIE11) return {name: 'IE11', version: 11};
    if (isEdge) return {name: 'Edge', version:0};
    if (isFF) return {name: 'Firefox', version: 0};
    if (isOpera) return {name: 'Opera', version: 0};
    if (isSafari) return {name: 'Safari', version: 0};
    if (isChrome) return {name: 'Chrome', version: 0};
  },
  /**
   * 判断是否为移动设备
   * @return {boolean} 
   */
  isMobile: function () {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isString: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isNumber: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isBoolean: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isFunction: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isNull: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isUndefined: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isObj: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isArray: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isDate: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isError: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isSymbol: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isPromise: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
  },
  /**
   * @param {*} o - 对象
   * @return {boolean}
   */
  isSet: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
  },
  /**
   * 判断空对象和空数组
   * @param {*} o - 对象
   * @return {boolean}
   */
  isEmpty: function (o) {
    if(JSON.stringify(o) === "{}" || JSON.stringify(o) === "[]") return true
    return false
  },
  /**
   * 判断是否是假值
   * @param {*} o - 对象
   * @return {boolean}
   */
  isFalsy: function (o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true;
    return false
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isInt: function(num){
    return /^-?\d+$/.test(num);
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isPhone: function(num){
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(num);
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isTel: function(num){
    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(num);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isUsername: function(str){
    return /^[a-zA-Z]\w{1,17}$/.test(str);//用户名以字母开头，长度在1~18之间，只能包含字母、数字和下划线
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isPassword: function(str){
    return /^[a-zA-Z]\w{5,17}$/.test(str);//密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isPostal: function(num){
    return /[1-9]\d{5}(?!\d)/.test(num);//邮政编码
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isQQ: function(num){
    return /^[1-9][0-9]{4,9}$/.test(num);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isEmail: function(str){
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isMoney: function(num){
    return /^\d*(?:\.\d{0,2})?$/.test(num);//金额(小数点2位)
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isURL: function(str){
    return /(http|ftp|https):\/\/[\w\-_]+(.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isIP: function(str){
    return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isEnglish: function(str){
    return /^[a-zA-Z]+$/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isChinese: function(str){
    return /^[\u4E00-\u9FA5]+$/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isLower: function(str){
    return /^[a-z]+$/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isUpper: function(str){
    return /^[A-Z]+$/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isHTML: function(str){
    return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
  },
  /**
   * @param {string} str - 字符串
   * @return {boolean}
   */
  isSpace: function(str){
    return /\s/.test(str);
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isIdCard: function(num){
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(num);
  },
  /**
   * @param {number} num - 数字
   * @return {boolean}
   */
  isBankCard: function(num){
    return /^\d{16}|\d{19}$/.test(num);
  },
  /**
   * 判断是否为中国身份证
   * @param {string} sId - 字符串
   * @return {string|boolean} 返回错误信息或true
   */
  isChineseCardID: function (sId) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) return '身份证的长度或格式错误'
    //身份证城市
    let aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) return '身份证地区非法'

    // 出生日期验证
    let sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
      d = new Date(sBirthday)
    if (sBirthday !== (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) return '身份证上的出生日期非法'

    // 身份证号码校验
    let sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = "10X98765432"
    for (let i = 0; i < sId.length - 1; i++) {
      sum += sId[i] * weights[i];
    }
    let last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] !== last) return '身份证号非法'

    return true
  },
}
