const validators = {
  name: {
    validator: (value) => typeof value === 'string',
    message: 'The name must be a string'
  },
  age: {
    validator: (value) => typeof value === 'number',
    message: 'The age must be a number'
  }
}

function Validate (target) {
  return new Proxy(target, {
    get: (obj, prop) => {
      return obj[prop]
    },
    set: (obj, prop, value) => {
      if (!obj[prop]) {
        obj[prop] = value
      } else {
        const validation = validators[prop].validator(value)
        if (!validation) {
          console.log(validators[prop].message);
          return false
        } else {
          obj[prop] = value
        }
      }
    }
  })
}