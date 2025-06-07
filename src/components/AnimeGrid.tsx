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
        className="flex items-center justify-center min-h-[400px] py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative max-w-md mx-auto">
          {/* Floating orbs background */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

          {/* Main card with glassmorphism */}
          <motion.div
            className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Icon container */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>

            {/* Text content */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                No Results Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We couldn't find any anime matching your search. Try different
                keywords or browse popular titles.
              </p>

              {/* Suggestion pills */}
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                {["Naruto", "One Piece", "Attack on Titan"].map(
                  (suggestion, index) => (
                    <motion.span
                      key={suggestion}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 cursor-pointer hover:bg-cyan-500/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try "{suggestion}"
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      filter: "blur(6px)",
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 1,
        ease: "easeOut",
        filter: {
          duration: 0.6,
        },
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 25,
        },
      },
    },
  };
  return (
    <div className="relative w-full">
      {/* Dynamic ambient background mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/6 to-teal-500/6 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>{" "}
      {/* Enhanced grid with 4 column layout */}
      <motion.div
        className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8
                   grid-cols-1 
                   sm:grid-cols-2 
                   md:grid-cols-3 
                   lg:grid-cols-4 
                   xl:grid-cols-4 
                   2xl:grid-cols-4 
                   auto-rows-fr"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {animes.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            variants={itemVariants}
            layout
            layoutId={`anime-card-${anime.mal_id}`}
            className="group relative"
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
            whileHover={{
              scale: 1.02,
              y: -12,
              zIndex: 10,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            {/* Advanced hover glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>

            {/* Magnetic field effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
                  "linear-gradient(90deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))",
                  "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))",
                  "linear-gradient(180deg, rgba(236,72,153,0.1), rgba(6,182,212,0.1))",
                  "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card container */}
            <div className="relative">
              <AnimeCard anime={anime} />
            </div>

            {/* Floating particles effect */}
            {index % 5 === 0 && (
              <motion.div
                className="absolute -top-2 -right-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-70"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.7, 0.3, 0.7],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
      {/* Floating action elements */}
      {animes.length > 15 && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          {/* Scroll to top button */}
          <motion.button
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center group relative overflow-hidden"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg
              className="w-6 h-6 text-white relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>

          {/* Grid view toggle (future feature) */}
          <motion.button
            className="w-12 h-12 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-xl backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 text-white"
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
          </motion.button>
        </motion.div>
      )}
      {/* Performance indicators */}
      {animes.length > 0 && (
        <motion.div
          className="fixed bottom-4 left-4 z-40 flex items-center space-x-2 backdrop-blur-md bg-black/20 px-3 py-2 rounded-full border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/70 font-medium">
            {animes.length} anime loaded
          </span>
        </motion.div>
      )}
    </div>
  );
}
