/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Manga } from '@/types/anime';

export const useMangaRecommendations = (mangaId: string) => {
  const [recommendations, setRecommendations] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!mangaId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/manga/${mangaId}/recommendations`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        
        // Extract manga from recommendations and limit to 6
        const mangaRecommendations = data.data
          ?.slice(0, 6)
          ?.map((rec: any) => rec.entry)
          ?.filter((manga: any) => manga && manga.mal_id) || [];

        setRecommendations(mangaRecommendations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [mangaId]);

  return { recommendations, loading, error };
};
