"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Calendar, Eye, Heart } from "lucide-react";
import { AnimeReview } from "@/types/anime";

interface ReviewCardProps {
  review: AnimeReview;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white via-white to-purple-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/10 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Review Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative flex-shrink-0">
          <div className="relative">
            <Image
              src={review.user.images?.jpg?.image_url || "/man.png"}
              alt={review.user.username}
              width={56}
              height={56}
              className="rounded-2xl border-3 border-white dark:border-gray-600 shadow-md group-hover:shadow-lg transition-shadow duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/man.png";
              }}
            />
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full animate-pulse" />
          </div>
          {review.is_preliminary && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
              Preview
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                {review.user.username}
              </h4>
              {review.is_spoiler && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse">
                  ⚠️ Spoiler
                </span>
              )}
            </div>
            {review.scores?.overall && (
              <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl font-bold ${getScoreBg(review.scores.overall)} ${getScoreColor(review.scores.overall)}`}>
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{review.scores.overall}/10</span>
              </div>
            )}
          </div>
          
          {/* Meta info */}
          <div className="flex items-center space-x-4 text-sm">
            {review.episodes_watched && (
              <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                <Eye className="h-4 w-4" />
                <span className="font-medium">{review.episodes_watched} eps</span>
              </div>
            )}
            {review.reactions?.overall && (
              <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                <Heart className="h-4 w-4 fill-current" />
                <span className="font-medium">{review.reactions.overall}</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>      {/* Review Content */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-400 rounded-full opacity-60" />          <blockquote className="pl-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base font-medium italic">
            &ldquo;{review.review.length > 280
              ? `${review.review.substring(0, 280)}...`
              : review.review}&rdquo;
          </blockquote>
        </div>
      </div>      {/* Review Scores */}
      {review.scores && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            <Star className="h-4 w-4 text-amber-500 mr-2" />
            Detailed Scores
          </h5>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: 'story', label: 'Story', icon: '📚', color: 'from-blue-500 to-cyan-500' },
              { key: 'animation', label: 'Animation', icon: '🎨', color: 'from-purple-500 to-pink-500' },
              { key: 'sound', label: 'Sound', icon: '🎵', color: 'from-green-500 to-emerald-500' },
              { key: 'character', label: 'Character', icon: '👥', color: 'from-orange-500 to-red-500' },
              { key: 'enjoyment', label: 'Enjoyment', icon: '😊', color: 'from-yellow-500 to-amber-500' }
            ].map(({ key, label, icon, color }) => {
              const score = review.scores[key as keyof typeof review.scores];
              if (!score) return null;
              
              return (
                <div key={key} className="relative group/score">
                  <div className={`bg-gradient-to-r ${color} p-0.5 rounded-xl`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 h-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{icon}</span>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                            {label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getScoreColor(score).includes('green') ? 'bg-green-400' : getScoreColor(score).includes('yellow') ? 'bg-yellow-400' : 'bg-red-400'}`} />
                          <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                            {score}
                          </span>
                        </div>
                      </div>
                      {/* Score bar */}
                      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out`}
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}      {/* Footer with Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-4">
          {/* Reaction buttons */}
          {review.reactions && (
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 text-xs font-medium">
                <ThumbsUp className="h-3 w-3" />
                <span>Helpful</span>
              </button>
              {review.reactions.funny > 0 && (
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors duration-200 text-xs font-medium">
                  <span>😄</span>
                  <span>{review.reactions.funny}</span>
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Read more button */}
        {review.review.length > 280 && (
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 flex items-center space-x-1 group">
            <span>Read more</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}
