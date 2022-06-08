let routerView = document.getElementById('routerview')
window.addEventListener('hashchange', () => {
  let hash = location.hash
  routerView.innerHTML = hash
})

window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) {
    location.hash = '/'
  } else {
    let hash = location.hash
    routerView.innerHTML = hash
  }
})

