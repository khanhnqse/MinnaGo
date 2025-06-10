import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Film, Play, Users } from "lucide-react";
import { Anime } from "@/types/anime";
import { motion } from "framer-motion";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export default function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const formatScore = (score: number | undefined) => {
    return score ? score.toFixed(1) : "N/A";
  };

  const formatNumber = (num: number | undefined) => {
    if (!num) return "N/A";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "currently airing":
        return "bg-green-500";
      case "finished airing":
        return "bg-blue-500";
      case "not yet aired":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group cursor-pointer"
    >
      <Link href={`/anime/${anime.mal_id}`}>
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Enhanced Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30" />

            <Image
              src={
                anime.images.jpg.large_image_url ||
                anime.images.jpg.image_url ||
                "/placeholder-anime.svg"
              }
              alt={anime.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />

            {/* Enhanced Overlay with shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Shimmer effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            />

            {/* Enhanced Status Badge */}
            {anime.status && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`absolute top-4 left-4 px-3 py-1 rounded-2xl text-xs font-bold text-white shadow-lg backdrop-blur-sm ${getStatusColor(
                  anime.status
                )} border border-white/20`}
              >
                {anime.status}
              </motion.div>
            )}

            {/* Enhanced Score Badge */}
            {anime.score && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-2xl flex items-center gap-1 text-sm font-bold shadow-lg border border-white/20"
              >
                <Star className="w-3 h-3 fill-current" />
                {formatScore(anime.score)}
              </motion.div>
            )}

            {/* Enhanced Rank Badge */}
            {anime.rank && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-lg border border-white/20"
              >
                #{anime.rank}
              </motion.div>
            )}

            {/* Hover overlay with watch button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-white/90 text-gray-900 rounded-2xl font-semibold shadow-xl backdrop-blur-sm flex items-center gap-2 hover:bg-white transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                Watch Now
              </motion.button>
            </motion.div>
          </div>

          {/* Enhanced Content */}
          <div className="relative p-6 space-y-4">
            {/* Enhanced Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight"
            >
              {anime.title_english || anime.title}
            </motion.h3>

            {/* Enhanced Type and Year */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium border border-purple-200 dark:border-purple-700/50">
                {anime.type || "Anime"}
              </span>
              {anime.year && (
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-full">
                  <Calendar className="w-3 h-3" />
                  {anime.year}
                </span>
              )}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
              className="grid grid-cols-2 gap-3 text-xs"
            >
              {anime.episodes && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <Film className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    {anime.episodes} eps
                  </span>
                </div>
              )}
              {anime.members && (
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                  <Users className="w-3 h-3 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    {formatNumber(anime.members)}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Enhanced Synopsis Preview */}
            {anime.synopsis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="relative overflow-hidden"
              >
                <motion.p
                  className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ lineHeight: "1.4" }}
                >
                  {anime.synopsis}
                </motion.p>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )}

            {/* Enhanced Hover Effects */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
