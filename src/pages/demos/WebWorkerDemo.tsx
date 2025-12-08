import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
  CircularProgress,
  Grid,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';

export default function WebWorkerDemo() {
  const [input, setInput] = useState<number>(40);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [calculationTime, setCalculationTime] = useState<number | null>(null);
  const [mode, setMode] = useState<'main' | 'worker' | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Fibonacci calculation (recursive - intentionally slow)
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // Animate spinner using direct DOM manipulation to avoid re-render issues
  const startSpinnerAnimation = () => {
    let rotation = 0;
    const animate = () => {
      rotation = (rotation + 2) % 360;
      if (spinnerRef.current) {
        spinnerRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopSpinnerAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = 'rotate(0deg)';
    }
  };

  // Calculate on main thread (blocks UI)
  const calculateOnMainThread = () => {
    setIsCalculating(true);
    setResult(null);
    setCalculationTime(null);
    setMode('main');
    startSpinnerAnimation();

    // Use setTimeout to allow UI to update before blocking
    setTimeout(() => {
      const startTime = performance.now();
      const fibResult = fibonacci(input);
      const endTime = performance.now();

      setResult(fibResult);
      setCalculationTime(endTime - startTime);
      setIsCalculating(false);
      stopSpinnerAnimation();
    }, 10);
  };

  // Calculate using Web Worker (non-blocking)
  const calculateWithWorker = () => {
    setIsCalculating(true);
    setResult(null);
    setCalculationTime(null);
    setMode('worker');
    startSpinnerAnimation();

    const startTime = performance.now();

    // Create worker if it doesn't exist
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL('../../workers/expensiveCalculation.worker.ts', import.meta.url),
        { type: 'module' }
      );
    }

    // Listen for result from worker
    workerRef.current.onmessage = (e: MessageEvent<number>) => {
      const endTime = performance.now();
      setResult(e.data);
      setCalculationTime(endTime - startTime);
      setIsCalculating(false);
      stopSpinnerAnimation();
    };

    // Send input to worker
    workerRef.current.postMessage(input);
  };

  const mainThreadCode = `// ❌ Main Thread (Blocks UI)
function calculateOnMainThread() {
  const result = fibonacci(40); // Blocks for ~1-2 seconds
  console.log(result);
  // UI is frozen during calculation!
}`;

  const workerCode = `// ✅ Web Worker (Non-blocking)

// 1. Create worker file: expensiveCalculation.worker.ts
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = (e: MessageEvent<number>) => {
  const result = fibonacci(e.data);
  self.postMessage(result); // Send result back
};

// 2. Use worker in component
const worker = new Worker(
  new URL('./expensiveCalculation.worker.ts', import.meta.url),
  { type: 'module' }
);

worker.onmessage = (e) => {
  console.log('Result:', e.data);
  // UI stays responsive during calculation!
};

worker.postMessage(40); // Start calculation`;

  const useCasesCode = `// When to use Web Workers:

✅ Good use cases:
- Heavy computations (image processing, data parsing)
- Complex algorithms (sorting, filtering large datasets)
- Cryptography operations
- Background data synchronization
- Real-time data processing

❌ Don't use for:
- DOM manipulation (workers can't access DOM)
- Quick operations (< 50ms)
- Operations requiring frequent main thread communication
- Small calculations (overhead not worth it)

// Performance tip:
// Workers have startup cost (~10-50ms)
// Reuse workers instead of creating new ones`;

  const architectureCode = `// Thread Architecture:

Main Thread (UI Thread):
├── React rendering
├── User interactions
├── DOM updates
└── Event handling
    ↓ postMessage()

Web Worker Thread:
├── Heavy calculations
├── Data processing
└── Background tasks
    ↓ postMessage()

Main Thread receives result
└── Update UI with result`;

  return (
    <DemoContainer
      title="Web Worker Demo"
      description="Learn how to offload expensive calculations to Web Workers to keep your UI responsive"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Calculate Fibonacci and watch the spinner
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Main Thread:</strong> The spinner will freeze during calculation (UI blocked)
        </Typography>
        <Typography variant="body2">
          • <strong>Web Worker:</strong> The spinner keeps spinning smoothly (UI responsive)
        </Typography>
      </Alert>

      {/* Input and Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Calculate Fibonacci Number
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Try values between 35-45 to see noticeable differences. Higher values take longer.
              </Typography>
              <TextField
                type="number"
                label="Fibonacci Input (n)"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                disabled={isCalculating}
                fullWidth
                inputProps={{ min: 1, max: 45 }}
                helperText="Recommended: 40 (takes ~1-2 seconds)"
              />
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={calculateOnMainThread}
                  disabled={isCalculating}
                  size="large"
                >
                  Calculate on Main Thread (Blocks UI)
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={calculateWithWorker}
                  disabled={isCalculating}
                  size="large"
                >
                  Calculate with Web Worker (Non-blocking)
                </Button>
              </Grid>
            </Grid>

            {/* UI Responsiveness Indicator */}
            <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <Box
                    ref={spinnerRef}
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid',
                      borderColor: 'primary.main',
                      borderRadius: '8px',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        width: 8,
                        height: 8,
                        bgcolor: 'error.main',
                        borderRadius: '50%',
                      },
                    }}
                  >
                    <CircularProgress size={60} thickness={4} />
                  </Box>
                  <Box>
                    <Typography variant="h6">UI Responsiveness Test</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isCalculating
                        ? mode === 'main'
                          ? '⚠️ Watch the border and red dot - they will freeze!'
                          : '✅ Watch the border and red dot - they stay smooth!'
                        : 'Click a button to start calculation'}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Results */}
            {result !== null && calculationTime !== null && (
              <Card variant="outlined" sx={{ bgcolor: mode === 'worker' ? 'success.dark' : 'error.dark' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Calculation Mode
                      </Typography>
                      <Typography variant="h6">
                        {mode === 'main' ? '❌ Main Thread (Blocked UI)' : '✅ Web Worker (Smooth UI)'}
                      </Typography>
                    </Box>
                    <Divider />
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="overline" color="text.secondary">
                          Result
                        </Typography>
                        <Typography variant="h5" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {result.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="overline" color="text.secondary">
                          Calculation Time
                        </Typography>
                        <Typography variant="h5">
                          {calculationTime.toFixed(2)} ms
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How Web Workers Work
        </Typography>

        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ❌ Problem: Main Thread Blocking
          </Typography>
          <Typography variant="body2">
            JavaScript is single-threaded. Heavy calculations freeze the UI because the browser can't render while executing code.
          </Typography>
        </Alert>

        <CodeBlock
          title="Main Thread (Blocks UI)"
          code={mainThreadCode}
          language="typescript"
        />

        <Alert severity="success" sx={{ mb: 2, mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ✅ Solution: Web Workers
          </Typography>
          <Typography variant="body2">
            Web Workers run in a separate thread, allowing heavy calculations without blocking the UI.
          </Typography>
        </Alert>

        <CodeBlock
          title="Web Worker (Non-blocking)"
          code={workerCode}
          language="typescript"
        />

        <CodeBlock
          title="Thread Architecture"
          code={architectureCode}
          language="typescript"
        />

        <CodeBlock
          title="When to Use Web Workers"
          code={useCasesCode}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Key Concepts */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Key Concepts
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ✅ Benefits of Web Workers
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Non-blocking:</strong> UI stays responsive during heavy calculations
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>True parallelism:</strong> Utilizes multiple CPU cores
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Better UX:</strong> No frozen UI, smooth animations
          </Typography>
          <Typography variant="body2">
            • <strong>Performance:</strong> Offload work from main thread
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚠️ Limitations
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>No DOM access:</strong> Workers can't manipulate the DOM
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Communication overhead:</strong> Data must be serialized (postMessage)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Startup cost:</strong> Creating workers takes ~10-50ms
          </Typography>
          <Typography variant="body2">
            • <strong>Memory:</strong> Each worker has its own memory space
          </Typography>
        </Alert>

        <Alert severity="info">
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            💡 Pro Tips
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Reuse workers instead of creating new ones for each task
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Use workers for operations taking &gt; 50ms
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Consider using libraries like Comlink for easier worker communication
          </Typography>
          <Typography variant="body2">
            • Terminate workers when done to free memory: <code>worker.terminate()</code>
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
