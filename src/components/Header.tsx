"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10 dark:opacity-5"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full sparkle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-12 h-12 gradient-anime-2 rounded-xl flex items-center justify-center shadow-lg neon-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <div className="flex flex-col">
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                MinnaGo
              </motion.div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                Discover Amazing Anime
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
