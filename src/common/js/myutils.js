/*
* @Author: bxm09
* @Date:   2017-08-01 10:45:26
* @Last Modified by:   bxm09
* @Last Modified time: 2017-08-09 16:57:07
*
* import { myDOM } from '@/common/js/myutils.js'
* 使用本对象中的方法时，使用 this。this.hasClass(el, className)
* 使用本库其他对象中的方法时，直接调用。myNumber.getRandom(0, i)
*/

export const myDOM = {
  /**
   * 判断是否有该 class
   */
  hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },

  /**
   * 添加 class
   */
  addClass (el, className) {
    if (this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },

  /**
   * 获取/设置 自定义属性 data-${name}=val
   * 如果传入了 val 就设置自定义属性 `data-${name}` 的值为 val
   * 如果没有传入了 val 就获取自定义属性 `data-${name}` 的值
   */
  customAttribute (el, name, val) {
    if (val) {
      return el.setAttribute(`data-${name}`, val)
    } else {
      return el.getAttribute(`data-${name}`)
    }
  },

  /**
   * 去抖（节流）
   * 有一些浏览器事件可以很快地在短时间内多次触发，
   * 例如调整窗口大小、向下滚动页面、搜索框节流等。
   * 如果你将事件监听器绑定到窗口滚动事件，并且用户不断快速地向下滚动页面，
   * 则你的事件可能在1秒内触发数千次。这可能会导致一些严重的性能问题。
   * 解决这个问题的一种方法是去抖，通过限制再次调用函数之前必须经过的时间。
   * 因此，去抖的正确实现是将几个函数调用组合成一个，并且在经过一段时间后仅执行一次。
   *
   * document.addEventListener('scroll', debounce(function () {
   *   console.log('hello');
   * }, 1000));
   *
   * @param  {Function} fn    要节流的函数
   * @param  {number}   delay 延迟毫秒数
   */
  debounce (fn, delay) {
    let timer = null

    return function(...args) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

export const myTime = {
  /**
   * 格式化时间戳(分:秒)
   * 61 -> 01:01
   */
  format(timestamp) {
    timestamp = Math.floor(timestamp)

    let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0')
    let second = (timestamp % 60).toString().padStart(2, '0')
    return `${minute}:${second}`
  }
}

export const myNumber = {
  /**
   * 返回一个 [min, max] 之间的随机整数
   * @param  {number} min 下界
   * @param  {number} max 上界
   */
  getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

export const myArray = {
  /**
   * 克隆数组
   * @param  {array} arr 原数组
   * @return {array}     新数组
   */
  cloneArr (arr) {
    // 从第一个字符就开始 copy
    // slice(start,end) 方法可从已有的数组中返回选定的元素。
    return arr.slice(0)
  },

  /**
   * 洗牌函数
   * @param  {Array} arr 原数组
   * @param  {boolean} flag 是否改变原数组，默认不改变
   * @return {Array}     新数组
   */
  shuffle (arr, flag = false) {
    let newArr = []
    flag ? (newArr = arr) : (newArr = this.cloneArr(arr))

    for (let i = 0; i < newArr.length; i++) {
      let j = myNumber.getRandom(0, i)
      let temp = newArr[i]
      newArr[i] = newArr[j]
      newArr[j] = temp
    }
    return newArr
  },

  /**
   * 随机获取数组成员
   * @param  {array} arr 传入数组
   * @return {[type]}    一个随机成员
   */
  randomMember (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}

export const myString = {}

export const myStore = {
  // https://github.com/ustbhuangyi/storage
  // https://github.com/jaywcjlove/store.js
}

export const myHTTP = {}

export const myOthers = {}
