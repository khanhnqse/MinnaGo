import AnimeCard from "./AnimeCard";
import { Anime } from "@/types/anime";
import { motion } from "framer-motion";

interface AnimeGridProps {
  animes: Anime[];
  hasSearched?: boolean;
}

export default function AnimeGrid({
  animes,
  hasSearched = true,
}: AnimeGridProps) {
  if (animes.length === 0 && hasSearched) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-2xl opacity-20"></div>
          </div>
          <div className="relative z-10">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              No anime found for your search
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try searching for something else or check your spelling
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {animes.map((anime) => (
        <motion.div key={anime.mal_id} variants={itemVariants} layout>
          <AnimeCard anime={anime} />
        </motion.div>
      ))}
    </motion.div>
  );
}
