async function fn() {
  return 100
}
!(async function () {
  const a = fn() // ?
  const b = await fn() // ?
})()

!(async function () {
  console.log('start')
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  console.log('c', c)
  console.log('end')
})()

console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}
console.log('script start')

setTimeout(function () {
  console.log('settimeout')
}, 0)

async1()

new Promise((resolve, reject) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

console.log('script end')

function multi(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

const nums = [1, 2, 3]

!(async function() {
  for (let i of nums) {
    let res = await multi(i)
    console.log(res)
  }
})()