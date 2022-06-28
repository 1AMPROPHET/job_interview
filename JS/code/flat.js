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
  // if (depth < 1 || this.every(item => !Array.isArray(item))) return this 
  const res = Array.prototype.concat.apply([], this)
  return depth === Infinity ? res.myFlat(Infinity) : res.myFlat(depth - 1)
}