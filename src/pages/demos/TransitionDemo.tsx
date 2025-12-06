import { useState, useTransition, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { useMockData } from '../../hooks/useMockData';
import { expensiveFilter } from '../../utils/expensiveCalculation';

export default function TransitionDemo() {
  const { data, loading, error } = useMockData();
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  // Use only first 100 items for minimal demo
  const items = useMemo(() => data?.small.slice(0, 100) || [], [data]);

  // Filter items using expensive operation
  const filteredItems = useMemo(() => {
    if (!filter) return items;
    return expensiveFilter(items, filter);
  }, [items, filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Update input immediately (urgent update - keeps input responsive)
    setInputValue(value);

    // Update filter in a transition (non-urgent update - triggers expensive filtering)
    startTransition(() => {
      setFilter(value);
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        useTransition Demo (Minimal)
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is a minimal demo with 100 items. Type in the filter to see useTransition in action!
        Notice how the input stays responsive even during filtering.
      </Alert>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Filter items"
            value={inputValue}
            onChange={handleFilterChange}
            placeholder="Type to filter..."
            variant="outlined"
          />
          {isPending && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Filtering...
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredItems.length} of {items.length} items
        </Typography>

        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredItems.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={item.name}
                secondary={`Category: ${item.category} | Value: ${item.value}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          How it works:
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • The input field updates immediately (urgent update)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • The filtering operation is wrapped in startTransition (non-urgent update)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • React keeps the UI responsive by prioritizing the input over filtering
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • The isPending indicator shows when the transition is in progress
        </Typography>
      </Box>
    </Container>
  );
}
