import { useRef } from 'react';

/**
 * Hook that tracks how many times a component has rendered
 * Useful for debugging and visualizing re-render behavior
 *
 * @returns The current render count
 */
export function useRenderCount(): number {
  const renderCount = useRef(0);

  // Increment on every render
  renderCount.current += 1;

  return renderCount.current;
}
