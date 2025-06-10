"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VideoPromo, VideoEpisode, VideoMusicVideo } from "@/types/anime";
import { Play, X, ExternalLink, Youtube, Music, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  videos: {
    promo: VideoPromo[];
    episodes: VideoEpisode[];
    music_videos: VideoMusicVideo[];
  };
}

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"promo" | "episodes" | "music">(
    "promo"
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const openVideo = (embedUrl: string) => {
    if (!embedUrl || typeof embedUrl !== "string") {
      console.error("Invalid embed URL provided:", embedUrl);
      return;
    }
    console.log("Opening video with URL:", embedUrl);
    setSelectedVideo(embedUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const tabs = [
    {
      id: "promo" as const,
      label: "Trailers",
      icon: Play,
      count: videos.promo.length,
    },
    {
      id: "episodes" as const,
      label: "Episodes",
      icon: Tv,
      count: videos.episodes.length,
    },
    {
      id: "music" as const,
      label: "Music Videos",
      icon: Music,
      count: videos.music_videos.length,
    },
  ];

  const hasVideos =
    videos.promo.length > 0 ||
    videos.episodes.length > 0 ||
    videos.music_videos.length > 0;
  if (!hasVideos) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mb-4"
          >
            <Play className="w-16 h-16 text-gray-400 mx-auto" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            No Videos Available
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            No trailers, episodes, or music videos are available for this anime.
          </p>
        </div>
      </motion.div>
    );
  }

  // Prevent hydration issues by not rendering complex content until client-side
  if (!isClient) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            Loading Videos...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <iframe
                src={selectedVideo}
                className="w-full h-full"
                allowFullScreen
                title="Video Player"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Videos & Trailers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Watch trailers, episodes, and music videos
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                : "bg-white/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-700"
            }`}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Video Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {" "}
          {/* Promo Videos */}
          {activeTab === "promo" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.promo
                .map((video, index) => {
                  // Add defensive checks for video structure
                  if (!video || !video.trailer) {
                    console.warn(
                      `Promo video ${index} has invalid structure:`,
                      video
                    );
                    return null;
                  }

                  return (
                    <motion.div
                      key={`promo-${
                        video.trailer.youtube_id || video.title || index
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        {video.trailer.images?.large_image_url ? (
                          <Image
                            src={video.trailer.images.large_image_url}
                            alt={video.title || "Trailer"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              console.error(
                                "Failed to load promo video image:",
                                e
                              );
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                            <Play className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <button
                          onClick={() => {
                            if (video.trailer?.embed_url) {
                              openVideo(video.trailer.embed_url);
                            } else {
                              console.warn(
                                "No embed URL available for promo video:",
                                video
                              );
                            }
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </motion.div>
                        </button>
                        <div className="absolute top-3 right-3">
                          <Youtube className="w-6 h-6 text-red-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {video.title || "Untitled Trailer"}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Trailer
                          </span>
                          {video.trailer?.url && (
                            <a
                              href={video.trailer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-500 hover:text-red-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                .filter(Boolean)}
            </div>
          )}{" "}
          {/* Episodes */}
          {activeTab === "episodes" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.episodes.map((episode, index) => (
                <motion.div
                  key={`episode-${episode.mal_id || episode.episode || index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {" "}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={
                        episode.images?.jpg?.image_url || "/404-not-found.jpg"
                      }
                      alt={episode.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <a
                      href={episode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </motion.div>
                    </a>
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      EP {episode.episode}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                      {episode.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}{" "}          {/* Music Videos */}
          {activeTab === "music" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.music_videos
                .map((video, index) => {
                  // Add defensive checks for video structure
                  if (!video || !video.video) {
                    console.warn(
                      `Music video ${index} has invalid structure:`,
                      video
                    );
                    return null;
                  }

                  return (
                    <motion.div
                      key={`music-${
                        video.video.youtube_id || video.title || index
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        {video.video.images?.large_image_url ? (
                          <Image
                            src={video.video.images.large_image_url}
                            alt={video.title || "Music Video"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              console.error(
                                "Failed to load music video image:",
                                e
                              );
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                            <Music className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <button
                          onClick={() => {
                            if (video.video?.embed_url) {
                              openVideo(video.video.embed_url);
                            } else {
                              console.warn(
                                "No embed URL available for music video:",
                                video
                              );
                            }
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg"
                          >
                            <Music className="w-8 h-8" />
                          </motion.div>
                        </button>
                        <div className="absolute top-3 right-3">
                          <Music className="w-6 h-6 text-purple-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {video.title || "Untitled Music Video"}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Music Video
                          </span>
                          {video.video?.url && (
                            <a
                              href={video.video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-500 hover:text-purple-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                .filter(Boolean)}
            </div>
          )}
          {/* Empty State for Active Tab */}
          {((activeTab === "promo" && videos.promo.length === 0) ||
            (activeTab === "episodes" && videos.episodes.length === 0) ||
            (activeTab === "music" && videos.music_videos.length === 0)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                {activeTab === "promo" && (
                  <Play className="w-16 h-16 mx-auto" />
                )}
                {activeTab === "episodes" && (
                  <Tv className="w-16 h-16 mx-auto" />
                )}
                {activeTab === "music" && (
                  <Music className="w-16 h-16 mx-auto" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No {tabs.find((tab) => tab.id === activeTab)?.label} Available
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                No{" "}
                {activeTab === "promo"
                  ? "trailers"
                  : activeTab === "episodes"
                  ? "episode videos"
                  : "music videos"}{" "}
                are available for this anime.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
