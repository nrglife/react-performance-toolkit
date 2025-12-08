import { useState } from 'react';
import { Button, Alert, Typography, Box } from '@mui/material';
import { BugReport } from '@mui/icons-material';

/**
 * ErrorTester Component
 *
 * A development-only component for testing error boundaries.
 * Click the button to intentionally throw an error and see how the error boundary catches it.
 *
 * This component demonstrates:
 * 1. How errors propagate up the component tree
 * 2. How error boundaries catch and handle them
 * 3. The difference between caught and uncaught errors
 */
export default function ErrorTester() {
  const [shouldThrow, setShouldThrow] = useState(false);

  // This will throw an error during render
  if (shouldThrow) {
    throw new Error('💥 Test error thrown intentionally! This error should be caught by the ErrorBoundary.');
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Alert severity="warning" icon={<BugReport />}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🧪 Error Boundary Test (Development Only)
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Click the button below to intentionally throw an error. The error boundary will catch it and display a fallback UI.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => setShouldThrow(true)}
        >
          Throw Test Error
        </Button>
      </Alert>
    </Box>
  );
}
