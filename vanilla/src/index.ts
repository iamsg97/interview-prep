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

export function delayedCounter(n: number) {
  const promises = [];

  for (let i = 0; i < n; i++) {
    const p = new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => {
        resolve(i);
      }, i * 100);
    });
    promises.push(p);
  }
  return promises;
}
