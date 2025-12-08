import { useState, useRef, useCallback, Profiler, type ProfilerOnRenderCallback } from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
  Divider,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip,
  Grid,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';

interface ProfilerData {
  renderNumber: number;
  id: string;
  phase: 'mount' | 'update' | 'nested-update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  timestamp: string;
}

// Expensive component - does heavy calculations during render
// Using lightweight Box instead of Card to minimize MUI overhead
function ExpensiveComponent({ count }: { count: number }) {
  // Simulate expensive calculation that actually takes time
  // This is intentionally inefficient to demonstrate profiling
  let result = 0;
  for (let i = 0; i < count * 200000; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
  }

  // Also create and process a large array
  const items = Array.from({ length: count * 1000 }, (_, i) => ({
    id: i,
    value: Math.random() * 100,
  }));
  const sum = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Expensive Component
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Performed {(count * 200000).toLocaleString()} calculations
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        Count: <strong>{count}</strong>
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Result: {result.toFixed(2)} | Sum: {sum.toFixed(2)}
      </Typography>
    </Box>
  );
}

// Fast component - minimal work
// Using lightweight Box instead of Card to minimize MUI overhead
function FastComponent({ value }: { value: string }) {
  // Just render - no calculations
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Fast Component
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Minimal rendering work
      </Typography>
      <Typography variant="body2">
        Value: <strong>{value}</strong>
      </Typography>
    </Box>
  );
}

// Separate wrapper for ExpensiveComponent with its own state
function ExpensiveComponentWrapper({ onRender }: { onRender: ProfilerOnRenderCallback }) {
  const [count, setCount] = useState(1);
  const [isMounted, setIsMounted] = useState(true);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Expensive Component</Typography>
      <Typography variant="body2" color="text.secondary">
        Current count: <strong>{count}</strong>
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => setCount(count + 1)}
          disabled={!isMounted}
          fullWidth
        >
          Increment (Update)
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsMounted(!isMounted)}
          color={isMounted ? 'error' : 'success'}
          fullWidth
        >
          {isMounted ? 'Unmount' : 'Mount'}
        </Button>
      </Stack>
      {isMounted && (
        <Profiler id="ExpensiveComponent" onRender={onRender}>
          <ExpensiveComponent count={count} />
        </Profiler>
      )}
      {!isMounted && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Component unmounted. Click "Mount" to see the mount phase in profiler!
        </Alert>
      )}
    </Stack>
  );
}

// Separate wrapper for FastComponent with its own state
function FastComponentWrapper({ onRender }: { onRender: ProfilerOnRenderCallback }) {
  const [value, setValue] = useState('Hello');
  const [isMounted, setIsMounted] = useState(true);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Fast Component</Typography>
      <Typography variant="body2" color="text.secondary">
        Current value: <strong>{value}</strong>
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setValue(value === 'Hello' ? 'World' : 'Hello')}
          disabled={!isMounted}
          fullWidth
        >
          Toggle (Update)
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsMounted(!isMounted)}
          color={isMounted ? 'error' : 'success'}
          fullWidth
        >
          {isMounted ? 'Unmount' : 'Mount'}
        </Button>
      </Stack>
      {isMounted && (
        <Profiler id="FastComponent" onRender={onRender}>
          <FastComponent value={value} />
        </Profiler>
      )}
      {!isMounted && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Component unmounted. Click "Mount" to see the mount phase in profiler!
        </Alert>
      )}
    </Stack>
  );
}

export default function ProfilerDemo() {
  const [profilerData, setProfilerData] = useState<ProfilerData[]>([]);

  // Use ref to track if we're currently updating to prevent infinite loops
  const isUpdatingRef = useRef(false);
  const lastCommitTimeRef = useRef<number>(0);
  const renderCounterRef = useRef<number>(0);

  const handleProfilerData: ProfilerOnRenderCallback = useCallback((
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    // Only track data for our specific profiled components, not the parent
    if (id !== 'ExpensiveComponent' && id !== 'FastComponent') {
      return;
    }

    // Prevent duplicate entries from React Strict Mode double-rendering
    if (commitTime === lastCommitTimeRef.current) {
      return;
    }
    lastCommitTimeRef.current = commitTime;

    // Prevent infinite loops by skipping updates while we're already updating
    if (isUpdatingRef.current) {
      return;
    }

    // Increment render counter
    renderCounterRef.current += 1;

    const newData: ProfilerData = {
      renderNumber: renderCounterRef.current,
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Use setTimeout to batch the update and avoid triggering profiler during render
    isUpdatingRef.current = true;
    setTimeout(() => {
      setProfilerData((prev) => {
        // Prevent adding duplicate entries
        if (prev.length > 0 && prev[0].commitTime === newData.commitTime) {
          isUpdatingRef.current = false;
          return prev;
        }
        return [newData, ...prev].slice(0, 10);
      });
      // Add a small delay before allowing next update
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }, 0);
  }, []);

  const clearData = () => {
    setProfilerData([]);
    renderCounterRef.current = 0;
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'mount':
        return 'success';
      case 'update':
        return 'primary';
      case 'nested-update':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getDurationColor = (duration: number) => {
    if (duration < 1) return 'success';
    if (duration < 5) return 'warning';
    return 'error';
  };

  const profilerCode = `import { Profiler } from 'react';

function MyComponent() {
  const onRender = (
    id,                   // Profiler id
    phase,                // "mount" or "update"
    actualDuration,       // Time spent rendering
    baseDuration,         // Estimated time without memoization
    startTime,            // When render started
    commitTime            // When React committed changes
  ) => {
    console.log(\`\${id} took \${actualDuration}ms to \${phase}\`);
  };

  return (
    <Profiler id="MyComponent" onRender={onRender}>
      <ExpensiveComponent />
    </Profiler>
  );
}`;

  const metricsCode = `// Key Profiler insights:

1. actualDuration (ms):
   - Time spent rendering
   - Identify slow components
   - Track performance trends over time
   - Compare different components

2. phase:
   - "mount": First render (usually slower)
   - "update": Re-render (usually faster)
   - Understand component lifecycle

3. Derived insights:
   - Render frequency (how often?)
   - Performance degradation (getting slower?)
   - Mount vs update cost comparison
   - Component comparison (which is slowest?)`;

  const realWorldCode = `// Real-world Profiler usage:

// 1. Track performance in production
function sendToAnalytics(id, phase, actualDuration) {
  if (actualDuration > 50) { // Only track slow renders
    analytics.track('slow_render', {
      component: id,
      duration: actualDuration,
      phase: phase,
      timestamp: Date.now()
    });
  }
}

<Profiler id="UserDashboard" onRender={sendToAnalytics}>
  <UserDashboard />
</Profiler>

// 2. Performance regression testing
test('Dashboard renders in under 100ms', () => {
  let duration = 0;
  const onRender = (id, phase, actualDuration) => {
    duration = actualDuration;
  };

  render(
    <Profiler id="Dashboard" onRender={onRender}>
      <Dashboard />
    </Profiler>
  );

  expect(duration).toBeLessThan(100);
});

// 3. A/B testing performance
function trackPerformance(id, phase, actualDuration) {
  if (isVariantA) {
    trackMetric('variant_a_render', actualDuration);
  } else {
    trackMetric('variant_b_render', actualDuration);
  }
}`;

  const useCasesCode = `// When to use React Profiler:

✅ Good use cases:
- Identifying slow components in production
- Measuring impact of optimizations
- Finding unnecessary re-renders
- Performance regression testing

❌ Don't use for:
- Every component (adds overhead)
- Development-only debugging (use React DevTools instead)
- Micro-optimizations (< 1ms differences)

// Production usage:
<Profiler id="App" onRender={sendToAnalytics}>
  <App />
</Profiler>`;

  return (
    <DemoContainer
      title="React Profiler Demo"
      description="Learn how to use React's built-in Profiler API to measure component render performance"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Understand Mount vs Update phases
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Update Phase:</strong> Click "Increment" or "Toggle" buttons - component re-renders (already exists)
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Mount Phase:</strong> Click "Unmount" then "Mount" - component is created from scratch
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem', mt: 1 }}>
          💡 Mount is usually slower than update because React has to create the entire component tree!
        </Typography>
      </Alert>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          ✅ Lightweight Component Profiling
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          The profiled components use <strong>Box + Typography</strong> instead of Card/CardContent. Why?
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • Card/CardContent add ~3-5ms overhead that masks the actual performance difference
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • Lightweight components let you see the <strong>pure calculation cost</strong>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
          💡 Now you'll see: FastComponent ~1-2ms vs ExpensiveComponent 10-30ms - a clear 10-15x difference!
        </Typography>
      </Alert>

      {/* Profiled Components with Separate Parents */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ExpensiveComponentWrapper onRender={handleProfilerData} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FastComponentWrapper onRender={handleProfilerData} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Profiler Data Table */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Profiler Data (Last 10 Renders)</Typography>
          <Button variant="outlined" size="small" onClick={clearData}>
            Clear Data
          </Button>
        </Box>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            📊 How to Read This Data
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>#:</strong> Sequential render number - higher numbers are more recent
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Phase:</strong> "mount" (green) = first render, "update" (blue) = re-render
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Duration (ms):</strong> Green = fast (&lt;1ms), Yellow = medium (1-5ms), Red = slow (&gt;5ms)
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
            💡 To see "mount" phase: Click "Unmount" then "Mount" button!
          </Typography>
        </Alert>

        {profilerData.length === 0 ? (
          <Alert severity="info">
            No profiler data yet. Click the buttons above to trigger renders and see profiling data appear here.
          </Alert>
        ) : (
          <>
            {/* Summary Stats - Derived Insights */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Total Renders
                    </Typography>
                    <Typography variant="h4">{profilerData.length}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Tracked
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Avg Duration
                    </Typography>
                    <Typography variant="h4">
                      {(profilerData.reduce((sum, d) => sum + d.actualDuration, 0) / profilerData.length).toFixed(2)}ms
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Per render
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Slowest Render
                    </Typography>
                    <Typography variant="h4">
                      {Math.max(...profilerData.map(d => d.actualDuration)).toFixed(2)}ms
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Peak time
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Mount vs Update
                    </Typography>
                    <Typography variant="h4">
                      {profilerData.filter(d => d.phase === 'mount').length} / {profilerData.filter(d => d.phase === 'update').length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Ratio
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Additional Insights */}
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                📊 Insights You Can Derive from Profiler Data:
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • <strong>Render Frequency:</strong> How often components re-render (count)
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • <strong>Performance Trends:</strong> Is it getting slower over time? (compare durations)
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • <strong>Mount Cost:</strong> How expensive is initial render vs updates?
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • <strong>Render Timing:</strong> When do renders happen? (commitTime)
              </Typography>
              <Typography variant="body2">
                • <strong>Bottlenecks:</strong> Which component is the slowest? (compare IDs)
              </Typography>
            </Alert>

            <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Component</TableCell>
                  <TableCell>Phase</TableCell>
                  <TableCell align="right">
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        Duration (ms)
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        (Render time)
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profilerData.map((data, index) => (
                  <TableRow key={`${data.id}-${data.commitTime}-${index}`}>
                    <TableCell align="center">
                      <Chip
                        label={data.renderNumber}
                        size="small"
                        color="default"
                        sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>{data.timestamp}</TableCell>
                    <TableCell>
                      <Chip label={data.id} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={data.phase}
                        size="small"
                        color={getPhaseColor(data.phase)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${data.actualDuration.toFixed(2)} ms`}
                        size="small"
                        color={getDurationColor(data.actualDuration)}
                        sx={{ fontFamily: 'monospace' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How to Use React Profiler
        </Typography>

        <CodeBlock
          title="Basic Profiler Usage"
          code={profilerCode}
          language="typescript"
        />

        <CodeBlock
          title="Understanding the Metrics"
          code={metricsCode}
          language="typescript"
        />

        <CodeBlock
          title="Real-World Profiler Applications"
          code={realWorldCode}
          language="typescript"
        />

        <CodeBlock
          title="When to Use Profiler"
          code={useCasesCode}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Key Concepts
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ✅ What Profiler Tells You
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Duration:</strong> How long the render took in milliseconds
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Phase:</strong> Whether it's a mount (first render) or update (re-render)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Trends:</strong> Watch how duration changes as data grows (like incrementing count)
          </Typography>
          <Typography variant="body2">
            • <strong>Comparison:</strong> Compare different components to find bottlenecks
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚠️ Important Notes
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Profiler adds overhead - don't wrap every component
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Use React DevTools Profiler for development debugging
          </Typography>
          <Typography variant="body2">
            • Use this API for production monitoring and analytics
          </Typography>
        </Alert>

        <Alert severity="info">
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            💡 Pro Tips
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Wrap components at different levels to isolate performance issues
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Send profiler data to analytics to track performance in production
          </Typography>
          <Typography variant="body2">
            • Compare actualDuration before and after optimizations to measure impact
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
