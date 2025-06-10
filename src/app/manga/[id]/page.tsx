"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  Heart,
  Bookmark,
  Share,
  User,
  Building,
  ChevronRight,
} from "lucide-react";
import { useMangaDetail } from "@/hooks/useMangaDetail";
import { useMangaRecommendations } from "@/hooks/useMangaRecommendations";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function MangaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { manga, loading, error } = useMangaDetail(id);
  const { recommendations, loading: recLoading } = useMangaRecommendations(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }
  if (error || !manga) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <ErrorMessage message={error || "Manga not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 -right-16 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 75, 0],
            y: [0, -75, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-lg"
        />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 mb-8 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 dark:border-pink-700/50 transition-all duration-200"
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Manga</span>
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
                      manga.images.jpg.large_image_url ||
                      manga.images.jpg.image_url ||
                      "/placeholder-anime.svg"
                    }
                    alt={manga.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Floating action buttons */}
                <motion.div
                  className="absolute bottom-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.button
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className="h-5 w-5" />
                  </motion.button>
                  <motion.button
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
                  {manga.title}
                </motion.h1>
                {manga.title_english && manga.title_english !== manga.title && (
                  <motion.p
                    className="text-xl text-gray-700 dark:text-gray-300 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {manga.title_english}
                  </motion.p>
                )}
                {manga.title_japanese && (
                  <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {manga.title_japanese}
                  </motion.p>
                )}
              </div>
              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.button
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Read Online</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                  <span>Add to List</span>
                </motion.button>
              </motion.div>
              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {manga.score && (
                  <motion.div
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {manga.score}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Score
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {manga.published?.from && (
                  <motion.div
                    className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {new Date(manga.published.from).getFullYear()}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Published
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {manga.chapters && (
                  <motion.div
                    className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {manga.chapters}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Chapters
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {manga.volumes && (
                  <motion.div
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50 transition-transform duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {manga.volumes}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Volumes
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              {/* Authors */}
              {manga.authors && manga.authors.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.85 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Authors
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {manga.authors.map((author, index) => (
                      <motion.span
                        key={`${author.mal_id}-${index}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.85 + index * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <User className="w-3 h-3" />
                        {author.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}{" "}
              {/* Genres */}
              {manga.genres && manga.genres.length > 0 && (
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
                    {manga.genres.map((genre, index) => (
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
              {/* Themes */}
              {manga.themes && manga.themes.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.95 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Themes
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {manga.themes.map((theme, index) => (
                      <motion.span
                        key={`${theme.mal_id}-${index}`}
                        className="inline-block bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.95 + index * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {theme.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              {/* Demographics */}
              {manga.demographics && manga.demographics.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.97 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Demographics
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {manga.demographics.map((demographic, index) => (
                      <motion.span
                        key={`${demographic.mal_id}-${index}`}
                        className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.97 + index * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {demographic.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              {/* Serializations */}
              {manga.serializations && manga.serializations.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.98 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Serializations
                  </h3>{" "}
                  <div className="flex flex-wrap gap-2">
                    {manga.serializations.map((serialization, index) => (
                      <motion.span
                        key={`${serialization.mal_id}-${index}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-700/50 font-medium text-sm transition-transform duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.98 + index * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Building className="w-3 h-3" />
                        {serialization.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              {/* Synopsis */}
              {manga.synopsis && (
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
                      {manga.synopsis}
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
                {manga.members && (
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
                      {manga.members.toLocaleString()}
                    </p>
                  </motion.div>
                )}
                {manga.popularity && (
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
                      #{manga.popularity}
                    </p>
                  </motion.div>
                )}
                {manga.status && (
                  <motion.div
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {manga.status}
                    </p>
                  </motion.div>
                )}{" "}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Manga Section */}
        {recommendations.length > 0 && (
          <motion.section
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                You Might Also Like
              </h2>
              <motion.button
                onClick={() => router.push("/manga")}
                className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 dark:border-pink-700/50 transition-all duration-200"
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Manga</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {recommendations.map((recManga, index) => (
                <motion.div
                  key={recManga.mal_id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => router.push(`/manga/${recManga.mal_id}`)}
                >
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 group-hover:shadow-2xl group-hover:border-pink-200 dark:group-hover:border-pink-700/50">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.div
                        className="h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={
                            recManga.images?.jpg?.image_url ||
                            "/placeholder-anime.svg"
                          }
                          alt={recManga.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Quick action overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <motion.div
                          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                        {recManga.title}
                      </h3>
                      {recManga.score && (
                        <div className="flex items-center mt-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {recManga.score}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {recLoading && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse w-2/3"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>
        )}
      </main>
    </div>
  );
}
