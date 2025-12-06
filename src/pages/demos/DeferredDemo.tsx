import { Container, Typography, Alert } from '@mui/material';

export default function DeferredDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        useDeferredValue Demo
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        Coming soon in Phase 2! This demo will show how useDeferredValue keeps UI responsive during
        expensive filtering.
      </Alert>
    </Container>
  );
}
