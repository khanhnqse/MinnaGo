import { useState, useEffect } from 'react';
import { AnimeReviewsResponse } from '@/types/anime';

export function useAnimeReviews(animeId: number) {
  const [reviews, setReviews] = useState<AnimeReviewsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!animeId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/reviews`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        
        const data: AnimeReviewsResponse = await response.json();
        setReviews(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
        console.error('Error fetching anime reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [animeId]);

  const refetch = () => {
    if (animeId) {
      const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(
            `https://api.jikan.moe/v4/anime/${animeId}/reviews`
          );
          
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.status}`);
          }
          
          const data: AnimeReviewsResponse = await response.json();
          setReviews(data.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
          console.error('Error fetching anime reviews:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  };

  return { reviews, loading, error, refetch };
}
