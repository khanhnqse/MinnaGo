import { useState, useEffect } from 'react';
import axios from 'axios';
import { Anime } from '@/types/anime';

export const useAnimeDetail = (id: string) => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Using Jikan API for anime details
        const response = await axios.get<{ data: Anime }>(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  return { anime, loading, error };
};
