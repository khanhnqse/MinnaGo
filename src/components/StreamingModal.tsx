"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Tv } from "lucide-react";

// interface StreamingPlatform {
//   name: string;
//   url: string;
//   icon: string;
//   color: string;
//   description: string;
// }

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
}

// const streamingPlatforms: StreamingPlatform[] = [
//   {
//     name: "Crunchyroll",
//     url: "https://www.crunchyroll.com/search?q=",
//     icon: "🟠",
//     color: "from-orange-500 to-orange-600",
//     description: "Available in Vietnam & worldwide",
//   },
//   {
//     name: "Netflix",
//     url: "https://www.netflix.com/search?q=",
//     icon: "🔴",
//     color: "from-red-500 to-red-600",
//     description: "Global platform with Vietnamese subs",
//   },
//   {
//     name: "Bilibili",
//     url: "https://www.bilibili.com/search?keyword=",
//     icon: "📺",
//     color: "from-cyan-500 to-blue-600",
//     description: "Popular in Asia with English subs",
//   },
//   {
//     name: "iQiyi",
//     url: "https://www.iq.com/search/",
//     icon: "🟢",
//     color: "from-green-500 to-green-600",
//     description: "Available in Vietnam & Southeast Asia",
//   },
//   {
//     name: "Tubi",
//     url: "https://tubitv.com/search/",
//     icon: "🔵",
//     color: "from-blue-500 to-blue-600",
//     description: "Free streaming with ads",
//   },
//   {
//     name: "Animeflix",
//     url: "https://animeflix.live/search?keyword=",
//     icon: "🎬",
//     color: "from-purple-500 to-purple-600",
//     description: "Free anime with multiple languages",
//   },
//   {
//     name: "Animesuge",
//     url: "https://animesuge.to/search?keyword=",
//     icon: "⚡",
//     color: "from-yellow-500 to-yellow-600",
//     description: "HD anime with Vietnamese subtitles",
//   },
//   {
//     name: "Zoro.to",
//     url: "https://zoro.to/search?keyword=",
//     icon: "🎭",
//     color: "from-indigo-500 to-indigo-600",
//     description: "High quality anime streaming",
//   },
// ];

export default function StreamingModal({
  isOpen,
  onClose,
  animeTitle,
}: StreamingModalProps) {
  //   const handlePlatformClick = (platform: StreamingPlatform) => {
  //     const searchQuery = encodeURIComponent(animeTitle);
  //     window.open(platform.url + searchQuery, "_blank");
  //   };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Tv className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Watch &quot;{animeTitle}&quot;
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose your preferred streaming platform
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>{" "}
            {/* Platforms Grid */}
            <div className="p-6">
              {/* No Direct Streaming Notice */}
              <motion.div
                className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Tv className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                      Direct Streaming Not Available
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      We don&#39;t support direct streaming right now. This
                      feature will be available in future updates.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hidden streaming platforms section */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {streamingPlatforms.map((platform, index) => (
                  <motion.button
                    key={platform.name}
                    className="group relative p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-transparent hover:shadow-lg transition-all duration-200 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlatformClick(platform)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-200`}
                    />

                    <div className="relative flex items-center space-x-4">
                      <div className="text-2xl">{platform.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {platform.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {platform.description}
                        </p>
                      </div>
                      <Play className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div> */}

              {/* Updated Disclaimer */}
              <motion.div
                className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <span className="font-semibold">Coming Soon:</span> We&#39;re
                  working on integrating direct streaming capabilities. Thank
                  you for your patience!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
