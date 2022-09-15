# Web Security

## 常见 web 攻击

- xss（cross site scripting）跨站脚本攻击
- CSRF（Cross-site request forgrey）跨站伪造请求
- SQL 注入攻击

### XSS

- 允许攻击者将恶意代码植入到提供给其它用户使用的页面中，XSS 涉及到三方，即攻击者、客户端与 Web 应用
- 分为

  - 存储型
  - 反射型
  - DOM 型

- 存储型

  - 攻击者将恶意代码提交到目标网站的数据库中
  - 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器
  - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
  - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

- 反射型

  - 攻击者构造出特殊的 URL，其中包含恶意代码
  - 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器
  - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
  - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

- DOM 型

  - 攻击者构造出特殊的 URL，其中包含恶意代码
  - 用户打开带有恶意代码的 URL
  - 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
  - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

  - XSS 预防
    - 两大要素
      - 攻击者提交的恶意代码
      - 浏览器执行恶意代码

    - 针对第一个要素，我们在用户输入的过程中，过滤掉用户输入的恶劣代码，然后提交给后端，但是如果攻击者绕开前端请求，直接构造请求就不能预防了。而如果在后端写入数据库之前，对输入进行过滤，然后把内容交给前端，但是这个内容在不同的地方就会有不同的显示

### CSRF

- 跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求

- 流程

  - 受害者登录 a.com，并保留了登录凭证（Cookie）
  - 攻击者引诱受害者访问了 b.com
  - b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie
  - a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
  - a.com 以受害者的名义执行了 act=xx
  - 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作

- 防护策略
  - CSRF两个特点
    - CSRF 通常发生在第三方域名
    - CSRF 攻击者不能获取到Cookie 等信息，只是使用
  - 针对这两点制定策略
    - 阻止不明外域访问
      - 同源检测
      - Samesite Cookie
    - 提交是要求附加本域才能获取的信息
      - CSRF Token
      - 双重 Cookie 验证

## SQL 注入

- 就是通过把 SQL 命令插入到 Web 表单递交或输入域名或页面请求的查询字符串，最终达到欺骗数据库服务器执行恶意的 SQL 命令,从而达到和服务器进行直接的交互

- 找出 SQL 漏洞的注入点-
- 判断数据库的类型以及版本

- 猜解用户名和密码

- 利用工具查找 Web 后台管理入口

- 入侵和破坏
- 预防
  - 后台进行输入验证，对敏感字符过滤
  - 使用参数化查询，能避免拼接SQL，就不要拼接

## 中间人攻击

- 中间人攻击（Man-in-the-middle attack, MITM），指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者窃听、篡改甚至完全控制

## DNS 劫持

- DNS 劫持（涉嫌违法）：修改运行商的 DNS 记录，重定向到其他网站。DNS 劫持是违法的行为，目前 DNS 劫持已被监管，现在很少见 DNS 劫持
- HTTP 劫持：前提有 HTTP 请求。因 HTTP 是明文传输，运营商便可借机修改 HTTP 响应内容（如加广告）。

## HTTPS降级

- 黑客可以利用SSL Stripping这种攻击手段，强制让HTTPS降级回HTTP，从而继续进行中间人攻击。

- 使用HSTS（HTTP Strict Transport Security），它通过下面这个HTTP Header以及一个预加载的清单，来告知浏览器和网站进行通信的时候强制性的使用HTTPS，而不是通过明文的HTTP进行通信。这里的“强制性”表现为浏览器无论在何种情况下都直接向务器端发起HTTPS请求，而不再像以往那样从HTTP跳转到HTTPS。另外，当遇到证书或者链接不安全的时候，则首先警告用户，并且不再让用户选择是否继续进行不安全的通信。

## 静态资源完整性校验

- 使用 内容分发网络 (CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。然而，使用CDN也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中 （或完全替换掉文件），因此可能潜在地攻击所有从该 CDN 获取文件的站点。

- 将使用 base64 编码过后的文件哈希值写入你所引用的 `<script>` 或 标签的 integrity 属性值中即可启用子资源完整性能。

## cookie 中的 HttpOnly

- 也就是说，对于设置了 HttpOnly 属性为 true 的cookie，无法通过 js 进行访问或其他操作，只是在发送对应域下的请求时，浏览器会自动带上。这样可以有效缓解 XSS 攻击。

## 跨域

- 什么是同源策略及其限制内容？

  - 同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

  - 同源策略限制内容有
    - Cookie、LocalStorage、IndexedDB 等存储性内容
    - DOM 节点
    - AJAX 请求发送后，结果被浏览器拦截了
  - 三个标签允许跨域
    - script
    - link
    - img

- 跨域的方案

  - CORS
    - CORS 通信过程都是浏览器自动完成，需要浏览器(都支持)和服务器都支持，所以关键在只要服务器支持，就可以跨域通信，CORS请求分两类，`简单请求`和`非简单请求`
    - 另外CORS请求默认不包含Cookie以及HTTP认证信息，如果需要包含Cookie，需要满足几个条件：
      - 服务器指定了 Access-Control-Allow-Credentials: true
      - 开发者须在请求中打开withCredentials属性: xhr.withCredentials = true
      - Access-Control-Allow-Origin不要设为星号，指定明确的与请求网页一致的域名，这样就不会把其他域名的Cookie上传

    - `简单请求`：需要同时满足两个条件，就属于简单请求
      - 请求方法是：HEAD、GET、POST，三者之一
      - 请求头信息不超过以下几个字段：
        - Accept
        - Accept-Language
        - Content-Language
        - Last-Event-Id
        - Content-Type：值为三者之一application/x-www/form/urlencoded、multipart/form-data、text/plain

      - 需要这些条件是为了兼容表单，因为历史上表单一直可以跨域。浏览器直接发出CORS请求，具体来说就是在头信息中增加Origin字段，表示请求来源来自哪个域(协议+域名+端口)，服务器根据这个值决定是否同意请求。如果同意，返回的响应会多出以下响应头信息
        - Access-Control-Allow-Origin: `http://juejin.com` // 和 Orign 一致  这个字段是必须的

          - Access-Control-Allow-Origin：* 表明，该资源可以被任意外域访问，当响应的是附带身份凭证的请求时，服务端必须明确 Access-Control-Allow-Origin 的值，而不能使用通配符。
          - 如果服务端指定了具体域名而非 * ，那么响应首部的 Vary 字段值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。
        - Access-Control-Allow-Credentials: true // 表示是否允许发送 Cookie  这个字段是可选的
        - Access-Control-Expose-Headers: FooBar // 指定返回其他字段的值   这个字段是可选的
        - Content-Type: text/html; charset=utf-8 // 表示文档类型
      - 在简单请求中服务器至少需要设置：Access-Control-Allow-Origin 字段

    - `非简单请求`，比如put 或 delete 请求，或 Content-Type 为 application/json，就是非简单请求
    - 非简单 CORS 请求，正式请求前会发一次 `OPTIONS` 类型的查询请求，称为`预检请求`，询问服务器是否支持网页所在域名的请求，以及可以使用哪些头信息字段。只有收到肯定的答复，才会发起正式XMLHttpRequest请求，否则报错
    - 预检请求的方法是OPTIONS，它的头信息中有几个字段
      - Origin: 表示请求来自哪个域，这个字段是必须的
      - Access-Control-Request-Method：列出CORS请求会用到哪些HTTP方法，这个字段是必须的
      - Access-Control-Request-Headers： 指定CORS请求会额外发送的头信息字段，用逗号隔开
    - OPTIONS 请求次数过多也会损耗性能，所以要尽量减少OPTIONS请求，可以让服务器在请求返回头部添加
      - Acess-Control-Max-Age：Number

  - Nginx 代理
    - 配置一个代理服务器向服务器请求，再将数据返回给客户端，实质和CORS跨域原理一样，需要配置请求响应头Access-Control-Allow-Origin等字段

    ```JSON
    server { 
      listen 81; server_name www.domain1.com; 
      location / { 
        proxy_pass http://xxxx1:8080; // 反向代理 
        proxy_cookie_domain www.xxxx1.com www.xxxx2.com; // 修改cookie里域名 
        index index.html index.htm; 
        // 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用 
        add_header Access-Control-Allow-Origin http://www.xxxx2.com; // 当前端只跨域不带cookie时，可为* 
        add_header Access-Control-Allow-Credentials true; 
      } 
    }
    ```

  - webpack devServer 代理

  - websocket
    - websocket是HTML5标准中的一种通信协议，不实行同源政策
    - 因为websocket请求头信息中有origin字段，表明请求源来自哪个域
  - postMessage
      - 页面和信打开的窗口间数据传递
      - 多窗口之间数据传递
      - 页面与嵌套的iframe之间数据传递
  - JSONP

## 前端常规安全策略

- 定期请第三方机构做安全测试
- 使用第三方开源库做上线前安全测试
- code review 保证代码质量
- 默认项目中设置对应的 Header 请求头
- 队第三方包和库做检测

## cookie 中的httpOnly 属性

- JavaScript Document.cookie API 无法访问带有 HttpOnly 属性的cookie；此类 Cookie 仅作用于服务器。也就是说，对于设置了 HttpOnly 属性为 true 的cookie，无法通过 js 进行访问或其他操作，只是在发送对应域下的请求时，浏览器会自动带上。这样可以有效缓解 XSS 攻击。
