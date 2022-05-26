function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通
      fn.call(target, event)
    }
  })
}

const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', function(e) {
  e.preventDefault();
  alert('click')
})

const div3 = document.getElementById('div3')
bindEvent(div3, 'click', 'a',  function(e) {
  e.preventDefault()
  alert(this.innerHTML)
})