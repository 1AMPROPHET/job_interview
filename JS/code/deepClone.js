const obj1 = {
  age: 20,
  name: 'wang',
  address: {
    city: 'beijing'
  },
  arr: [1, 2, 3, 4]
}

const obj2 = obj1
const obj3 = deepClone(obj1)

obj1.address.city = 'shanghai'
console.log(obj2.address.city) //被修改了
console.log(obj3.address.city) //未被修改


// 深拷贝

function deepClone(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }

  // 初始化返回值
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 保证key不是原型的属性
      //递归
      result[key] = deepClone(obj[key])
    }
  }
  return result
}