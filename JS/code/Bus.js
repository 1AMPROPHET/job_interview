class Bus {
  constructor() {
    this.events = this.events || new Map()
  }

  publish(type, ...args) {
    this.events.get(type) && this.events.get(type).forEach(callback => callback(...args))
  }

  subscribe(type, callback) {
    if (!this.events.get(type)) {
      this.events.set(type, [])
    }
    this.events.set(type, [...this.events.get(type), callback])
  }
}