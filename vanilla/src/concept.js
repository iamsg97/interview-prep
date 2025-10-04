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

// Attempting dynamic pagination
function* paginate(arr, size) {
    let i = 0
    while (i < arr.length) {
        yield arr.slice(i, i + size) // pick from i to excluding i + size
        i += size
    }
}

const items = [10, 20, 30, 40, 50, 60, 70]

/**
 * @description look at the below example to understand how it actually works
 * @example
 * ```js
 * 	const generatedPagesIterator = paginate(items, 3)
 * 	while (!generatedPagesIterator.done) {
 *		// here generatedPagesIterator.next() moves the iterator forward
 *		// here generatedPagesIterator.next().value will yield the value (and wait at the next)
 *		// here generatedPagesIterator.done lets us know if the iterator has finished
 *		console.log(`group of pages to be available for pagination: ${generatedPagesIterator.next().value}`)
 * 	}
 */
for (let page of paginate(items, 3)) {
    console.log(page)
}
