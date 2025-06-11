"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useMangaCategories } from "@/hooks/useMangaCategories";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";

interface MangaCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function MangaCategories({
  activeCategory,
  onCategoryChange,
}: MangaCategoriesProps) {
  const { categories, loading, error } = useMangaCategories();
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Define how many categories to show initially (including "All")
  const INITIAL_CATEGORIES_COUNT = 13;if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
          Loading categories...
        </span>
      </div>
    );
  }
  if (error) {
    console.warn('MangaCategories error:', error);
    // Don't show error message to user, just use fallback categories
    // The hook already provides fallback categories when there's an error
  }  return (
    <div className="w-full space-y-4">
      {/* Header with categories count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Browse Categories
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {showAllCategories ? categories.length : Math.min(categories.length, INITIAL_CATEGORIES_COUNT)} 
          {!showAllCategories && categories.length > INITIAL_CATEGORIES_COUNT && ` of ${categories.length}`} categories
        </span>
      </div>
      
      {/* Categories Grid - Responsive layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-w-6xl mx-auto">
        {categories
          .filter((category, index, array) => 
            // Additional deduplication check at component level
            array.findIndex(c => c.id === category.id) === index
          )
          .slice(0, showAllCategories ? categories.length : INITIAL_CATEGORIES_COUNT)
          .map((category, index) => (
        <motion.button
          key={`category-${category.id}`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05, // Reduced delay since we might have more categories
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}          onClick={() => onCategoryChange(category.id)}
          className={`relative px-3 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden group text-center min-h-[3rem] flex flex-col items-center justify-center ${
            activeCategory === category.id
              ? "text-white shadow-lg"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 backdrop-blur-sm"
          }`}
        >
          {/* Active category background */}
          {activeCategory === category.id && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
              layoutId="activeCategory"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {/* Hover effect for inactive categories */}
          {activeCategory !== category.id && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10`}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Sparkle effect for active category */}
          {activeCategory === category.id && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                  "radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                  "radial-gradient(circle at 40% 60%, white 1px, transparent 1px)",
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}          <div className="relative flex flex-col items-center gap-1 z-10 w-full">
            <motion.span
              className="text-base"
              animate={
                activeCategory === category.id
                  ? { rotate: [0, 10, -10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {category.icon}
            </motion.span>
            <span className="text-xs font-medium leading-tight text-center break-words px-1">
              {category.label}
            </span>

            {/* Count badge for non-"all" categories - positioned as overlay */}
            {category.id !== "all" && category.count > 0 && (
              <span
                className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-colors min-w-[1.2rem] text-center ${
                  activeCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {category.count > 1000 ? `${Math.floor(category.count / 1000)}k` : category.count}
              </span>
            )}

            {/* Active indicator */}
            {activeCategory === category.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full shadow-sm"
              />
            )}</div>        </motion.button>
      ))}
      </div>
      
      {/* Show More/Show Less Button */}
      {categories.length > INITIAL_CATEGORIES_COUNT && (
        <div className="flex justify-center mt-6">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            <span>
              {showAllCategories 
                ? `Show Less Categories` 
                : `Show ${categories.length - INITIAL_CATEGORIES_COUNT} More Categories`
              }
            </span>
            <motion.div
              animate={{ rotate: showAllCategories ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showAllCategories ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
