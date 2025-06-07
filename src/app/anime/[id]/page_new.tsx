"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  Calendar,
  Film,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAnimeDetail } from "@/hooks/useAnimeDetail";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function AnimeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { anime, loading, error } = useAnimeDetail(id);

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
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 mb-8 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-200 dark:border-pink-700/50 transition-all duration-200 hover:scale-105 hover:-translate-x-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </button>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3 lg:w-1/4 relative">
              <div className="relative aspect-[3/4] w-full">
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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {anime.title}
                </h1>
                {anime.title_english && anime.title_english !== anime.title && (
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                    {anime.title_english}
                  </p>
                )}
                {anime.title_japanese && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {anime.title_japanese}
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {anime.score && (
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50 hover:scale-105 transition-transform duration-200">
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
                  </div>
                )}

                {anime.year && (
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50 hover:scale-105 transition-transform duration-200">
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
                  </div>
                )}

                {anime.episodes && (
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700/50 hover:scale-105 transition-transform duration-200">
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
                  </div>
                )}

                {anime.duration && (
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50 hover:scale-105 transition-transform duration-200">
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
                  </div>
                )}
              </div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full border border-pink-200 dark:border-pink-700/50 font-medium text-sm hover:scale-105 transition-transform duration-200 cursor-default"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Synopsis
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {anime.synopsis}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {anime.members && (
                  <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Members
                      </span>
                    </div>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {anime.members.toLocaleString()}
                    </p>
                  </div>
                )}

                {anime.popularity && (
                  <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Popularity
                      </span>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      #{anime.popularity}
                    </p>
                  </div>
                )}

                {anime.status && (
                  <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Film className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {anime.status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
