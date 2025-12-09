import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: './dist/stats.html',
      open: false, // Set to true to auto-open after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: '/react-performance-toolkit/',

  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',

    // Enable minification (esbuild is faster, terser is smaller)
    minify: 'esbuild', // Using esbuild for speed, still very effective

    // Optimize chunk size
    chunkSizeWarningLimit: 1000, // Warn if chunk > 1MB

    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core libraries (rarely change)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Material UI (large library)
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],

          // TanStack Query
          'tanstack-query': ['@tanstack/react-query'],

          // React Window (virtualization)
          'react-window': ['react-window'],

          // Note: react-syntax-highlighter is NOT in manual chunks
          // It's lazy loaded via React.lazy() in CodeBlock component
          // This ensures it only loads when demo pages render
        },

        // Naming pattern for chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Source maps for debugging (disable in production for smaller size)
    sourcemap: false,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@tanstack/react-query',
    ],
  },
});
