# interview

## js 精度问题

- 因为小数运算先将十进制转换为二进制数字，会出现一次精度丢失，而后计算后的二进制也会出现精度丢失，造成结果不准确

## 数组去重

- ES6 Set
- for 嵌套 for splice
- indexOf
- 先 sort 再遍历相邻元素
- includes

## js 数据类型

### 值类型和引用类型

- 值类型（基本类型）
  - string
  - number
  - boolean
  - undefined
  - null
  - Symbol
  - bigint

- 引用类型
  - Object
  - Array
  - Function

## js 整数怎么表示的

- 通过 Number 类型表示，最大数字为 Math.pow(2, 53) - 1

## Symbol 作用

- 表示一个独一无二的变量防止命名冲突
- symbol 不可枚举，可以用来模拟私有变量
- 提供遍历接口，symbol.iterator 的对象才能使用for of 循环
- symbol.for() 可以在全局访问symbol

## 事件与事件流

### 事件

- js 和 html 之间的交互是通过事件实现的，事件就是文档和浏览器窗口发生的一些特定的交互瞬间。可以使用监听器来预定事件，以便事件发生时执行相应的代码，通俗的说，这种模型其实就是一个观察者模式

### 事件流

- 事件流描述的是从页面接收事件的顺序
- DOM2级事件对应的事件流包括三个阶段
  - 事件捕获
  - 目标阶段
  - 事件冒泡

- addEventListener 绑定几次就执行几次，先捕获，后冒泡，第三个参数为 true，则表示事件在捕获阶段调用，第三个参数为 false，则表示事件在冒泡阶段调用。

## 作用域

- 作用域，即变量和函数生效的区域或集合，作用域决定了代码区块中变量和其他资源的可见性

## 作用域链

- 当在 Javascript 中使用一个变量的时候，首先 Javascript 引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错

## 箭头函数和普通函数的区别

- 普通函数this
  - 普通函数的this总是代表它的直接调用者
  - 没有找到调用者的情况下指向window
  - 严格模式下时undefined
  - 使用call、apply、bind绑定的，指的是绑定的对象

- 箭头函数this
  - 箭头函数会捕获其所在上下文的this，自己本身没有this
  - this无法改变
  - 箭头函数作为匿名函数不能作为构造函数，不能使用new
  - 箭头函数不绑定arguments，使用...c rest参数
  - 箭头函数没有显示原型对象

## new 一个函数是发生了什么

- 创建了一个新的对象 obj
- 将对象与构造函数通过原型链连接起来
- 将构造函数中的 this 绑定到新的实例对象上
- 根据构造函数返回类型做判断，如果是原始值则被忽略，如果时返回对象，需要正常处理

## 数组扁平化

```js
function flat(arr) {
  const isDeep = arr.some((item) => item instanceof Array)
  if (!isDeep) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  return flat(res)
}
```

## webpack作用

- 模块化打包工具
- 作用
  - 进行重新加载编译，将浏览器不认识的语法转换为浏览器认识的语法
  - 打包好的文件减少了io请求

## css 阻塞 js

- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行
