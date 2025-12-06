// Shared TypeScript types for the React Performance Toolkit

export interface DemoMetadata {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string; // Material UI icon name
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hasBaseline: boolean;
  hasMetrics: boolean;
  hasSettings: boolean;
}

export interface PerformanceMetrics {
  renderCount: number;
  renderDuration: number; // milliseconds
  timestamp: number;
}

export interface ComparisonMetrics {
  baseline: PerformanceMetrics;
  optimized: PerformanceMetrics;
  improvement: number; // percentage
}

export interface CodeSnippet {
  title: string;
  code: string;
  language: 'typescript' | 'tsx' | 'javascript' | 'jsx';
  description?: string;
}

export interface ListItem {
  id: string;
  name: string;
  value: number;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ImageItem {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
}
