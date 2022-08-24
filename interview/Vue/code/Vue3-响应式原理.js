const targetMap = new WeakMap()
let activeEffect = null

const effect = eff => {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

const track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
}

const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== result) {
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let product = reactive({price: 10, quantity: 2})
let total = 0, salePrice = 0

effect(() => {
  total = product.price * product.quantity
})

effect(() => {
  salePrice = product.price * 0.9
})

console.log(total, salePrice);
product.quantity = 5
console.log(total, salePrice);
product.price = 20
console.log(total, salePrice);

var a = 1, b = 1
var n = --a || --b
console.log(n,a,b);
