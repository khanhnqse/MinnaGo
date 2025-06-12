"use client";

import { useState, useEffect } from "react";
import { ClubsResponse, Club } from "@/types/anime";

export const useClubs = (page: number = 1, category?: string, search?: string) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
        });

        if (category) {
          params.append('category', category);
        }

        if (search) {
          params.append('q', search);
        }

        const response = await fetch(
          `https://api.jikan.moe/v4/clubs?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch clubs: ${response.status}`);
        }

        const data: ClubsResponse = await response.json();
        
        setClubs(data.data || []);
        setHasNextPage(data.pagination?.has_next_page || false);
        setTotalPages(data.pagination?.last_visible_page || 1);
      } catch (err) {
        console.error("Error fetching clubs:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch clubs");
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [currentPage, category, search]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    clubs,
    loading,
    error,
    hasNextPage,
    totalPages,
    currentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
  };
};
