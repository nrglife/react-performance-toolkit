import { type ReactNode } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

interface DemoContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Consistent container for all demos
 * Provides standard layout and spacing
 */
export default function DemoContainer({ title, description, children }: DemoContainerProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </Container>
  );
}
