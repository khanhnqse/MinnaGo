"use client";

import { useState, useEffect } from "react";
import { Manga } from "@/types/anime";

export function useMangaDetail(id: string | number) {
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMangaDetail = async (mangaId: string | number) => {
    if (!mangaId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setManga(data.data);
    } catch (err) {
      console.error("Error fetching manga details:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch manga details");
      setManga(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMangaDetail(id);
    }
  }, [id]);

  return {
    manga,
    loading,
    error,
    refetch: () => fetchMangaDetail(id),
  };
}
