class Bus {
  constructor() {
    this.event = {}
  }

  publish(type, ...args) {
    this.event[type] && this.event[type].forEach(callback => callback(...args))
  }

  subscribe(type, callback) {
    if (!this.event[type]) {
      this.event[type] = []
    }
    this.event[type].push(callback)
  }
}