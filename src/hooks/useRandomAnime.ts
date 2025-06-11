import { useState, useCallback } from 'react';
import axios from 'axios';
import { Anime } from '@/types/anime';

interface UseRandomAnimeReturn {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
  fetchRandomAnime: () => Promise<void>;
}

export const useRandomAnime = (): UseRandomAnimeReturn => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchRandomAnime = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Use Jikan API directly for random anime
      const response = await axios.get<{ data: Anime }>('https://api.jikan.moe/v4/random/anime');
      
      if (response.data && response.data.data) {
        setAnime(response.data.data);
      } else {
        setError('Failed to fetch random anime');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random anime');
      console.error('Error fetching random anime:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    anime,
    loading,
    error,
    fetchRandomAnime
  };
};
