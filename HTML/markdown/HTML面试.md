# HTML面试题

## 如何理解HTML语义化

```html
<div>标题</div>
<div>
  <div>一段文字</div>
  <div>
    <div>列表</div>
    <div>列表</div>
  </div>
</div>


<h1>标题</h1>
<div>
  <p>一段文字</p>
  <ul>
    <li>列表一</li>
    <li>列表二</li>
  </ul>
</div>
```

* 语义化：

  * `代码易读，让人更容易读懂代码`
  * `让搜索引擎更容易读懂（SEO搜索引擎优化）`

## 默认情况下，哪些HTML标签是块级元素，哪些是内联元素

* 块状元素
  * display: block/table; 有 `div h1 h2 table ul ol p` 等，独占一行
* 内联元素
  * display: inline/inline-block; 有`span img input button`等，不会独占一行
  