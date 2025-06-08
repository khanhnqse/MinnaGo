import { useState, useEffect } from 'react';
import { AnimeVideosResponse } from '@/types/anime';

export function useAnimeVideos(animeId: number) {
  const [videos, setVideos] = useState<AnimeVideosResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!animeId) return;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/videos`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status}`);
        }
        
        const data: AnimeVideosResponse = await response.json();
        setVideos(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        console.error('Error fetching anime videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [animeId]);

  const refetch = () => {
    if (animeId) {
      const fetchVideos = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(
            `https://api.jikan.moe/v4/anime/${animeId}/videos`
          );
          
          if (!response.ok) {
            throw new Error(`Failed to fetch videos: ${response.status}`);
          }
          
          const data: AnimeVideosResponse = await response.json();
          setVideos(data.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch videos');
          console.error('Error fetching anime videos:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchVideos();
    }
  };

  return {
    videos,
    loading,
    error,
    refetch
  };
}
