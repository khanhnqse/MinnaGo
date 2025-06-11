"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Calendar,
  Film,
  Clock,
  Users,
  TrendingUp,
  Heart,
  Bookmark,
  Share,
  Play,
  ExternalLink,
  Tv,
  X,
  Youtube,
  Copy,
  Check,
  MessageCircle,
  Send,
} from "lucide-react";
import { useAnimeDetail } from "@/hooks/useAnimeDetail";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Toast from "@/components/Toast";
import { useState } from "react";

// Streaming platforms data
const streamingPlatforms = [
  {
    name: "Crunchyroll",
    url: "https://www.crunchyroll.com/search?q=",
    icon: "🔶",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Funimation",
    url: "https://www.funimation.com/search?q=",
    icon: "🟣",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Netflix",
    url: "https://www.netflix.com/search?q=",
    icon: "🔴",
    color: "from-red-600 to-red-700",
  },
  {
    name: "Hulu",
    url: "https://www.hulu.com/search?q=",
    icon: "🟢",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "AnimeLab",
    url: "https://www.animelab.com/search?q=",
    icon: "🔵",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "MyAnimeList",
    url: "https://myanimelist.net/anime/",
    icon: "📺",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function AnimeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { anime, loading, error } = useAnimeDetail(id);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const handleWatchNow = () => {
    setShowWatchModal(true);
  };

  const handlePlatformClick = (platform: (typeof streamingPlatforms)[0]) => {
    let searchUrl: string;

    if (platform.name === "MyAnimeList") {
      searchUrl = `${platform.url}${id}`;
    } else {
      searchUrl = `${platform.url}${encodeURIComponent(anime?.title || "")}`;
    }

    window.open(searchUrl, "_blank");
    setShowWatchModal(false);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to localStorage or send to API
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or send to API
  };
  const handleShare = () => {
    console.log("Share button clicked!"); // Debug log
    setShowShareModal(true);
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setToast({ show: true, message, type });
  };
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator && anime) {
      try {
        await navigator.share({
          title: anime.title,
          text: `Check out this amazing anime: ${anime.title}`,
          url: window.location.href,
        });
        showToast("Shared successfully!");
        setShowShareModal(false);
      } catch (error) {
        console.log("Error sharing:", error);
        showToast("Sharing cancelled", "info");
      }
    } else {
      showToast("Native sharing not supported", "error");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      showToast("Link copied to clipboard!");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      showToast("Failed to copy link", "error");
    }
  };

  const shareToSocial = (platform: string) => {
    if (!anime) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(anime.title);
    const text = encodeURIComponent(
      `Check out this amazing anime: ${anime.title}`
    );

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?title=${title}&url=${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "discord":
        // For Discord, we'll copy a formatted message
        const discordMessage = `🎌 **${anime.title}**\n\n${
          anime.synopsis
            ? anime.synopsis.substring(0, 100) + "..."
            : "Check out this amazing anime!"
        }\n\n🔗 ${window.location.href}`;
        navigator.clipboard
          .writeText(discordMessage)
          .then(() => {
            showToast("Discord message copied! Paste it in your server.");
          })
          .catch(() => {
            showToast("Failed to copy Discord message", "error");
          });
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      showToast(`Opening ${platform} share...`);
    }
  };

  const searchOnYouTube = () => {
    const searchQuery = `${anime?.title} anime trailer`;
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchQuery
      )}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <ErrorMessage message={error || "Anime not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 mb-8 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 dark:border-pink-700/50 transition-all duration-200"
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </motion.button>

        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex">
            {/* Image Section */}
            <motion.div
              className="md:w-1/3 lg:w-1/4 relative group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Image
                    src={
                      anime.images.jpg.large_image_url ||
                      anime.images.jpg.image_url ||
                      "/placeholder-anime.svg"
                    }
                    alt={anime.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Floating action buttons */}
                <motion.div
                  className="text-black absolute bottom-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.button
                    onClick={handleFavorite}
                    className={`backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-500 text-black"
                        : "bg-white/90 dark:bg-gray-900/90 hover:bg-red-500 hover:text-white text-black"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`h-5 w-5 text-black ${
                        isFavorite ? "fill-current" : ""
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    onClick={handleBookmark}
                    className={`backdrop-blur-sm text-black p-3 rounded-full shadow-lg transition-all duration-200 ${
                      isBookmarked
                        ? "bg-blue-500 text-black"
                        : "bg-white/90 dark:bg-gray-900/90 hover:bg-blue-500 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                  </motion.button>{" "}
                  <motion.button
                    onClick={() => {
                      console.log("Force opening share modal");
                      setShowShareModal(true);
                    }}
                    className="bg-red-500 text-white p-2 rounded mb-4"
                  >
                    DEBUG: Open Share Modal
                  </motion.button>
                  <motion.button
                    onClick={handleShare}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="md:w-2/3 lg:w-3/4 p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-6">
                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {anime.title}
                </motion.h1>
                {anime.title_english && anime.title_english !== anime.title && (
                  <motion.p
                    className="text-xl text-gray-700 dark:text-gray-300 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {anime.title_english}
                  </motion.p>
                )}
                {anime.title_japanese && (
                  <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {anime.title_japanese}
                  </motion.p>
                )}
              </div>

              {/* Enhanced Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.button
                  onClick={handleWatchNow}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>Watch Now</span>
                </motion.button>

                <motion.button
                  onClick={searchOnYouTube}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube className="h-5 w-5" />
                  <span>Trailer</span>
                </motion.button>

                <motion.button
                  onClick={handleFavorite}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border transition-all duration-200 ${
                    isFavorite
                      ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                      : "bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                  <span>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </motion.button>
              </motion.div>

              {/* Rest of the existing content... */}
              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {anime.score && (
                  <motion.div
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.score}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Score
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.year && (
                  <motion.div
                    className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.year}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Year
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.episodes && (
                  <motion.div
                    className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Film className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {anime.episodes}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Episodes
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {anime.duration && (
                  <motion.div
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {anime.duration}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Duration
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Genres
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <motion.span
                        key={`${genre.mal_id}-${index}`}
                        className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full border border-pink-200 dark:border-pink-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {genre.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Synopsis
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {anime.synopsis}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Additional Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {anime.members && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Members
                      </span>
                    </div>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {anime.members.toLocaleString()}
                    </p>
                  </motion.div>
                )}

                {anime.popularity && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Popularity
                      </span>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      #{anime.popularity}
                    </p>
                  </motion.div>
                )}

                {anime.status && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Film className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {anime.status}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      {/* Watch Modal */}
      <AnimatePresence>
        {showWatchModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowWatchModal(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Tv className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Watch {anime.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowWatchModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Choose a streaming platform to watch{" "}
                    <strong>{anime.title}</strong>:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {streamingPlatforms.map((platform, index) => (
                      <motion.button
                        key={platform.name}
                        onClick={() => handlePlatformClick(platform)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${platform.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200`}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                        <div className="text-left">
                          <div className="font-semibold">{platform.name}</div>
                          <div className="text-sm opacity-90">
                            Search & Watch
                          </div>
                        </div>
                        <ExternalLink className="h-5 w-5 ml-auto" />
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      * We&apos;ll search for this anime on the selected
                      platform
                    </p>
                    <p>Availability may vary by region and platform</p>
                  </div>
                </div>
              </div>
            </motion.div>{" "}
          </>
        )}
      </AnimatePresence>{" "}
      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            {console.log("Share modal is rendering!")} {/* Debug log */}{" "}
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
              onClick={() => setShowShareModal(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Share className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Share {anime.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Share this amazing anime with your friends!
                  </p>{" "}
                  {/* Native Share (Mobile) */}
                  {typeof navigator !== "undefined" && "share" in navigator && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNativeShare}
                      className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-4 hover:scale-[1.02]"
                    >
                      <Share className="h-5 w-5" />
                      <span className="font-semibold">Share via Device</span>
                    </motion.button>
                  )}
                  {/* Copy Link */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-6 hover:scale-[1.02]"
                  >
                    {copySuccess ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                    <span className="font-semibold">
                      {copySuccess ? "Copied!" : "Copy Link"}
                    </span>
                  </motion.button>
                  {/* Social Media Platforms */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Share on social media
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Twitter */}
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => shareToSocial("twitter")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <span className="text-lg">🐦</span>
                        <span className="font-medium">Twitter</span>
                      </motion.button>

                      {/* Facebook */}
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        onClick={() => shareToSocial("facebook")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <span className="text-lg">📘</span>
                        <span className="font-medium">Facebook</span>
                      </motion.button>

                      {/* Reddit */}
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => shareToSocial("reddit")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <span className="text-lg">🔴</span>
                        <span className="font-medium">Reddit</span>
                      </motion.button>

                      {/* Telegram */}
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        onClick={() => shareToSocial("telegram")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Send className="h-4 w-4" />
                        <span className="font-medium">Telegram</span>
                      </motion.button>

                      {/* WhatsApp */}
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => shareToSocial("whatsapp")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <span className="text-lg">💬</span>
                        <span className="font-medium">WhatsApp</span>
                      </motion.button>

                      {/* Discord */}
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 }}
                        onClick={() => shareToSocial("discord")}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-medium">Discord</span>
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Help others discover great anime! 🎌</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
