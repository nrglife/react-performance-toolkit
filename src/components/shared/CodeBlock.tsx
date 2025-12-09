import React, { lazy, Suspense } from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';

// Lazy load the syntax highlighter to reduce initial bundle size
// This component is only used in demo pages, not on the home page
const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then((mod) => ({
    default: mod.Prism,
  }))
);

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

/**
 * Displays syntax-highlighted code with theme support
 *
 * Performance optimization: The syntax highlighter library (~640 KB) is lazy loaded
 * only when this component renders, reducing the initial bundle size significantly.
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
        <Suspense
          fallback={
            <Box sx={{ p: 2 }}>
              <Skeleton variant="rectangular" height={100} />
            </Box>
          }
        >
          <SyntaxHighlighterWrapper
            code={code}
            language={language}
            isDark={isDark}
          />
        </Suspense>
      </Paper>
    </Box>
  );
}

/**
 * Wrapper component to handle dynamic style loading
 * Separated to keep the lazy loading logic clean
 */
function SyntaxHighlighterWrapper({
  code,
  language,
  isDark,
}: {
  code: string;
  language: string;
  isDark: boolean;
}) {
  // Import styles dynamically based on theme
  const [style, setStyle] = React.useState<any>(null);

  React.useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then((styles) => {
      setStyle(isDark ? styles.vscDarkPlus : styles.vs);
    });
  }, [isDark]);

  if (!style) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" height={100} />
      </Box>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      customStyle={{
        margin: 0,
        borderRadius: 0,
        fontSize: '0.875rem',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
