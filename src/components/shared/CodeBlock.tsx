import { Box, Typography, Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme as useMuiTheme } from '@mui/material/styles';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

/**
 * Displays syntax-highlighted code with theme support
 */
export default function CodeBlock({ code, language = 'typescript', title }: CodeBlockProps) {
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ my: 2 }}>
      {title && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      <Paper elevation={0} sx={{ overflow: 'hidden', border: 1, borderColor: 'divider' }}>
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '0.875rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Paper>
    </Box>
  );
}
