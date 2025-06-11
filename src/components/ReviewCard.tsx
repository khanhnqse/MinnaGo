"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Film, ThumbsUp } from "lucide-react";
import { AnimeReview } from "@/types/anime";

interface ReviewCardProps {
  review: AnimeReview;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-600/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      {/* Review Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={review.user.images?.jpg?.image_url || "/man.png"}
            alt={review.user.username}
            width={48}
            height={48}
            className="rounded-full border-2 border-purple-200 dark:border-purple-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/man.png";
            }}
          />
          {review.is_preliminary && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded-full">
              P
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {review.user.username}
            </h4>
            {review.is_spoiler && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                Spoiler
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {review.scores?.overall && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{review.scores.overall}/10</span>
              </div>
            )}
            {review.episodes_watched && (
              <div className="flex items-center space-x-1">
                <Film className="h-4 w-4 text-blue-500" />
                <span>{review.episodes_watched} episodes</span>
              </div>
            )}
            {review.reactions?.overall && (
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span>{review.reactions.overall}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.review.length > 300
            ? `${review.review.substring(0, 300)}...`
            : review.review}
        </p>
      </div>

      {/* Review Scores */}
      {review.scores && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {review.scores.story && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Story:</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {review.scores.story}
                </span>
              </div>
            </div>
          )}
          {review.scores.animation && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Animation:
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {review.scores.animation}
                </span>
              </div>
            </div>
          )}
          {review.scores.sound && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sound:</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {review.scores.sound}
                </span>
              </div>
            </div>
          )}
          {review.scores.character && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Character:
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {review.scores.character}
                </span>
              </div>
            </div>
          )}
          {review.scores.enjoyment && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Enjoyment:
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {review.scores.enjoyment}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Date */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
