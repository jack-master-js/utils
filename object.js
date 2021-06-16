/**
 * @module object
 */
module.exports = {
  /**
   * 深拷贝
   *
   * @param {object} obj - 对象
   * @returns {object} 返回对象
   */
  deepClone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
};
