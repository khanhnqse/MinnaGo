"use client";

import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import AnimeGrid from "@/components/AnimeGrid";
import AnimeCategories from "@/components/AnimeCategories";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {
    animes,
    loading,
    error,
    query,
    setQuery,
    triggerSearch,
    searchByCategory,
    clearResults,
    hasSearched,
  } = useAnimeSearch();

  // Background image carousel state
  const backgroundImages = [
    "/4f2878220213515.67bf12e77d063.jpg",
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

  const handleCategorySelect = (categoryQuery: string) => {
    searchByCategory(categoryQuery);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />
      {/* Hero Section - Enhanced Layout with Original Colors */}
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
                <Sparkles className="h-4 w-4 text-pink-400" />
              ) : (
                <Sparkles className="h-3 w-3 text-purple-400" />
              )}
            </motion.div>
          ))}
        </div>{" "}
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
                  alt="Anime background"
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
                    みんなご
                  </h1>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                    Discover, explore, and dive into the magical world of anime.
                    Find your next favorite series from thousands of titles.
                  </p>{" "}
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <motion.button
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✨ Start Watching Free
                    </motion.button>

                    <motion.button
                      className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Collection
                    </motion.button>

                    <Link href="/rankings">
                      <motion.button
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🏆 Top Rankings
                      </motion.button>
                    </Link>
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
        {/* Search Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-purple-200 dark:border-purple-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SearchInput
                value={query}
                onChange={setQuery}
                onSearch={triggerSearch}
                placeholder="Search for anime titles, genres, or studios..."
              />

              {/* Quick Search Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
              >                {['One Piece', 'Demon Slayer', 'Attack on Titan', 'Your Name', 'Jujutsu Kaisen'].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setQuery(suggestion);
                      // Trigger search immediately with the suggestion
                      searchByCategory(suggestion);
                    }}
                    className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 border border-purple-200 dark:border-purple-700/50"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Results Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (animes.length > 0 || hasSearched) && (
            <>
              {/* Back to Categories button */}
              {hasSearched && !query && (
                <motion.div
                  className="mb-8 flex justify-center pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.button
                    onClick={clearResults}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    <span>Back to Categories</span>
                  </motion.button>
                </motion.div>
              )}
              <div className="pt-8">
                <AnimeGrid animes={animes} hasSearched={hasSearched} />
              </div>
            </>
          )}
          {!hasSearched && !loading && !error && (
            <>
              {/* Featured Categories Section */}
              <div className="pt-12 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                      Browse by Genre
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Discover anime by your favorite categories
                    </p>
                  </motion.div>
                  <AnimeCategories onCategorySelect={handleCategorySelect} />
                </div>
              </div>

              {/* Welcome Message */}
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="relative max-w-4xl mx-auto">
                  {/* Glowing orb effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <Sparkles className="h-16 w-16 mx-auto mb-6 text-pink-500" />
                    </motion.div>

                    <motion.h2
                      className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      Welcome to Your Anime Universe
                    </motion.h2>

                    <motion.p
                      className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      Join millions of fans worldwide and dive into the
                      captivating world of anime. From action-packed adventures
                      to heartwarming stories, find your next obsession here.
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.3 }}
                    >
                      <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                        Start Your Journey
                      </button>
                      <button className="border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm">
                        Explore Trending
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
