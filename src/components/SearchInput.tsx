import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && value.trim()) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className={`relative group transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className={`h-6 w-6 transition-all duration-200 ${searchFocused ? 'text-purple-500 scale-110' : 'text-gray-400'}`} />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={placeholder}
            className="block w-full pl-16 pr-32 py-5 text-lg border-2 border-transparent rounded-3xl bg-white/90 backdrop-blur-md focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all duration-300 shadow-2xl dark:bg-gray-800/90 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-800"
          />
          
          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </motion.button>
          
          {/* Search suggestions indicator */}
          <AnimatePresence>
            {value && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-28 top-1/2 transform -translate-y-1/2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
