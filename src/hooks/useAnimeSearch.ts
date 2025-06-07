import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Anime, ApiResponse } from '@/types/anime';

export const useAnimeSearch = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const searchAnime = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setAnimes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using Jikan API (free MyAnimeList API) instead of RapidAPI for this demo
      // You can replace this with your RapidAPI endpoint and headers
      const response = await axios.get<ApiResponse>(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&limit=20`
      );
      
      setAnimes(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setAnimes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAnimeWithRapidAPI = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setAnimes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Uncomment and use this for RapidAPI
      // const response = await axios.get<ApiResponse>(
      //   `https://myanimelist.p.rapidapi.com/anime/search/${encodeURIComponent(searchQuery)}`,
      //   {
      //     headers: {
      //       'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      //       'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
      //     }
      //   }
      // );
      
      // For demo purposes, using free Jikan API
      await searchAnime(searchQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setAnimes([]);
    } finally {
      setLoading(false);
    }
  }, [searchAnime]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAnime(query);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [query, searchAnime]);

  return {
    animes,
    loading,
    error,
    query,
    setQuery,
    searchAnime: searchAnimeWithRapidAPI,
  };
};
