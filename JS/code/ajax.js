function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('error 404 not found'))
        }
      }
    }
    xhr.send(null)
  })
}

const url = './data/test.json'
ajax(url).then(res => console.log(res)).catch(err => console.log(err))