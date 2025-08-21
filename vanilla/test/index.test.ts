import { describe, expect, it, vi } from 'vitest'
import {
    buyAndSellStock,
    createGetters,
    getMaximumSumForTargetConsequetiveElements,
    isValidClosableParentheses,
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
