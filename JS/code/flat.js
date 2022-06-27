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