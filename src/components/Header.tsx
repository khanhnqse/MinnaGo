"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Search, User, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-white/95 to-gray-100/95 dark:from-purple-900/90 dark:to-pink-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-purple-500/20 sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Magical sparkles around logo */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-pulse delay-300"></div>
            </motion.div>{" "}
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              MinnaGo
            </div>
          </Link>{" "}
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {" "}
            <Link
              href="/rankings"
              className="text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Rankings
            </Link>
            <Link
              href="/enhanced"
              className="text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Enhanced
            </Link>
            <Link
              href="/manga"
              className="text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Manga
            </Link>
          </nav>{" "}
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {" "}
            {/* Premium Button */}
            <Link href="/premium">
              <motion.button
                className="hidden sm:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-all duration-300 shadow-lg shadow-purple-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ Try Premium
              </motion.button>
            </Link>{" "}
            {/* Search Icon */}
            <motion.button
              className="p-2 text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 transition-colors duration-300 hover:bg-gray-200/50 dark:hover:bg-purple-800/30 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>{" "}
            {/* User Icon */}
            <Link href="/profile">
              <motion.button
                className="p-2 text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 transition-colors duration-300 hover:bg-gray-200/50 dark:hover:bg-purple-800/30 rounded-lg"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
              </motion.button>
            </Link>
            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>{" "}
            {/* Mobile Menu */}
            <motion.button
              className="md:hidden p-2 text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 transition-colors duration-300 hover:bg-gray-200/50 dark:hover:bg-purple-800/30 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
