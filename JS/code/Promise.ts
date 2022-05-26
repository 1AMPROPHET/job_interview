enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

interface Resolve<T> {
  (value: T | PromiseLike<T>): void
}

interface Reject {
  (reason?: any): void
}

interface Executor<T> {
  (resolve: Resolve<T>, reject: Reject): void
}

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never> (
    onFulfilled?: ((value: T | PromiseLike<T>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onReject?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2>
}

export class MyPromise<T> {
  private status: Status = Status.PENDING
  private value!: T | PromiseLike<T>
  private reason: any
  private resolveCallbacks: Array<Function> = []
  private rejectCallbacks: Array<Function> = []

  constructor(executor: Executor<T>) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  private resolve: Resolve<T> = (value: T | PromiseLike<T>) => {
    try {
      queueMicrotask(() => {
        if (this.status === Status.PENDING) {
          this.status = Status.FULFILLED
          this.value = value
          this.resolveCallbacks.forEach(fn => fn())
          this.rejectCallbacks = []
        }
      })
    } catch (e) {
      this.reject(e)
    }
  }

  private reject: Reject = (reason: any) => {
    try {
      queueMicrotask(() => {
        if (this.status === Status.PENDING) {
          this.status = Status.REJECTED
          this.reason = reason
          this.rejectCallbacks.forEach(fn => fn())
          this.resolveCallbacks = []
        }
      })
    } catch (e) {
      this.reject(e)
    }
  }

  then<TResult1 = T, TResult2 = never> (
    onFulfilled?: ((value: T | PromiseLike<T>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v: T | PromiseLike<T>) => <any>v
    onRejected = typeof onRejected === 'function' ? onRejected : (e: any) => {throw e}

    const promise = new MyPromise<TResult1 | TResult2>((resolve: Resolve<TResult1 | TResult2>, reject: Reject) => {
      if (this.status === Status.FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled!(this.value)
            this.resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === Status.REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected!(this.reason)
            this.resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === Status.PENDING) {
        this.resolveCallbacks.push(() => {
          try {
            const x = onFulfilled!(this.value)
            this.resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.rejectCallbacks.push(() => {
          try {
            const x = onRejected!(this.reason)
            this.resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise
  }

  resolvePromise<T> (promise: MyPromise<T>, x: T | PromiseLike<T>, resolve: Resolve<T>, reject: Reject) {
    if (promise === x) {
      reject(new TypeError('Chaning circle detected in promise'))
    }
    let called = false
    if (typeof x === 'object' && x != null || typeof x === 'function') {
      try {
        let then = (x as PromiseLike<T>).then
        if (typeof then === 'function') {
          then.call(x, (y: T | PromiseLike<T>) => {
            if (called) return
            called = true
            this.resolvePromise(promise, y, resolve, reject)
          }, (e: any) => {
            if (called) return
            called = true
            reject(e)
          })
        } else {
          resolve(x)
        }
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
}

// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
  let deferred: any = {}
  deferred.promise = new MyPromise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

//@ts-ignore
export = MyPromise