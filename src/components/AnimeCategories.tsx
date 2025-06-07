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
  return (
    <div className="py-12">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-blue-400/20 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategorySelect(category.query)}
              className={`group relative p-6 bg-gradient-to-br ${category.color} rounded-xl text-left overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Magical sparkles */}
              <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200 ml-2 -mt-1"></div>
              </div>

              {/* Icon */}
              <div className="relative mb-3 z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12">
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm drop-shadow-sm">
                  {category.description}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
