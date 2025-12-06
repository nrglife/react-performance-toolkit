import { Container, Typography, Box, Alert } from '@mui/material';

export default function TransitionDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        useTransition Demo
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        Coming soon in Phase 1, Task 9! This demo will show how useTransition prevents UI blocking
        during expensive operations.
      </Alert>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          This demo will demonstrate React 18's useTransition hook for non-blocking UI updates.
        </Typography>
      </Box>
    </Container>
  );
}
