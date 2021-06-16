/**
 * @module date
 */

module.exports = {
  /**
   * 格式化日期
   *
   * @param {date|string} date - 日期
   * @param {string} pattern - Y:年 M:月 D:日 h:小时 m:分钟 s:秒 Q:季度 S:毫秒
   * @returns {string} 返回格式后的日期
   */
  format: function (date, pattern = "YYYY-MM-DD hh:mm:ss") {
    date = this._transferDate(date);
    let o = {
      "M+": date.getMonth() + 1,
      "D+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "Q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(Y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }

    for (let k in o) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        pattern = pattern.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return pattern;
  },
  /**
   * 计算时间
   *
   * @param {date|string} date - 日期对象
   * @param {string} pattern - year,month,day,hour,minute,seconds,week,daytime,when
   * @returns {string} 根据pattern返回
   */
  countTime: function (date, pattern) {
    date = this._transferDate(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    if (year < 10) {
      year = "0" + year;
    }

    if (day < 10) {
      day = "0" + day;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minute < 10) {
      minute = "0" + minute;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (pattern === "year") {
      return year;
    }

    if (pattern === "month") {
      return month;
    }

    if (pattern === "day") {
      return day;
    }

    if (pattern === "hour") {
      return hour;
    }

    if (pattern === "minute") {
      return minute;
    }

    if (pattern === "seconds") {
      return seconds;
    }

    if (pattern === "week") {
      let w_d;
      switch (date.getDay()) {
        case 0:
          w_d = "星期天";
          break;
        case 1:
          w_d = "星期一";
          break;
        case 2:
          w_d = "星期二";
          break;
        case 3:
          w_d = "星期三";
          break;
        case 4:
          w_d = "星期四";
          break;
        case 5:
          w_d = "星期五";
          break;
        case 6:
          w_d = "星期六";
          break;
        default:
          return null;
      }
      return w_d;
    }

    if (pattern === "daytime") {
      if (hour < 11 && hour > 6) {
        return "早晨";
      }
      if (hour <= 14 && hour >= 11) {
        return "中午";
      }
      if (hour > 14 && hour < 19) {
        return "下午";
      }
      if (hour >= 19 && hour <= 23) {
        return "晚上";
      }
      if (hour < 6 && hour >= 0) {
        return "凌晨";
      }
    }

    if (pattern === "when") {
      let now = new Date();
      let now_year = now.getFullYear();
      let now_month = now.getMonth() + 1;
      let now_day = now.getDate();
      let now_hour = now.getHours();
      let now_minute = now.getMinutes();
      let now_seconds = now.getSeconds();

      // 比较年份
      if (now_year > year) {
        return now_year - year + "年前";
      } else if (now_year === year) {
        // 比较月份
        if (now_month > month) {
          return now_month - month + "个月前";
        } else if (now_month === month) {
          // 比较号数
          if (now_day > day) {
            return now_day - day + "天前";
          } else if (now_day === day) {
            // 比较小时
            if (now_hour > hour) {
              return now_hour - hour + "小时前";
            } else if (now_hour === hour) {
              // 比较分钟
              if (now_minute > minute) {
                return now_minute - minute + "分钟前";
              } else if (now_minute === minute) {
                // 比较秒
                if (now_seconds > seconds) {
                  return now_seconds - seconds + "秒前";
                } else if (now_seconds === seconds) {
                  return "刚刚";
                } else {
                  return seconds - now_seconds + "秒后";
                }
              } else {
                return minute - now_minute + "分钟后";
              }
            } else {
              return hour - now_hour + "小时后";
            }
          } else {
            return day - now_day + "天后";
          }
        } else {
          return month - now_month + "个月后";
        }
      } else {
        return year - now_year + "年后";
      }
    }
  },
  /**
   * 根据秒数返回时分秒
   *
   * @param  {number} num - 秒数
   * @return {string} 返回时间表示
   * @example getHMS(3610) // -> 1小时0分10秒
   */
  getHMS: function (num) {
    let str = "";
    if (num > 3600) {
      str =
        Math.floor(num / 3600) +
        "小时" +
        Math.floor((num % 3600) / 60) +
        "分" +
        (num % 60) +
        "秒";
    } else if (num > 60) {
      str = Math.floor(num / 60) + "分" + (num % 60) + "秒";
    } else if (num === 60) {
      str = 60 + "秒";
    } else {
      str = (num % 60) + "秒";
    }
    return str;
  },
  /**
   * 当天当前时间距离1970年1月1日的毫秒数
   * @param date {date|string}
   * @return {number}
   */
  getTime: function (date) {
    return this._transferDate(date).getTime();
  },
  /**
   * 当天当前时间的毫秒数
   * @param date {date|string}
   * @return {number}
   */
  getMilliseconds: function (date) {
    return this._transferDate(date).getMilliseconds();
  },
  /**
   * 当天当前时间的秒数
   * @param date {date|string}
   * @return {string|number}
   */
  getSeconds: function (date) {
    let seconds = this._transferDate(date).getSeconds();
    return seconds > 9 ? seconds : "0" + seconds;
  },
  /**
   * 当天当前时间的分钟数
   * @param date {date|string}
   * @return {string|number}
   */
  getMinutes: function (date) {
    let minutes = this._transferDate(date).getMinutes();
    return minutes > 9 ? minutes : "0" + minutes;
  },
  /**
   * 当天几点
   * @param date {date|string}
   * @return {string|number}
   */
  getHours: function (date) {
    let hour = this._transferDate(date).getHours();
    return hour > 9 ? hour : "0" + hour;
  },
  /**
   * 当天几点（12小时制时）
   * @param date {date|string}
   * @return {number}
   */
  getHours12: function (date) {
    let hour = this._transferDate(date).getHours();
    return hour % 12 === 0 ? 12 : hour % 12;
  },
  /**
   * 当月多少号
   * @param date {date|string}
   * @return {string|number}
   */
  getDay: function (date) {
    let day = this._transferDate(date).getDate();
    return day > 9 ? day : "0" + day;
  },
  /**
   * 当月星期几
   * @param date {date|string}
   * @return {number}
   */
  getWeek: function (date) {
    return this._transferDate(date).getDay();
  },
  /**
   * 当年几月
   * @param date {date|string}
   * @return {string|number}
   */
  getMonth: function (date) {
    let month = this._transferDate(date).getMonth() + 1;
    return month > 9 ? month : "0" + month;
  },
  /**
   * 当年第几季度
   * @param date {date|string}
   * @return {number}
   */
  getPeriod: function (date) {
    let month = this.getMonth(date) * 1;
    return Math.floor((month + 3) / 3);
  },
  /**
   * 获取年份
   * @param date {date|string}
   * @return {number}
   */
  getYear: function (date) {
    return this._transferDate(date).getFullYear();
  },

  /**
   * 当年有多少天
   * @param date {date|string}
   * @return {number}
   */
  daysOfYear: function (date) {
    let firstDayYear = this.firstDayOfYear(date);
    let lastDayYear = this.lastDayOfYear(date);
    return Math.ceil(this.betweenDay(firstDayYear, lastDayYear));
  },
  /**
   * 当月有多少天
   * @param date {date|string}
   * @return {number}
   */
  daysOfMonth: function (date) {
    let currentMonth = this.firstDayOfMonth(date);
    let nextMonth = this.firstDayOfNextMonth(date);
    return this.betweenDay(currentMonth, nextMonth);
  },
  /**
   * 当年中的第几天
   * @param date {date|string}
   * @return {number}
   */
  dayOfYear: function (date) {
    return Math.ceil(this.betweenDay(this.firstDayOfYear(date), date));
  },
  /**
   * 当月中的第几天
   * @param date {date|string}
   * @return {number}
   */
  dayOfMonth: function (date) {
    return Math.ceil(this.betweenDay(this.firstDayOfMonth(date), date));
  },
  /**
   * 当年的第几周
   * @param date {date|string}
   * @return {number}
   */
  weekOfYear: function (date) {
    let numdays = this.dayOfYear(date);
    return Math.ceil(numdays / 7);
  },
  /**
   * 当月中的星期几
   * @param date {date|string}
   * @return {number}
   */
  weekOfMonth: function (date) {
    return this.getWeek(date);
  },
  /**
   * 当年的第一天
   * @param date {date|string}
   * @return {string}
   */
  firstDayOfYear: function (date) {
    let year = this.getYear(date);
    let dateString = year + "-01-01 00:00:00";
    return dateString;
  },
  /**
   * 当年的最后一天
   * @param date {date|string}
   * @return {string}
   */
  lastDayOfYear: function (date) {
    let year = this.getYear(date);
    let dateString = year + "-12-01 00:00:00";
    let endDay = this.daysOfMonth(dateString);
    return year + "-12-" + endDay + " 23:59:59";
  },
  /**
   * 当月的第一天
   * @param date {date|string}
   * @return {string}
   */
  firstDayOfMonth: function (date) {
    let year = this.getYear(date);
    let month = this.getMonth(date);
    let dateString = year + "-" + month + "-01 00:00:00";
    return dateString;
  },
  /**
   * 当月最后一天
   * @param date {date|string}
   * @return {string}
   */
  lastDayOfMonth: function (date) {
    let endDay = this.daysOfMonth(date);
    let year = this.getYear(date);
    let month = this.getMonth(date);
    return year + "-" + month + "-" + endDay + " 23:59:59";
  },
  /**
   * 当天的开始时间
   * @param date {date|string}
   * @return {string}
   */
  firstTimeOfDay: function (date) {
    let year = this.getYear(date);
    let month = this.getMonth(date);
    let dates = this.getDay(date);
    return year + "-" + month + "-" + dates + " 00:00:00";
  },
  /**
   * 当天的结束时间
   * @param date {date|string}
   * @return {string}
   */
  lastTimeOfDay: function (date) {
    let year = this.getYear(date);
    let month = this.getMonth(date);
    let dates = this.getDay(date);
    return year + "-" + month + "-" + dates + " 23:59:59";
  },
  /**
   * 当周的第一天
   * @param date {date|string}
   * @return {string}
   */
  firstDayOfWeek: function (date) {
    let week = this.getWeek(date);
    let d = this.minusDays(date, week);
    let year = this.getYear(d);
    let month = this.getMonth(d);
    let dates = this.getDay(d);
    return year + "-" + month + "-" + dates + " 00:00:00";
  },
  /**
   * 当周的最后一天
   * @param date {date|string}
   * @return {string}
   */
  lastDayOfWeek: function (date) {
    let week = 6 - this.getWeek(date);
    let d = this.minusDays(date, week);
    let year = this.getYear(d);
    let month = this.getMonth(d);
    let dates = this.getDay(d);
    return year + "-" + month + "-" + dates + " 23:59:59";
  },
  /**
   * 下个月的第一天
   * @param date {date|string}
   * @return {string}
   */
  firstDayOfNextMonth: function (date) {
    let year = this.getYear(date);
    let month = this.getMonth(date);
    month = month * 1 + 1;
    if (month > 12) {
      year = year + 1;
      month = month - 12;
    }
    month = month > 9 ? month : "0" + month;
    let dateString = year + "-" + month + "-01 00:00:00";
    return dateString;
  },

  /**
   * 获取两个时间间隔毫秒数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenMillSecond: function (date1, date2) {
    let stimes = this.getTime(this._transferDate(date1));
    let etimes = this.getTime(this._transferDate(date2));
    return etimes - stimes;
  },
  /**
   * 获取两个时间间隔秒数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenSecond: function (date1, date2) {
    return Math.floor(this.betweenMillSecond(date1, date2) / 1000);
  },
  /**
   * 获取两个时间间隔分钟数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenMinute: function (date1, date2) {
    return Math.floor(this.betweenMillSecond(date1, date2) / (1000 * 60));
  },
  /**
   * 获取两个时间间隔小时数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenHour: function (date1, date2) {
    return Math.floor(this.betweenMillSecond(date1, date2) / (1000 * 60 * 60));
  },
  /**
   * 获取两个时间间隔天数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenDay: function (date1, date2) {
    let d = {
      hour: 24,
      second: 60,
      mills: 3600,
      format: "YYYY-MM-dd",
      dateFormat: "YYYY-MM-dd HH:mm:ss",
    };
    let times = this.betweenSecond(date1, date2);
    let hour = d.hour;
    let mills = d.mills;
    return Math.ceil(times / (mills * hour));
  },
  /**
   * 获取两个时间间隔月数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenMonth: function (date1, date2) {
    let times = this.betweenDay(date1, date2);
    return Math.floor(times / 30);
  },
  /**
   * 获取两个时间间隔年数
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {number}
   */
  betweenYear: function (date1, date2) {
    let times = this.betweenDay(date1, date2);
    return Math.floor(times / 365);
  },

  /**
   * 在一个时间上加上多少毫秒
   * @param date {date|string}
   * @param millisSeconds {number}
   * @return {string}
   */
  plusMilliseconds: function (date, millisSeconds) {
    let dateTime = this.getTime(date);
    let mintimes = millisSeconds;
    let rdate = dateTime * 1 + mintimes * 1;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上多少秒
   * @param date {date|string}
   * @param seconds {number}
   * @return {string}
   */
  plusSeconds: function (date, seconds) {
    let dateTime = this.getTime(date);
    let mintimes = seconds * 1000;
    let rdate = dateTime * 1 + mintimes * 1;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上多少分钟
   * @param date {date|string}
   * @param minutes {number}
   * @return {string}
   */
  plusMinutes: function (date, minutes) {
    let dateTime = this.getTime(date);
    let mintimes = minutes * 60 * 1000;
    let rdate = dateTime * 1 + mintimes * 1;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上小时数
   * @param date {date|string}
   * @param hours {number}
   * @return {string}
   */
  plusHours: function (date, hours) {
    let dateTime = this.getTime(date);
    let mintimes = hours * 60 * 60 * 1000;
    let rdate = dateTime + mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上天数
   * @param date {date|string}
   * @param days {number}
   * @return {string}
   */
  plusDays: function (date, days) {
    let dateTime = this.getTime(date);
    let mintimes = days * 60 * 60 * 1000 * 24;
    let rdate = dateTime * 1 + mintimes * 1;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上多少个月,这里是按照一个月30天来计算天数的
   * @param date {date|string}
   * @param months {number}
   * @return {string}
   */
  plusMonths: function (date, months) {
    let dateTime = this.getTime(date);
    let mintimes = months * 30 * 60 * 60 * 1000 * 24;
    let rdate = dateTime + mintimes * 1;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上加上多少年,这里是按照一年365天来计算天数的，isLoop是否闰年
   * @param date {date|string}
   * @param years {number}
   * @param isLoop {boolean}
   * @return {string}
   */
  plusYears: function (date, years, isLoop) {
    let dateTime = this.getTime(date);
    let day = 365;
    if (isLoop) day = 366;
    let mintimes = years * day * 60 * 60 * 1000 * 24;
    let rdate = dateTime + mintimes;
    return this._format(new Date(rdate));
  },

  /**
   * 在一个时间上减去多少毫秒
   * @param date {date|string}
   * @param millisSeconds {number}
   * @return {string}
   */
  minusMilliseconds: function (date, millisSeconds) {
    let dateTime = this.getTime(date);
    let mintimes = millisSeconds * 1;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去多少秒
   * @param date {date|string}
   * @param seconds {number}
   * @return {string}
   */
  minusSeconds: function (date, seconds) {
    let dateTime = this.getTime(date);
    let mintimes = seconds * 1000;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去多少分钟
   * @param date {date|string}
   * @param minutes {number}
   * @return {string}
   */
  minusMinutes: function (date, minutes) {
    let dateTime = this.getTime(date);
    let mintimes = minutes * 60 * 1000;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去小时数
   * @param date {date|string}
   * @param hours {number}
   * @return {string}
   */
  minusHours: function (date, hours) {
    let dateTime = this.getTime(date);
    let mintimes = hours * 60 * 60 * 1000;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去天数
   * @param date {date|string}
   * @param days {number}
   * @return {string}
   */
  minusDays: function (date, days) {
    let dateTime = this.getTime(date);
    let mintimes = days * 60 * 60 * 1000 * 24;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去多少个月,这里是按照一个月30天来计算天数的
   * @param date {date|string}
   * @param months {number}
   * @return {string}
   */
  minusMonths: function (date, months) {
    let dateTime = this.getTime(date);
    let mintimes = months * 30 * 60 * 60 * 1000 * 24;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },
  /**
   * 在一个时间上减去多少年,这里是按照一年365天来计算天数的，isLoop是否闰年
   * @param date {date|string}
   * @param years {number}
   * @param isLoop {boolean}
   * @return {string}
   */
  minusYears: function (date, years, isLoop) {
    let dateTime = this.getTime(date);
    let day = 365;
    if (isLoop) day = 366;
    let mintimes = years * day * 60 * 60 * 1000 * 24;
    let rdate = dateTime - mintimes;
    return this._format(new Date(rdate));
  },

  /**
   * 判断两个时间是否一样
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {boolean}
   */
  isEq: function (date1, date2) {
    let stime = this.getTime(this._transferDate(date1));
    let etime = this.getTime(this._transferDate(date2));
    return stime === etime ? true : false;
  },
  /**
   * 判断date2是否晚于date1
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {boolean}
   */
  isAfter: function (date1, date2) {
    let stime = this.getTime(this._transferDate(date1));
    let etime = this.getTime(this._transferDate(date2));
    return stime < etime ? true : false;
  },
  /**
   * 判断date2是否早于date1
   * @param date1 {date|string}
   * @param date2 {date|string}
   * @return {boolean}
   */
  isBefore: function (date1, date2) {
    let stime = this.getTime(this._transferDate(date1));
    let etime = this.getTime(this._transferDate(date2));
    return stime > etime ? true : false;
  },

  /*转换时间*/
  _transferDate: function (date = new Date()) {
    if (typeof date === "string") {
      return new Date(date);
    } else if (!date) {
      return new Date();
    } else {
      return date;
    }
  },
  /*时间格式化*/
  _format: function (date) {
    return (
      this.getYear(date) +
      "-" +
      this.getMonth(date) +
      "-" +
      this.getDay(date) +
      " " +
      this.getHours(date) +
      ":" +
      this.getMinutes(date) +
      ":" +
      this.getSeconds(date)
    );
  },
};
