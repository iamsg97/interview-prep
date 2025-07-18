import { describe, it, expect } from 'vitest'
import { isValidClosableParentheses } from '../src/index'

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
