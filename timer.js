/**
 * @module timer
 */

module.exports = {
  /**
   * 等待一会儿
   * @param ms {number} 毫秒
   */
  sleep: function (ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  },
  /**
   * 倒计时
   * @param seconds {number} 倒计时秒数
   * @param callback {function}
   */
  countDown: function (seconds, callback) {
    let timer = null;
    timer = setInterval(function () {
      let day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (seconds > 0) {
        day = Math.floor(seconds / (60 * 60 * 24));
        hour = Math.floor(seconds / (60 * 60)) - day * 24;
        minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
        second =
          Math.floor(seconds) -
          day * 24 * 60 * 60 -
          hour * 60 * 60 -
          minute * 60;
      }
      if (day <= 9) day = "0" + day;
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;

      callback({ day, hour, minute, second });
      seconds--;

      if (seconds < 0) clearInterval(timer);
    }, 1000);
  },
  /**
   * 计算毫秒数
   * @param num {number} 数字
   * @param pattern {string} day hour minute second
   * @return {number}
   */
  getMs: function (num, pattern) {
    switch (pattern) {
      case "day":
        return num * 24 * 60 * 60 * 1000;
      case "hour":
        return num * 60 * 60 * 1000;
      case "minute":
        return num * 60 * 1000;
      case "second":
        return num * 1000;
      default:
        return null;
    }
  },
  /**
   * 转换毫秒数
   * @param ms {number}
   * @param pattern {string} day hour minute second
   * @return {number}
   */
  formatMs: function (ms, pattern) {
    switch (pattern) {
      case "day":
        return ms / 24 / 60 / 60 / 1000;
      case "hour":
        return ms / 60 / 60 / 1000;
      case "minute":
        return ms / 60 / 1000;
      case "second":
        return ms / 1000;
      default:
        return null;
    }
  },
  /**
   * 空闲控制
   *
   * @param {function} action - 请求关联函数，实际应用需要调用的函数
   * @param {number} idle - 空闲时间，单位毫秒
   * @return {function} 返回客户调用函数,返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
   */
  debounce: function (action, idle) {
    let last;
    return function () {
      let ctx = this,
        args = arguments;
      clearTimeout(last);
      last = setTimeout(function () {
        action.apply(ctx, args);
      }, idle);
    };
  },
  /**
   * 频率控制
   *
   * @param {number} delay - 延迟时间，单位毫秒
   * @param {function} action - 请求关联函数，实际应用需要调用的函数
   * @return {function}    返回客户调用函数,返回函数连续调用时，action 执行频率限定为 次 / delay
   */
  throttle: function (action, delay) {
    let last = 0;
    return function () {
      let curr = new Date();
      if (curr - last > delay) {
        action.apply(this, arguments);
        last = curr;
      }
    };
  },

  /**
   * 随机间歇执行
   * @param duration {number} 下次间隔因子
   * @param interval {number} 频率ms
   * @param callback {function}
   * @return {function}
   */
  frequency: function (duration, interval, callback) {
    let nextTime = 0;
    return setInterval(() => {
      let now = new Date().getTime();
      if (now >= nextTime) {
        callback();
        nextTime = now + Math.random() * duration;
      }
    }, interval);
  },
};
