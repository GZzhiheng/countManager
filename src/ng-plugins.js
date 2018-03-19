/**
 * 全局方法插件
 * @type {{}}
 */
const NgPlugins = {}
NgPlugins.install = function (Vue, options) {
  // 全局静态方法，通过Vue去调用的
  Vue.test = function () {
    console.log('Welcome to Vue world!')
  }

  // 将二维数组排序（实例方法）
  Vue.prototype.$ArrayOrder = function (arr, field, order) {
    if (arr.length <= 0) return
    if (!field) return arr
    if (!order) return arr
    if (arr.length <= 0) return arr
    // 升序
    if (order === 'a') {
      // 数字类型
      if (/^\d+\.?\d{0,}?$/.test(arr[0][field])) {
        arr.sort(function (x, y) {
          return x[field] - y[field]
        })
      } else {
        arr.sort(function (x, y) {
          if (x[field] !== null && y[field] !== null && x[field] !== undefined && y[field] !== undefined) {
            return x[field].localeCompare(y[field])
          }
        })
      }
    }
    // 降序
    if (order === 'd') {
      // 数字类型
      if (/^\d+\.?\d{0,}?$/.test(arr[0][field])) {
        arr.sort(function (x, y) {
          return y[field] - x[field]
        })
      } else {
        arr.sort(function (x, y) {
          if (x[field] !== null && y[field] !== null && x[field] !== undefined && y[field] !== undefined) {
            return y[field].localeCompare(x[field])
          }
        })
      }
    }
  }

  // 数组去重
  Vue.unique = function (arr) {
    var result = []
    var isRepeated
    for (var i = 0; i < arr.length; i++) {
      isRepeated = false
      for (var j = 0; j < result.length; j++) {
        if (arr[i] === result[j]) {
          isRepeated = true
          break
        }
      }
      if (!isRepeated) {
        result.push(arr[i])
      }
    }
    return result
  }

  // table排序
  Vue.sortMethod = function (argus, prop, order) { // argus当前排序列的状态对象, prop存储目前排序的列字符串，orderArr存储所有排序的列数组
    var bool = true
    if (prop === argus.prop && bool === true) {
      if (argus.order === 'ascending') {
        argus.order = 'descending'
        order[argus.index] = 'descending'
        bool = false
      }
      if (argus.order === 'descending' && bool === true) {
        argus.order = ''
        order[argus.index] = ''
        bool = false
      }
      if (argus.order === '' && bool === true) {
        argus.order = 'ascending'
        order[argus.index] = 'ascending'
        bool = false
      }
    } else {
      for (let i = 0; i < order.length; i++) {
        order[i] = ''
      }
      prop = argus.prop
      order[argus.index] = 'ascending'
      argus.order = 'ascending'
    }
    return {argus: argus, prop: prop, order: order}
  }

  // 四舍五入
  Vue.toFixed = function (number, count) {
    number = parseFloat(number)
    if (isNaN(number)) {
      return number
    }
    if (number === 0) {
      return number
    }
    return number.toFixed(count)
  }

  // 四舍五入
  Vue.prototype.$toFixedVue = function (number, count) {
    number = parseFloat(number)
    if (isNaN(number)) {
      return number
    }
    if (number === 0) {
      return number
    }
    return number.toFixed(count)
  }

  // RMB 格式化（实例方法）
  Vue.toFixedInit = Vue.prototype.$toFixed = function (number) {
    number = parseFloat(number)
    if (isNaN(number)) {
      return number
    }
    if (number === 0) {
      return number
    }
    number = (Math.round((number - 0) * 100)) / 100
    number = (number === Math.floor(number)) ? number + '.00' : ((number * 10 === Math.floor(number * 10)) ? number + '0' : number)
    number = String(number)
    var ps = number.split('.')
    var whole = ps[0]
    var sub = ps[1] ? '.' + ps[1] : '.00'
    var r = /(\d+)(\d{3})/
    while (r.test(whole)) {
      whole = whole.replace(r, '$1' + ',' + '$2')
    }
    number = whole + sub
    return number
  }

  // 百分比转换
  Vue.prototype.$changePercent = function (number, count, Symbol) {
    if (!Symbol) {
      Symbol = '%'
    }
    number = parseFloat(number)
    if (isNaN(number)) {
      return number
    }
    if (number === 0) {
      return number + Symbol
    }
    if (!count) {
      count = 2
    }
    if (count === 'init') {
      return number.toFixed(2) + Symbol
    }
    number = (number * 100).toFixed(count)
    return number + Symbol
  }

  // 去掉尾数
  Vue.prototype.$parseInt = function (number, count) {
    if (isNaN(number)) {
      return number
    }
    if (number === 0) {
      return number
    }
    return parseInt(number)
  }
}

export default NgPlugins
