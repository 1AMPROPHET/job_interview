/**
 * Author: PROPHET
 * MyPromise
 */

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('Chaining circle detected for Promise'))
  }

  let called

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.called(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {

  constructor(excutor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolveCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn())
      }
    }

    try {
      excutor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}

    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.resolveCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.rejectCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      } 
    })

    return promise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve = (value) => {
    if (value instanceof MyPromise) {
      return value.then(resovle, reject)
    }
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.resolveCallbacks.forEach(fn => fn())
    }
    return new MyPromise((resovle, reject) => {
      resovle(value)
    })
  }

  static reject = (reason) => {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

MyPromise.all = function(promiseList) {
  if (!Array.isArray(promiseList)) {
    const type = typeof promiseList
    return new TypeError(`TypeError: ${type} ${promiseList} is not iterable`)
  }
  return new MyPromise((resolve, reject) => {
    const length = promiseList.length
    let resovleCount = 0
    let result = []
    const processResultByKey = (value, index) => {
      result[index] = value
      if (++resovleCount === length) {
        resolve(value)
      }
    }
    for (let i = 0; i < length; i++) {
      let p = promiseList[i]
      if (p && typeof p.then === 'function') {
        p.then(data => {
          processResultByKey(data, i)
        }, reject)
      } else {
        processResultByKey(p, i)
      }
    }
  })
}


MyPromise.race = (promiseList) => {
  return new MyPromise((resolve, reject) => {
    promiseList.forEach(p => {
      if (p && typeof p.then === 'function') {
        p.then(resolve, reject)
      } else {
        resolve(p)
      }
    })
  })
}

MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd;
}

module.exports = MyPromise