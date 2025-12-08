import { useState, createContext, useContext, memo } from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
  Divider,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { useRenderCount } from '../../hooks/useRenderCount';
import { useRenderFlash } from '../../hooks/useRenderFlash';

// Create a context for demonstrating context-based re-renders
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

// Component that re-renders due to STATE changes
function StateComponent() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCount();
  const { elementRef } = useRenderFlash();

  return (
    <Card
      ref={elementRef}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">State Component</Typography>
            <Chip
              label={`Renders: ${renderCount}`}
              color="primary"
              size="small"
              sx={{ fontFamily: 'monospace' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Re-renders when its own state changes
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Count: <strong>{count}</strong>
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setCount(count + 1)}
            >
              Increment State
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Child component that re-renders due to PROP changes
function PropChild({ value }: { value: number }) {
  const renderCount = useRenderCount();
  const { elementRef } = useRenderFlash();

  return (
    <Card
      ref={elementRef}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Prop Child</Typography>
            <Chip
              label={`Renders: ${renderCount}`}
              color="secondary"
              size="small"
              sx={{ fontFamily: 'monospace' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Re-renders when parent passes new props
          </Typography>
          <Typography variant="body2">
            Received value: <strong>{value}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Memoized child that DOESN'T re-render unless props change
const MemoizedPropChild = memo(PropChild);

// Parent component that demonstrates prop-based re-renders
function PropParent() {
  const [parentCount, setParentCount] = useState(0);
  const [childValue, setChildValue] = useState(0);
  const renderCount = useRenderCount();
  const { elementRef } = useRenderFlash();

  return (
    <Card
      ref={elementRef}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Prop Parent</Typography>
            <Chip
              label={`Renders: ${renderCount}`}
              color="info"
              size="small"
              sx={{ fontFamily: 'monospace' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Parent state: <strong>{parentCount}</strong>
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setParentCount(parentCount + 1)}
            >
              Update Parent Only
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => setChildValue(childValue + 1)}
            >
              Update Child Prop
            </Button>
          </Stack>
          <Divider />
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Regular Child (re-renders on parent update):
            </Typography>
            <PropChild value={childValue} />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Memoized Child (only re-renders when prop changes):
            </Typography>
            <MemoizedPropChild value={childValue} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Component that re-renders due to CONTEXT changes
function ContextConsumer() {
  const { theme } = useContext(ThemeContext);
  const renderCount = useRenderCount();
  const { elementRef } = useRenderFlash();

  return (
    <Card
      ref={elementRef}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Context Consumer</Typography>
            <Chip
              label={`Renders: ${renderCount}`}
              color="success"
              size="small"
              sx={{ fontFamily: 'monospace' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Re-renders when context value changes
          </Typography>
          <Typography variant="body2">
            Current theme: <strong>{theme}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Component that doesn't consume context (won't re-render)
// IMPORTANT: We memoize this so it doesn't re-render when parent re-renders
const NonContextConsumer = memo(function NonContextConsumer() {
  const renderCount = useRenderCount();
  const { elementRef } = useRenderFlash();

  return (
    <Card
      ref={elementRef}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Non-Consumer (Memoized)</Typography>
            <Chip
              label={`Renders: ${renderCount}`}
              color="default"
              size="small"
              sx={{ fontFamily: 'monospace' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Doesn't consume context + memoized (won't re-render)
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});

// Wrapper component that manages context state
// This isolates context re-renders from the rest of the demo
function ContextDemo() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Context Provider
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Current theme: <strong>{theme}</strong>
              </Typography>
              <Button variant="contained" onClick={toggleTheme} fullWidth>
                Toggle Theme Context
              </Button>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
                Components inside this provider:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ContextConsumer />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <NonContextConsumer />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </ThemeContext.Provider>
  );
}

export default function VisualizerDemo() {

  const stateCode = `function StateComponent() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCount();

  return (
    <div>
      <p>Renders: {renderCount}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// ✅ Re-renders when: count state changes
// ❌ Doesn't re-render when: parent re-renders (if memoized)`;

  const propCode = `function Parent() {
  const [value, setValue] = useState(0);
  return <Child value={value} />;
}

function Child({ value }) {
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}, Value: {value}</div>;
}

// ✅ Child re-renders when: value prop changes
// ✅ Child re-renders when: parent re-renders (even if props same!)
// 💡 Use React.memo to prevent unnecessary re-renders:

const MemoizedChild = memo(Child);
// Now only re-renders when value actually changes`;

  const contextCode = `const ThemeContext = createContext({ theme: 'light' });

function ContextConsumer() {
  const { theme } = useContext(ThemeContext);
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}, Theme: {theme}</div>;
}

// IMPORTANT: Memoize to prevent re-renders when parent re-renders
const NonConsumer = memo(function NonConsumer() {
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}</div>;
});

function ContextDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ContextConsumer />  {/* Re-renders on theme change */}
      <NonConsumer />      {/* Doesn't re-render (memoized) */}
    </ThemeContext.Provider>
  );
}

// ✅ Consumer re-renders when: context value changes
// ❌ Non-consumer doesn't re-render: memoized + no context usage
// 💡 Without memo, NonConsumer would re-render when parent re-renders!`;

  const flashHookCode = `function useRenderFlash(duration = 500, color = '#ffeb3b') {
  const elementRef = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;

    // Skip flash on initial render
    if (renderCount.current === 1) return;

    // Apply flash effect
    if (elementRef.current) {
      elementRef.current.style.backgroundColor = color;
      setTimeout(() => {
        elementRef.current.style.backgroundColor = '';
      }, duration);
    }
  });

  return { elementRef };
}

// Usage:
function MyComponent() {
  const { elementRef } = useRenderFlash();
  return <div ref={elementRef}>I flash on re-render!</div>;
}`;

  return (
    <DemoContainer
      title="Re-render Visualizer Demo"
      description="See WHY React components re-render with visual flash effects and render counters"
    >
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎯 Try This: Click the buttons and watch components flash
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Components flash <strong>yellow</strong> when they re-render. Watch the render counters increase!
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
            💡 Notice: Some components re-render even when their data doesn't change
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            📚 The 3 Reasons React Re-renders:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. <strong>State changes</strong> - Component's own useState/useReducer updates
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. <strong>Prop changes</strong> - Parent passes new props (or parent re-renders)
          </Typography>
          <Typography variant="body2">
            3. <strong>Context changes</strong> - useContext value updates
          </Typography>
        </Alert>

        {/* Demo Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* State-based re-renders */}
          <Grid size={{ xs: 12, md: 6 }}>
            <StateComponent />
          </Grid>

          {/* Prop-based re-renders */}
          <Grid size={{ xs: 12, md: 6 }}>
            <PropParent />
          </Grid>
        </Grid>

        {/* Context-based re-renders - isolated in its own component */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Context-Based Re-renders
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Key Point:</strong> The Non-Consumer is <strong>memoized with React.memo</strong>
            </Typography>
            <Typography variant="body2">
              Without memo, it would re-render when its parent re-renders (even though it doesn't use context).
              With memo, it only re-renders if its props change.
            </Typography>
          </Alert>
          <ContextDemo />
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Code Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Understanding Re-renders
          </Typography>

          <CodeBlock
            title="1️⃣ State-Based Re-renders"
            code={stateCode}
            language="typescript"
          />

          <CodeBlock
            title="2️⃣ Prop-Based Re-renders"
            code={propCode}
            language="typescript"
          />

          <CodeBlock
            title="3️⃣ Context-Based Re-renders"
            code={contextCode}
            language="typescript"
          />

          <CodeBlock
            title="🎨 Visual Flash Effect Hook"
            code={flashHookCode}
            language="typescript"
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Explanation */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Key Takeaways
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              ✅ When Re-renders Are Good
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • State changes that affect what's displayed
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Prop changes that require UI updates
            </Typography>
            <Typography variant="body2">
              • Context changes that components actually use
            </Typography>
          </Alert>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              ⚠️ When Re-renders Are Wasteful
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Parent re-renders but child props haven't changed → Use React.memo
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Expensive calculations run on every render → Use useMemo
            </Typography>
            <Typography variant="body2">
              • Functions recreated on every render → Use useCallback
            </Typography>
          </Alert>

          <Alert severity="error">
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              ❌ Common Mistakes
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • <strong>Over-optimizing:</strong> Don't memo everything! Only optimize when needed.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • <strong>Context overuse:</strong> Putting everything in context causes widespread re-renders.
            </Typography>
            <Typography variant="body2">
              • <strong>Inline objects/arrays as props:</strong> Creates new references every render.
            </Typography>
          </Alert>
        </Box>
      </DemoContainer>
  );
}
