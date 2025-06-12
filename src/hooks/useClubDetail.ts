"use client";

import { useState, useEffect } from "react";
import { ClubDetailResponse, ClubDetail } from "@/types/anime";

export const useClubDetail = (clubId: string) => {
  const [club, setClub] = useState<ClubDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubDetail = async () => {
      if (!clubId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.jikan.moe/v4/clubs/${clubId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch club details: ${response.status}`);
        }

        const data: ClubDetailResponse = await response.json();
        setClub(data.data);
      } catch (err) {
        console.error("Error fetching club details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch club details");
        setClub(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetail();
  }, [clubId]);

  return { club, loading, error };
};
