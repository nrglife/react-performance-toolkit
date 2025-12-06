/**
 * Web Worker for off-main-thread expensive calculations
 * Used in Web Worker demo (Phase 3)
 */

// Fibonacci calculation (recursive - intentionally slow)
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Listen for messages from main thread
self.onmessage = (e: MessageEvent<number>) => {
  const input = e.data;
  const result = fibonacci(input);

  // Send result back to main thread
  self.postMessage(result);
};
