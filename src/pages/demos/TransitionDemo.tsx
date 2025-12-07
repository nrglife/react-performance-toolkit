import { useState, useTransition, useMemo } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { useMockData } from '../../hooks/useMockData';
import { expensiveFilter } from '../../utils/expensiveCalculation';

export default function TransitionDemo() {
  const { data, loading, error } = useMockData();
  const [useOptimization, setUseOptimization] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  // Use 10,000 items for full demo
  const items = useMemo(() => data?.medium || [], [data]);

  // Filter items using expensive operation
  const filteredItems = useMemo(() => {
    if (!filter) return items;
    return expensiveFilter(items, filter);
  }, [items, filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (useOptimization) {
      // Optimized: Separate urgent and non-urgent updates
      setInputValue(value);
      startTransition(() => {
        setFilter(value);
      });
    } else {
      // Baseline: Both updates are urgent (blocks UI)
      setInputValue(value);
      setFilter(value);
    }
  };

  if (loading) {
    return (
      <DemoContainer title="useTransition Demo">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </DemoContainer>
    );
  }

  if (error) {
    return (
      <DemoContainer title="useTransition Demo">
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </DemoContainer>
    );
  }

  const optimizedCode = `const [inputValue, setInputValue] = useState('');
const [filter, setFilter] = useState('');
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;

  // Urgent: Update input immediately
  setInputValue(value);

  // Non-urgent: Defer expensive filtering
  startTransition(() => {
    setFilter(value);
  });
};`;

  const baselineCode = `const [inputValue, setInputValue] = useState('');
const [filter, setFilter] = useState('');

const handleChange = (e) => {
  const value = e.target.value;

  // Both updates are urgent - blocks UI!
  setInputValue(value);
  setFilter(value);
};`;

  return (
    <DemoContainer
      title="useTransition Demo"
      description="Compare UI responsiveness with and without React 18's useTransition hook"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Type quickly in the input field below
        </Typography>
        <Typography variant="body2">
          This demo filters <strong>{items.length.toLocaleString()} items</strong>. Toggle between modes and <strong>feel</strong> the difference in responsiveness!
        </Typography>
      </Alert>

      {/* Controls */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={useOptimization}
              onChange={(e) => {
                setUseOptimization(e.target.checked);
                setInputValue('');
                setFilter('');
              }}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">
                {useOptimization ? '✅ Optimization ON' : '❌ Optimization OFF'}
              </Typography>
              <Chip
                label={useOptimization ? 'useTransition' : 'Baseline'}
                size="small"
                color={useOptimization ? 'success' : 'default'}
              />
            </Box>
          }
        />
      </Box>

      {/* What to Expect */}
      <Alert severity={useOptimization ? 'success' : 'warning'} sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {useOptimization ? '✅ With useTransition:' : '❌ Without useTransition:'}
        </Typography>
        <Typography variant="body2">
          {useOptimization
            ? 'Input feels smooth and responsive. You can type quickly without lag. The filtering happens in the background.'
            : 'Input feels sluggish and laggy. Each keystroke waits for the expensive filtering to complete before updating.'}
        </Typography>
      </Alert>

      {/* Filter Input */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Filter items"
            value={inputValue}
            onChange={handleFilterChange}
            placeholder="Type to filter... (try typing quickly!)"
            variant="outlined"
          />
          {isPending && useOptimization && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Filtering...
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Showing {filteredItems.length.toLocaleString()} of {items.length.toLocaleString()}{' '}
          items
        </Typography>
      </Box>

      {/* Results List */}
      <List sx={{ maxHeight: 400, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
        {filteredItems.slice(0, 50).map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={item.name}
              secondary={`Category: ${item.category} | Value: ${item.value}`}
            />
          </ListItem>
        ))}
        {filteredItems.length > 50 && (
          <ListItem>
            <ListItemText
              secondary={`... and ${(filteredItems.length - 50).toLocaleString()} more items`}
            />
          </ListItem>
        )}
      </List>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Implementation
        </Typography>

        <CodeBlock
          title="✅ Optimized (with useTransition)"
          code={optimizedCode}
          language="typescript"
        />

        <CodeBlock title="❌ Baseline (without useTransition)" code={baselineCode} language="typescript" />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How it works
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Urgent updates:</strong> Input field updates immediately for responsive typing
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Non-urgent updates:</strong> Expensive filtering wrapped in startTransition
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Concurrent rendering:</strong> React can interrupt filtering to keep UI responsive
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          • <strong>isPending:</strong> Shows when transition is in progress
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            💡 Key Insight: It's About User Experience, Not Metrics
          </Typography>
          <Typography variant="body2">
            useTransition doesn't make your code faster or reduce renders. It makes your UI <strong>feel</strong> more responsive by prioritizing user input over expensive background work. The difference is in the experience, not the numbers.
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
