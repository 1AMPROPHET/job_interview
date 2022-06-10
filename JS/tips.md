# tips

* let const 也会变量提升，只是和var不同，不会被初始化，在声明前不能访问，被称为暂时性死区，试图访问时会抛出referenceError
* 通过# 给class 添加私有变量
* Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象，它仅 对对象进行 _浅 冻结，意味着只有 对象中的 直接 属性被冻结。如果属性是另一个 object，像案例中的 address，address 中的属性没有被冻结，仍然可以被修改。
* Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
* 一般情况下当我们将对象赋值为 null, 那些对象会被进行 垃圾回收（garbage collected） 因为已经没有对这些对象的引用了。然而，setInterval的参数是一个箭头函数（所以上下文绑定到对象 config 了），回调函数仍然保留着对 config的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，setInterval 的回调每1000ms (1s)会被调用一次。

* JSON.parse() ：parses JSON to a javascipt value
* 对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须在圆括号之间编写它，否则不会返回任何值!
* Symbol类型是不可枚举的。Object.keys方法返回对象上的所有可枚举的键属性。Symbol类型是不可见的，并返回一个空数组。 记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。 这是Symbol的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用2个想要向同一对象添加属性的库时），您还可以隐藏这种方式对象的属性（尽管不完全。你仍然可以使用Object.getOwnPropertySymbols()方法访问 Symbol。
* 常规函数，例如giveLydiaPizza函数，有一个prototype属性，它是一个带有constructor属性的对象（原型对象）。 然而，箭头函数，例如giveLydiaChocolate函数，没有这个prototype属性。 尝试使用giveLydiaChocolate.prototype访问prototype属性时会返回undefined。
* .push方法返回数组的长度，而不是数组本身！
* padStart() 方法用另一个字符串填充当前字符串 (如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。
* targetLength
当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
padString 可选
填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "（U+0020）。
* import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。 这是CommonJS中require（）和import之间的区别。使用require()，您可以在运行代码时根据需要加载依赖项。 如果我们使用require而不是import，running index.js，running sum.js，3会被依次打印。
* 一元操作符 ++ 先返回 操作值, 再累加 操作值。
* 通过defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys方法仅返回对象中 可枚举(enumerable) 的属性
* delete操作符返回一个布尔值： true指删除成功，否则返回false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。全局对象可以删除
* parseInt 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符
* string 类型是可迭代的。扩展运算符将迭代的每个字符映射成一个元素。
* 所有对象的键（不包括 Symbol）在底层都是字符串，即使你自己没有将其作为字符串输入。
* 在测试相等性时，基本类型通过它们的值（value）进行比较，而对象通过它们的引用（reference）进行比较。JavaScript 检查对象是否具有对内存中相同位置的引用。

## js

* 在Javascript中，多次 bind() 是无效的。

* （1）AJAX
  * Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML）， 是指一种创建交互式网页应用的网页开发技术。它是一种在无需重新加载整个网页的情况 下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网 页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更 新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如 下：

    * 本身是针对MVC编程，不符合前端MVVM的浪潮
    * 基于原生XHR开发，XHR本身的架构不清晰
    * 不符合关注分离（Separation of Concerns）的原则配置和调用方式非常混乱，而且基于事件的异步模型不友好。
* （2）Fetch
  * fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多。fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。

  * fetch的优点：

    * 语法简洁，更加语义化
    * 基于标准 Promise 实现，支持 async/await
    * 更加底层，提供的API丰富（request, response）
    * 脱离了XHR，是ES规范里新的实现方式
  * fetch的缺点：

    * fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
    * fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
    * fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
    * fetch没有办法原生监测请求的进度，而XHR可以
* （3）Axios
  * Axios 是一种基于Promise封装的HTTP客户端，其特点如下：

    * 浏览器端发起XMLHttpRequests请求
    * node端发起http请求
    * 支持Promise API
    * 监听请求和返回
    * 对请求和返回进行转化
    * 取消请求
    * 自动转换json数据
    * 客户端支持抵御XSRF攻击