import { useState, useEffect } from 'react';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  threshold?: number;
  onLoad?: () => void;
}

/**
 * LazyImage component that loads images only when they enter the viewport
 * Uses IntersectionObserver for efficient lazy loading
 */
export default function LazyImage({
  src,
  alt,
  width = '100%',
  height = 200,
  threshold = 0.1,
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver({ threshold });

  // Start loading when element enters viewport (using useEffect)
  useEffect(() => {
    if (hasIntersected && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [hasIntersected, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    // Call parent's onLoad callback if provided
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <Box
      ref={targetRef}
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        bgcolor: 'action.hover',
      }}
    >
      {/* Skeleton placeholder before intersection */}
      {!hasIntersected && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation={false}
        />
      )}

      {/* Loading spinner while image loads */}
      {hasIntersected && !isLoaded && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}

      {/* Actual image - starts loading when shouldLoad is true */}
      {shouldLoad && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </Box>
  );
}
