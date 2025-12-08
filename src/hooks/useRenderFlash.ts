import { useEffect, useRef } from 'react';

/**
 * Hook that creates a visual flash effect when a component re-renders
 * Returns a ref to attach to the element
 *
 * IMPORTANT: This hook intentionally has no dependency array in useEffect,
 * so it runs on every render. However, it doesn't call setState, so it
 * doesn't cause infinite loops - it just manipulates the DOM directly.
 *
 * @param duration - How long the flash effect lasts (ms)
 * @param color - The flash color (default: yellow)
 * @returns Object with elementRef to attach to your component
 */
export function useRenderFlash(duration = 500, color = '#ffeb3b') {
  const elementRef = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);
  const timeoutRef = useRef<number | undefined>(undefined);

  // This runs on EVERY render (intentionally no dependency array)
  // But we DON'T call setState, so no infinite loop
  useEffect(() => {
    renderCount.current += 1;

    // Skip flash on initial render
    if (renderCount.current === 1) {
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Apply flash effect to element directly (no state update!)
    if (elementRef.current) {
      const element = elementRef.current;
      const originalBackground = element.style.backgroundColor;

      element.style.transition = 'background-color 0.1s ease-in-out';
      element.style.backgroundColor = color;

      // Remove flash after duration
      timeoutRef.current = setTimeout(() => {
        element.style.backgroundColor = originalBackground;
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

  return { elementRef };
}
