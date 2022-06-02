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
  let result = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 保证key不是原型的属性
      //递归
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

//JSON 实现深拷贝
function DeepClone2 (obj) {
  let _obj = JSON.stringify(obj)
  let objClone = JSON.parse(_obj)
  return objClone
  // 存在一些问题
  // 1.无法实现对对象中方法的深拷贝，无法拷贝undefined
  // 2.如果对象中有时间对象，则JSON.stringify后再 parse的结果，时间将只是字符串形式，而不是对象形式
  // 3.对象中有正则、Error对象、则序列化的结果将只能得到空对象
  // 4.对象中有NaN、Infinity，序列化后会变成null
  // 5.JSON。stringify 只能序列化对象的可枚举的自有属性，如果对象中的对象是由构造函数生成的，会丢弃constructor
}

// jQuery 中的extend方法

let arr = [1,2,3,4]
let newArr = $.extend(true, [], arr)
