const myIterator = {
    curr: 1,
    end: 10,
    next() {
        if (this.curr <= this.end) {
            return { value: this.cur++, done: false }
        } else {
            return { value: undefined, done: true }
        }
    },
}

// let result = myIterator.next()

// while (!result.done) {
//     console.log(result.value)
//     result = myIterator.next()
// }

// we will try to solve using generator

function* myGenerator() {
    yield '🍕'
    yield '🌮'
    yield '🍔'
    return '🥗 (done)'
}

const food = myGenerator()
console.log(food.next()) // { value: '🍕', done: false }
console.log(food.next()) // { value: '🌮', done: false }
console.log(food.next()) // { value: '🍔', done: false }
console.log(food.next()) // { value: '🥗 (done)', done: true }

function* poweredGen() {
    let name = yield 'Suvadeep'
    yield `Hello, ${name}`
}

const gen = poweredGen()
console.log(gen.next())
console.log(gen.next('Twinkle'))
