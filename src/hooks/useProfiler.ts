import { useCallback, useRef } from 'react';
import type { ProfilerOnRenderCallback } from 'react';

interface ProfilerMetrics {
  renderCount: number;
  totalDuration: number;
  avgDuration: number;
  lastDuration: number;
  maxDuration: number;
  minDuration: number;
}

/**
 * Custom hook to track React Profiler metrics
 * Returns callback for Profiler and current metrics
 */
export function useProfiler() {
  const metrics = useRef<ProfilerMetrics>({
    renderCount: 0,
    totalDuration: 0,
    avgDuration: 0,
    lastDuration: 0,
    maxDuration: 0,
    minDuration: Infinity,
  });

  const onRender: ProfilerOnRenderCallback = useCallback(
    (_id, _phase, actualDuration) => {
      metrics.current.renderCount += 1;
      metrics.current.totalDuration += actualDuration;
      metrics.current.lastDuration = actualDuration;
      metrics.current.avgDuration = metrics.current.totalDuration / metrics.current.renderCount;
      metrics.current.maxDuration = Math.max(metrics.current.maxDuration, actualDuration);
      metrics.current.minDuration = Math.min(metrics.current.minDuration, actualDuration);
    },
    []
  );

  const reset = useCallback(() => {
    metrics.current = {
      renderCount: 0,
      totalDuration: 0,
      avgDuration: 0,
      lastDuration: 0,
      maxDuration: 0,
      minDuration: Infinity,
    };
  }, []);

  return { onRender, metrics: metrics.current, reset };
}
