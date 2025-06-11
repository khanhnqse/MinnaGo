"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
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

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <MessageSquare className="h-6 w-6 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Reviews ({reviews.length})
        </h3>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, 3).map((review, index) => (
          <ReviewCard key={review.mal_id} review={review} index={index} />
        ))}
      </div>

      {/* Show More Reviews Link */}
      {reviews.length > 3 && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                `https://myanimelist.net/anime/${animeId}/reviews`,
                "_blank"
              )
            }
          >
            <MessageSquare className="h-5 w-5" />
            <span>View All Reviews on MAL</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
