"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dice1,
  RefreshCw,
  Star,
  Calendar,
  Users,
  Eye,
  Clock,
  ExternalLink,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRandomAnime } from "@/hooks/useRandomAnime";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShareModal from "@/components/ShareModal";
import Toast from "@/components/Toast";
import Header from "@/components/Header";

export default function RandomAnimePage() {
  const { anime, loading, error, fetchRandomAnime } = useRandomAnime();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  // Fetch initial random anime on component mount
  useEffect(() => {
    fetchRandomAnime();
  }, [fetchRandomAnime]);

  const handleGetNewAnime = () => {
    fetchRandomAnime();
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-black dark:to-gray-800 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
              <motion.button
                onClick={handleGetNewAnime}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-black dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl border border-white/20 dark:border-white/10 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Dice1 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              Random Anime Discovery
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover your next favorite anime with our random anime generator!
          </p>
        </motion.div>

        {/* Random Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={handleGetNewAnime}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6" />
              {loading ? "Getting Random Anime..." : "Get Random Anime"}
            </div>
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-16"
          >
            <LoadingSpinner />
          </motion.div>
        )}

        {/* Anime Display */}
        <AnimatePresence mode="wait">
          {anime && !loading && (
            <motion.div
              key={anime.mal_id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/3 relative">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={
                        anime.images.jpg.large_image_url ||
                        anime.images.jpg.image_url
                      }
                      alt={anime.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Score Badge */}
                    {anime.score && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {anime.score}
                      </div>
                    )}

                    {/* Rank Badge */}
                    {anime.rank && (
                      <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full font-bold">
                        #{anime.rank}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-8">
                  {/* Title */}
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {anime.title}
                    </h2>
                    {anime.title_english &&
                      anime.title_english !== anime.title && (
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {anime.title_english}
                        </p>
                      )}
                    {anime.title_japanese && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {anime.title_japanese}
                      </p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {anime.type && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Type
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {anime.type}
                        </div>
                      </div>
                    )}

                    {anime.episodes && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Episodes
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {anime.episodes}
                        </div>
                      </div>
                    )}

                    {anime.status && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Status
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {anime.status}
                        </div>
                      </div>
                    )}

                    {anime.year && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Year
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {anime.year}
                        </div>
                      </div>
                    )}

                    {anime.duration && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Duration
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {anime.duration}
                        </div>
                      </div>
                    )}

                    {anime.members && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Members
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {anime.members.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {anime.genres && anime.genres.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Genres
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {anime.genres.map((genre) => (
                          <span
                            key={genre.mal_id}
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Synopsis */}
                  {anime.synopsis && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Synopsis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {anime.synopsis}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/anime/${anime.mal_id}`}>
                      <motion.button
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </motion.button>
                    </Link>

                    <motion.button
                      onClick={handleShare}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Facts Section */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🎲 Random Anime Fun Facts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div>There are over 12,000 anime series and movies!</div>
                <div>
                  The anime industry is worth over $24 billion worldwide
                </div>
                <div>Japan produces about 300+ new anime series each year</div>
              </div>
            </div>
          </motion.div>      )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={anime?.title || "Random Anime"}
        synopsis={
          anime?.synopsis || "Check out this amazing anime I discovered!"
        }
        onToast={showToast}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}
