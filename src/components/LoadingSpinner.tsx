import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24"
    >
      <div className="relative mb-8">
        {/* Multi-layered loading spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 border-4 border-transparent border-r-pink-600 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          🔍 Discovering Amazing Anime...
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we fetch the best anime for you
        </p>
      </motion.div>
      {/* Loading dots animation */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-purple-500 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
