import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import AppBar from './components/layout/AppBar';
import Home from './pages/Home';
import PageLoader from './components/shared/PageLoader';
import { Box } from '@mui/material';

// Lazy load demo pages for code splitting
const TransitionDemo = lazy(() => import('./pages/demos/TransitionDemo'));
const DeferredDemo = lazy(() => import('./pages/demos/DeferredDemo'));
const MemoDemo = lazy(() => import('./pages/demos/MemoDemo'));
const VirtualizedDemo = lazy(() => import('./pages/demos/VirtualizedDemo'));
const LazyImagesDemo = lazy(() => import('./pages/demos/LazyImagesDemo'));
const SuspenseDemo = lazy(() => import('./pages/demos/SuspenseDemo'));
const VisualizerDemo = lazy(() => import('./pages/demos/VisualizerDemo'));
const ProfilerDemo = lazy(() => import('./pages/demos/ProfilerDemo'));
const WebWorkerDemo = lazy(() => import('./pages/demos/WebWorkerDemo'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demos/transition" element={<TransitionDemo />} />
                <Route path="/demos/deferred" element={<DeferredDemo />} />
                <Route path="/demos/memo" element={<MemoDemo />} />
                <Route path="/demos/virtualized" element={<VirtualizedDemo />} />
                <Route path="/demos/lazy-images" element={<LazyImagesDemo />} />
                <Route path="/demos/suspense" element={<SuspenseDemo />} />
                <Route path="/demos/visualizer" element={<VisualizerDemo />} />
                <Route path="/demos/profiler" element={<ProfilerDemo />} />
                <Route path="/demos/web-worker" element={<WebWorkerDemo />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
