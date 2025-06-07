import { Search } from "lucide-react";
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
      {/* Magical floating particles */}
      <div className="absolute -inset-4 opacity-30">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-0 left-3/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-purple-300" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`block w-full pl-12 pr-20 py-4 border rounded-lg bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md text-white placeholder-purple-300 text-base transition-all duration-300 ${
            isFocused
              ? "border-pink-400 shadow-lg shadow-pink-500/30 ring-2 ring-pink-400/30"
              : "border-purple-500/50 hover:border-purple-400/70"
          }`}
        />

        {/* Search Button */}
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <motion.button
            type="button"
            onClick={handleSearchClick}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
              value.trim()
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!value.trim()}
            whileHover={value.trim() ? { scale: 1.05, y: -2 } : {}}
            whileTap={value.trim() ? { scale: 0.95 } : {}}
          >
            ✨ Search
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
