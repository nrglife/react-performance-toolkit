import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageLoader from './components/shared/PageLoader';

// Lazy load demo pages for code splitting
const TransitionDemo = lazy(() => import('./pages/demos/TransitionDemo'));
const DeferredDemo = lazy(() => import('./pages/demos/DeferredDemo'));
const MemoDemo = lazy(() => import('./pages/demos/MemoDemo'));
const VirtualizedDemo = lazy(() => import('./pages/demos/VirtualizedDemo'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demos/transition" element={<TransitionDemo />} />
          <Route path="/demos/deferred" element={<DeferredDemo />} />
          <Route path="/demos/memo" element={<MemoDemo />} />
          <Route path="/demos/virtualized" element={<VirtualizedDemo />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
