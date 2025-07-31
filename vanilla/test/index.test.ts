import { describe, expect, it } from 'vitest'
import {
    getMaximumSumForTargetConsequetiveElements,
    isValidClosableParentheses,
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
})
