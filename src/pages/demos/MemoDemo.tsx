import { Container, Typography, Alert } from '@mui/material';

export default function MemoDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Memoization Demo
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        Coming soon in Phase 2! This demo will show React.memo, useMemo, and useCallback in action.
      </Alert>
    </Container>
  );
}
