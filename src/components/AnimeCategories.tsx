/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  Swords,
  Heart,
  Zap,
  Smile,
  Ghost,
  Wand2,
  Car,
  BookOpen,
  Users,
  Music,
  Gamepad2,
  Sparkles,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  query: string;
}

interface AnimeCategoriesProps {
  onCategorySelect: (query: string) => void;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Action",
    icon: Swords,
    color: "from-red-500 to-orange-500",
    description: "Epic battles & adventures",
    query: "action",
  },
  {
    id: 2,
    name: "Romance",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "Love stories & relationships",
    query: "romance",
  },
  {
    id: 3,
    name: "Supernatural",
    icon: Zap,
    color: "from-purple-500 to-indigo-500",
    description: "Magic & supernatural powers",
    query: "supernatural",
  },
  {
    id: 4,
    name: "Comedy",
    icon: Smile,
    color: "from-yellow-500 to-amber-500",
    description: "Funny & lighthearted",
    query: "comedy",
  },
  {
    id: 5,
    name: "Horror",
    icon: Ghost,
    color: "from-gray-700 to-gray-900",
    description: "Scary & thrilling",
    query: "horror",
  },
  {
    id: 6,
    name: "Fantasy",
    icon: Wand2,
    color: "from-emerald-500 to-teal-500",
    description: "Magical worlds & creatures",
    query: "fantasy",
  },
  {
    id: 7,
    name: "Sports",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    description: "Athletic competitions",
    query: "sports",
  },
  {
    id: 8,
    name: "Slice of Life",
    icon: BookOpen,
    color: "from-green-500 to-lime-500",
    description: "Everyday life stories",
    query: "slice of life",
  },
  {
    id: 9,
    name: "School",
    icon: Users,
    color: "from-violet-500 to-purple-500",
    description: "School & student life",
    query: "school",
  },
  {
    id: 10,
    name: "Music",
    icon: Music,
    color: "from-fuchsia-500 to-pink-500",
    description: "Musical themes & bands",
    query: "music",
  },
  {
    id: 11,
    name: "Game",
    icon: Gamepad2,
    color: "from-orange-500 to-red-500",
    description: "Gaming & virtual worlds",
    query: "game",
  },
  {
    id: 12,
    name: "Shounen",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-500",
    description: "Young male protagonists",
    query: "shounen",
  },
];

export default function AnimeCategories({
  onCategorySelect,
}: AnimeCategoriesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-full py-12">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Browse by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover anime by your favorite genres
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const IconComponent = category.icon;

          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
              onClick={() => onCategorySelect(category.query)}
            >
              <div className="relative overflow-hidden">
                {/* Gradient background */}
                <div
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 h-32 flex flex-col items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Floating background particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="mb-2"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <IconComponent className="h-8 w-8" />
                  </motion.div>

                  {/* Category name */}
                  <h3 className="text-sm font-semibold text-center leading-tight">
                    {category.name}
                  </h3>
                </div>

                {/* Hover description overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <p className="text-white text-xs text-center px-3 leading-relaxed">
                    {category.description}
                  </p>
                </motion.div>

                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                ></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Popular categories highlight */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Most Popular Categories
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {["Action", "Romance", "Comedy", "Fantasy"].map((popular, index) => (
            <motion.span
              key={popular}
              className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 cursor-pointer hover:bg-purple-500/20 transition-colors"
              onClick={() => onCategorySelect(popular.toLowerCase())}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {popular}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
