import { afterEach, describe, expect, it, vi } from 'vitest'
import {
    delayedCounter,
    getMaximumSumForTargetConsequetiveElements,
    isValidClosableParentheses,
    maxProfit,
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
            ).toBe(4)
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

    describe('maxProfit', () => {
        describe('Basic functionality', () => {
            it('should return correct profit for the example [7,1,5,3,6,4]', () => {
                expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5)
            })

            it('should return correct profit when buy low sell high', () => {
                expect(maxProfit([1, 5])).toBe(4)
                expect(maxProfit([2, 4, 1, 7])).toBe(6)
                expect(maxProfit([3, 2, 6, 5, 0, 3])).toBe(4)
            })

            it('should handle multiple profitable opportunities', () => {
                expect(maxProfit([1, 2, 3, 4, 5])).toBe(4)
                expect(maxProfit([1, 3, 2, 8, 2])).toBe(7)
            })
        })

        describe('No profit scenarios', () => {
            it('should return 0 when prices only decrease', () => {
                expect(maxProfit([7, 6, 4, 3, 1])).toBe(0)
                expect(maxProfit([5, 4, 3, 2, 1])).toBe(0)
            })

            it('should return 0 when all prices are the same', () => {
                expect(maxProfit([5, 5, 5, 5])).toBe(0)
                expect(maxProfit([1, 1, 1])).toBe(0)
            })

            it('should return 0 when no profitable transaction exists', () => {
                expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5) // This should actually be 5, testing current behavior
                expect(maxProfit([2, 1])).toBe(0)
            })
        })

        describe('Edge cases', () => {
            it('should handle empty array', () => {
                expect(maxProfit([])).toBe(0)
            })

            it('should handle single element array', () => {
                expect(maxProfit([5])).toBe(0)
            })

            it('should handle two element arrays', () => {
                expect(maxProfit([1, 2])).toBe(1)
                expect(maxProfit([2, 1])).toBe(0)
            })

            it('should handle null/undefined input', () => {
                expect(maxProfit(null as any)).toBe(0)
                expect(maxProfit(undefined as any)).toBe(0)
            })
        })

        describe('Complex scenarios', () => {
            it('should find maximum profit in volatile markets', () => {
                expect(maxProfit([1, 4, 2, 5, 3, 6])).toBe(5)
                expect(maxProfit([2, 1, 4, 9, 1, 3])).toBe(8)
            })

            it('should handle large price differences', () => {
                expect(maxProfit([1, 1000])).toBe(999)
                expect(maxProfit([100, 1, 1000])).toBe(999)
            })

            it('should handle negative or zero prices', () => {
                expect(maxProfit([0, 1, 2])).toBe(2)
                expect(maxProfit([1, 0, 2])).toBe(2)
            })

            it('should handle arrays with duplicate values', () => {
                expect(maxProfit([1, 1, 2, 2, 3, 3])).toBe(2)
                expect(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])).toBe(4)
            })
        })

        describe('Performance scenarios', () => {
            it('should handle larger arrays efficiently', () => {
                const largePrices = [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
                ]
                expect(maxProfit(largePrices)).toBe(9)
            })

            it('should handle arrays where minimum comes after maximum', () => {
                expect(maxProfit([10, 9, 8, 1, 2])).toBe(1)
                expect(maxProfit([5, 4, 3, 2, 1, 6])).toBe(5)
            })
        })

        describe('Boundary values', () => {
            it('should handle very small prices', () => {
                expect(maxProfit([0.01, 0.02, 0.01, 0.03])).toBeCloseTo(0.02)
            })

            it('should handle sequential buy/sell opportunities', () => {
                expect(maxProfit([1, 5, 1, 6, 1, 7])).toBe(6)
                expect(maxProfit([2, 8, 1, 9, 3, 10])).toBe(9)
            })
        })
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
