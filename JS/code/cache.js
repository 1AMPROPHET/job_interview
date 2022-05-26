// 缓存工具
// 闭包隐藏数据，只提供api

function createCache() {
  const data = {}
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    }
  }
}

// data被隐藏，私有作用域

const c = createCache()
c.set('a', 100)
console.log(c.get('a'))

function debounce (fn, time) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, time)
  }
}

function throttle(fn, time) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, time)
    }
  }
}