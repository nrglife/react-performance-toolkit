import { useState, useEffect } from 'react';
import type { ListItem } from '../types';

interface MockData {
  small: ListItem[];
  medium: ListItem[];
  large: ListItem[];
}

/**
 * Custom hook to load mock data from public folder
 * Data is cached after first load
 */
export function useMockData() {
  const [data, setData] = useState<MockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/mockData.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
