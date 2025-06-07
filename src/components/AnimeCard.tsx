import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Film, Play } from "lucide-react";
import { Anime } from "@/types/anime";
import { motion } from "framer-motion";
import { useState } from "react";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <motion.div
        className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer border border-white/20 dark:border-gray-700/50"
        whileHover={{
          scale: 1.03,
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {" "}
            <Image
              src={
                anime.images.jpg.large_image_url ||
                anime.images.jpg.image_url ||
                "/placeholder-anime.svg"
              }
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Score Badge */}
          {anime.score && (
            <motion.div
              className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg flex items-center space-x-1 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <Star className="h-3 w-3 fill-current" />
              <span className="text-sm font-bold">{anime.score}</span>
            </motion.div>
          )}

          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <Play className="h-8 w-8 text-pink-500 fill-current" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <motion.h3
            className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 dark:text-white bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text group-hover:text-transparent transition-all duration-300"
            layout
          >
            {anime.title}
          </motion.h3>

          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            {anime.year && (
              <motion.div
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="h-3 w-3" />
                <span>{anime.year}</span>
              </motion.div>
            )}
            {anime.episodes && (
              <motion.div
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <Film className="h-3 w-3" />
                <span>{anime.episodes} eps</span>
              </motion.div>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <motion.p
              className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed"
              layout
            >
              {anime.synopsis}
            </motion.p>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <motion.div className="flex flex-wrap gap-2" layout>
              {anime.genres.slice(0, 3).map((genre, index) => (
                <motion.span
                  key={genre.mal_id}
                  className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full border border-pink-200 dark:border-pink-700/50 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(236, 72, 153, 0.1)",
                  }}
                >
                  {genre.name}
                </motion.span>
              ))}
              {anime.genres.length > 3 && (
                <motion.span
                  className="inline-block text-gray-400 dark:text-gray-500 text-xs px-2 py-1 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  +{anime.genres.length - 3} more
                </motion.span>
              )}
            </motion.div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
      </motion.div>
    </Link>
  );
}
