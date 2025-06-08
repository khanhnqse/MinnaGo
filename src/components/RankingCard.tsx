"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types/anime";
import { Star, Users, Calendar, Trophy } from "lucide-react";

interface RankingCardProps {
  anime: Anime;
  rank: number;
}

export default function RankingCard({ anime, rank }: RankingCardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 via-yellow-500 to-orange-500";
    if (rank === 2) return "from-gray-300 via-gray-400 to-gray-500";
    if (rank === 3) return "from-amber-600 via-amber-700 to-orange-700";
    return "from-purple-500 via-purple-600 to-pink-600";
  };

  const getRankShadow = (rank: number) => {
    if (rank === 1) return "shadow-yellow-500/30";
    if (rank === 2) return "shadow-gray-400/30";
    if (rank === 3) return "shadow-amber-600/30";
    return "shadow-purple-500/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: rank * 0.05,
        type: "spring",
        bounce: 0.4,
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className="group relative perspective-1000"
    >
      <Link href={`/anime/${anime.mal_id}`}>
        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-300/50 dark:group-hover:border-purple-600/50">
          {/* Gradient Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Enhanced Rank Badge */}
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className={`bg-gradient-to-r ${getRankColor(
                rank
              )} text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg ${getRankShadow(
                rank
              )} border border-white/20`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {rank <= 3 ? (
                <div className="flex items-center gap-1">
                  <span className="text-lg drop-shadow-lg">
                    {getRankIcon(rank)}
                  </span>
                  <span className="text-xs font-normal opacity-90">
                    #{rank}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 drop-shadow-lg" />
                  <span className="font-bold">{getRankIcon(rank)}</span>
                </div>
              )}
            </motion.div>
          </div>{" "}
          {/* Enhanced Anime Image */}
          <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden">
            <Image
              src={
                anime.images.jpg.large_image_url || anime.images.jpg.image_url
              }
              alt={anime.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Score Badge */}
            {anime.score && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-bold border border-white/20"
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{anime.score}</span>
                </div>
              </motion.div>
            )}
          </div>
          {/* Enhanced Content */}
          <div className="p-6 pt-0 space-y-4">
            <div>
              <h3 className="font-black text-xl leading-tight text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mb-2">
                {anime.title}
              </h3>

              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 opacity-75">
                  {anime.title_english}
                </p>
              )}
            </div>
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {anime.score && (
                <motion.div
                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
                      {anime.score}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 opacity-75">
                      Score
                    </div>
                  </div>
                </motion.div>
              )}

              {anime.members && (
                <motion.div
                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-blue-700 dark:text-blue-400">
                      {anime.members > 1000000
                        ? `${(anime.members / 1000000).toFixed(1)}M`
                        : anime.members > 1000
                        ? `${(anime.members / 1000).toFixed(0)}K`
                        : anime.members}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500 opacity-75">
                      Members
                    </div>
                  </div>
                </motion.div>
              )}

              {anime.year && (
                <motion.div
                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-green-700 dark:text-green-400">
                      {anime.year}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-500 opacity-75">
                      Year
                    </div>
                  </div>
                </motion.div>
              )}

              {anime.episodes && (
                <motion.div
                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-4 h-4 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                    #
                  </div>
                  <div>
                    <div className="text-sm font-bold text-purple-700 dark:text-purple-400">
                      {anime.episodes > 1000 ? "1000+" : anime.episodes}
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-500 opacity-75">
                      Episodes
                    </div>
                  </div>
                </motion.div>
              )}
            </div>{" "}
            {/* Type & Status Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {anime.type && (
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
                  {anime.type}
                </span>
              )}
              {anime.status && (
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
                  {anime.status}
                </span>
              )}
            </div>
          </div>
          {/* Enhanced Hover Effect Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            whileHover={{
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
