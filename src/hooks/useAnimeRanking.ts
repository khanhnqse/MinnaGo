import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Anime, ApiResponse } from '@/types/anime';

export type RankingType = 'all' | 'airing' | 'upcoming' | 'tv' | 'movie' | 'ova' | 'special' | 'bypopularity' | 'favorite';

export interface RankingCategory {
  id: RankingType;
  name: string;
  description: string;
  icon: string;
}

export const rankingCategories: RankingCategory[] = [
  { id: 'all', name: 'Top Anime', description: 'Highest rated anime of all time', icon: '🏆' },
  { id: 'airing', name: 'Top Airing', description: 'Best currently airing anime', icon: '📺' },
  { id: 'upcoming', name: 'Most Anticipated', description: 'Upcoming anime with highest expectations', icon: '🔮' },
  { id: 'tv', name: 'Top TV Series', description: 'Best TV anime series', icon: '📻' },
  { id: 'movie', name: 'Top Movies', description: 'Highest rated anime movies', icon: '🎬' },
  { id: 'bypopularity', name: 'Most Popular', description: 'Anime with most members', icon: '❤️' },
  { id: 'favorite', name: 'Most Favorited', description: 'Most favorited anime by users', icon: '⭐' },
];

export const useAnimeRanking = () => {
  const [rankings, setRankings] = useState<Record<RankingType, Anime[]>>({} as Record<RankingType, Anime[]>);
  const [loading, setLoading] = useState<Record<RankingType, boolean>>({} as Record<RankingType, boolean>);
  const [error, setError] = useState<Record<RankingType, string | null>>({} as Record<RankingType, string | null>);
  const [activeCategory, setActiveCategory] = useState<RankingType>('all');  const fetchRanking = useCallback(async (type: RankingType, limit = 25) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    setError(prev => ({ ...prev, [type]: null }));

    try {
      // Map ranking types to proper API endpoints
      let apiUrl = 'https://api.jikan.moe/v4/top/anime';
      
      if (type === 'all') {
        // For 'all', we just get top anime without any type filter
        apiUrl = `${apiUrl}?limit=${limit}`;
      } else if (type === 'airing') {
        // For currently airing anime
        apiUrl = `${apiUrl}?filter=airing&limit=${limit}`;
      } else if (type === 'upcoming') {
        // For upcoming anime
        apiUrl = `${apiUrl}?filter=upcoming&limit=${limit}`;
      } else if (type === 'bypopularity') {
        // For popularity ranking
        apiUrl = `${apiUrl}?filter=bypopularity&limit=${limit}`;
      } else if (type === 'favorite') {
        // For favorites ranking
        apiUrl = `${apiUrl}?filter=favorite&limit=${limit}`;
      } else {
        // For other types (tv, movie, ova, special)
        apiUrl = `${apiUrl}?type=${type}&limit=${limit}`;
      }

      const response = await axios.get<ApiResponse>(apiUrl);

      // Safely check if data exists and is an array
      const responseData = response?.data?.data;
      if (!responseData || !Array.isArray(responseData)) {
        throw new Error('Invalid API response format');
      }

      // Validate and filter anime data
      const validAnimes = responseData.filter((anime: Anime) => {
        if (!anime || typeof anime.mal_id !== 'number' || !anime.title) {
          return false;
        }
        if (!anime.images || !anime.images.jpg || !anime.images.jpg.image_url) {
          return false;
        }
        return true;
      });

      setRankings(prev => ({
        ...prev,
        [type]: validAnimes
      }));
    } catch (err) {
      console.error(`Ranking fetch error for ${type}:`, err);
      setError(prev => ({
        ...prev,
        [type]: err instanceof Error ? err.message : 'Failed to fetch ranking data'
      }));
      setRankings(prev => ({
        ...prev,
        [type]: []
      }));
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  }, []);

  const switchCategory = useCallback((category: RankingType) => {
    setActiveCategory(category);
    if (!rankings[category] && !loading[category]) {
      fetchRanking(category);
    }
  }, [rankings, loading, fetchRanking]);

  // Load initial ranking
  useEffect(() => {
    fetchRanking('all');
  }, [fetchRanking]);

  return {
    rankings,
    loading,
    error,
    activeCategory,
    switchCategory,
    fetchRanking,
    rankingCategories
  };
};
