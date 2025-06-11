"use client";

import { useState, useEffect } from "react";

export interface MangaCategory {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface MangaCategoriesResponse {
  data: MangaCategory[];
}

// Map category names to appropriate icons and colors
const getCategoryIcon = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('action')) return '⚔️';
  if (lowerName.includes('adventure')) return '🗺️';
  if (lowerName.includes('comedy')) return '😂';
  if (lowerName.includes('drama')) return '🎭';
  if (lowerName.includes('fantasy')) return '🧙‍♂️';
  if (lowerName.includes('horror')) return '👻';
  if (lowerName.includes('mystery')) return '🔍';
  if (lowerName.includes('romance')) return '💕';
  if (lowerName.includes('sci-fi')) return '🚀';
  if (lowerName.includes('slice of life')) return '🌸';
  if (lowerName.includes('sports')) return '⚽';
  if (lowerName.includes('supernatural')) return '✨';
  if (lowerName.includes('suspense')) return '🔥';
  if (lowerName.includes('boys love')) return '💙';
  if (lowerName.includes('girls love')) return '💗';
  if (lowerName.includes('josei')) return '🌺';
  if (lowerName.includes('seinen')) return '🔶';
  if (lowerName.includes('shoujo')) return '🌸';
  if (lowerName.includes('shounen')) return '⚡';
  if (lowerName.includes('isekai')) return '🌍';
  if (lowerName.includes('music')) return '🎵';
  if (lowerName.includes('school')) return '🏫';
  if (lowerName.includes('historical')) return '🏛️';
  if (lowerName.includes('military')) return '⚔️';
  if (lowerName.includes('psychological')) return '🧠';
  if (lowerName.includes('martial arts')) return '🥋';
  if (lowerName.includes('mecha')) return '🤖';
  if (lowerName.includes('vampire')) return '🧛‍♂️';
  if (lowerName.includes('magic')) return '🔮';
  if (lowerName.includes('harem')) return '👥';
  return '📚';
};

const getCategoryColor = (index: number): string => {
  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500", 
    "from-red-500 to-orange-500",
    "from-yellow-500 to-amber-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-teal-500 to-green-500",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-lime-500 to-green-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
    "from-sky-500 to-blue-500",
  ];
  return colors[index % colors.length];
};

// Fallback categories that always work - Extended list for "Show More" functionality
const FALLBACK_CATEGORIES = [
  { mal_id: 1, name: 'Action', url: '', count: 10000 },
  { mal_id: 4, name: 'Comedy', url: '', count: 15000 },
  { mal_id: 8, name: 'Drama', url: '', count: 10000 },
  { mal_id: 10, name: 'Fantasy', url: '', count: 13000 },
  { mal_id: 22, name: 'Romance', url: '', count: 18000 },
  { mal_id: 24, name: 'Sci-Fi', url: '', count: 3000 },
  { mal_id: 36, name: 'Slice of Life', url: '', count: 5000 },
  { mal_id: 37, name: 'Supernatural', url: '', count: 8000 },
  { mal_id: 14, name: 'Horror', url: '', count: 1800 },
  { mal_id: 7, name: 'Mystery', url: '', count: 2600 },
  { mal_id: 2, name: 'Adventure', url: '', count: 4500 },
  { mal_id: 41, name: 'Suspense', url: '', count: 2200 },
  { mal_id: 27, name: 'Shounen', url: '', count: 6500 },
  { mal_id: 25, name: 'Shoujo', url: '', count: 4200 },
  { mal_id: 42, name: 'Seinen', url: '', count: 3800 },
  { mal_id: 43, name: 'Josei', url: '', count: 1200 },
  { mal_id: 30, name: 'Sports', url: '', count: 1500 },
  { mal_id: 23, name: 'School', url: '', count: 2800 },
  { mal_id: 13, name: 'Historical', url: '', count: 900 },
  { mal_id: 17, name: 'Martial Arts', url: '', count: 1100 },
];

export function useMangaCategories() {
  const [categories, setCategories] = useState<MangaCategory[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(false); // Start with fallback, so not loading initially
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async (attempt: number = 0) => {
      setLoading(true);
      setError(null);

      try {
        // Add timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('https://api.jikan.moe/v4/genres/manga', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data: MangaCategoriesResponse = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid API response format');
        }        // Filter and sort categories by popularity (count)
        const filteredCategories = data.data
          .filter(category => 
            // Ensure category has required properties
            category &&
            category.mal_id &&
            category.name &&
            typeof category.count === 'number' &&
            // Filter out adult/explicit categories for general audience
            !['Hentai', 'Erotica', 'Ecchi'].includes(category.name) &&
            // Include categories with reasonable counts
            category.count > 50
          )
          // Remove duplicates by mal_id
          .filter((category, index, array) => 
            array.findIndex(c => c.mal_id === category.mal_id) === index
          )
          .sort((a, b) => b.count - a.count) // Sort by popularity
          .slice(0, 25); // Increased limit to 25 categories for "Show More" functionalityconsole.log('Successfully fetched manga categories:', filteredCategories.length);
        setCategories(filteredCategories);
        setError(null);
        
      } catch (err) {
        console.error('Error fetching manga categories (attempt', attempt + 1, '):', err);
          // Retry logic - try up to 2 times with delay
        if (attempt < 2) {
          setTimeout(() => {
            fetchCategories(attempt + 1);
          }, 2000 * (attempt + 1)); // Exponential backoff
          return;
        }
        
        let errorMessage = 'Failed to fetch categories';
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'Request timeout - using fallback categories';
          } else if (err.message.includes('fetch')) {
            errorMessage = 'Network error - using fallback categories';
          } else {
            errorMessage = err.message;
          }
        }
          setError(errorMessage);
        
        // Always provide fallback categories if API fails
        console.log('Using fallback categories:', FALLBACK_CATEGORIES.length);
        setCategories(FALLBACK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  // Format categories for the component
  const formattedCategories = [
    // Always include "All" as first option
    { 
      id: "all", 
      label: "All", 
      icon: "📚", 
      color: "from-purple-500 to-pink-500",
      mal_id: 0,
      count: 0
    },
    // Add API categories with unique keys
    ...categories.map((category, index) => ({
      id: `${category.mal_id}-${category.name.toLowerCase().replace(/\s+/g, '-')}`,
      label: category.name,
      icon: getCategoryIcon(category.name),
      color: getCategoryColor(index + 1), // +1 to account for "All" category
      mal_id: category.mal_id,
      count: category.count
    }))
  ];
  return {
    categories: formattedCategories,
    loading,
    error,
  };
}
