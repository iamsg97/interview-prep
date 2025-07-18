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
            } else {
                stack.pop()
            }
        }
    }

    return stack.length === 0
}
