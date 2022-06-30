function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array)
  if (!isDeep) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  return flat(res)
}

function flat2(arr, depth=1) {
  if (depth < 1 || arr.every(item => !Array.isArray(item))) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  return depth === Infinity ? flat2(res, Infinity) : flat2(res, depth - 1)
}

Array.prototype.myFlat = function (depth = 1) {
  if (!Array.isArray(this)) return
  if (depth < 1 || !this.some(item => item instanceof Array)) return this 
  const res = Array.prototype.concat.apply([], this)
  return depth === Infinity ? res.myFlat(Infinity) : res.myFlat(depth - 1)
}

Array.prototype.reduceFlat = function (depth = 1) {
  if (!Array.isArray(this)) return
  if (depth === 0 || !this.some(item => item instanceof Array)) return this
  return this.reduce((pre, cur) => {
    if (depth === Infinity) {
      return [...pre, ...cur.reduceFlat(Infinity)]
    } else if (Array.isArray(cur)) {
      return [...pre, ...cur.reduceFlat(depth - 1)]
    } else {
      return [...pre, cur]
    }
  })
}