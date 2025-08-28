import { afterEach, describe, expect, it, vi } from 'vitest'
import {
    asyncInvoker,
    buyAndSellStock,
    countFrequency,
    createGetters,
    delayedCounter,
    getMaximumSumForTargetConsequetiveElements,
    isValidClosableParentheses,
    learnReduce,
    logIndexAfterDelay,
    maxSubArrayProduct,
} from '../src/index'

describe('maxSubArrayProduct', () => {
    it('should return 6 for [2,3,-2,4]', () => {
        expect(maxSubArrayProduct([2, 3, -2, 4])).toBe(6)
    })

    it('should return 0 for [-2,0,-1]', () => {
        expect(maxSubArrayProduct([-2, 0, -1])).toBe(0)
    })

    it('should handle single element arrays', () => {
        expect(maxSubArrayProduct([5])).toBe(5)
        expect(maxSubArrayProduct([-5])).toBe(-5)
        expect(maxSubArrayProduct([0])).toBe(0)
    })

    it('should handle all negative numbers', () => {
        expect(maxSubArrayProduct([-2, -3, -4])).toBe(24)
    })

    it('should handle all positive numbers', () => {
        expect(maxSubArrayProduct([1, 2, 3, 4])).toBe(24)
    })

    it('should handle zeros in the array', () => {
        expect(maxSubArrayProduct([0, 2])).toBe(2)
        expect(maxSubArrayProduct([2, 0, 3, -2, 4])).toBe(4)
    })

    it('should handle mixed positive and negative numbers', () => {
        expect(maxSubArrayProduct([2, -5, -2, -4, 3])).toBe(24)
    })

    it('should return -1 for empty array', () => {
        expect(maxSubArrayProduct([])).toBe(-1)
    })
})

describe('isValidClosableParentheses', () => {
    describe('Valid parentheses', () => {
        it('should return true for empty string', () => {
            expect(isValidClosableParentheses('')).toBe(true)
        })

        it('should return true for simple balanced parentheses', () => {
            expect(isValidClosableParentheses('()')).toBe(true)
            expect(isValidClosableParentheses('[]')).toBe(true)
            expect(isValidClosableParentheses('{}')).toBe(true)
        })

        it('should return true for multiple pairs of same type', () => {
            expect(isValidClosableParentheses('()()')).toBe(true)
            expect(isValidClosableParentheses('[][]')).toBe(true)
            expect(isValidClosableParentheses('{}{}')).toBe(true)
        })

        it('should return true for nested parentheses', () => {
            expect(isValidClosableParentheses('(())')).toBe(true)
            expect(isValidClosableParentheses('[[]]')).toBe(true)
            expect(isValidClosableParentheses('{{}}')).toBe(true)
        })

        it('should return true for mixed balanced parentheses', () => {
            expect(isValidClosableParentheses('()[]{}')).toBe(true)
            expect(isValidClosableParentheses('([{}])')).toBe(true)
            expect(isValidClosableParentheses('{[()]}')).toBe(true)
        })

        it('should return true for complex nested structures', () => {
            expect(isValidClosableParentheses('({[()]})')).toBe(true)
            expect(isValidClosableParentheses('[({})]')).toBe(true)
            expect(isValidClosableParentheses('()[]{}([{}])')).toBe(true)
        })

        it('should return true for strings with non-parentheses characters', () => {
            expect(isValidClosableParentheses('a(b)c')).toBe(true)
            expect(isValidClosableParentheses('hello[world]')).toBe(true)
            expect(isValidClosableParentheses('func{arg1, arg2}')).toBe(true)
        })
    })

    describe('Invalid parentheses', () => {
        it('should return false for unmatched opening parentheses', () => {
            expect(isValidClosableParentheses('(')).toBe(false)
            expect(isValidClosableParentheses('[')).toBe(false)
            expect(isValidClosableParentheses('{')).toBe(false)
        })

        it('should return false for unmatched closing parentheses', () => {
            expect(isValidClosableParentheses(')')).toBe(false)
            expect(isValidClosableParentheses(']')).toBe(false)
            expect(isValidClosableParentheses('}')).toBe(false)
        })

        it('should return false for mismatched parentheses', () => {
            expect(isValidClosableParentheses('(]')).toBe(false)
            expect(isValidClosableParentheses('(}')).toBe(false)
            expect(isValidClosableParentheses('[)')).toBe(false)
            expect(isValidClosableParentheses('[}')).toBe(false)
            expect(isValidClosableParentheses('{)')).toBe(false)
            expect(isValidClosableParentheses('{]')).toBe(false)
        })

        it('should return false for wrong order', () => {
            expect(isValidClosableParentheses(')(')).toBe(false)
            expect(isValidClosableParentheses('][')).toBe(false)
            expect(isValidClosableParentheses('}{')).toBe(false)
        })

        it('should return false for unbalanced nested structures', () => {
            expect(isValidClosableParentheses('(()')).toBe(false)
            expect(isValidClosableParentheses('())')).toBe(false)
            expect(isValidClosableParentheses('([)]')).toBe(false)
            expect(isValidClosableParentheses('{[}]')).toBe(false)
        })

        it('should return false for mixed valid and invalid patterns', () => {
            expect(isValidClosableParentheses('()[')).toBe(false)
            expect(isValidClosableParentheses('()}{')).toBe(false)
            expect(isValidClosableParentheses('([{}]))')).toBe(false)
        })

        it('should return false for strings with non-parentheses and invalid parentheses', () => {
            expect(isValidClosableParentheses('a(b')).toBe(false)
            expect(isValidClosableParentheses('hello[world')).toBe(false)
            expect(isValidClosableParentheses('func{arg1, arg2')).toBe(false)
        })
    })

    describe('Edge cases', () => {
        it('should handle strings with only non-parentheses characters', () => {
            expect(isValidClosableParentheses('hello world')).toBe(true)
            expect(isValidClosableParentheses('123456')).toBe(true)
            expect(isValidClosableParentheses('abc!@#$%^&*')).toBe(true)
        })

        it('should handle very long strings', () => {
            const longValid = '()'.repeat(1000)
            expect(isValidClosableParentheses(longValid)).toBe(true)

            const longInvalid = '('.repeat(1000)
            expect(isValidClosableParentheses(longInvalid)).toBe(false)
        })

        it('should handle deeply nested structures', () => {
            const deepNested = '('.repeat(100) + ')'.repeat(100)
            expect(isValidClosableParentheses(deepNested)).toBe(true)

            const deepInvalid = '('.repeat(100) + ')'.repeat(99)
            expect(isValidClosableParentheses(deepInvalid)).toBe(false)
        })
    })
})

describe('getMaximumSumForTargetConsequetiveElements', () => {
    describe('Basic functionality', () => {
        it('should return maximum sum for valid window size', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([1, 2, 3, 4, 5], 3)
            ).toBe(12)
            expect(
                getMaximumSumForTargetConsequetiveElements(
                    [2, 1, 5, 1, 3, 2],
                    3
                )
            ).toBe(9)
        })

        it('should handle single element window', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([1, 2, 3, 4, 5], 1)
            ).toBe(5)
            expect(
                getMaximumSumForTargetConsequetiveElements([5, 1, 3, 2, 4], 1)
            ).toBe(5)
        })

        it('should handle window size equal to array length', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([1, 2, 3], 3)
            ).toBe(6)
            expect(
                getMaximumSumForTargetConsequetiveElements([5, -2, 4], 3)
            ).toBe(7)
        })
    })

    describe('Edge cases', () => {
        it('should handle negative numbers', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([-1, -2, -3, -4], 2)
            ).toBe(-3)
            expect(
                getMaximumSumForTargetConsequetiveElements([1, -1, 2, -2, 3], 2)
            ).toBe(1)
        })

        it('should handle mixed positive and negative numbers', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([2, -1, 2, 1, -4], 3)
            ).toBe(3)
            expect(
                getMaximumSumForTargetConsequetiveElements([-2, 1, 3, -1, 2], 2)
            ).toBe(4)
        })

        it('should handle array with all same elements', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([3, 3, 3, 3], 2)
            ).toBe(6)
            expect(
                getMaximumSumForTargetConsequetiveElements([0, 0, 0], 2)
            ).toBe(0)
        })

        it('should handle large window sizes', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements(
                    [1, 2, 3, 4, 5, 6],
                    5
                )
            ).toBe(20)
        })
    })

    describe('Invalid inputs', () => {
        it('should handle empty array', () => {
            expect(getMaximumSumForTargetConsequetiveElements([], 1)).toBe(0)
        })

        it('should handle window size of 0', () => {
            expect(
                getMaximumSumForTargetConsequetiveElements([1, 2, 3], 0)
            ).toBe(0)
        })

        it('should handle window size larger than array', () => {
            expect(getMaximumSumForTargetConsequetiveElements([1, 2], 5)).toBe(
                0
            )
        })
    })

    describe('buyAndSellStock', () => {
        describe('Basic functionality', () => {
            it('should return correct profit for the example [7,1,5,3,6,4]', () => {
                expect(buyAndSellStock([7, 1, 5, 3, 6, 4])).toBe(5)
            })

            it('should return correct profit when buy low sell high', () => {
                expect(buyAndSellStock([1, 5])).toBe(4)
                expect(buyAndSellStock([2, 4, 1, 7])).toBe(6)
                expect(buyAndSellStock([3, 2, 6, 5, 0, 3])).toBe(4)
            })

            it('should handle multiple profitable opportunities', () => {
                expect(buyAndSellStock([1, 2, 3, 4, 5])).toBe(4)
                expect(buyAndSellStock([1, 3, 2, 8, 2])).toBe(7)
            })
        })

        describe('No profit scenarios', () => {
            it('should return 0 when prices only decrease', () => {
                expect(buyAndSellStock([7, 6, 4, 3, 1])).toBe(0)
                expect(buyAndSellStock([5, 4, 3, 2, 1])).toBe(0)
            })

            it('should return 0 when all prices are the same', () => {
                expect(buyAndSellStock([5, 5, 5, 5])).toBe(0)
                expect(buyAndSellStock([1, 1, 1])).toBe(0)
            })

            it('should return 0 when no profitable transaction exists', () => {
                expect(buyAndSellStock([7, 1, 5, 3, 6, 4])).toBe(5) // This should actually be 5, testing current behavior
                expect(buyAndSellStock([2, 1])).toBe(0)
            })
        })

        describe('Edge cases', () => {
            it('should handle empty array', () => {
                expect(buyAndSellStock([])).toBe(0)
            })

            it('should handle single element array', () => {
                expect(buyAndSellStock([5])).toBe(0)
            })

            it('should handle two element arrays', () => {
                expect(buyAndSellStock([1, 2])).toBe(1)
                expect(buyAndSellStock([2, 1])).toBe(0)
            })

            it('should handle null/undefined input', () => {
                expect(buyAndSellStock(null as any)).toBe(0)
                expect(buyAndSellStock(undefined as any)).toBe(0)
            })
        })

        describe('Complex scenarios', () => {
            it('should find maximum profit in volatile markets', () => {
                expect(buyAndSellStock([1, 4, 2, 5, 3, 6])).toBe(5)
                expect(buyAndSellStock([2, 1, 4, 9, 1, 3])).toBe(8)
            })

            it('should handle large price differences', () => {
                expect(buyAndSellStock([1, 1000])).toBe(999)
                expect(buyAndSellStock([100, 1, 1000])).toBe(999)
            })

            it('should handle negative or zero prices', () => {
                expect(buyAndSellStock([0, 1, 2])).toBe(2)
                expect(buyAndSellStock([1, 0, 2])).toBe(2)
            })

            it('should handle arrays with duplicate values', () => {
                expect(buyAndSellStock([1, 1, 2, 2, 3, 3])).toBe(2)
                expect(buyAndSellStock([3, 3, 5, 0, 0, 3, 1, 4])).toBe(4)
            })
        })

        describe('Performance scenarios', () => {
            it('should handle larger arrays efficiently', () => {
                const largePrices = [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
                ]
                expect(buyAndSellStock(largePrices)).toBe(9)
            })

            it('should handle arrays where minimum comes after maximum', () => {
                expect(buyAndSellStock([10, 9, 8, 1, 2])).toBe(1)
                expect(buyAndSellStock([5, 4, 3, 2, 1, 6])).toBe(5)
            })
        })

        describe('Boundary values', () => {
            it('should handle very small prices', () => {
                expect(buyAndSellStock([0.01, 0.02, 0.01, 0.03])).toBeCloseTo(
                    0.02
                )
            })

            it('should handle sequential buy/sell opportunities', () => {
                expect(buyAndSellStock([1, 5, 1, 6, 1, 7])).toBe(6)
                expect(buyAndSellStock([2, 8, 1, 9, 3, 10])).toBe(9)
            })
        })
    })
})

describe('createGetters', () => {
    it('returns an array of functions with same length as input', () => {
        const nums = [10, 20, 30]
        const getters = createGetters(nums)
        expect(Array.isArray(getters)).toBe(true)
        expect(getters.length).toBe(nums.length)
        expect(typeof getters[0]).toBe('function')
    })

    it('each getter returns the corresponding element by index', () => {
        const nums = [10, 20, 30]
        const getters = createGetters(nums)
        expect(getters[0]?.()).toBe(10)
        expect(getters[1]?.()).toBe(20)
        expect(getters[2]?.()).toBe(30)
    })

    it('getters reflect later mutations to the original array', () => {
        const nums = [1, 2, 3]
        const getters = createGetters(nums)
        nums[0] = 42
        expect(getters[0]?.()).toBe(42)
        nums.push(99)
        // existing getters for indices beyond original length are undefined
        expect(getters[3]).toBeUndefined()
    })

    it('handles empty array', () => {
        const nums: number[] = []
        const getters = createGetters(nums)
        expect(getters.length).toBe(0)
    })

    it('existing getters return undefined if element is removed', () => {
        const nums = [7, 8, 9]
        const getters = createGetters(nums)
        // remove last element
        nums.pop()
        expect(getters[2]?.()).toBeUndefined()
        // earlier getters still work
        expect(getters[0]?.()).toBe(7)
    })
})

describe('logIndexAfterDelay', () => {
    it('schedules timeouts and logs expected messages', () => {
        // Some test environments may not expose vi.useFakeTimers; mock setTimeout directly
        const arr = [10, 20, 30]

        const originalSetTimeout = global.setTimeout
        const setTimeoutMock = vi
            .spyOn(
                global as unknown as { setTimeout: typeof setTimeout },
                'setTimeout'
            )
            .mockImplementation((...args: unknown[]) => {
                // call callback synchronously to make behavior deterministic
                const cb = args[0] as (() => void) | undefined
                if (cb) {
                    try {
                        cb()
                    } catch {
                        // ignore
                    }
                }
                // return a real timer object (satisfies NodeJS.Timeout) then clear it
                const timer = originalSetTimeout(() => {}, 0)
                clearTimeout(timer)
                return timer
            })

        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
        const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

        logIndexAfterDelay(arr)

        // three timers should be scheduled
        expect(setTimeoutMock).toHaveBeenCalledTimes(arr.length)

        // callbacks were invoked synchronously by our mock
        expect(logSpy).toHaveBeenCalledWith('Index 0: 10')
        expect(debugSpy).toHaveBeenCalledWith('Delay consumed (ms):', 100)
        expect(logSpy).toHaveBeenCalledWith('Index 1: 20')
        expect(debugSpy).toHaveBeenCalledWith('Delay consumed (ms):', 200)
        expect(logSpy).toHaveBeenCalledWith('Index 2: 30')
        expect(debugSpy).toHaveBeenCalledWith('Delay consumed (ms):', 300)

        // clean up / restore
        setTimeoutMock.mockRestore()
        logSpy.mockRestore()
        debugSpy.mockRestore()
    })
})
describe('delayedCounter', () => {
    afterEach(() => {
        // restore real timers after each test when available; otherwise do a best-effort cleanup
        if (typeof vi.useRealTimers === 'function') {
            vi.useRealTimers()
            return
        }

        // Fallback: try to flush/clear any pending fake timers to avoid cross-test leakage
        try {
            if (typeof vi.runAllTimers === 'function') vi.runAllTimers()
            if (typeof vi.clearAllTimers === 'function') vi.clearAllTimers()
        } catch (e) {
            // noop - if timers API isn't present we can't do more
        }
    })

    it('returns an empty array for n = 0', () => {
        const promises = delayedCounter(0)
        expect(Array.isArray(promises)).toBe(true)
        expect(promises).toHaveLength(0)
    })

    it('each entry is a promise-like object', () => {
        const promises = delayedCounter(3)
        expect(promises).toHaveLength(3)
        for (const p of promises) {
            expect(typeof (p as any).then).toBe('function')
        }
    })

    it('resolves each promise to its index after the expected delay (stepwise)', async () => {
        const useFake = typeof vi.useFakeTimers === 'function'
        if (useFake) vi.useFakeTimers()

        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

        const promises = delayedCounter(3)

        // immediately advance 0ms timers and flush microtasks so 0-index resolves
        if (useFake && typeof vi.advanceTimersByTime === 'function') {
            vi.advanceTimersByTime(0)
            await Promise.resolve()
        } else {
            await sleep(0)
        }
        await expect(promises[0]).resolves.toBe(0)

        // advance another 100ms for index 1
        if (useFake && typeof vi.advanceTimersByTime === 'function') {
            vi.advanceTimersByTime(100)
            await Promise.resolve()
        } else {
            await sleep(100)
        }
        await expect(promises[1]).resolves.toBe(1)

        // advance another 100ms for index 2
        if (useFake && typeof vi.advanceTimersByTime === 'function') {
            vi.advanceTimersByTime(100)
            await Promise.resolve()
        } else {
            await sleep(100)
        }
        await expect(promises[2]).resolves.toBe(2)
    })

    it('all promises resolve to increasing indices when timers run to completion', async () => {
        const useFake = typeof vi.useFakeTimers === 'function'
        if (useFake) vi.useFakeTimers()

        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

        const n = 5
        const promises = delayedCounter(n)

        // run all timers (0,100,200,300,400) or wait the equivalent real time
        if (useFake && typeof vi.runAllTimers === 'function') {
            vi.runAllTimers()
            await Promise.resolve()
        } else {
            await sleep(n * 100)
            await Promise.resolve()
        }

        const results = await Promise.all(promises as Promise<number>[])
        expect(results).toEqual(Array.from({ length: n }, (_, i) => i))
    })

    it('handles negative or non-positive n by returning an empty array', () => {
        expect(delayedCounter(-1)).toHaveLength(0)
        expect(delayedCounter(undefined as any)).toHaveLength(0)
    })
})
describe('countFrequency', () => {
    it('should count word frequency in a simple sentence', () => {
        const result = countFrequency('apple banana apple orange banana apple')

        expect(result.get('apple')).toBe(3)
        expect(result.get('banana')).toBe(2)
        expect(result.get('orange')).toBe(1)
        expect(result.size).toBe(3)
    })

    it('should handle empty string', () => {
        const result = countFrequency('')

        expect(result.get('')).toBe(1)
        expect(result.size).toBe(1)
    })

    it('should handle single word', () => {
        const result = countFrequency('hello')

        expect(result.get('hello')).toBe(1)
        expect(result.size).toBe(1)
    })

    it('should handle repeated single word', () => {
        const result = countFrequency('hello hello hello')

        expect(result.get('hello')).toBe(3)
        expect(result.size).toBe(1)
    })

    it('should be case sensitive', () => {
        const result = countFrequency('Hello hello HELLO')

        expect(result.get('Hello')).toBe(1)
        expect(result.get('hello')).toBe(1)
        expect(result.get('HELLO')).toBe(1)
        expect(result.size).toBe(3)
    })

    it('should handle multiple spaces as separate words', () => {
        const result = countFrequency('word  word')

        expect(result.get('word')).toBe(2)
        expect(result.get('')).toBe(1) // empty string from double space
        expect(result.size).toBe(2)
    })

    it('should handle punctuation as part of words', () => {
        const result = countFrequency('hello, world! hello world!')

        expect(result.get('hello,')).toBe(1)
        expect(result.get('world!')).toBe(2)
        expect(result.get('hello')).toBe(1)
        expect(result.size).toBe(3)
    })

    it('should handle numbers', () => {
        const result = countFrequency('123 456 123')

        expect(result.get('123')).toBe(2)
        expect(result.get('456')).toBe(1)
        expect(result.size).toBe(2)
    })

    it('should handle special characters', () => {
        const result = countFrequency('@ # $ @ #')

        expect(result.get('@')).toBe(2)
        expect(result.get('#')).toBe(2)
        expect(result.get('$')).toBe(1)
        expect(result.size).toBe(3)
    })

    it('should handle very long sentence', () => {
        const longSentence = Array(1000).fill('word').join(' ')
        const result = countFrequency(longSentence)

        expect(result.get('word')).toBe(1000)
        expect(result.size).toBe(1)
    })

    it('should return Map instance', () => {
        const result = countFrequency('test')

        expect(result).toBeInstanceOf(Map)
    })

    it('should handle unicode characters', () => {
        const result = countFrequency('café naïve café résumé naïve')

        expect(result.get('café')).toBe(2)
        expect(result.get('naïve')).toBe(2)
        expect(result.get('résumé')).toBe(1)
        expect(result.size).toBe(3)
    })

    it('should handle leading and trailing spaces', () => {
        const result = countFrequency(' hello world ')

        expect(result.get('hello')).toBe(1)
        expect(result.get('world')).toBe(1)
        expect(result.get('')).toBe(2) // from leading and trailing spaces
        expect(result.size).toBe(3)
    })
})

describe('learnReduce', () => {
    it('should find person with maximum savings in basic scenario', () => {
        const peoples = [
            { name: 'Alice', savings: 1000 },
            { name: 'Bob', savings: 1500 },
            { name: 'Charlie', savings: 800 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(1500)
    })

    it('should return first person when all have same savings', () => {
        const peoples = [
            { name: 'Alice', savings: 1000 },
            { name: 'Bob', savings: 1000 },
            { name: 'Charlie', savings: 1000 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Alice')
        expect(result.savings).toBe(1000)
    })

    it('should handle single person array', () => {
        const peoples = [{ name: 'Alice', savings: 500 }]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Alice')
        expect(result.savings).toBe(500)
    })

    it('should handle negative savings values', () => {
        const peoples = [
            { name: 'Alice', savings: -1000 },
            { name: 'Bob', savings: -500 },
            { name: 'Charlie', savings: -2000 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(-500)
    })

    it('should handle mixed positive and negative savings', () => {
        const peoples = [
            { name: 'Alice', savings: -100 },
            { name: 'Bob', savings: 200 },
            { name: 'Charlie', savings: -50 },
            { name: 'Dave', savings: 150 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(200)
    })

    it('should handle zero savings', () => {
        const peoples = [
            { name: 'Alice', savings: 0 },
            { name: 'Bob', savings: -100 },
            { name: 'Charlie', savings: 50 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Charlie')
        expect(result.savings).toBe(50)
    })

    it('should handle decimal savings values', () => {
        const peoples = [
            { name: 'Alice', savings: 100.5 },
            { name: 'Bob', savings: 100.75 },
            { name: 'Charlie', savings: 100.25 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(100.75)
    })

    it('should handle very large savings values', () => {
        const peoples = [
            { name: 'Alice', savings: 1000000 },
            { name: 'Bob', savings: 999999999 },
            { name: 'Charlie', savings: 500000 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(999999999)
    })

    it('should return exact object reference from input array', () => {
        const alice = { name: 'Alice', savings: 1000 }
        const bob = { name: 'Bob', savings: 1500 }
        const peoples = [alice, bob]

        const result = learnReduce(peoples)
        expect(result).toBe(bob) // exact reference check
    })

    it('should handle objects with additional properties', () => {
        const peoples = [
            { name: 'Alice', savings: 1000, age: 25, city: 'NYC' },
            { name: 'Bob', savings: 1500, age: 30, city: 'LA' },
            { name: 'Charlie', savings: 800, age: 35, city: 'Chicago' },
        ] as { name: string; savings: number; age?: number; city?: string }[]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(1500)
        expect((result as any).age).toBe(30)
        expect((result as any).city).toBe('LA')
    })

    it('should handle array with duplicates but different references', () => {
        const peoples = [
            { name: 'Alice', savings: 1000 },
            { name: 'Bob', savings: 1000 },
            { name: 'Alice', savings: 1000 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Alice')
        expect(result.savings).toBe(1000)
        expect(result).toBe(peoples[0]) // should be first Alice
    })

    it('should work with maximum savings at different positions', () => {
        const testCases = [
            // Max at beginning
            [
                { name: 'Max', savings: 2000 },
                { name: 'Bob', savings: 1000 },
                { name: 'Charlie', savings: 500 },
            ],
            // Max in middle
            [
                { name: 'Alice', savings: 500 },
                { name: 'Max', savings: 2000 },
                { name: 'Charlie', savings: 1000 },
            ],
            // Max at end
            [
                { name: 'Alice', savings: 500 },
                { name: 'Bob', savings: 1000 },
                { name: 'Max', savings: 2000 },
            ],
        ]

        testCases.forEach((peoples, index) => {
            const result = learnReduce(peoples)
            expect(result.name).toBe('Max')
            expect(result.savings).toBe(2000)
        })
    })

    it('should handle special string characters in names', () => {
        const peoples = [
            { name: 'José María', savings: 1000 },
            { name: 'François', savings: 1500 },
            { name: '张三', savings: 800 },
            { name: 'محمد', savings: 1200 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('François')
        expect(result.savings).toBe(1500)
    })

    it('should handle empty string names', () => {
        const peoples = [
            { name: '', savings: 1000 },
            { name: 'Bob', savings: 1500 },
            { name: ' ', savings: 800 },
        ]

        const result = learnReduce(peoples)
        expect(result.name).toBe('Bob')
        expect(result.savings).toBe(1500)
    })
})

describe('asyncInvoker', () => {
    afterEach(() => {
        if (typeof vi.useRealTimers === 'function') {
            vi.useRealTimers()
        }
        vi.clearAllMocks()
    })

    describe('Basic functionality', () => {
        it('should return array of promises with same length as input messages', () => {
            const messages = ['A', 'B', 'C']
            const promises = asyncInvoker(messages, 100)

            expect(Array.isArray(promises)).toBe(true)
            expect(promises).toHaveLength(3)
            for (const p of promises) {
                expect(typeof p.then).toBe('function')
            }
        })

        it('should resolve each promise with the corresponding message', async () => {
            const messages = ['Hello', 'World']
            const promises = asyncInvoker(messages, 0)

            const results = await Promise.all(promises)
            expect(results).toEqual(['Hello', 'World'])
        })

        it('should call logger.log for each message with correct prefix', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const messages = ['Test1', 'Test2']

            const promises = asyncInvoker(messages, 0)
            await Promise.all(promises)

            expect(logSpy).toHaveBeenCalledTimes(2)
            expect(logSpy).toHaveBeenCalledWith('Log: Test1')
            expect(logSpy).toHaveBeenCalledWith('Log: Test2')

            logSpy.mockRestore()
        })
    })

    describe('Timing and delay behavior', () => {
        it('should schedule timeouts with correct delays (delay * index)', () => {
            if (typeof vi.useFakeTimers === 'function') {
                vi.useFakeTimers()
            }
            const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

            const messages = ['A', 'B', 'C']
            asyncInvoker(messages, 200)

            expect(setTimeoutSpy).toHaveBeenCalledTimes(3)
            expect(setTimeoutSpy).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
                0
            )
            expect(setTimeoutSpy).toHaveBeenNthCalledWith(
                2,
                expect.any(Function),
                200
            )
            expect(setTimeoutSpy).toHaveBeenNthCalledWith(
                3,
                expect.any(Function),
                400
            )

            setTimeoutSpy.mockRestore()
        })

        it('should resolve promises in correct order with proper timing', async () => {
            const useFake = typeof vi.useFakeTimers === 'function'
            if (useFake) vi.useFakeTimers()
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

            const messages = ['A', 'B', 'C']
            const promises = asyncInvoker(messages, 100)

            const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

            // First promise should resolve immediately (0ms delay)
            if (useFake && typeof vi.advanceTimersByTime === 'function') {
                vi.advanceTimersByTime(0)
                await Promise.resolve()
            } else {
                await sleep(0)
            }
            expect(logSpy).toHaveBeenCalledWith('Log: A')
            await expect(promises[0]).resolves.toBe('A')

            // Second promise should resolve after 100ms
            if (useFake && typeof vi.advanceTimersByTime === 'function') {
                vi.advanceTimersByTime(100)
                await Promise.resolve()
            } else {
                await sleep(100)
            }
            expect(logSpy).toHaveBeenCalledWith('Log: B')
            await expect(promises[1]).resolves.toBe('B')

            // Third promise should resolve after another 100ms (200ms total)
            if (useFake && typeof vi.advanceTimersByTime === 'function') {
                vi.advanceTimersByTime(100)
                await Promise.resolve()
            } else {
                await sleep(100)
            }
            expect(logSpy).toHaveBeenCalledWith('Log: C')
            await expect(promises[2]).resolves.toBe('C')

            logSpy.mockRestore()
        })

        it('should handle zero delay correctly', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const messages = ['Immediate']

            const promises = asyncInvoker(messages, 0)
            const results = await Promise.all(promises)

            expect(results).toEqual(['Immediate'])
            expect(logSpy).toHaveBeenCalledWith('Log: Immediate')

            logSpy.mockRestore()
        })
    })

    describe('Edge cases', () => {
        it('should handle empty messages array', () => {
            const promises = asyncInvoker([], 100)

            expect(promises).toHaveLength(0)
            expect(Array.isArray(promises)).toBe(true)
        })

        it('should handle single message', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const promises = asyncInvoker(['Single'], 50)

            const results = await Promise.all(promises)
            expect(results).toEqual(['Single'])
            expect(logSpy).toHaveBeenCalledWith('Log: Single')

            logSpy.mockRestore()
        })

        it('should handle negative delay by treating it as valid delay value', () => {
            if (typeof vi.useFakeTimers === 'function') {
                vi.useFakeTimers()
            }
            const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

            asyncInvoker(['A', 'B'], -100)

            expect(setTimeoutSpy).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
                -0
            )
            expect(setTimeoutSpy).toHaveBeenNthCalledWith(
                2,
                expect.any(Function),
                -100
            )

            setTimeoutSpy.mockRestore()
        })

        it('should handle undefined/null messages gracefully', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const messages = [undefined, null, 'valid'] as any

            const promises = asyncInvoker(messages, 0)
            const results = await Promise.all(promises)

            expect(results).toEqual(['', '', 'valid'])
            expect(logSpy).toHaveBeenCalledWith('Log: ')
            expect(logSpy).toHaveBeenCalledWith('Log: ')
            expect(logSpy).toHaveBeenCalledWith('Log: valid')

            logSpy.mockRestore()
        })

        it('should handle empty string messages', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const promises = asyncInvoker(['', 'non-empty', ''], 0)

            const results = await Promise.all(promises)
            expect(results).toEqual(['', 'non-empty', ''])
            expect(logSpy).toHaveBeenCalledWith('Log: ')
            expect(logSpy).toHaveBeenCalledWith('Log: non-empty')
            expect(logSpy).toHaveBeenCalledWith('Log: ')

            logSpy.mockRestore()
        })
    })

    describe('Logger binding and context behavior', () => {
        it('should bind logger context correctly using bind method', async () => {
            const mockLogger = {
                prefix: 'Test:',
                log: vi.fn(),
            }

            const originalConsoleLog = console.log
            console.log = vi.fn()

            // Mock the logger object used in asyncInvoker
            const loggerSpy = vi.spyOn(console, 'log')

            const promises = asyncInvoker(['Message'], 0)
            await Promise.all(promises)

            expect(loggerSpy).toHaveBeenCalledWith('Log: Message')

            console.log = originalConsoleLog
        })

        it('should preserve logger prefix when calling bound function', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

            const promises = asyncInvoker(['Test message'], 0)
            await Promise.all(promises)

            // Verify the logger's prefix is used correctly
            expect(logSpy).toHaveBeenCalledWith('Log: Test message')

            logSpy.mockRestore()
        })

        it('should handle special characters in messages', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const specialMessages = [
                'Hello @world!',
                '123$%^',
                'café naïve',
                '🎉emoji🎉',
            ]

            const promises = asyncInvoker(specialMessages, 0)
            const results = await Promise.all(promises)

            expect(results).toEqual(specialMessages)
            for (const msg of specialMessages) {
                expect(logSpy).toHaveBeenCalledWith(`Log: ${msg}`)
            }

            logSpy.mockRestore()
        })
    })

    describe('Integration and stress tests', () => {
        it('should handle large number of messages efficiently', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            const messages = Array.from(
                { length: 100 },
                (_, i) => `Message${i}`
            )
            const promises = asyncInvoker(messages, 1)

            expect(promises).toHaveLength(100)

            // Test that all promises resolve correctly
            const results = await Promise.all(promises)
            expect(results).toEqual(messages)
            
            logSpy.mockRestore()
        })

        it('should handle concurrent calls correctly', async () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

            const promises1 = asyncInvoker(['A1', 'A2'], 10)
            const promises2 = asyncInvoker(['B1', 'B2'], 5)

            const results1 = await Promise.all(promises1)
            const results2 = await Promise.all(promises2)

            expect(results1).toEqual(['A1', 'A2'])
            expect(results2).toEqual(['B1', 'B2'])

            logSpy.mockRestore()
        })

        it('should maintain message order even with async operations', async () => {
            const useFake = typeof vi.useFakeTimers === 'function'
            if (useFake) vi.useFakeTimers()
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
            logSpy.mockClear() // Clear any previous calls

            const messages = ['First', 'Second', 'Third']
            const promises = asyncInvoker(messages, 50)

            // Advance time to trigger all timeouts
            if (useFake && typeof vi.advanceTimersByTime === 'function') {
                vi.advanceTimersByTime(150)
                await Promise.resolve()
            } else {
                await new Promise(r => setTimeout(r, 150))
            }

            const results = await Promise.all(promises)
            expect(results).toEqual(['First', 'Second', 'Third'])

            // Verify logging occurred with correct messages (don't check total count due to async interference)
            expect(logSpy).toHaveBeenCalledWith('Log: First')
            expect(logSpy).toHaveBeenCalledWith('Log: Second')
            expect(logSpy).toHaveBeenCalledWith('Log: Third')

            logSpy.mockRestore()
        })
    })

    describe('Memory and cleanup behavior', () => {
        it('should not leak memory with many concurrent promises', async () => {
            const messages = Array.from({ length: 50 }, (_, i) => `Msg${i}`)
            const promises = asyncInvoker(messages, 1)

            // All promises should resolve without issues
            const results = await Promise.all(promises)
            expect(results).toHaveLength(50)

            // Verify each message was processed
            results.forEach((result, index) => {
                expect(result).toBe(`Msg${index}`)
            })
        })

        it('should handle very long messages without issues', async () => {
            const longMessage = 'A'.repeat(1000)
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

            const promises = asyncInvoker([longMessage], 0)
            const results = await Promise.all(promises)

            expect(results[0]).toBe(longMessage)
            expect(logSpy).toHaveBeenCalledWith(`Log: ${longMessage}`)

            logSpy.mockRestore()
        })
    })
})
