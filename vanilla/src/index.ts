/**
 * Checks if the input string contains valid, closable parentheses/braces/brackets.
 * @param str - The string to validate.
 * @returns True if the string is valid, false otherwise.
 */
export function isValidClosableParentheses(str: string): boolean {
    const stack: string[] = []

    const compParens: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    for (const char of str) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char)
        } else if (char === ')' || char === '}' || char === ']') {
            if (
                stack.length === 0 ||
                compParens[char] !== stack[stack.length - 1]
            ) {
                return false
            }
            stack.pop()
        }
    }

    return stack.length === 0
}

// TODO: still needs to be done
export function getLongestSubstringWithoutRepeatingCharacters(
    str: string
): number {
    const left = 0
    const right = 0
    for (let i = 0; i < str.length; i++) {}
    return 0
}

// Sliding window problem with fixed window size
export function getMaximumSumForTargetConsequetiveElements(
    arr: number[],
    windowSize: number
): number {
    if (windowSize > arr.length) return 0
    let left = 0
    let right: number = windowSize
    let sum = 0
    let maxSum = 0
    // First window calculate all prefix sum (current sum)
    for (let i = left; i < right; i++) {
        sum += arr[i] ?? 0
    }
    maxSum = sum // Updating the max sum after first window
    if (windowSize === arr.length) return maxSum
    // For sliding the window & calculate max sum
    while (right < arr.length) {
        sum -= arr[left] ?? 0
        left++
        sum += arr[right] ?? 0
        right++
        maxSum = Math.max(maxSum, sum)
    }
    return maxSum
}

// this will not be able to handle if all the elements in the array are negative numbers - Kadane's Algo
export function maxSubArray(nums: number[]): number {
    if (nums.length <= 0) return -1
    if (nums.length === 1) return nums[0] || -1
    let sum = 0
    let maxSum = 0
    for (const num of nums) {
        sum = sum + (num ?? 0)
        maxSum = Math.max(sum, maxSum)
        if (sum < 0) {
            sum = 0
        }
    }
    return maxSum
}

export function maxSubArrayPro(nums: number[]) {
    if (nums.length <= 0) {
        return -1
    }
    if (nums.length === 1) {
        return nums[0]
    }
    let currentSum = nums[0] ?? 0
    let maxSum = nums[0] ?? 0
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i] ?? 0, currentSum + (nums[i] ?? 0))
        maxSum = Math.max(currentSum, maxSum)
    }
    return maxSum
}

export function maxSubArrayProduct(nums: number[]) {
    if (nums.length <= 0) return -1
    if (nums.length === 1) return nums[0]
    let maxSoFar = nums[0] ?? 0
    let minSoFar = nums[0] ?? 0
    let globalMax = nums[0] ?? 0

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i] ?? 0
        const tempMax = Math.max(num, maxSoFar * num, minSoFar * num)
        const tempMin = Math.min(num, maxSoFar * num, minSoFar * num)
        maxSoFar = tempMax
        minSoFar = tempMin
        globalMax = Math.max(globalMax, maxSoFar)
    }
    return globalMax
}

export function maxProfit(prices: number[]): number {
    let left = 0
    let right = 0
    let maxProfit = 0

    if (!prices || prices.length <= 0) return 0

    while (right < prices.length) {
        if ((prices[right] ?? 0) > (prices[left] ?? 0)) {
            const currentProfit = (prices[right] ?? 0) - (prices[left] ?? 0)
            maxProfit = Math.max(maxProfit, currentProfit)
            right++
        } else {
            left = right
            right++
        }
    }
    return maxProfit
}

export function buyAndSellStock(prices: number[]): number {
    if (!prices || prices.length <= 0) return 0
    let maxProfit = 0
    let bestBuyPrice = prices[0] ?? 0

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] ?? 0 > bestBuyPrice) {
            maxProfit = Math.max(maxProfit, (prices[i] ?? 0) - bestBuyPrice)
        }
        bestBuyPrice = Math.min(bestBuyPrice, prices[i] ?? 0)
    }
    return maxProfit
}

function test() {
    const arr = [1, 2, 3]
    // biome-ignore lint/style/noVar: the problem is deliberately solved using IIFE (ES5 standard)
    // biome-ignore lint/correctness/noInnerDeclarations: the problem is deliberately solved using IIFE (ES5 standard)
    for (var i = 0; i < arr.length; i++) {
        ;(tmp => {
            setTimeout(() => {
                console.log(arr[tmp])
            }, 100)
        })(i)
    }
}

export function createGetters(arr: number[]) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(() => arr[i])
    }
    return result
}

export function logIndexAfterDelay(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        setTimeout(
            () => {
                // closure effects here and not in the delay which is at the outside of the `setTimeout`
                console.log(`Index ${i}: ${arr[i]}`)
                console.debug('Delay consumed (ms):', (i + 1) * 100)
            },
            (i + 1) * 100
        )
    }
}

export function delayedCounter(n: number) {
    const promises = []

    for (let i = 0; i < n; i++) {
        const p = new Promise(resolve => {
            // @ts-ignore
            setTimeout(() => {
                resolve(i)
            }, i * 100)
        })
        promises.push(p)
    }
    return promises
}

/**
 *
 * @param n number
 * @returns Promise<number>[]
 * @description difference from the above one, this uses `Array.from()`
 */
function delayedCounterAfain(n: number) {
    return Array.from({ length: n }, (_, i) => {
        return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(i)
            }, i * 100)
        })
    })
}

/**
 * Calculates the total savings of all people in the provided array using the `reduce` method.
 *
 * The `reduce` function iterates over the `peoples` array, accumulating the sum of the `savings` property
 * from each object. The accumulator (`prev`) starts at the value of `initialVal` (0), and for each iteration,
 * the current person's `savings` is added to the accumulator.
 *
 * The `reduce` function also does not mutate the original array
 *
 * Syntax explanation:
 * - `peoples.reduce((prev, people) => prev + people.savings, initialVal)`:
 *   - The first argument is a callback function with two parameters:
 *     - `prev`: The accumulator, which holds the running total.
 *     - `people`: The current element being processed in the array.
 *   - The callback returns the updated accumulator value for the next iteration.
 *   - The second argument (`initialVal`) sets the initial value of the accumulator.
 *
 * @param peoples - An array of objects, each containing a `name` and `savings` property.
 * @returns The total sum of the `savings` values from all people in the array.
 */
export function learnReduce(peoples: { name: string; savings: number }[]) {
    return peoples.reduce((prev, curr) => {
        // loops over the peoples, curr is the ith index and prev is (i - 1)th index
        if (curr.savings > prev.savings) {
            return curr
        }
        return prev
    })
}

/**
 * Counts the frequency of each word in a given sentence using the `reduce` function.
 *
 * This function splits the input sentence into words (by spaces), then iterates over each word,
 * accumulating their counts in a `Map<string, number>`. For each word, it checks if the word
 * already exists in the map:
 * - If it does, it increments the count by 1.
 * - If it does not, it initializes the count to 1.
 *
 * The `reduce` function is used to build up the frequency map as it processes each word in the array.
 *
 * @param sentence - The input string containing words separated by spaces.
 * @returns A `Map` where each key is a word from the sentence and the value is the number of times it appears.
 *
 * @example
 * ```typescript
 * const freq = countFrequency('apple banana apple orange banana apple');
 * // freq.get('apple') === 3
 * // freq.get('banana') === 2
 * // freq.get('orange') === 1
 * ```
 */
/**
 * Checks if the input string contains valid, closable parentheses/braces/brackets.
 * @param str - The string to validate.
 * @returns True if the string is valid, false otherwise.
 */
export function countFrequency(sentence: string) {
    // acc -> what you want to do
    // in this it has to be a map
    return sentence
        .split(' ')
        .reduce((acc: Map<string, number>, word: string) => {
            if (acc.has(word)) {
                const curr: number = acc.get(word) ?? 0
                acc.set(word, curr + 1)
            } else {
                acc.set(word, 1)
            }
            return acc
        }, /** @description what is going to be the start value */ new Map<string, number>())
}

const logger = {
    prefix: 'Log:',
    log(message: string) {
        console.log(`${this.prefix} ${message}`)
    },
}

export function asyncInvoker(
    messages: string[],
    delay: number
): Promise<string>[] {
    const result: Promise<string>[] = []
    const unboundedLogger = logger.log
    for (let i = 0; i < messages.length; i++) {
        result.push(
            // biome-ignore lint/complexity/useArrowFunction: <explanation>
            new Promise<string>(function (resolve) {
                // biome-ignore lint/complexity/useArrowFunction: <explanation>
                setTimeout(function () {
                    // Call logger.log to print: "Log: <message>" after delay*i ms
                    // But do NOT touch the logger or add extra properties to its object!
                    // Use call/bind/apply and closure to pass context and args correctly.
                    const boundedLogger = unboundedLogger.bind(
                        logger,
                        messages[i] ?? ''
                    )
                    boundedLogger()
                    resolve(messages[i] ?? '') //
                }, delay * i)
            })
        )
    }
    return result
}

function Animal(this: { name: string }, name: string) {
    this.name = name
}
Animal.prototype.speak = function () {
    return this.name + ' makes a sound.'
}

function Dog(
    this: { name: string; breed: string },
    name: string,
    breed: string
) {
    // Animal.apply(Dog, [name]) --> works too
    Animal.call(Dog, name)
    this.breed = breed
}

/**
 * @description The line sets up the prototype chain for the `Dog` class to inherit from the `Animal` class.
 * By using `Object.create(Animal.prototype)`, it creates a new object that has `Animal.prototype` as its prototype,
 * effectively allowing instances of `Dog` to access methods defined on `Animal.prototype`.
 * This is the pattern in JavaScript to achieve classical inheritance before the introduction of ES6 classes.
 * @template Below code is from ES6 class syntax
 * class Dog extends Animal {
 *     constructor(name, breed) {
 *         super(name);
 *         this.breed = breed;
 *     }
 * }
 */
Dog.prototype = Object.create(Animal.prototype)
/**
 * @description The line sets the `constructor` property of `Dog.prototype` to the `Dog` function itself.
 * This is necessary after manually setting up inheritance with `Object.create`,
 * because that operation overwrites the `constructor` property to point to the parent (`Animal`).
 * Restoring it ensures that instances of `Dog` correctly reference `Dog` as their constructor, which is important for type checks and instance creation.
 */
Dog.prototype.constructor = Dog

Dog.prototype.speak = function () {
    /**
     * @description Here, `Animal.prototype.speak.call(this)` is used to invoke the `speak` method from the `Animal` class,
     * ensuring that it is called in the context of the current `Dog` instance (`this`).
     * This allows the `Dog` instance to access properties defined in the `Animal` class, such as `name`.
     * The result of this call is then included in the return string to provide additional context about what the parent class's method would output.
     */
    return `${this.name} the ${this.breed} barks. [Parent says: ${Animal.prototype.speak.call(this)}]`
}

// const dog = new Dog('Rex', 'Boxer')
// console.log(dog.speak())
// Should print: "Rex the Boxer barks. [Parent says: Rex makes a sound.]"

class DoNotTest {
    findSum(num1: number, num2: number, num3: number) {
        return num1 + num2 + num3
    }

    repeatAction(action: (n: number) => void, times: number) {
        for (let i = 0; i < times; i++) {
            action(i)
        }
    }
}

/**
 * This IIFE is used in this file to test methods which are part of the class `DoNotTest`
 * @see DoNotTest
 */
;(() => {
    const doNotTest = new DoNotTest()
    /**
     * @descripton Argument of type 'number[]' is not assignable to parameter of type '[number, number, number]'
     * That's why it's mandatory in TS to add `[number, number, number]`
     */
    const numbers: [number, number, number] = [13, 56, 78]

    doNotTest.findSum.apply(null, numbers)

    /**
     * @description Here we are learning about Higher Order Functions (HOF)
     * @see repeatAction()
     */
    doNotTest.repeatAction(n => console.log(`Action executed for ${n}`), 5)
})()
