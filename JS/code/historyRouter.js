let routerView = document.getElementById('routerview')
window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('popstate', () => {
  routerView.innerHTML = location.pathname
})

function onLoad () {
  routerView.innerHTML = location.pathname
  let linklist = document.querySelectorAll('a[href]')
  linklist.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState(null, '', el.getAttribute('href'))
      routerView.innerHTML = location.pathname
    })
  })
}

// pushState(state, title, url)