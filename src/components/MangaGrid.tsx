"use client";

import { motion } from "framer-motion";
import { Manga } from "@/types/anime";
import MangaCard from "./MangaCard";

interface MangaGridProps {
  manga: Manga[];
  loading?: boolean;
}

export default function MangaGrid({ manga, loading = false }: MangaGridProps) {
  if (loading && manga.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Skeleton Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />

              {/* Skeleton Content */}
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (manga.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          No manga found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try searching with different keywords or browse our top manga.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      {manga.map((item, index) => (
        <MangaCard key={item.mal_id} manga={item} index={index} />
      ))}

      {/* Loading additional items */}
      {loading && manga.length > 0 && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`loading-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Skeleton Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />

                {/* Skeleton Content */}
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
}
