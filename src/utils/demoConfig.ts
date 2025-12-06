import type { DemoMetadata } from '../types';

// Configuration for all demos - drives consistent rendering
export const demos: DemoMetadata[] = [
  {
    id: 'transition',
    title: 'useTransition Demo',
    description: 'Prevent UI blocking during expensive operations with React 18 useTransition',
    route: '/demos/transition',
    icon: 'Speed',
    tags: ['React 18', 'Concurrent', 'Performance'],
    difficulty: 'intermediate',
    hasBaseline: true,
    hasMetrics: true,
    hasSettings: true,
  },
  {
    id: 'deferred',
    title: 'useDeferredValue Demo',
    description: 'Defer expensive updates while keeping UI responsive',
    route: '/demos/deferred',
    icon: 'Schedule',
    tags: ['React 18', 'Concurrent', 'Performance'],
    difficulty: 'intermediate',
    hasBaseline: true,
    hasMetrics: true,
    hasSettings: false,
  },
  {
    id: 'memo',
    title: 'Memoization Demo',
    description: 'Prevent unnecessary re-renders with React.memo, useMemo, and useCallback',
    route: '/demos/memo',
    icon: 'Memory',
    tags: ['Optimization', 'Re-renders', 'Performance'],
    difficulty: 'beginner',
    hasBaseline: true,
    hasMetrics: true,
    hasSettings: false,
  },
  {
    id: 'virtualized',
    title: 'Virtualized List Demo',
    description: 'Render large lists efficiently with react-window virtualization',
    route: '/demos/virtualized',
    icon: 'ViewList',
    tags: ['Virtualization', 'Performance', 'Lists'],
    difficulty: 'intermediate',
    hasBaseline: true,
    hasMetrics: true,
    hasSettings: true,
  },
  // More demos will be added in later phases
];

export const getDemoById = (id: string): DemoMetadata | undefined => {
  return demos.find((demo) => demo.id === id);
};
