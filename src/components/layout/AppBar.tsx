import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Speed } from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';

export default function AppBar() {
  return (
    <MuiAppBar position="sticky" elevation={1}>
      <Toolbar>
        <Speed sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 600,
          }}
        >
          React Performance Toolkit
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
