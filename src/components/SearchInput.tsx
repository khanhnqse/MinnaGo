import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search anime...",
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isFocused
            ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-xl scale-110"
            : "bg-gradient-to-r from-gray-200/50 to-gray-300/50 blur-sm"
        }`}
      ></div>

      {/* Main container */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <motion.div
            animate={{
              rotate: isFocused ? 360 : 0,
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Search
              className={`h-6 w-6 transition-colors duration-300 ${
                isFocused
                  ? "text-purple-500 dark:text-pink-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </motion.div>
        </div>{" "}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`block w-full pl-16 pr-24 py-5 border-2 rounded-2xl leading-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium transition-all duration-300 ${
            isFocused
              ? "border-purple-500 dark:border-pink-400 shadow-2xl neon-glow-purple dark:neon-glow text-purple-900 dark:text-pink-100"
              : "border-gray-300 dark:border-gray-600 shadow-lg hover:border-purple-300 dark:hover:border-pink-500"
          }`}
        />
        {/* Search Button */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <motion.button
            type="button"
            onClick={handleSearchClick}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
              value.trim()
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:from-pink-600 hover:to-purple-600 hover:shadow-xl"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            disabled={!value.trim()}
            whileHover={value.trim() ? { scale: 1.05 } : {}}
            whileTap={value.trim() ? { scale: 0.95 } : {}}
          >
            Search
          </motion.button>
        </div>{" "}
        {/* Animated sparkles */}
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  right: `${100 + i * 30}px`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-500 dark:text-pink-400" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
