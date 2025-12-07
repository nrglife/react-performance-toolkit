import { useState, useMemo, useEffect, useTransition } from 'react';
import { FixedSizeList } from 'react-window';
import {
  Box,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Card,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import { useMockData } from '../../hooks/useMockData';

// DOM Node Counter Component
function DOMNodeCounter({ containerId }: { containerId: string }) {
  const [nodeCount, setNodeCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const container = document.getElementById(containerId);
      if (container) {
        const count = container.querySelectorAll('[data-list-item]').length;
        setNodeCount(count);
      }
    };

    updateCount();
    const interval = setInterval(updateCount, 100);
    return () => clearInterval(interval);
  }, [containerId]);

  return (
    <Chip
      label={`${nodeCount} DOM nodes`}
      size="small"
      color={nodeCount > 100 ? 'error' : nodeCount > 50 ? 'warning' : 'success'}
      sx={{ fontFamily: 'monospace' }}
    />
  );
}

export default function VirtualizedDemo() {
  const { data, loading, error } = useMockData();
  const [useVirtualization, setUseVirtualization] = useState(true);
  const [listSize, setListSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [renderTime, setRenderTime] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Select data based on list size
  const items = useMemo(() => {
    let result: any[] = [];
    if (!data) return result;

    switch (listSize) {
      case 'small':
        result = data.small || [];
        break;
      case 'medium':
        result = data.medium || [];
        break;
      case 'large':
        result = data.large || [];
        break;
      default:
        result = data.medium || [];
    }

    return result;
  }, [data, listSize]);

  // Measure render time after DOM updates
  useEffect(() => {
    const startTime = performance.now();
    // Use requestAnimationFrame to measure after paint
    requestAnimationFrame(() => {
      const endTime = performance.now();
      setRenderTime(endTime - startTime);
    });
  }, [items, useVirtualization]);

  // Calculate estimated memory usage (rough estimate)
  const estimatedMemory = useMemo(() => {
    const bytesPerNode = 1000; // Rough estimate: 1KB per DOM node
    const nodeCount = useVirtualization ? 30 : items.length;
    const kb = (nodeCount * bytesPerNode) / 1024;
    return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  }, [useVirtualization, items.length]);

  // Track scroll events
  const handleScroll = () => {
    setScrollCount((prev) => prev + 1);
  };

  // Reset scroll count when switching modes
  useEffect(() => {
    setScrollCount(0);
  }, [useVirtualization, listSize]);

  if (loading) {
    return (
      <DemoContainer title="Virtualized List Demo">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </DemoContainer>
    );
  }

  if (error) {
    return (
      <DemoContainer title="Virtualized List Demo">
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </DemoContainer>
    );
  }

  // Virtualized row renderer
  const VirtualRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    return (
      <Box
        style={style}
        data-list-item
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: index % 2 === 0 ? 'background.paper' : 'action.hover',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2">{item.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {item.category}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.value}
          </Typography>
        </Box>
      </Box>
    );
  };

  const virtualizedCode = `import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}

// Only renders ~12 visible items + buffer
// Total DOM nodes: ~30 (regardless of list size!)`;

  const regularCode = `function RegularList({ items }) {
  return (
    <div style={{ height: 600, overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// Renders ALL items to the DOM
// 10,000 items = 10,000 DOM nodes!`;

  return (
    <DemoContainer
      title="Virtualized List Demo"
      description="See how react-window renders large lists efficiently by only rendering visible items"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Change list size and toggle virtualization
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Watch the DOM node counter to see the massive difference! Virtualized lists render only ~30 nodes regardless of list size.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
          💡 Notice: When switching to non-virtualized mode, a loading spinner appears. This demo uses <strong>useTransition</strong> to keep the UI responsive while rendering thousands of DOM nodes!
        </Typography>
      </Alert>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useVirtualization}
                    onChange={(e) => {
                      const willBeVirtualized = e.target.checked;
                      // Only use transition when switching TO non-virtualized (expensive operation)
                      if (!willBeVirtualized) {
                        startTransition(() => {
                          setUseVirtualization(false);
                        });
                      } else {
                        // Instant switch when enabling virtualization (cheap operation)
                        setUseVirtualization(true);
                      }
                    }}
                    disabled={isPending}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      {useVirtualization ? '✅ Virtualization ON' : '❌ Virtualization OFF'}
                    </Typography>
                    {isPending && <CircularProgress size={16} sx={{ ml: 1 }} />}
                  </Box>
                }
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  List Size:
                </Typography>
                <ToggleButtonGroup
                  value={listSize}
                  exclusive
                  onChange={(_, value) => {
                    if (value) {
                      const sizeMap = { small: 1000, medium: 10000, large: 100000 };
                      const currentSize = sizeMap[listSize];
                      const newSize = sizeMap[value as keyof typeof sizeMap];

                      // Only use transition when increasing size or when not virtualized
                      if (!useVirtualization || newSize > currentSize) {
                        startTransition(() => {
                          setListSize(value);
                        });
                      } else {
                        // Instant switch when decreasing size with virtualization
                        setListSize(value);
                      }
                    }
                  }}
                  size="small"
                  disabled={isPending}
                >
                  <ToggleButton value="small">
                    1K
                  </ToggleButton>
                  <ToggleButton value="medium">
                    10K
                  </ToggleButton>
                  <ToggleButton value="large">
                    100K
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                Total items: <strong>{items.length.toLocaleString()}</strong>
              </Typography>
              <DOMNodeCounter containerId={useVirtualization ? 'virtualized-list' : 'regular-list'} />
              <Chip
                label={`~${estimatedMemory} memory`}
                size="small"
                color="info"
                sx={{ fontFamily: 'monospace' }}
              />
              <Chip
                label={`${renderTime.toFixed(1)}ms render`}
                size="small"
                color={renderTime > 100 ? 'error' : renderTime > 50 ? 'warning' : 'success'}
                sx={{ fontFamily: 'monospace' }}
              />
              {scrollCount > 0 && (
                <Chip
                  label={`${scrollCount} scrolls`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'monospace' }}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Alert severity={useVirtualization ? 'success' : 'warning'} sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {useVirtualization ? '✅ With Virtualization:' : '❌ Without Virtualization:'}
        </Typography>
        {useVirtualization ? (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Only renders visible items (~12) plus a small buffer (~30 total DOM nodes)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Scrolling is smooth even with 100,000 items
            </Typography>
            <Typography variant="body2">
              • Memory usage stays constant regardless of list size
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Renders ALL items to the DOM ({items.length.toLocaleString()} DOM nodes!)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Scrolling may lag with large lists (try 100K items)
            </Typography>
            <Typography variant="body2">
              • High memory usage and slow initial render
            </Typography>
          </>
        )}
      </Alert>

      {/* List Display */}
      <Box sx={{ mb: 3, position: 'relative' }}>
        {isPending && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              borderRadius: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Rendering {items.length.toLocaleString()} items...
              </Typography>
            </Box>
          </Box>
        )}
        {useVirtualization ? (
          <Box id="virtualized-list" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <FixedSizeList
              height={600}
              width="100%"
              itemCount={items.length}
              itemSize={50}
              onScroll={handleScroll}
            >
              {VirtualRow}
            </FixedSizeList>
          </Box>
        ) : (
          <Box
            id="regular-list"
            onScroll={handleScroll}
            sx={{
              height: 600,
              overflow: 'auto',
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            {items.map((item, index) => (
              <Box
                key={item.id}
                data-list-item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  height: 50,
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'action.hover',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.category}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* useTransition Explanation */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🔄 Bonus: useTransition in Action
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            This demo uses useTransition to keep the UI responsive!
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            When you switch to non-virtualized mode or increase list size, the UI could freeze while rendering thousands of DOM nodes. Instead, we wrap expensive operations in <code>startTransition()</code> to show a loading spinner and keep controls responsive.
          </Typography>
          <Typography variant="body2">
            Notice: Switching back to virtualized mode is instant (no spinner) because it's a cheap operation. This is smart optimization - only use transitions for expensive work!
          </Typography>
        </Alert>
        <CodeBlock
          title="Smart useTransition - Only for Expensive Operations"
          code={`import { useTransition } from 'react';

function VirtualizedDemo() {
  const [isPending, startTransition] = useTransition();
  const [useVirtualization, setUseVirtualization] = useState(true);

  const handleToggle = (willBeVirtualized) => {
    if (!willBeVirtualized) {
      // Expensive: Rendering 10,000 DOM nodes
      startTransition(() => {
        setUseVirtualization(false);
      });
    } else {
      // Cheap: Switching to ~30 nodes - no transition needed
      setUseVirtualization(true);
    }
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      {/* ... */}
    </>
  );
}`}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Implementation
        </Typography>

        <CodeBlock
          title="✅ Virtualized List (react-window)"
          code={virtualizedCode}
          language="typescript"
        />

        <CodeBlock
          title="❌ Regular List (renders everything)"
          code={regularCode}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Metrics Explanation */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Understanding the Metrics
        </Typography>
        <Alert severity="info">
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>DOM nodes:</strong> Actual elements in the browser's DOM tree. Fewer = better performance
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Memory:</strong> Estimated RAM used by DOM nodes. Virtualized lists use ~30KB vs several MB
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Render time:</strong> How long it took to prepare the list. Lower is better
          </Typography>
          <Typography variant="body2">
            • <strong>Scrolls:</strong> Number of scroll events. Try scrolling fast - virtualized stays smooth!
          </Typography>
        </Alert>
      </Box>

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How Virtualization Works
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Window technique:</strong> Only renders items visible in the scrollable "window"
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Dynamic rendering:</strong> As you scroll, items are added/removed from the DOM
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Constant performance:</strong> 100 items or 100,000 items - same DOM node count
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          • <strong>Absolute positioning:</strong> Uses CSS transforms for smooth scrolling
        </Typography>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚠️ When to Use Virtualization
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Lists with 100+ items where performance matters
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Infinite scroll or large data tables
          </Typography>
          <Typography variant="body2">
            • Don't use for small lists (overhead not worth it)
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
