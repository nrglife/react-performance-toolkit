/**
 * Simulates an expensive calculation for performance demos
 * Used to demonstrate the impact of optimization techniques
 */

export function expensiveCalculation(input: number): number {
  // Simulate CPU-intensive work
  let result = input;
  for (let i = 0; i < 100000; i++) {
    result = Math.sqrt(result + i) * Math.sin(i);
  }
  return result;
}

/**
 * Fibonacci calculation (recursive - intentionally slow)
 * Used for Web Worker demo
 */
export function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Simulates expensive filtering operation
 * Used in useTransition and useDeferredValue demos
 */
export function expensiveFilter<T extends { name: string }>(
  items: T[],
  query: string
): T[] {
  // Add artificial delay to simulate expensive operation
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Busy wait for 1ms to simulate work
  }

  return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
}
