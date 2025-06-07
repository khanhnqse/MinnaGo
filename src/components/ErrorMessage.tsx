import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      className="flex items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-red-200 dark:border-red-800/50 shadow-xl max-w-md mx-auto">
          <motion.div
            className="flex items-center justify-center mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
          </motion.div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>

            {onRetry && (
              <motion.button
                onClick={onRetry}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
