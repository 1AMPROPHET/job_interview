function asyncLoadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(url)
    }
    img.onerror = () => {
      reject(new Error('error'))
    }
    img.src = url
  })
}
