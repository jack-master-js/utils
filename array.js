/**
 * @module array
 */
module.exports = {
  /**
   * 移除元素
   *
   * @param {array} arr - 数组
   * @param {*} ele - 要移除元素
   * @returns {array} 返回移除后的数组
   */
  remove: function (arr, ele) {
    let index = arr.indexOf(ele);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },
  /**
   * 排序
   *
   * @param {array} arr - 数组
   * @param {number} type - 默认：1 <1.正序 2.倒序 3.乱序>
   * @returns {array} 返回排序后的数组
   */
  sort: function (arr, type = 1) {
    return arr.sort((a, b) => {
      switch (type) {
        case 1:
          return a - b;
        case 2:
          return b - a;
        case 3:
          return Math.random() - 0.5;
        default:
          return arr;
      }
    })
  },
  /**
   * 去重
   *
   * @param {array} arr - 数组
   * @returns {array} 返回去重后的数组
   */
  unique: function (arr) {
    if (Array.hasOwnProperty('from')) {
      return Array.from(new Set(arr));
    } else {
      let n = {}, r = [];
      for (let i = 0; i < arr.length; i++) {
        if (!n[arr[i]]) {
          n[arr[i]] = true;
          r.push(arr[i]);
        }
      }
      return r;
    }
  },
  /**
   * 并集
   *
   * @param {array} arr1 - 数组
   * @param {array} arr2 - 数组
   * @returns {array} 返回两个数组的并集数组
   */
  union: function (arr1, arr2) {
    let newArr = arr1.concat(arr2);
    return this.unique(newArr);
  },
  /**
   * 交集
   *
   * @param {array} arr1 - 数组
   * @param {array} arr2 - 数组
   * @returns {array} 返回两个数组的交集数组
   */
  intersect: function (arr1, arr2) {
    let _this = this;
    arr1 = this.unique(arr1);
    return this.map(arr1, function (o) {
      return _this.contains(arr2, o) ? o : null;
    });
  },
  /**
   * 补集
   *
   * @param {array} arr1 - 数组
   * @param {array} arr2 - 数组
   * @returns {array} 返回两个数组的补集数组
   */
  complement: function (arr1, arr2) {
    return this.minus(this.union(arr1, arr2), this.intersect(arr1, arr2));
  },
  /**
   * 差集
   *
   * @param {array} arr1 - 数组
   * @param {array} arr2 - 数组
   * @returns {array} 返回两个数组的差集数组
   */
  minus: function (arr1, arr2) {
    arr1 = this.unique(arr1);
    return this.map(arr1, function (o) {
      return arr2.includes(o) ? null : o;
    });
  },
  /**
   * 最大值
   *
   * @param {array} arr - 数组
   * @returns {number} 返回数组中最大的元素
   */
  max: function (arr) {
    return Math.max.apply(null, arr);
  },
  /**
   * 最小值
   *
   * @param {array} arr - 数组
   * @returns {number} 返回数组中最小的元素
   */
  min: function (arr) {
    return Math.min.apply(null, arr);
  },
  /**
   * 求和
   *
   * @param {array} arr - 数组
   * @returns {number} 返回数组元素加起来的总和
   */
  sum: function (arr) {
    return arr.reduce((pre, cur) => {
      return pre + cur
    })
  },
  /**
   * 平均值
   *
   * @param {array} arr - 数组
   * @returns {number} 返回数组中所有元素的平均数
   */
  average: function (arr) {
    return this.sum(arr) / arr.length
  },
  /**
   * 判断数组是否有重复的项
   *
   * @param {array} arr - 数组
   * @returns {boolean} 判断数组中是否有存在重复项
   */
  isRepeat: function (arr) {
    let hash = {};
    for (let i in arr) {
      if (hash[arr[i]]) return true;
      hash[arr[i]] = true;
    }
    return false;
  },
  /**
   * 随机返回数组中一个元素
   *
   * @param {array} arr - 数组
   * @returns {*} 随机返回一个元素
   */
  getItemByRandom: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  /**
   * 通过元素获取下标
   *
   * @param {array} arr - 数组
   * @param {*} item - 元素
   * @returns {number} 返回指定元素的下标
   */
  getIndexByItem: function (arr, item) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  /**
   * 通过下标获取元素
   *
   * @param {array} arr - 数组
   * @param {number} index - 下标
   * @returns {*} 返回指定下标的元素
   */
  getItemByIndex: function (arr, index) {
    return arr[index]
  },
  /**
   * 通过下标设置元素
   *
   * @param {array} arr - 数组
   * @param {number} index - 下标
   * @param {*} item - 替换元素
   * @returns {array} 返回更新后的数组
   */
  setItemByIndex: function (arr, index, item) {
    arr[index] = item
    return arr
  },
  /**
   * 删除指定元素
   *
   * @param {array} arr - 数组
   * @param {*} item - 元素
   * @returns {array} 返回删除后的数组
   */
  removeByItem: function (arr, item) {
    let uniqueArr = this.unique(arr)
    let index = this.getIndexByItem(uniqueArr, item);
    if (index > -1) {
      uniqueArr.splice(index, 1);
    }
    return uniqueArr;
  },
  /**
   * 通过下标删除元素
   *
   * @param {array} arr - 数组
   * @param {number} index - 下标
   * @returns {array} 返回删除后的数组
   */
  removeByIndex: function (arr, index) {
    arr.splice(index, 1)
    return arr
  },
    /**
   * 打乱数组
   * @param {array} arr - 数组
   */
  shuffle: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let randIndex = this.random(arr.length - 1)
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]]
  }
  return arr
  },
}
