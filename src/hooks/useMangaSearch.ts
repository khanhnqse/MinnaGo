"use client";

import { useState, useEffect } from "react";
import { MangaApiResponse } from "@/types/anime";

export function useMangaSearch(query: string, page: number = 1, genreId?: string) {
  const [manga, setManga] = useState<MangaApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchManga = async (searchQuery: string, searchPage: number = 1, genre?: string) => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.jikan.moe/v4/manga?page=${searchPage}&limit=20`;
      
      // Add search query if provided
      if (searchQuery.trim()) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }
      
      // Add genre filter if provided and not "all"
      if (genre && genre !== "all") {
        url += `&genres=${genre}`;
      }

      // If no search query and no genre filter, get top manga
      if (!searchQuery.trim() && (!genre || genre === "all")) {
        url = `https://api.jikan.moe/v4/top/manga?page=${searchPage}&limit=20`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MangaApiResponse = await response.json();
      
      // If this is page 1 or first search, replace the data
      // If this is a subsequent page, append to existing data
      if (searchPage === 1) {
        setManga(data);
      } else if (manga) {
        setManga({
          ...data,
          data: [...manga.data, ...data.data],
        });
      } else {
        setManga(data);
      }
    } catch (err) {
      console.error("Error searching manga:", err);
      setError(err instanceof Error ? err.message : "Failed to search manga");
      setManga(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    searchManga(query, page, genreId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, genreId]);

  return {
    manga,
    loading,
    error,
    searchManga,
  };
}
