import { useState, useCallback, useMemo, memo } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Add, Remove, Refresh } from '@mui/icons-material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { expensiveCalculation } from '../../utils/expensiveCalculation';

// Render counter component
function RenderCounter({ label }: { label: string }) {
  const countRef = useMemo(() => ({ count: 0 }), []);
  countRef.count++;

  return (
    <Chip
      label={`${label}: ${countRef.count} renders`}
      size="small"
      color={countRef.count > 5 ? 'error' : countRef.count > 2 ? 'warning' : 'success'}
      sx={{ fontFamily: 'monospace' }}
    />
  );
}

// Unmemoized child component
function UnmemoizedChild({ onClick, message }: { onClick: () => void; message: string }) {
  const prevMessage = useMemo(() => ({ value: message }), []);
  const propsChanged = prevMessage.value !== message;
  prevMessage.value = message;

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Unmemoized Child</Typography>
          <RenderCounter label="Child" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This component re-renders every time the parent re-renders, even when its props haven't changed.
        </Typography>
        <Box sx={{ mb: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Props changed?{' '}
            <Chip
              label={propsChanged ? 'YES' : 'NO'}
              size="small"
              color={propsChanged ? 'error' : 'success'}
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Message: <strong>{message}</strong>
          </Typography>
        </Box>
        <Button variant="outlined" onClick={onClick} fullWidth>
          Click Me
        </Button>
      </CardContent>
    </Card>
  );
}

// Memoized child component
const MemoizedChild = memo(function MemoizedChild({ onClick, message }: { onClick: () => void; message: string }) {
  const prevMessage = useMemo(() => ({ value: message }), []);
  const propsChanged = prevMessage.value !== message;
  prevMessage.value = message;

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Memoized Child</Typography>
          <RenderCounter label="Child" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This component only re-renders when its props actually change (thanks to React.memo).
        </Typography>
        <Box sx={{ mb: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Props changed?{' '}
            <Chip
              label={propsChanged ? 'YES' : 'NO'}
              size="small"
              color={propsChanged ? 'error' : 'success'}
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Message: <strong>{message}</strong>
          </Typography>
        </Box>
        <Button variant="outlined" onClick={onClick} fullWidth>
          Click Me
        </Button>
      </CardContent>
    </Card>
  );
});

// Component with expensive calculation
function ExpensiveComponent({ count, useMemoization }: { count: number; useMemoization: boolean }) {
  const calcCountRef = useMemo(() => ({ count: 0 }), []);

  // Always call useMemo (Rules of Hooks), but conditionally use its result
  const memoizedValue = useMemo(() => {
    calcCountRef.count++;
    return expensiveCalculation(count);
  }, [count]);

  // If useMemoization is off, recalculate on every render
  const unmemoizedValue = (() => {
    if (!useMemoization) {
      calcCountRef.count++;
      return expensiveCalculation(count);
    }
    return 0; // Not used
  })();

  const expensiveValue = useMemoization ? memoizedValue : unmemoizedValue;

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Expensive Calculation</Typography>
          <RenderCounter label="Component" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {useMemoization
            ? 'Using useMemo: Calculation only runs when count changes'
            : 'Without useMemo: Calculation runs on every render'}
        </Typography>
        <Box sx={{ mb: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Calculation runs:{' '}
            <Chip
              label={`${calcCountRef.count} times`}
              size="small"
              color={calcCountRef.count > 3 ? 'error' : calcCountRef.count > 1 ? 'warning' : 'success'}
              sx={{ ml: 1, fontFamily: 'monospace' }}
            />
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Result: <strong>{expensiveValue.toFixed(4)}</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function MemoDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [childMessage, setChildMessage] = useState('Hello');
  const [useMemoization, setUseMemoization] = useState(true);
  const [useCallbackMemo, setUseCallbackMemo] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  // Stable callback with useCallback
  const stableCallback = useCallback(() => {
    console.log('Stable callback called');
  }, []);

  // Unstable callback (new function on every render)
  const unstableCallback = () => {
    console.log('Unstable callback called');
  };

  const handleReset = () => {
    setCount(0);
    setText('');
    setUnrelatedState(0);
    setChildMessage('Hello');
    setResetKey((k) => k + 1); // Force remount to reset counters
  };

  const handleChangeMessage = () => {
    setChildMessage((prev) => (prev === 'Hello' ? 'World' : 'Hello'));
  };

  const memoCode = `import { memo } from 'react';

// Without React.memo - re-renders on every parent render
function UnmemoizedChild({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

// With React.memo - only re-renders when props change
const MemoizedChild = memo(function MemoizedChild({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
});`;

  const useCallbackCode = `import { useCallback } from 'react';

function Parent() {
  // ❌ New function on every render
  const unstableCallback = () => {
    console.log('Called');
  };

  // ✅ Stable function reference
  const stableCallback = useCallback(() => {
    console.log('Called');
  }, []); // Empty deps = never changes

  return <MemoizedChild onClick={stableCallback} />;
}`;

  const useMemoCode = `import { useMemo } from 'react';

function Component({ count }) {
  // ❌ Runs on every render
  const result = expensiveCalculation(count);

  // ✅ Only runs when count changes
  const memoizedResult = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  return <div>{memoizedResult}</div>;
}`;

  return (
    <DemoContainer
      title="Memoization Demo"
      description="Understand what causes re-renders and how React.memo, useCallback, and useMemo prevent unnecessary work"
    >
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎯 Try This: Interact with the controls below
          </Typography>
          <Typography variant="body2">
            Watch the render counters to see which components re-render. Toggle memoization on/off to see the difference!
          </Typography>
        </Alert>

        {/* Parent Component Card */}
        <Card key={resetKey} sx={{ mb: 3, bgcolor: 'action.hover' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Parent Component</Typography>
              <RenderCounter label="Parent" />
            </Box>

            {/* Controls */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<Remove />}
                    onClick={() => setCount((c) => c - 1)}
                  >
                    Decrement
                  </Button>
                  <Typography variant="h6" sx={{ minWidth: 60, textAlign: 'center' }}>
                    {count}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setCount((c) => c + 1)}
                  >
                    Increment
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Changes count state (affects expensive calculation)
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Text Input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type something..."
                  size="small"
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Changes text state (unrelated to children)
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => setUnrelatedState((s) => s + 1)}
                  fullWidth
                >
                  Trigger Unrelated Re-render ({unrelatedState})
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Changes state that doesn't affect any child props
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleChangeMessage}
                  fullWidth
                >
                  Change Child Message: "{childMessage}"
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Changes the message prop passed to child
                </Typography>
              </Grid>
            </Grid>

            {/* Settings */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useCallbackMemo}
                    onChange={(e) => setUseCallbackMemo(e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      {useCallbackMemo ? '✅ React.memo + useCallback' : '❌ No Memoization'}
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={useMemoization}
                    onChange={(e) => setUseMemoization(e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      {useMemoization ? '✅ useMemo ON' : '❌ useMemo OFF'}
                    </Typography>
                  </Box>
                }
              />
              <Button variant="text" onClick={handleReset} size="small">
                Reset Counters
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Child Components */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {useCallbackMemo ? (
              <MemoizedChild onClick={stableCallback} message={childMessage} />
            ) : (
              <UnmemoizedChild onClick={unstableCallback} message={childMessage} />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ExpensiveComponent count={count} useMemoization={useMemoization} />
          </Grid>
        </Grid>

        {/* Explanation Alert */}
        <Alert severity={useCallbackMemo ? 'success' : 'warning'} sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {useCallbackMemo ? '✅ With Memoization:' : '❌ Without Memoization:'}
          </Typography>
          {useCallbackMemo ? (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Child component</strong> only re-renders when its props actually change
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Try typing in text field or "Trigger Unrelated Re-render" - child doesn't re-render
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Click "Change Child Message" - child DOES re-render (props actually changed!)
              </Typography>
              <Typography variant="body2">
                • Notice: "Props changed?" shows NO for unrelated changes, YES when message changes
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Child component</strong> re-renders every time the parent re-renders
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Try typing in text field or "Trigger Unrelated Re-render" - child re-renders unnecessarily
              </Typography>
              <Typography variant="body2">
                • Notice: "Props changed?" shows YES every time (new callback = new reference)
              </Typography>
            </>
          )}
        </Alert>

        <Alert severity={useMemoization ? 'success' : 'warning'} sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {useMemoization ? '✅ With useMemo:' : '❌ Without useMemo:'}
          </Typography>
          {useMemoization ? (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Expensive calculation</strong> only runs when count changes
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Try typing in text field - "Calculation runs" counter stays the same
              </Typography>
              <Typography variant="body2">
                • Click increment/decrement - counter increases (count changed, so calculation re-runs)
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Expensive calculation</strong> runs on every render
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Try typing in text field - "Calculation runs" counter increases unnecessarily
              </Typography>
              <Typography variant="body2">
                • Watch the counter grow even though count hasn't changed!
              </Typography>
            </>
          )}
        </Alert>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ℹ️ Why do counters start at 2?
          </Typography>
          <Typography variant="body2">
            React's Strict Mode (enabled in development) intentionally renders components twice to help detect bugs. In production builds, everything runs once. The key insight is the <strong>difference</strong> between memoized and unmemoized behavior, not the absolute numbers.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        {/* Code Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Implementation
          </Typography>

          <CodeBlock title="React.memo - Prevent Unnecessary Re-renders" code={memoCode} language="typescript" />

          <CodeBlock title="useCallback - Stable Function References" code={useCallbackCode} language="typescript" />

          <CodeBlock title="useMemo - Cache Expensive Calculations" code={useMemoCode} language="typescript" />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Explanation */}
        <Box>
          <Typography variant="h6" gutterBottom>
            When to Use Memoization
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              ⚠️ Don't Memoize Everything!
            </Typography>
            <Typography variant="body2">
              Memoization has overhead. Only use it when you have measurable performance issues or expensive operations.
            </Typography>
          </Alert>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Use React.memo when:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Component re-renders often with the same props
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            • Component is expensive to render (complex UI, many children)
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Use useCallback when:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Passing callbacks to memoized child components
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            • Callback is used as a dependency in useEffect or useMemo
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Use useMemo when:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Calculation is genuinely expensive (loops, sorting, filtering large arrays)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Creating objects/arrays that are used as dependencies
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Value is passed to memoized components as a prop
          </Typography>
        </Box>
      </DemoContainer>
  );
}
