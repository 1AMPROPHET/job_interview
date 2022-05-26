// es6
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat something`)
  }
}

class Student extends People {
  constructor(name, number) {
    super(name)
    this.number = number
  }
  sayHi() {
    console.log(`name: ${this.name}, number: ${this.number}`)
  }
} 

const p = new People('wang')
console.log(People.prototype)
console.log(Student.prototype._proto_)
console.log(Student.prototype._proto_ === People.prototype)

// es5
function funcPeople(name) {
  this.name = name
}

funcPeople.prototype.eat = function () {
  console.log(`${this.name} eat something`)
}

// 1. 原型继承
function funcStudent (number) {
  this.number = number
}

funcStudent.prototype = new funcPeople('wang')
const fStudent = new funcStudent(12)
fStudent.eat()

// 2. 构造函数继承
function funcStudent1 (number) {
  funcPeople.call(this)
  this.number = number
}

const instance = new funcStudent1(23)
// 无法使用属性
// instance.eat()

// 3. 混合继承
function mixStudent(name, number) {
  funcPeople.call(this, name)
  this.number = number
}

mixStudent.prototype = new funcPeople()
const stu = new mixStudent('wang', 78)

stu.eat()
console.log(stu.name)

