function throttle(fn, delay = 500) {
  let timer = null
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        clearTimeout(timer, delay)
      })
    }
  }
}