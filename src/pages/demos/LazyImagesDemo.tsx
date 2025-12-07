import { useState, useMemo } from 'react';
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
  Grid,
} from '@mui/material';
import DemoContainer from '../../components/shared/DemoContainer';
import CodeBlock from '../../components/shared/CodeBlock';
import LazyImage from '../../components/shared/LazyImage';

// Generate array of image URLs from picsum.photos (free placeholder service)
const generateImages = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/300?random=${i + 1}`,
    alt: `Demo image ${i + 1}`,
  }));
};

export default function LazyImagesDemo() {
  const [useLazyLoading, setUseLazyLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const images = useMemo(() => generateImages(50), []);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const lazyImageCode = `import { useIntersectionObserver } from './hooks/useIntersectionObserver';

function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1, // Load when 10% visible
  });

  return (
    <div ref={targetRef}>
      {!hasIntersected && <Skeleton />}
      {hasIntersected && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}`;

  const intersectionObserverCode = `function useIntersectionObserver(options = {}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      options
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected]);

  return { targetRef, hasIntersected };
}`;

  const regularImageCode = `function RegularImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

// ❌ Problem: All 50 images load immediately
// - Slow initial page load
// - Wasted bandwidth for images user never sees
// - Poor performance on slow connections`;

  return (
    <DemoContainer
      title="Lazy Loading Images Demo"
      description="See how IntersectionObserver enables efficient image loading by only loading images when they enter the viewport"
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Try This: Scroll down slowly
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Watch images load only as they come into view. With lazy loading ON, images load on-demand. With it OFF, all 50 images load immediately.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
          💡 Notice: The loaded count increases as you scroll, not all at once!
        </Typography>
      </Alert>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useLazyLoading}
                  onChange={(e) => {
                    setUseLazyLoading(e.target.checked);
                    setLoadedCount(0);
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    {useLazyLoading ? '✅ Lazy Loading ON' : '❌ Lazy Loading OFF'}
                  </Typography>
                </Box>
              }
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total images: <strong>50</strong>
              </Typography>
              <Chip
                label={`${loadedCount} loaded`}
                size="small"
                color={loadedCount === 50 ? 'success' : 'primary'}
                sx={{ fontFamily: 'monospace' }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Alert severity={useLazyLoading ? 'success' : 'warning'} sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {useLazyLoading ? '✅ With Lazy Loading:' : '❌ Without Lazy Loading:'}
        </Typography>
        {useLazyLoading ? (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Images load only when they enter the viewport
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Faster initial page load (only loads visible images)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Saves bandwidth (doesn't load images user never sees)
            </Typography>
            <Typography variant="body2">
              • Better performance on slow connections
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • All 50 images load immediately on page load
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Slow initial page load (downloads all images at once)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Wastes bandwidth loading images user may never see
            </Typography>
            <Typography variant="body2">
              • Poor experience on slow connections
            </Typography>
          </>
        )}
      </Alert>

      {/* Image Grid */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {useLazyLoading ? (
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  height={200}
                  onLoad={handleImageLoad}
                />
              ) : (
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  onLoad={handleImageLoad}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              )}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Image {image.id}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Code Examples */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Implementation
        </Typography>

        <CodeBlock
          title="✅ Lazy Image Component"
          code={lazyImageCode}
          language="typescript"
        />

        <CodeBlock
          title="🔍 useIntersectionObserver Hook"
          code={intersectionObserverCode}
          language="typescript"
        />

        <CodeBlock
          title="❌ Regular Image (loads immediately)"
          code={regularImageCode}
          language="typescript"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Explanation */}
      <Box>
        <Typography variant="h6" gutterBottom>
          How Lazy Loading Works
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>IntersectionObserver API:</strong> Efficiently detects when elements enter the viewport
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Threshold:</strong> Controls when loading starts (0.1 = load when 10% visible)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • <strong>Placeholder:</strong> Shows skeleton/spinner while image loads
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          • <strong>Fade-in effect:</strong> Smooth transition when image loads
        </Typography>

        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ✅ When to Use Lazy Loading
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Long pages with many images (galleries, feeds, product lists)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Images below the fold (not visible on initial page load)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Mobile-first applications (save bandwidth)
          </Typography>
          <Typography variant="body2">
            • Any scenario where initial page load speed matters
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚠️ When NOT to Use Lazy Loading
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Hero images or above-the-fold content (load immediately)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Small number of images (overhead not worth it)
          </Typography>
          <Typography variant="body2">
            • Critical images needed for initial render
          </Typography>
        </Alert>
      </Box>
    </DemoContainer>
  );
}
