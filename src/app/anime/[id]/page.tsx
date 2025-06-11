"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  Star,
  Calendar,
  Film,
  Clock,
  Users,
  TrendingUp,
  Heart,
  Bookmark,
  Share,
  Play,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { useAnimeDetail } from "@/hooks/useAnimeDetail";
import { useAnimeVideos } from "@/hooks/useAnimeVideos";
import { useAnimeReviews } from "@/hooks/useAnimeReviews";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import StreamingModal from "@/components/StreamingModal";
import VideoPlayer from "@/components/VideoPlayer";
import Toast from "@/components/Toast";
import ShareModal from "@/components/ShareModal";

export default function AnimeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { anime, loading, error } = useAnimeDetail(id);
  const {
    videos,
    loading: videosLoading,
    error: videosError,
  } = useAnimeVideos(parseInt(id));
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useAnimeReviews(parseInt(id));
  const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const handleShare = () => {
    setShowShareModal(true);
  };
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setToast({ show: true, message, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <ErrorMessage message={error || "Anime not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 mb-8 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 dark:border-pink-700/50 transition-all duration-200"
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </motion.button>

        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex">
            {/* Image Section */}
            <motion.div
              className="md:w-1/3 lg:w-1/4 relative group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Image
                    src={
                      anime.images.jpg.large_image_url ||
                      anime.images.jpg.image_url ||
                      "/placeholder-anime.svg"
                    }
                    alt={anime.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Floating action buttons */}
                <motion.div
                  className="absolute bottom-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.button
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className="h-5 w-5" />
                  </motion.button>{" "}
                  <motion.button
                    onClick={handleShare}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="md:w-2/3 lg:w-3/4 p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-6">
                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {anime.title}
                </motion.h1>
                {anime.title_english && anime.title_english !== anime.title && (
                  <motion.p
                    className="text-xl text-gray-700 dark:text-gray-300 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {anime.title_english}
                  </motion.p>
                )}
                {anime.title_japanese && (
                  <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {anime.title_japanese}
                  </motion.p>
                )}
              </div>
              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {" "}
                <motion.button
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsStreamingModalOpen(true)}
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>Watch Now</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                  <span>Add to List</span>
                </motion.button>
              </motion.div>
              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {anime.score && (
                  <motion.div
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.score}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Score
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.year && (
                  <motion.div
                    className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.year}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Year
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.episodes && (
                  <motion.div
                    className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Film className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.episodes}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Episodes
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.duration && (
                  <motion.div
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {anime.duration}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Duration
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Genres
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <motion.span
                        key={`${genre.mal_id}-${index}`}
                        className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full border border-pink-200 dark:border-pink-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {genre.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}{" "}
              {/* Synopsis */}
              {anime.synopsis && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Synopsis
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {anime.synopsis}
                    </p>
                  </div>
                </motion.div>
              )}{" "}
              {/* Videos Section */}
              {videos && !videosLoading && !videosError && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Videos & Trailers
                  </h3>
                  <VideoPlayer videos={videos} />
                </motion.div>
              )}
              {/* Reviews Section */}
              {reviews &&
                !reviewsLoading &&
                !reviewsError &&
                reviews.length > 0 && (
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
                        <motion.div
                          key={review.mal_id}
                          className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-600/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.01, y: -2 }}
                        >
                          {/* Review Header */}
                          <div className="flex items-start space-x-4 mb-4">
                            {" "}
                            <div className="relative">
                              <Image
                                src={
                                  review.user.images?.jpg?.image_url ||
                                  "/man.png"
                                }
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
                              </div>{" "}
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
                                    <span>
                                      {review.episodes_watched} episodes
                                    </span>
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
                          </div>{" "}
                          {/* Review Scores */}
                          {review.scores && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {review.scores.story && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Story:
                                  </span>
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
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Sound:
                                  </span>
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
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </motion.div>
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
                              `https://myanimelist.net/anime/${anime.mal_id}/reviews`,
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
                )}{" "}
              {/* Additional Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {anime.members && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Members
                      </span>
                    </div>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {anime.members.toLocaleString()}
                    </p>
                  </motion.div>
                )}
                {anime.popularity && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Popularity
                      </span>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      #{anime.popularity}
                    </p>
                  </motion.div>
                )}
                {anime.status && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Film className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {anime.status}
                    </p>
                  </motion.div>
                )}{" "}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>{" "}
      {/* Streaming Modal */}{" "}
      <StreamingModal
        isOpen={isStreamingModalOpen}
        onClose={() => setIsStreamingModalOpen(false)}
        animeTitle={anime.title || anime.title_english || "Anime"}
      />
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={anime.title}
        synopsis={anime.synopsis}
        onToast={showToast}
      />
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
