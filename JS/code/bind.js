// bind 有返回值

Function.prototype.customBind = function () {
  if (typeof this !== 'function') {
    return false
  }
  // 拆解参数
  const args = Array.prototype.slice.call(arguments)

  // 获取this
  const customThis = args.shift()

  const res = this

  return () => res.apply(customThis, args)
}

Function.prototype.myCall = function () {
  if (typeof this !== 'function') {
    return false
  }
  let args = [...arguments]
  let _this = args.shift(1)
  _this.fn = this
  let res = _this.fn(...args)
  delete _this.fn
  return res
}

const student = {
  name: 'wang',
  log() {
    console.log(this.name)
  }
}

function fn1 (a, b, c) {
  console.log('this', this)
  console.log(a, b, c)
  return 'this is fn1'
}

const fn2 = fn1.customBind({x: 100}, 10, 20, 30)
const res = fn2()
console.log(res)

const obj = {name: 'tom'}
student.log.myCall(obj, 10)
