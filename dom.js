/**
 * @module dom
 */

let scrollTop = 0;
module.exports = {
  /**
   * 检测两个物体是否相撞
   *
   * @param {dom} target1 - 目标
   * @param {dom} target2 - 目标
   * @param {function} callback
   * @return {function} 尾调函数
   */
  hit: function (target1, target2, callback) {
    /*检测碰撞元素上下左右的位置*/
    let target1Top = target1.offsetTop,
      target1Foot = target1.offsetTop + target1.offsetHeight,
      target1Left = target1.offsetLeft,
      target1Right = target1.offsetLeft + target1.offsetWidth;
    /*被碰撞元素的上下左右的位置*/
    let target2Top = target2.offsetTop,
      target2Foot = target2.offsetTop + target2.offsetHeight,
      target2Left = target2.offsetLeft,
      target2Right = target2.offsetLeft + target2.offsetWidth;
    if (
      target1Foot > target2Top &&
      target1Right > target2Left &&
      target1Top < target2Foot &&
      target1Left < target2Right
    )
      callback();
  },
  /**
   * 弹框出现时，需要禁止页面滚动
   */
  preventScroll: function () {
    scrollTop = window.scrollY;
    // 将可滚动区域固定定位，可滚动区域高度为 0 后就不能滚动了
    document.body.style["overflow-y"] = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = -scrollTop + "px";
  },
  /**
   * 恢复滚动位置
   */
  recoverScroll: function () {
    document.body.style["overflow-y"] = "auto";
    document.body.style.position = "static";
    window.scrollTo(0, scrollTop);
  },
  /**
   * 是否为页面底部
   */
  isBottom: function () {
    return (
      document.documentElement.clientHeight + window.scrollY >=
      (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight)
    );
  },
  /**
   * 元素是否在可视范围内
   */
  isVisibleInViewport: function (el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  },
  /**
   * 进入全屏
   */
  launchFullScreen: function (element) {
    if (!element) element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  },
  /**
   * 退出全屏
   */
  exitFullScreen: function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  },
};
