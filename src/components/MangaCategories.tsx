"use client";

import { motion } from "framer-motion";

interface MangaCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "All", icon: "📚", color: "from-purple-500 to-pink-500" },
  {
    id: "manga",
    label: "Manga",
    icon: "📖",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "manhwa",
    label: "Manhwa",
    icon: "🇰🇷",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "manhua",
    label: "Manhua",
    icon: "🇨🇳",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "light-novel",
    label: "Light Novel",
    icon: "📝",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "one-shot",
    label: "One-shot",
    icon: "⚡",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function MangaCategories({
  activeCategory,
  onCategoryChange,
}: MangaCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group ${
            activeCategory === category.id
              ? "text-white shadow-2xl"
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
          )}

          <div className="relative flex items-center gap-3 z-10">
            <motion.span
              className="text-lg"
              animate={
                activeCategory === category.id
                  ? { rotate: [0, 10, -10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {category.icon}
            </motion.span>
            <span className="text-sm font-medium">{category.label}</span>

            {/* Active indicator */}
            {activeCategory === category.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-white rounded-full shadow-lg"
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
