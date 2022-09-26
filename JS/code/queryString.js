class QueryString {

  static parse = (query) => {
    let list = query.split('&')
    let obj = {}
    list.forEach((item, index) => {
      let [key, value] = item.split('=')
      if (!obj[key]) {
        obj[key] = value
      } else {
        obj[key] = [...obj[key], value]
      }
    })
    return obj
  }

  static stringify = (obj) => {
    let query = []
    for (let key in obj) {
      let str = key
      for (let item of obj[key]) {
        query.push(`${key}=${item}`) 
      }
    }
    return query.join('&')
  }
}

function queryString() {}

queryString.parse = (query) => {
  let list = query.split('&')
  let obj = {}
  list.forEach((item, index) => {
    let [key, value] = item.split('=')
    if (!obj[key]) {
      obj[key] = value
    } else {
      obj[key] = [...obj[key], value]
    }
  })
  return obj
}
queryString.stringify = (obj) => {
  let query = []
  for (let key in obj) {
    let str = key
    for (let item of obj[key]) {
      query.push(`${key}=${item}`)
    }
  }
  return query.join('&')
}