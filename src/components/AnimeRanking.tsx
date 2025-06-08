"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useAnimeRanking,
  RankingType,
  rankingCategories,
} from "@/hooks/useAnimeRanking";
import RankingCard from "./RankingCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AnimeRanking() {
  const { rankings, loading, error, activeCategory, switchCategory } =
    useAnimeRanking();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const currentRanking = rankings[activeCategory] || [];
  const currentError = error[activeCategory];
  const isLoading = loading[activeCategory];

  // Background image carousel state
  const backgroundImages = [
    "/firen.png",
    "/man.png",
    "/mitsuri.png",
    "/34e2b8220213515.67bf12e77c4b6.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Pagination - ensure currentRanking is always an array
  const safeCurrentRanking = Array.isArray(currentRanking)
    ? currentRanking
    : [];
  const totalPages = Math.ceil(safeCurrentRanking.length / itemsPerPage);
  const currentItems = safeCurrentRanking.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCategoryChange = (category: RankingType) => {
    switchCategory(category);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-purple-950/50 dark:to-pink-950/50">
      {" "}
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden min-h-[60vh]">
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "backInOut" }}
              className="absolute inset-0"
            >
              {" "}
              <Image
                src={backgroundImages[currentImageIndex]}
                alt="Anime background"
                fill
                className="object-cover opacity-90"
                priority
                sizes="100vw"
              />
              {/* Dark overlay - reduced opacity for brighter background */}
              <div className="absolute inset-0 bg-black/40"></div>
              {/* Gradient overlay - reduced opacity */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-pink-900/20 to-indigo-900/60"></div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20"></div>
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-950/90"></div>{" "}
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 flex items-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full"
          >
            {/* Floating Trophy Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                bounce: 0.4,
              }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-2xl" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce shadow-lg"></div>
              </div>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
                Rankings
              </span>
              {/* <br /> */}
              {/* <span className="bg-gradient-to-r from-pink-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
                Rankings
              </span> */}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-100 max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow-lg"
            >
              Discover the highest-rated, most popular, and trending anime
              across different categories with our comprehensive ranking system
            </motion.p>

            {/* Enhanced Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-8 sm:gap-12 text-base text-gray-200 mb-8"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">7 Categories</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Real-time Data</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hidden sm:flex">
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Updated Daily</span>
              </div>
            </motion.div>

            {/* Image Navigation Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center gap-3"
            >
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white shadow-lg scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Switch to background image ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>{" "}
      {/* Modern Category Navigation */}
      <div className="sticky top-16 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Pills */}
          <div className="flex overflow-x-auto scrollbar-hide py-6 gap-3">
            {rankingCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`group flex-shrink-0 relative overflow-hidden px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                    : "bg-white/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Background glow effect for active category */}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative flex items-center gap-3">
                  <motion.span
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {category.icon}
                  </motion.span>
                  <div className="text-left">
                    <div className="text-sm font-bold">{category.name}</div>
                    <div className="text-xs opacity-75 hidden sm:block">
                      {category.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <LoadingSpinner />}
        {currentError && <ErrorMessage message={currentError} />}
        {!isLoading && !currentError && safeCurrentRanking.length > 0 && (
          <>
            {" "}
            {/* Modern Category Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                      {
                        rankingCategories.find((c) => c.id === activeCategory)
                          ?.icon
                      }
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {
                          rankingCategories.find((c) => c.id === activeCategory)
                            ?.name
                        }
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {
                          rankingCategories.find((c) => c.id === activeCategory)
                            ?.description
                        }
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {safeCurrentRanking.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Anime
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Showing {currentItems.length} items</span>
                    </div>
                    <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>
                        Page {currentPage + 1} of {totalPages}
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-500 dark:text-gray-400">
                    Updated recently
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Rankings Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentItems.map((anime, index) => (
                  <RankingCard
                    key={anime.mal_id}
                    anime={anime}
                    rank={currentPage * itemsPerPage + index + 1}
                  />
                ))}
              </motion.div>
            </AnimatePresence>{" "}
            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage + 1} of {totalPages} (
                      {safeCurrentRanking.length} total results)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Live data</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        currentPage === 0
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
                      }`}
                      whileHover={
                        currentPage !== 0 ? { scale: 1.05, x: -5 } : {}
                      }
                      whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="hidden sm:block">Previous</span>
                    </motion.button>

                    <div className="flex items-center gap-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageIndex;
                          if (totalPages <= 5) {
                            pageIndex = i;
                          } else {
                            const start = Math.max(
                              0,
                              Math.min(currentPage - 2, totalPages - 5)
                            );
                            pageIndex = start + i;
                          }

                          return (
                            <motion.button
                              key={pageIndex}
                              onClick={() => setCurrentPage(pageIndex)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                                pageIndex === currentPage
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400"
                              }`}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {pageIndex + 1}
                            </motion.button>
                          );
                        }
                      )}

                      {totalPages > 5 && currentPage < totalPages - 3 && (
                        <>
                          <span className="text-gray-400 mx-2">...</span>
                          <motion.button
                            onClick={() => setCurrentPage(totalPages - 1)}
                            className="w-12 h-12 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {totalPages}
                          </motion.button>
                        </>
                      )}
                    </div>

                    <motion.button
                      onClick={nextPage}
                      disabled={currentPage === totalPages - 1}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        currentPage === totalPages - 1
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105"
                      }`}
                      whileHover={
                        currentPage !== totalPages - 1
                          ? { scale: 1.05, x: 5 }
                          : {}
                      }
                      whileTap={
                        currentPage !== totalPages - 1 ? { scale: 0.95 } : {}
                      }
                    >
                      <span className="hidden sm:block">Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}{" "}
        {!isLoading && !currentError && safeCurrentRanking.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center min-h-[400px]"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Trophy className="w-24 h-24 text-gray-300 dark:text-gray-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                </div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4"
              >
                No Rankings Available
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto"
              >
                We couldn&#39;t find any anime rankings for this category. Try
                selecting a different category or refresh the page.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                onClick={() => switchCategory("all")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Top Anime
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
