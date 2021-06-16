# `utils`

- check

  - isBrowser() `检查是什么浏览器`
  - isMobile() `判断是否为移动设备`
  - isString(o)
  - isNumber(o)
  - isBoolean(o)
  - isFunction(o)
  - isNull(o)
  - isUndefined(o)
  - isObj(o)
  - isArray(o)
  - isDate(o)
  - isError(o)
  - isSymbol(o)
  - isPromise(o)
  - isSet(o)
  - isEmpty(o) `是否为空对象`
  - isFalse(o)
  - isInt(num)
  - isPhone(num)
  - isTel(num)
  - isUsername(str)
  - isPassword(str)
  - isPostal(str)
  - isQQ(str)
  - isEmail(str)
  - isMoney(str)
  - isURL(str)
  - isIP(str)
  - isEnglish(str)
  - isChinese(str)
  - isIdCard(str)
  - isBankCard(str)
  - isChineseIdCard(str)
  - isLower(str)
  - isUpper(str)
  - isHTML(str)
  - isSpace(str)

- number

  - plus(x, y) ` 加法` see [bignumber.js](https://www.npmjs.com/package/bignumber.js)
  - minus(x, y) `减法`
  - multiply(x, y) `乘法`
  - divide(x, y) `除法`
  - random(min, max) `随机数`
  - randomGoods(goods, odds) `抽奖概率`
  - randomCode(len = 4) `随机数字验证码`
  - format(num， format) `格式化` see [numeral](https://www.npmjs.com/package/numeral)
  - formatSmallChinese(num) `将数字转换成对应的中文小写`
  - formatMoney(num) `数字金钱表示`
  - formatBigMoney(num) `中文大写金钱表示`
  - numberUnit(num) `数字单位`
  - isBetween(num, min, max) `区间判断`

- string

  - parseQuery(str, option = {}) `参数解析` see [query-string](https://www.npmjs.com/package/query-string)
  - stringifyQuery(obj, option = {}) `参数对象字符化`
  - parseUrl(str, option = {}) `URL解析`
  - stringifyUrl(obj, option = {}) `URL对象字符化`
  - genId(len = 7) `根据时间戳生成随机id`
  - randomCode(len) `获取随机数字与字符组合`
  - encryptByNum(str, k) `编码英文字符`
  - decryptByNum(str, n) `解码英文字符`
  - checkPwd(str) `检测密码强度`
  - remove(str, regExp) `移除字符`
  - ellipsis(str, len) `省略号`
  - filterTag(str) `过滤html代码(把<>转换)`
  - filterScript(str) `过滤<script></script>转换`
  - getRandomColor() `获取十六进制随机颜色`
  - domToString(htmlDOM) `DOM转字符串`
  - stringToDom(htmlString) `字符串转DOM`

- crypto

  - md5(str) `计算hash` see [crypto-js](https://www.npmjs.com/package/crypto-js)
  - encrypt(strBuf, key) `加密`
  - decrypt(encrypted, key) `解密`

- object

  - deepClone(obj) `深拷贝`

- array

  - remove(arr, ele) `移除元素`
  - sort(arr, type = 1) `排序`
  - unique(arr) `去重`
  - union(arr1, arr2) `并集`
  - intersect(arr1, arr2) `交集`
  - complement(arr1, arr2) `补集`
  - minus(arr1, arr2) `差集`
  - max(arr) `最大值`
  - min(arr) `最小值`
  - sum(arr) `求和`
  - average(arr) `平均值`
  - isRepeat(arr) `判断数组是否有重复的项`
  - getItemByRandom(arr) `随机获取元素`
  - getIndexByItem(arr, item) `通过元素获取下标`
  - getItemByIndex(arr, index, item) `通过下标获取元素`
  - setItemByIndex(arr, index, item) `通过下标设置元素`
  - removeByItem(arr, item) `移除元素`
  - removeByIndex(arr, index) `通过下标移除元素`
  - shuffle(arr) `打乱`

- date

  - format(date, pattern = "YYYY-MM-DD hh:mm:ss") `日期格式化 默认如：YYYY-MM-DD hh:mm:ss`
  - countTime(date, pattern) `计算时间的year,month,day,hour,minute,seconds,week,daytime,when 如：早晨，25秒以前等等`
  - getHMS(num) `根据秒数返回时分秒格式 如：getHMS(3610) -> 1小时0分10秒`
  - getTime(date) `当天当前时间距离1970年1月1日的毫秒数`
  - getMilliseconds(date) `当天当前时间的毫秒数`
  - getSeconds(date) `当天当前时间的秒数`
  - getMinutes(date) `当天当前时间的分钟数`
  - getHours(date) `当天几点`
  - getHours12(date) `当天几点（12小时制时）`
  - getDay(date) `当月多少号`
  - getWeek(date) `当月星期几`
  - getMonth(date) `当年几月`
  - getPeriod(date) `当年第几季度`
  - getYear(date) `获取年份`
  - daysOfYear(date) `当年有多少天`
  - daysOfMonth(date) `当月有多少天`
  - dayOfYear(date) `当年中的第几天`
  - dayOfMonth(date) `当月中的第几天`
  - weekOfYear(date) `当年的第几周`
  - weekOfMonth(date) `当月中的星期几`
  - firstDayOfYear(date) `当年的第一天`
  - lastDayOfYear(date) `当年的最后一天`
  - firstDayOfMonth(date) `当月的第一天`
  - lastDayOfMonth(date) `当月最后一天`
  - firstTimeOfDay(date) `当天的开始时间`
  - lastTimeOfDay(date) `当天的结束时间`
  - firstDayOfWeek(date) `当周的第一天`
  - lastDayOfWeek(date) `当周的最后一天`
  - firstDayOfNextMonth(date) `下个月的第一天`
  - betweenMillSecond(date1, date2) `获取两个时间间隔毫秒数`
  - betweenSecond(date1, date2) `获取两个时间间隔秒数`
  - betweenMinute(date1, date2) `获取两个时间间隔分钟数`
  - betweenHour(date1, date2) `获取两个时间间隔小时数`
  - betweenDay(date1, date2) `获取两个时间间隔天数`
  - betweenMonth(date1, date2) `获取两个时间间隔月数`
  - betweenYear(date1, date2) `获取两个时间间隔年数`
  - plusMilliseconds(date, millisecond) `在一个时间上加上多少毫秒`
  - plusSeconds(date, seconds) `在一个时间上加上多少秒`
  - plusMinutes(date, minutes) `在一个时间上加上多少分钟`
  - plusHours(date, hours) `在一个时间上加上小时数`
  - plusDays(date, days) `在一个时间上加上天数`
  - plusMonths(date, months) `在一个时间上加上多少个月,这里是按照一个月30天来计算天数的`
  - plusYears(date, years, isLoop) `在一个时间上加上多少年,这里是按照一年365天来计算天数的，isLoop是否闰年`
  - minusMilliseconds(date, millisecond) `在一个时间上减去多少毫秒`
  - minusSeconds(date, seconds) `在一个时间上减去多少秒`
  - minusMinutes(date, minutes) `在一个时间上减去多少分钟`
  - minusHours(date, hours) `在一个时间上减去小时数`
  - minusDays(date, days) `在一个时间上减去天数`
  - minusMonths(date, months) `在一个时间上减去多少个月,这里是按照一个月30天来计算天数的`
  - minusYears(date, years, isLoop) `在一个时间上减去多少年,这里是按照一年365天来计算天数的，isLoop是否闰年`
  - isEq(date1, date2) `判断两个时间是否一样`
  - isAfter(date1, date2) `判断date2是否晚于date1`
  - isBefore(date1, date2) `判断date2是否早于date1`

- timer

  - sleep(ms) `等待一会儿async`
  - countDown(seconds, callback) `倒计时`
  - getMs(num, pattern) `计算毫秒数，pattern: day,hour,minute,second`
  - formatMs(ms, pattern) `毫秒数格式化`
  - debounce(action,idle) `空闲控制`
  - throttle(action,delay) `频率控制`
  - frequency(duration, interval, callback) `随机间歇执行`

- file

  - formatSize(num) `格式文件大小单位`
  - getExt(fileName) `获取文件的后缀名`
  - getName(fileName) `获取文件名称`
  - getFileName(path) `根据路径获取文件全名`
  - isImageFile(fileName) `gif|jpg|jpeg|png|GIF|JPG|PNG`
  - isVideoFile(fileName) `mp4|mp3|flv|wav`
  - isDocumentFile(fileName) `doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|htm|shtml|xml`
  - isOfficeFile(fileName) `doc|docx|xls|xlsx|pdf|txt|ppt|pptx`
  - writeExcel(data,filename) `导出excel` see [xlsx](https://www.npmjs.com/package/xlsx)
  - readExcel(file) `读取excel`

- net

  - getWsClientIp(request) `获取ws IP`
  - getQueryStr(url) `去除?请求参数字符串`
  - getBreadcrumbs(route) `获取path数组`
  - getParam(name) `获取url参数`
  - getParams(url) `获取所有url参数`
  - ajax(setting) `http请求`
  - fetch(url, setting) `fetch请求`

- dom

  - hit(target1, target2, callback) `检测两个物体是否相撞`
  - preventScroll() `弹框出现时，需要禁止页面滚动`
  - recoverScroll() `恢复滚动位置`
  - isBottom() `是否为页面底部`
  - isVisibleInViewport(el, partiallyVisible = false) `元素是否在可视范围内`
  - launchFullScreen(element) `进入全屏`
  - exitFullScreen() `退出全屏`

- bom

  - cookie `dependency js-cookie` see [js-cookie](https://www.npmjs.com/package/js-cookie)
    - parse(cookieStr) `转换字符串cookie`
    - getFromString(cookieStr,name) `从headrs中获取cookie值`
    - getJSON(key)
    - get(key)
    - set(key,val,options)
    - remove(key)
  - store `dependency store` see [store](https://www.npmjs.com/package/store)
  - localStorage
    - set(key, val)
    - get(key)
    - remove(key)
    - clear()
  - sessionStorage
    - set(key, val)
    - get(key)
    - remove(key)
    - clear()
