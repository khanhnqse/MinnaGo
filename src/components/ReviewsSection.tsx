"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, TrendingUp } from "lucide-react";
import { AnimeReview } from "@/types/anime";
import ReviewCard from "./ReviewCard";

interface ReviewsSectionProps {
  reviews: AnimeReview[];
  animeId: number;
  loading?: boolean;
  error?: string | null;
}

export default function ReviewsSection({
  reviews,
  animeId,
  loading = false,
  error = null,
}: ReviewsSectionProps) {
  // Don't render if there are no reviews or if there's an error/loading
  if (loading || error || !reviews || reviews.length === 0) {
    return null;
  }

  // Calculate average score from reviews
  const reviewsWithScores = reviews.filter((review) => review.scores?.overall);
  const averageScore =
    reviewsWithScores.length > 0
      ? (
          reviewsWithScores.reduce(
            (sum, review) => sum + (review.scores?.overall || 0),
            0
          ) / reviewsWithScores.length
        ).toFixed(1)
      : null;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      {/* Enhanced Header */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-30" />
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Community Reviews
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""} from
                the community
              </p>
            </div>
          </div>

          {/* Average Score Display */}
          {averageScore && (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Avg Rating
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {averageScore}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/10</span>
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Trending
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent" />
      </div>{" "}
      {/* Reviews Grid */}
      <div className="space-y-8">
        {reviews.slice(0, 3).map((review, index) => (
          <ReviewCard key={review.mal_id} review={review} index={index} />
        ))}
      </div>
      {/* Enhanced View All Button */}
      {reviews.length > 3 && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <motion.button
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(
                  `https://myanimelist.net/anime/${animeId}/reviews`,
                  "_blank"
                );
              }
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>View All {reviews.length} Reviews on MAL</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
