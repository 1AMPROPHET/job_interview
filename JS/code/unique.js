function setUnique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  let res = []
  arr.forEach(num => {
    if (res.indexOf(num) < 0) {
      res.push(num)
    }
  })
  return res
}