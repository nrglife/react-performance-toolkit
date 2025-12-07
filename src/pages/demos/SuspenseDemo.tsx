import { useState, Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Alert,
  Button,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Chip,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { fetchUser, type User } from '../../utils/mockApi';
import { wrapPromise } from '../../utils/wrapPromise';

// Pure React Suspense approach - wraps promise for Suspense
function createUserResource(userId: number) {
  return wrapPromise(fetchUser(userId));
}

// TanStack Query component - uses useSuspenseQuery
function TanStackQueryUser({ userId }: { userId: number }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {user.role}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Pure React Suspense component - reads from resource
function PureReactUser({ resource }: { resource: { read(): User } }) {
  const user = resource.read(); // This throws promise while loading!

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {user.role}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SuspenseDemo() {
  const [tanstackUserId, setTanstackUserId] = useState(1);
  const [pureReactUserId, setPureReactUserId] = useState(1);
  const [pureReactResource, setPureReactResource] = useState(() => createUserResource(1));

  const handleTanstackRefetch = () => {
    const nextId = (tanstackUserId % 3) + 1;
    setTanstackUserId(nextId);
  };

  const handlePureReactRefetch = () => {
    const nextId = (pureReactUserId % 3) + 1;
    setPureReactUserId(nextId);
    setPureReactResource(createUserResource(nextId));
  };

  const tanstackCode = `import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  // useSuspenseQuery automatically suspends while loading
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>;
}

// Wrap in Suspense boundary
<Suspense fallback={<Loading />}>
  <UserProfile userId={1} />
</Suspense>

// ✅ Benefits:
// - Automatic caching and refetching
// - Built-in error handling
// - DevTools for debugging
// - Production-ready`;

  const pureReactCode = `import { wrapPromise } from './utils/wrapPromise';

// Create resource outside component
const userResource = wrapPromise(fetchUser(1));

function UserProfile({ resource }) {
  // read() throws promise while loading - Suspense catches it!
  const user = resource.read();
  return <div>{user.name}</div>;
}

// Wrap in Suspense boundary
<Suspense fallback={<Loading />}>
  <UserProfile resource={userResource} />
</Suspense>

// ✅ Benefits:
// - Educational: shows how Suspense works
// - No dependencies needed
// - Full control over data flow`;

  const wrapPromiseCode = `function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender; // Suspense catches this!
      }
      return result;
    },
  };
}

// This is the "magic" behind Suspense:
// - Component throws a promise
// - React catches it and shows fallback
// - When promise resolves, React re-renders component`;

  return (
    <DemoContainer
      title="Suspense Demo"
      description="Compare TanStack Query (production) vs Pure React Suspense (educational) approaches to data loading"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Click the "Load Next User" buttons
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Watch how both approaches handle loading states automatically. No manual loading flags needed!
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
          💡 Notice: The loading spinner appears automatically while data fetches (1-2 second delay)
        </Typography>
      </Alert>

      {/* Side-by-side comparison */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* TanStack Query */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6">TanStack Query</Typography>
              <Chip label="Production" color="success" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Recommended for real applications. Includes caching, refetching, and error handling.
            </Typography>
            <Button
              variant="contained"
              onClick={handleTanstackRefetch}
              sx={{ mb: 2 }}
            >
              Load Next User (ID: {(tanstackUserId % 3) + 1})
            </Button>
            <Suspense
              fallback={
                <Card>
                  <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </CardContent>
                </Card>
              }
            >
              <TanStackQueryUser userId={tanstackUserId} />
            </Suspense>
          </Box>
        </Grid>

        {/* Pure React Suspense */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6">Pure React Suspense</Typography>
              <Chip label="Educational" color="primary" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Shows how Suspense works under the hood. Great for learning, not for production.
            </Typography>
            <Button
              variant="contained"
              onClick={handlePureReactRefetch}
              sx={{ mb: 2 }}
            >
              Load Next User (ID: {(pureReactUserId % 3) + 1})
            </Button>
            <Suspense
              fallback={
                <Card>
                  <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </CardContent>
                </Card>
              }
            >
              <PureReactUser resource={pureReactResource} />
            </Suspense>
          </Box>
        </Grid>
      </Grid>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          ✅ What Makes Suspense Special
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>No loading state management:</strong> No useState(loading) needed
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Declarative:</strong> Just wrap components in Suspense boundary
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Composable:</strong> Multiple components can suspend independently
        </Typography>
        <Typography variant="body2">
          • <strong>Automatic:</strong> React handles showing/hiding fallback UI
        </Typography>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Implementation Comparison
        </Typography>

        <CodeBlock
          title="✅ TanStack Query (Recommended for Production)"
          code={tanstackCode}
          language="typescript"
        />

        <CodeBlock
          title="🎓 Pure React Suspense (Educational)"
          code={pureReactCode}
          language="typescript"
        />

        <CodeBlock
          title="🔍 How wrapPromise Works (The Magic Behind Suspense)"
          code={wrapPromiseCode}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Understanding Suspense
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            🤔 How Does Suspense Work?
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. Component tries to read data that's not ready yet
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. Component <strong>throws a promise</strong> (yes, really!)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            3. React catches the thrown promise
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            4. React shows the fallback UI (loading spinner)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            5. When promise resolves, React re-renders the component
          </Typography>
          <Typography variant="body2">
            6. Component reads data successfully and renders
          </Typography>
        </Alert>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          When to Use Each Approach
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ✅ Use TanStack Query When:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Building a production application
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • You need caching, refetching, and error handling
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • You want DevTools for debugging
          </Typography>
          <Typography variant="body2">
            • You need features like pagination, infinite scroll, etc.
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎓 Use Pure React Suspense When:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Learning how Suspense works under the hood
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Building a simple demo or prototype
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • You want full control over data fetching
          </Typography>
          <Typography variant="body2">
            • You're integrating with a custom data layer
          </Typography>
        </Alert>

        <Alert severity="error">
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚠️ Common Mistakes to Avoid
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Creating resources inside components:</strong> This causes infinite loops! Create resources outside or use state.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Forgetting Suspense boundary:</strong> Components that suspend must be wrapped in Suspense.
          </Typography>
          <Typography variant="body2">
            • <strong>Using pure Suspense in production:</strong> Use TanStack Query or similar library for real apps.
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
