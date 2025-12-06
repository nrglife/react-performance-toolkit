import { Container, Typography, Alert } from '@mui/material';

export default function VirtualizedDemo() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Virtualized List Demo
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        Coming soon in Phase 2! This demo will show how react-window handles large lists
        efficiently.
      </Alert>
    </Container>
  );
}
