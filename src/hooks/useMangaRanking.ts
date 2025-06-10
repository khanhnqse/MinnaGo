"use client";

import { useState, useEffect } from "react";
import { MangaApiResponse } from "@/types/anime";

export function useMangaRanking(type: string = "manga", page: number = 1) {
  const [manga, setManga] = useState<MangaApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopManga = async (rankingType: string, rankingPage: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/manga?type=${rankingType}&page=${rankingPage}&limit=20`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MangaApiResponse = await response.json();
      
      // If this is page 1, replace the data
      // If this is a subsequent page, append to existing data
      if (rankingPage === 1) {
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
      console.error("Error fetching top manga:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch top manga");
      setManga(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopManga(type, page);
  }, [type, page]);

  return {
    manga,
    loading,
    error,
    refetch: () => fetchTopManga(type, page),
  };
}
