import { useState, useDeferredValue, useMemo, useEffect, useRef } from 'react';
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
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Speed, Timer } from '@mui/icons-material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { useMockData } from '../../hooks/useMockData';
import { expensiveFilter } from '../../utils/expensiveCalculation';

export default function DeferredDemo() {
  const { data, loading, error } = useMockData();
  const [useOptimization, setUseOptimization] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  // Deferred value lags behind the actual input
  const deferredSearch = useDeferredValue(searchValue);

  // Check if we're showing stale results
  const isStale = searchValue !== deferredSearch;

  // Track metrics
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [staleCount, setStaleCount] = useState(0);
  const staleStartTime = useRef<number>(0);
  const [totalStaleTime, setTotalStaleTime] = useState(0);

  // Track when we become stale
  useEffect(() => {
    if (isStale && useOptimization) {
      if (staleStartTime.current === 0) {
        staleStartTime.current = performance.now();
        setStaleCount((prev) => prev + 1);
      }
    } else if (!isStale && staleStartTime.current > 0) {
      // Just became fresh again
      const staleTime = performance.now() - staleStartTime.current;
      setTotalStaleTime((prev) => prev + staleTime);
      staleStartTime.current = 0;
    }
  }, [isStale, useOptimization]);

  // Use 10,000 items for full demo
  const items = useMemo(() => data?.medium || [], [data]);

  // Filter items using the deferred value (or immediate value in baseline)
  const filteredItems = useMemo(() => {
    const valueToUse = useOptimization ? deferredSearch : searchValue;
    if (!valueToUse) return items;
    return expensiveFilter(items, valueToUse);
  }, [items, useOptimization ? deferredSearch : searchValue, useOptimization]);

  if (loading) {
    return (
      <DemoContainer title="useDeferredValue Demo">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </DemoContainer>
    );
  }

  if (error) {
    return (
      <DemoContainer title="useDeferredValue Demo">
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </DemoContainer>
    );
  }

  const optimizedCode = `const [searchValue, setSearchValue] = useState('');
const deferredSearch = useDeferredValue(searchValue);

// Input updates immediately
const handleChange = (e) => {
  setSearchValue(e.target.value);
};

// Filtering uses deferred value (lags behind)
const filteredItems = useMemo(() => {
  if (!deferredSearch) return items;
  return expensiveFilter(items, deferredSearch);
}, [items, deferredSearch]);

// Check if showing stale results
const isStale = searchValue !== deferredSearch;`;

  const baselineCode = `const [searchValue, setSearchValue] = useState('');

// Input updates, but waits for filtering
const handleChange = (e) => {
  setSearchValue(e.target.value);
};

// Filtering uses immediate value (blocks UI)
const filteredItems = useMemo(() => {
  if (!searchValue) return items;
  return expensiveFilter(items, searchValue);
}, [items, searchValue]);`;

  return (
    <DemoContainer
      title="useDeferredValue Demo"
      description="See how useDeferredValue keeps input responsive by deferring expensive updates"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Type quickly in the search field below
        </Typography>
        <Typography variant="body2">
          This demo searches through <strong>{items.length.toLocaleString()} items</strong>. Toggle between modes and <strong>feel</strong> the difference in responsiveness!
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
                setSearchValue('');
                setKeystrokeCount(0);
                setStaleCount(0);
                setTotalStaleTime(0);
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
                label={useOptimization ? 'useDeferredValue' : 'Baseline'}
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
          {useOptimization ? '✅ With useDeferredValue:' : '❌ Without useDeferredValue:'}
        </Typography>
        <Typography variant="body2">
          {useOptimization
            ? 'Search input feels smooth and responsive. You can type quickly without lag. Results update shortly after you stop typing.'
            : 'Search input feels sluggish and laggy. Each keystroke waits for the expensive search to complete before updating.'}
        </Typography>
      </Alert>

      {/* Metrics */}
      {useOptimization && keystrokeCount > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Speed color="primary" />
                  <Typography variant="subtitle2">Keystrokes</Typography>
                </Box>
                <Typography variant="h4">{keystrokeCount}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Total characters typed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Timer color="warning" />
                  <Typography variant="subtitle2">Stale Periods</Typography>
                </Box>
                <Typography variant="h4">{staleCount}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Times results lagged behind
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Timer color="primary" />
                  <Typography variant="subtitle2">Avg Stale Time</Typography>
                </Box>
                <Typography variant="h4">
                  {staleCount > 0 ? (totalStaleTime / staleCount).toFixed(0) : '0'}ms
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  How long results lag behind
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Search Input */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Search items"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setKeystrokeCount((prev) => prev + 1);
            }}
            placeholder="Type to search... (try typing quickly!)"
            variant="outlined"
          />
          {isStale && useOptimization && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Searching...
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Showing {filteredItems.length.toLocaleString()} of {items.length.toLocaleString()}{' '}
          items
          {isStale && useOptimization && (
            <Chip
              label="Stale results"
              size="small"
              color="warning"
              sx={{ ml: 1 }}
            />
          )}
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
          title="✅ Optimized (with useDeferredValue)"
          code={optimizedCode}
          language="typescript"
        />

        <CodeBlock title="❌ Baseline (without useDeferredValue)" code={baselineCode} language="typescript" />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How it works
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Immediate input:</strong> Search field updates instantly as you type
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Deferred filtering:</strong> Expensive search uses the deferred value
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Stale indicator:</strong> Shows when results are catching up to your typing
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          • <strong>useMemo optimization:</strong> Recalculates only when deferred value changes
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            💡 useDeferredValue vs useTransition
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>useDeferredValue:</strong> Use when you want to defer a <em>value</em> (like search input). The value "lags behind" the actual state.
          </Typography>
          <Typography variant="body2">
            <strong>useTransition:</strong> Use when you want to defer a <em>state update</em> (like setting filter state). You control when the transition starts.
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
