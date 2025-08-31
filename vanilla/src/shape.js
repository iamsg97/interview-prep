/**
 *
 * @param name {string}
 * @constructor
 */
function Shape(name) {
    this.name = name
}

/**
 *
 * @returns {number}
 */
Shape.prototype.getArea = function () {
    return NaN
}

/**
 *
 * @param width {string}
 * @param height {string}
 * @constructor
 */
function Rectangle(width, height) {
    this.width = width
    this.height = height
    Shape.call(this, 'Rectangle')
}
// Child.prototype = Object.create(Parent.prototype) - here the constructor is lost, we need to fix it
Rectangle.prototype = Object.create(Shape.prototype)
// Fix the constructor
// When we do Rectangle.prototype = Object.create(Shape.prototype),
// the constructor property of Rectangle.prototype is set to Shape (the constructor of the prototype object).
// Child.prototype.constructor = Child [IMPORTANT]
// Now Rectangle.prototype.constructor points to Rectangle
Rectangle.prototype.constructor = Rectangle

/**
 *
 * @returns {number}
 */
Rectangle.prototype.getArea = function () {
    return this.width * this.height
}

/**
 *
 * @param radius {number}
 * @constructor
 */
function Circle(radius) {
    this.radius = radius
    Shape.call(this, 'Circle')
}

Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.constructor = Circle

/**
 *
 * @returns {number}
 */
Circle.prototype.getArea = function () {
    return Math.PI * Math.pow(2, this.radius)
}

const rectangle = new Rectangle(10, 20)
console.log(rectangle.name) // Rectangle
console.log(rectangle.getArea()) // 200

const circle = new Circle(10)
console.log(circle.name) // Circle
console.log(circle.getArea()) // 314.1592653589793
