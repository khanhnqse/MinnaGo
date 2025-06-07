import { motion } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      {/* Main spinning circle */}
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
        </motion.div>

        {/* Floating anime elements */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-6 h-6 text-pink-500 fill-current" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
        </motion.div>

        <motion.div
          className="absolute top-0 left-0"
          animate={{
            rotate: [0, 180, 360],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
        </motion.div>
      </div>

      {/* Loading text with gradient */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
          Searching Anime Universe
        </h3>
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
