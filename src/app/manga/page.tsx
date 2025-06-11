"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  TrendingUp,
  Filter,
  Sparkles,
  Star,
  Zap,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMangaSearch } from "@/hooks/useMangaSearch";
import { useMangaRanking } from "@/hooks/useMangaRanking";
import MangaGrid from "@/components/MangaGrid";
import MangaCategories from "@/components/MangaCategories";
import Header from "@/components/Header";

export default function MangaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showTopManga, setShowTopManga] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  // Background manga images carousel state
  const backgroundImages = [
    "/4f2878220213515.67bf12e77d063.jpg", // You can replace these with manga-specific images
    "/9cef14220213515.67bf12e77ca41.jpg",
    "/b882ca220213515.67bf12e77d63a.jpg",
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
  // No automatic debounced search - only trigger on button click
  // Use hooks for data fetching
  const {
    manga: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useMangaSearch(debouncedQuery, currentPage, activeCategory);

  const {
    manga: topManga,
    loading: rankingLoading,
    error: rankingError,
  } = useMangaRanking("manga", currentPage);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery.trim());
      setShowTopManga(false);
      setCurrentPage(1);
    }
  };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    // If we have a search query, keep showing search results
    // If no search query, show top manga for "all" or filtered results for specific category
    if (!debouncedQuery.trim() && category === "all") {
      setShowTopManga(true);
    } else {
      setShowTopManga(false);
    }
  };

  const currentResults = showTopManga ? topManga : searchResults;
  const currentLoading = showTopManga ? rankingLoading : searchLoading;
  const currentError = showTopManga ? rankingError : searchError;
  const currentManga = currentResults?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, -100],
                x: [0, i % 2 === 0 ? 50 : -50],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
              style={{
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 3) * 10}%`,
              }}
            >
              {i % 3 === 0 ? (
                <BookOpen className="h-4 w-4 text-pink-400" />
              ) : (
                <Sparkles className="h-3 w-3 text-purple-400" />
              )}
            </motion.div>
          ))}
        </div>
        {/* Hero Banner */}
        <div className="relative h-[60vh] overflow-hidden">
          {/* Background Image Carousel */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <Image
                  src={backgroundImages[currentImageIndex]}
                  alt="Manga background"
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                    まんが
                  </h1>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                    Discover amazing manga series, from classic masterpieces to
                    the latest releases. Dive into incredible stories and
                    artwork.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <motion.button
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowTopManga(true)}
                    >
                      📚 Explore Top Manga
                    </motion.button>

                    <motion.button
                      className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Collection
                    </motion.button>

                    <motion.button
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🏆 Top Rankings
                    </motion.button>
                  </div>

                  {/* Image indicators */}
                  <div className="flex gap-2">
                    {backgroundImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Search Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-purple-200 dark:border-purple-800 text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Enhanced Search Bar */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div
                  className={`relative group transition-all duration-300 ${
                    searchFocused ? "scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <Search
                        className={`h-6 w-6 transition-all duration-200 ${
                          searchFocused
                            ? "text-purple-500 scale-110"
                            : "text-gray-400"
                        }`}
                      />
                    </div>

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      placeholder="Search for manga titles, authors, or genres..."
                      className="block w-full pl-16 pr-32 py-5 text-lg border-2 border-transparent rounded-3xl bg-white/90 backdrop-blur-md focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all duration-300 shadow-2xl dark:bg-gray-800/90 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-800"
                    />

                    {/* Search Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Search</span>
                    </motion.button>

                    {/* Search suggestions indicator */}
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-28 top-1/2 transform -translate-y-1/2"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>{" "}
                {/* Quick Search Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-3 mt-6"
                >
                  {[
                    "One Piece",
                    "Naruto",
                    "Attack on Titan",
                    "Death Note",
                    "Demon Slayer",
                  ].map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setDebouncedQuery(suggestion);
                        setShowTopManga(false);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 border border-purple-200 dark:border-purple-700/50"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>{" "}
      </section>

      {/* Enhanced Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          {/* Enhanced Categories and Status Bar */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Browse Categories
                  </h2>
                </div>
                <MangaCategories
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Enhanced Status Indicators */}
                <AnimatePresence mode="wait">
                  {showTopManga ? (
                    <motion.div
                      key="top-manga"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl shadow-lg"
                    >
                      <div className="relative">
                        <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -inset-1 bg-yellow-400/20 rounded-full"
                        />
                      </div>
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                        🔥 Top Manga Trending
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search-results"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl shadow-lg"
                    >
                      <div className="relative">
                        <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -inset-1 border border-purple-400/30 rounded-full"
                        />
                      </div>
                      <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                        🔍 Search Results
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Results Count */}
                {currentManga && currentManga.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700/50"
                  >
                    <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {currentManga.length} results
                    </span>
                  </motion.div>
                )}

                {/* Refresh Button */}
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 shadow-md"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>{" "}
          {/* Enhanced Loading State */}
          {currentLoading && currentManga.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative mb-8">
                {/* Multi-layered loading spinner */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-2 border-4 border-transparent border-r-pink-600 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {showTopManga
                    ? "🔍 Discovering Top Manga..."
                    : "📚 Searching for Manga..."}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we fetch the best manga for you
                </p>
              </motion.div>
              {/* Loading dots animation */}
              <div className="flex gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                  />
                ))}
              </div>{" "}
            </motion.div>
          )}
          {/* Enhanced Error State */}
          {currentError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Zap className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-lg">⚠️</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md leading-relaxed">
                  {currentError}
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </motion.button>
            </motion.div>
          )}
          {/* Enhanced Manga Grid */}
          {currentManga && currentManga.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MangaGrid manga={currentManga} loading={currentLoading} />
              {/* Enhanced Load More Button */}
              {currentResults?.pagination?.has_next_page && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-16"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentLoading}
                    className="relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden group"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20"
                      animate={{ x: [-100, 100] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative flex items-center gap-3">
                      {currentLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Loading more...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Load More Manga</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              )}{" "}
            </motion.div>
          )}
          {/* Enhanced Empty State */}
          {!currentLoading &&
            !currentError &&
            currentManga.length === 0 &&
            debouncedQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="relative mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-xl">🔍</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    No manga found
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl leading-relaxed">
                    We couldn&apos;t find any manga matching{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      &quot;{debouncedQuery}&quot;
                    </span>
                    . Try searching with different keywords or browse our
                    curated collection of top manga.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery("");
                      setShowTopManga(true);
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Browse Top Manga
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery("")}
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 flex items-center gap-3"
                  >
                    <Search className="w-5 h-5" />
                    Clear Search
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
        </motion.div>
      </div>
    </div>
  );
}
