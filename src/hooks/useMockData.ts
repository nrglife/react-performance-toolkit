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
    // Use Vite's BASE_URL to handle GitHub Pages base path
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}mockData.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch mockData.json: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
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
