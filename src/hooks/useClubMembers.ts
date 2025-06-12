"use client";

import { useState, useEffect } from "react";
import { ClubMembersResponse, ClubMember } from "@/types/anime";

export const useClubMembers = (clubId: string, page: number = 1) => {
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const fetchClubMembers = async () => {
      if (!clubId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.jikan.moe/v4/clubs/${clubId}/members?page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch club members: ${response.status}`);
        }

        const data: ClubMembersResponse = await response.json();
        
        setMembers(data.data || []);
        setHasNextPage(data.pagination?.has_next_page || false);
        setTotalPages(data.pagination?.last_visible_page || 1);
      } catch (err) {
        console.error("Error fetching club members:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch club members");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClubMembers();
  }, [clubId, currentPage]);

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
    members,
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
