"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Menu, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-white/95 to-gray-100/95 dark:from-purple-900/90 dark:to-pink-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-purple-500/20 sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30 dark:shadow-purple-500/50">
                <Image
                  src="/bilibili.svg"
                  alt="MinnaGo Logo"
                  width={20}
                  height={20}
                  className="text-white filter brightness-0 invert"
                />
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
              <Search className="w-5 h-5" />            </motion.button>{" "}
            
            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                {/* User Avatar/Menu */}
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 transition-colors duration-300 hover:bg-gray-200/50 dark:hover:bg-purple-800/30 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                    <Image
                      src={user.avatar || "/man.png"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:block font-medium text-sm">{user.name}</span>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <Link href="/profile">
                          <motion.div
                            onClick={() => setShowUserMenu(false)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <User className="w-4 h-4" />
                            <span className="font-medium">Profile</span>
                          </motion.div>
                        </Link>
                        
                        <Link href="/settings">
                          <motion.div
                            onClick={() => setShowUserMenu(false)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Settings className="w-4 h-4" />
                            <span className="font-medium">Settings</span>
                          </motion.div>
                        </Link>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        
                        <motion.button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Sign Out</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Backdrop */}
                {showUserMenu && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            ) : (
              /* Login/Signup Buttons for non-authenticated users */
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <motion.button
                    className="hidden sm:block text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-pink-200 font-medium px-4 py-2 rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/auth/signup">
                  <motion.button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
            
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
