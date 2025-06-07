"use client";

import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import AnimeGrid from "@/components/AnimeGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { motion } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";

export default function Home() {
  const {
    animes,
    loading,
    error,
    query,
    setQuery,
    triggerSearch,
    hasSearched,
  } = useAnimeSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />

      {/* Hero Section */}
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
              ) : i % 3 === 1 ? (
                <Heart className="h-3 w-3 text-red-400" />
              ) : (
                <Star className="h-3 w-3 text-yellow-400" />
              )}
            </motion.div>
          ))}
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Anime
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Universe Awaits
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, explore, and dive into the magical world of anime. Find
              your next favorite series from thousands of titles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <SearchInput
                value={query}
                onChange={setQuery}
                onSearch={triggerSearch}
                placeholder="Search for anime (e.g., Naruto, Attack on Titan)..."
              />
            </motion.div>

            {/* Popular suggestions */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                Popular:
              </span>
              {[
                "One Piece",
                "Demon Slayer",
                "Attack on Titan",
                "Your Name",
              ].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-200 dark:border-purple-700 text-pink-600 dark:text-purple-300 px-3 py-1 rounded-full hover:bg-pink-50 dark:hover:bg-purple-800/50 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </main>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && query && (
          <AnimeGrid animes={animes} hasSearched={hasSearched} />
        )}

        {!query && !loading && !error && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative">
              {/* Glowing orb effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              </div>

              <div className="relative z-10 text-gray-600 dark:text-gray-300">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Sparkles className="h-16 w-16 mx-auto mb-6 text-pink-400" />
                </motion.div>

                <motion.p
                  className="text-xl mb-4 font-medium"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Your anime adventure begins here!
                </motion.p>

                <motion.p
                  className="text-sm opacity-80"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  Start typing to discover amazing anime series and movies
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
