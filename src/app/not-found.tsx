"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Sparkles, Ghost, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>{" "}
      {/* Floating magical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-gray-500 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Sparkles size={40} />
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-1/3 text-gray-400 opacity-20"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Ghost size={60} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-2/3 text-gray-600 opacity-20"
          animate={{ rotate: 180, scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Sparkles size={30} />
        </motion.div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {" "}
          <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </h1>
        </motion.div>
        {/* Ghost Icon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          {" "}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl shadow-gray-800/50"
          >
            <Ghost className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4"
        >
          Oops! Anime Not Found
        </motion.h2>{" "}
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
        >
          This function will be updated later. For now, please return to the
          home page to continue exploring amazing anime shows and discover new
          adventures!
        </motion.p>
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Home Button */}
          <Link href="/">
            {" "}
            <motion.button
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg shadow-gray-800/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          {/* Search Button */}
          <Link href="/#search">
            {" "}
            <motion.button
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold rounded-xl shadow-lg shadow-gray-900/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
              Search Anime
            </motion.button>
          </Link>
        </motion.div>
        {/* Go Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Or go back to previous page
          </button>
        </motion.div>
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute top-20 left-20 hidden lg:block"
        >
          {" "}
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-20 right-20 hidden lg:block"
        >
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="absolute top-1/3 right-10 hidden md:block"
        >
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse delay-500"></div>
        </motion.div>
      </div>{" "}
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
