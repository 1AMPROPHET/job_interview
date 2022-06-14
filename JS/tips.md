# tips

* let const 也会变量提升，只是和var不同，不会被初始化，在声明前不能访问，被称为暂时性死区，试图访问时会抛出referenceError
* 通过# 给class 添加私有变量
* Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象，它仅 对对象进行 _浅 冻结，意味着只有 对象中的 直接 属性被冻结。如果属性是另一个 object，像案例中的 address，address 中的属性没有被冻结，仍然可以被修改。
* Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
* 一般情况下当我们将对象赋值为 null, 那些对象会被进行 垃圾回收（garbage collected） 因为已经没有对这些对象的引用了。然而，setInterval的参数是一个箭头函数（所以上下文绑定到对象 config 了），回调函数仍然保留着对 config的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，setInterval 的回调每1000ms (1s)会被调用一次。

* JSON.parse() ：parses JSON to a javascipt value
* 对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须在圆括号之间编写它，否则不会返回任何值!

  ```js
  const arrowFunc = () => ({a: 'xxx'})
  ```

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

* cookie 的有效时间设置为0，表示跟随系统默认，其销毁时间与session 销毁时间相同，即都在浏览器关闭后的特定事件删除。如果不设置有效时间，那么，cookie的有效时间等效于会话时间。

* e.target、e.currentTarget
  * e.target：触发事件的元素
  * e.currentTarget：绑定事件的元素
  * addEventListener绑定几次就执行几次先捕获，后冒泡，第三个参数为true，则表示事件在捕获阶段调用，第三个参数为false，则表示事件在冒泡阶段调用。

* 数组的常见方法
  * 操作方法（增删改查）
    * 增： push、unshift、splice、concat
    * 删： pop、shift、splice、slice
    * 改： splice、
    * 查： indexOf、includes、find
  * 排序方法
    * reverse
    * sort
  * 转换方法
    * join
  * 迭代方法
    * 不改变原数组的常用方法
      * some
      * every
      * forEach（不改变原数组、但是callback调用时可能会改变数组）
      * filter
      * map
* 区分数组和对象
  * Array.isArray
  * instanceof
  * constructor
  * Object.prototype.toString.call

* 获取实例对象的原型对象
  * Object.getPrototypeOf(实例对象)

* ES6新特性
  * let const 块级作用域
  * 对象解构赋值
  * 模板字符串
  * 字符串扩展方法（includes、startsWith、endsWith）
  * 参数默认值、剩余参数
  * ...展开运算符
  * 箭头函数
  * Object.assign 复制合并对象
  * Proxy
  * Reflect
  * Promise
  * class 继承
  * Set
  * Map
  * Symbol
  * for of
  * 迭代器
  * Generator 生成器
  * includes 函数
  * `**` 指数运算
  * values 将对象的值以数组形式返回

* 跨域的方法
  * CORS
  * Nginx代理
  * WebSocket
  * postMessage
  * JSONP

* async 函数 中 await 的 new Promise 如果没有返回值则不执行后面的内容
* then 函数中的参数期待的是函数，如果不是函数会发生透传

* 使用js生成1-10000的数组
  * 除了使用循环外，最简单是使用Array.from

    ```js
    // 1 
    Array.from(new Array(10001).keys()).slice(1)

    // 2
    Array.from({length: 10000}, (node, i) => i + 1)
    ```

* 直接在script标签中写export会报错
  * 现代浏览器可支持script标签引入模块或脚本，如果要引入模块，必须给script标签添加type=“module”。如果引入脚本，则不需要type

* js 与 CSS 动画
  * CSS3动画优点
    * 在性能上会好一些，浏览器会对CSS3的动画做一些优化
    * 代码相对简单
  * 缺点
    * 在动画控制上不够灵活
    * 兼容性不好
  * js 弥补了两个缺点，复杂动画靠js，简单靠CSS3

* 移动端点击事件的300ms延迟
  * 是因为移动端有双击缩放这个功能，在click后浏览器等待300ms，看看有没有下一次点击事件。
  * 三种方法解决
    * 用meta标签禁用页面缩放
    * 通过meta标签将网页的viewport设置为ideal viewport
    * 调用一些js库，例如fastclick

* JS中的错误类型
  * Error
  * EvalError
  * RangeError
  * ReferenceError
  * SyntaxError
  * TypeError
  * URIError

* for in 与 for of
  * for of 获取对象的键值，for in 获取对象的键名
  * for in 会遍历整个原型链，for of 不会遍历原型链
  * 对于数组的遍历，for in 会返回所有可枚举的属性，包括原型链上的属性，for of 只返回数组下标对应的属性值
  * for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

* isNaN 和 Number.isNaN 区别
  * 和全局函数 isNaN() 相比，Number.isNaN() 不会自行将参数转换成数字，只有在参数是值为 NaN 的数字时，才会返回 true。

  * Number.isNaN() 方法确定传递的值是否为NaN，并且检查其类型是否为Number。它是原来的全局isNaN() 的更稳妥的版本。

* Object.defineProperty 与 Proxy 的区别
  * 使用Object.defineProperty 会产生三个问题
    * 不能监听数组的变化，在Vue2中解决数组监听的方法是将原数组方法进行重写
    * 必须遍历对象的每个属性，可以通过Object.keys来实现
    * 必须深层遍历嵌套的对象
  * Proxy
    * 针对整个对象，解决了需要对对象进行深度递归
    * 解决了无法劫持数组的问题
    * 比Object.defineProperty 有更多的拦截方法，对比一些新的浏览器，可能会有对Proxy 针对性的优化，有助于性能提升。

* ES6中的Reflect 对象有什么用
  * 将Object对象的一些明显属于语言内部的方法，放到Reflect对象上
  * 修改某些Object方法的返回结果
  * 让Object操作都变成函数行为
  * Reflect对象方法与Proxy方法一一对应

  ```js
  let loggedObj = new Proxy(obj, {
    get(target, name) {
      console.log('get', target, name)
      return Reflect.get(target, name)
    },
    deleteProperty(target, name) {
      console.log('delete' + name)
      return Reflect.deleteProperty(target, name)
    },
    has(target, name) {
      console.log('has' + name)
      return Reflect.has(target, name)
    }
  })
  ```

* Iterator 规范
  * Iterator迭代器包含一个next()方法，方法调用返回返回两个属性：done和value；通过定义一个对象的Symbol.iterator属性，即可将此对象修改为迭代器对象，支持for...of遍历。

* 可枚举用来控制所描述的属性，是否被包括在for in 循环中（除非属性名是一个Sumbol）
  * 如果属性的 enumerable 为 false 下面三个操作不会获取到该属性
    * for in 循环
    * Object.keys方法
    * JSON.stringify方法

* 堆 与 栈
  * 栈由操作系统自动分配释放 ，用于存放函数的参数值、局部变量等，其操作方式类似于数据结构中的栈。其中函数中定义的局部变量按照先后定义的顺序依次压入栈中，也就是说相邻变量的地址之间不会存在其它变量。栈的内存地址生长方向与堆相反，由高到底，所以后定义的变量地址低于先定义的变量

  * 堆由开发人员分配和释放， 若开发人员不释放，程序结束时由 OS 回收，分配方式类似于链表。堆的内存地址生长方向与栈相反，由低到高，但需要注意的是，后申请的内存空间并不一定在先申请的内存空间的后面，即 p2 指向的地址并不一定大于 p1 所指向的内存地址，原因是先申请的内存空间一旦被释放，后申请的内存空间则会利用先前被释放的内存，从而导致先后分配的内存空间在地址上不存在先后关系

  * 区别
    * 管理方式不同。栈由操作系统自动分配释放，无需我们手动控制；堆的申请和释放工作由程序员控制，容易产生内存泄漏；

    * 空间大小不同。每个进程拥有的栈的大小要远远小于堆的大小。理论上，程序员可申请的堆大小为虚拟内存的大小，进程栈的大小 64bits 的 Windows 默认 1MB，64bits 的 Linux 默认 10MB；

    * 生长方向不同。堆的生长方向向上，内存地址由低到高；栈的生长方向向下，内存地址由高到低。

    * 分配方式不同。堆都是动态分配的，没有静态分配的堆。栈有2种分配方式：静态分配和动态分配。静态分配是由操作系统完成的，比如局部变量的分配。动态分配由alloca函数进行分配，但是栈的动态分配和堆是不同的，他的动态分配是由操作系统进行释放，无需我们手工实现。

    * 分配效率不同。栈由操作系统自动分配，会在硬件层级对栈提供支持：分配专门的寄存器存放栈的地址，压栈出栈都有专门的指令执行，这就决定了栈的效率比较高。堆则是由C/C++提供的库函数或运算符来完成申请与管理，实现机制较为复杂，频繁的内存申请容易产生内存碎片。显然，堆的效率比栈要低得多。

    * 存放内容不同。栈存放的内容，函数返回地址、相关参数、局部变量和寄存器内容等。当主函数调用另外一个函数的时候，要对当前函数执行断点进行保存，需要使用栈来实现，首先入栈的是主函数下一条语句的地址，即扩展指针寄存器的内容（EIP），然后是当前栈帧的底部地址，即扩展基址指针寄存器内容（EBP），再然后是被调函数的实参等，一般情况下是按照从右向左的顺序入栈，之后是被调函数的局部变量，注意静态变量是存放在数据段或者BSS段，是不入栈的。出栈的顺序正好相反，最终栈顶指向主函数下一条语句的地址，主程序又从该地址开始执行。堆，一般情况堆顶使用一个字节的空间来存放堆的大小，而堆中具体存放内容是由程序员来填充的。

* == 中，左右两边都需要转换为数字进行比较

* Vue 中 key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点

* SPA 单页面应用首屏加载慢
  * 减小入口文件体积
  * 静态资源本地缓存
  * UI框架按需加载
  * 图片资源的压缩
  * 组件重复打包
  * 开启GZip压缩
  * 使用SSR

* new 关键字
  * 创建了一个新的对象obj
  * 将对象与构造函数通过原型链连接起来
  * 将构造函数中的this绑定到新的实例对象上
  * 根据构造函数返回类型做判断，如果是原始值则被忽略，如果时返回对象，需要正常处理

* Proxy
  * 拦截和监视外部对对象的访问
  * 降低函数或类的复杂度
  * 在复杂操作前对操作进行校验或对所需资源进行管理
