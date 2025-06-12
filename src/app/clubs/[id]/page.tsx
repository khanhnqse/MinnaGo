"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Calendar,
  Shield,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  BarChart3,
  Book,
  Play,
  Info,
  Star,
  TrendingUp,
  Hash,
  UserCheck,
  Clock,
  Share2,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useClubDetail } from "@/hooks/useClubDetail";
import { useClubMembers } from "@/hooks/useClubMembers";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import MemberCard from "@/components/MemberCard";

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubId = params?.id as string;
  const [membersPage, setMembersPage] = useState(1);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">(
    "idle"
  );

  const {
    club,
    loading: clubLoading,
    error: clubError,
  } = useClubDetail(clubId);
  const {
    members,
    loading: membersLoading,
    error: membersError,
    hasNextPage,
    totalPages,
    currentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
  } = useClubMembers(clubId, membersPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "anime":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "manga":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "characters":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "people":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "music":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
      case "games":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "other":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
    }
  };

  const getAccessIcon = (access: string) => {
    switch (access.toLowerCase()) {
      case "public":
        return "🌐";
      case "private":
        return "🔒";
      case "secret":
        return "🤫";
      default:
        return "👥";
    }
  };

  const getAccessDescription = (access: string) => {
    switch (access.toLowerCase()) {
      case "public":
        return "Anyone can view and join this club";
      case "private":
        return "Club content is visible, but requires approval to join";
      case "secret":
        return "Club is invite-only and hidden from public view";
      default:
        return "Standard club access";
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: club?.name || "Club",
      text: `Check out this ${club?.category} club: ${club?.name}`,
      url: club?.url || window.location.href,
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        setShareStatus("shared");
      } else {
        await navigator.clipboard.writeText(club?.url || window.location.href);
        setShareStatus("copied");
      }

      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const calculateClubActivity = () => {
    if (!club?.stats) return "Low";

    const totalStats =
      club.stats.anime_watching +
      club.stats.anime_completed +
      club.stats.manga_reading +
      club.stats.manga_completed;

    if (totalStats > 10000) return "Very High";
    if (totalStats > 5000) return "High";
    if (totalStats > 1000) return "Medium";
    return "Low";
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "Very High":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
      case "High":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  if (clubLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <Header />
        <ErrorMessage message={clubError || "Club not found"} />
      </div>
    );
  }

  const clubActivity = calculateClubActivity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700/50 transition-all duration-200"
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Clubs</span>
        </motion.button>
        {/* Club Header */}
        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex">
            {/* Club Image */}
            <motion.div
              className="md:w-1/3 lg:w-1/4 relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                {club.images?.jpg?.image_url ? (
                  <Image
                    src={club.images.jpg.image_url}
                    alt={club.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-24 h-24 text-gray-400" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                      club.category
                    )}`}
                  >
                    {club.category}
                  </span>
                </div>

                {/* Access Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <span>{getAccessIcon(club.access)}</span>
                    <span className="capitalize">{club.access}</span>
                  </div>
                </div>

                {/* Activity Level Badge */}
                <div className="absolute bottom-4 left-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getActivityColor(
                      clubActivity
                    )}`}
                  >
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{clubActivity} Activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Club Info */}
            <motion.div
              className="md:w-2/3 lg:w-3/4 p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-6">
                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {club.name}
                </motion.h1>

                {/* Quick Stats Row */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {club.members.toLocaleString()} members
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Created {getRelativeTime(club.created)}
                    </span>
                  </div>

                  {club.staff && club.staff.length > 0 && (
                    <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                      <UserCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        {club.staff.length} staff
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Club Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Created {formatDate(club.created)}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {getRelativeTime(club.created)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {club.access} Club
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {getAccessDescription(club.access)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {club.members.toLocaleString()} Members
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Community size
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <div>
                      <span
                        className={`font-semibold ${
                          getActivityColor(clubActivity).split(" ")[0]
                        } ${getActivityColor(clubActivity).split(" ")[1]}`}
                      >
                        {clubActivity} Activity
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Based on member engagement
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={club.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Visit Club on MyAnimeList</span>
                </motion.a>

                <motion.button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={shareStatus !== "idle"}
                >
                  {shareStatus === "copied" ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : shareStatus === "shared" ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Shared!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Club</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Stats Section */}
        {club.stats && (
          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Club Statistics
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Anime Stats */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Play className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Anime Statistics
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Watching
                    </div>
                    <div className="text-xl font-bold text-green-700 dark:text-green-300">
                      {club.stats.anime_watching.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Completed
                    </div>
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {club.stats.anime_completed.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      On Hold
                    </div>
                    <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                      {club.stats.anime_on_hold.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                      Plan to Watch
                    </div>
                    <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                      {club.stats.anime_plan_to_watch.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Manga Stats */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Book className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Manga Statistics
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Reading
                    </div>
                    <div className="text-xl font-bold text-green-700 dark:text-green-300">
                      {club.stats.manga_reading.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Completed
                    </div>
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {club.stats.manga_completed.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      On Hold
                    </div>
                    <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                      {club.stats.manga_on_hold.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                      Plan to Read
                    </div>
                    <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                      {club.stats.manga_plan_to_read.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </motion.div>
        )}
        {/* Enhanced Stats Section with Progress Bars */}
        {club.stats && (
          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Club Statistics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Anime Stats with Progress Bars */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Play className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Anime Statistics
                  </h3>
                </div>

                {/* Calculate totals for percentage calculations */}
                {(() => {
                  const animeTotal =
                    club.stats.anime_watching +
                    club.stats.anime_completed +
                    club.stats.anime_on_hold +
                    club.stats.anime_plan_to_watch;

                  const animeStats = [
                    {
                      label: "Watching",
                      value: club.stats.anime_watching,
                      color: "green",
                      bgColor: "bg-green-50 dark:bg-green-900/20",
                    },
                    {
                      label: "Completed",
                      value: club.stats.anime_completed,
                      color: "blue",
                      bgColor: "bg-blue-50 dark:bg-blue-900/20",
                    },
                    {
                      label: "On Hold",
                      value: club.stats.anime_on_hold,
                      color: "yellow",
                      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
                    },
                    {
                      label: "Plan to Watch",
                      value: club.stats.anime_plan_to_watch,
                      color: "purple",
                      bgColor: "bg-purple-50 dark:bg-purple-900/20",
                    },
                  ];

                  return (
                    <div className="space-y-4">
                      {animeStats.map((stat, index) => {
                        const percentage =
                          animeTotal > 0 ? (stat.value / animeTotal) * 100 : 0;
                        return (
                          <motion.div
                            key={stat.label}
                            className={`${stat.bgColor} p-4 rounded-lg`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1 + index * 0.1,
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span
                                className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}
                              >
                                {stat.label}
                              </span>
                              <span
                                className={`text-lg font-bold text-${stat.color}-700 dark:text-${stat.color}-300`}
                              >
                                {stat.value.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`bg-${stat.color}-500 h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + index * 0.1,
                                }}
                              />
                            </div>
                            <div
                              className={`text-xs text-${stat.color}-500 dark:text-${stat.color}-400 mt-1`}
                            >
                              {percentage.toFixed(1)}% of total anime activity
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Manga Stats with Progress Bars */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Book className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Manga Statistics
                  </h3>
                </div>

                {(() => {
                  const mangaTotal =
                    club.stats.manga_reading +
                    club.stats.manga_completed +
                    club.stats.manga_on_hold +
                    club.stats.manga_plan_to_read;

                  const mangaStats = [
                    {
                      label: "Reading",
                      value: club.stats.manga_reading,
                      color: "green",
                      bgColor: "bg-green-50 dark:bg-green-900/20",
                    },
                    {
                      label: "Completed",
                      value: club.stats.manga_completed,
                      color: "blue",
                      bgColor: "bg-blue-50 dark:bg-blue-900/20",
                    },
                    {
                      label: "On Hold",
                      value: club.stats.manga_on_hold,
                      color: "yellow",
                      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
                    },
                    {
                      label: "Plan to Read",
                      value: club.stats.manga_plan_to_read,
                      color: "purple",
                      bgColor: "bg-purple-50 dark:bg-purple-900/20",
                    },
                  ];

                  return (
                    <div className="space-y-4">
                      {mangaStats.map((stat, index) => {
                        const percentage =
                          mangaTotal > 0 ? (stat.value / mangaTotal) * 100 : 0;
                        return (
                          <motion.div
                            key={stat.label}
                            className={`${stat.bgColor} p-4 rounded-lg`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1 + index * 0.1,
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span
                                className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}
                              >
                                {stat.label}
                              </span>
                              <span
                                className={`text-lg font-bold text-${stat.color}-700 dark:text-${stat.color}-300`}
                              >
                                {stat.value.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`bg-${stat.color}-500 h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + index * 0.1,
                                }}
                              />
                            </div>
                            <div
                              className={`text-xs text-${stat.color}-500 dark:text-${stat.color}-400 mt-1`}
                            >
                              {percentage.toFixed(1)}% of total manga activity
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Overall Activity Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Overall Activity Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {(
                      club.stats.anime_watching + club.stats.manga_reading || 0
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Currently Active
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {(
                      club.stats.anime_completed + club.stats.manga_completed ||
                      0
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Completed
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {(
                      club.stats.anime_on_hold + club.stats.manga_on_hold || 0
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    On Hold
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {(
                      club.stats.anime_plan_to_watch +
                        club.stats.manga_plan_to_read || 0
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Planned
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Club Description/About Section */}
        {club.about && (
          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                About This Club
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {club.about}
              </p>
            </div>
          </motion.div>
        )}{" "}
        {/* Club Relations */}
        {((club.anime_relations && club.anime_relations.length > 0) ||
          (club.manga_relations && club.manga_relations.length > 0) ||
          (club.character_relations &&
            club.character_relations.length > 0)) && (
          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Related Content
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Anime Relations */}
              {club.anime_relations && club.anime_relations.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Play className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Related Anime
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {club.anime_relations.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {club.anime_relations.slice(0, 10).map((relation) => (
                      <a
                        key={relation.mal_id}
                        href={relation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 p-3 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="text-sm font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200 truncate">
                          {relation.name}
                        </div>
                        <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                          {relation.type}
                        </div>
                      </a>
                    ))}
                    {club.anime_relations.length > 10 && (
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        +{club.anime_relations.length - 10} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Manga Relations */}
              {club.manga_relations && club.manga_relations.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Book className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Related Manga
                    </h3>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {club.manga_relations.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {club.manga_relations.slice(0, 10).map((relation) => (
                      <a
                        key={relation.mal_id}
                        href={relation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 p-3 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="text-sm font-medium text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200 truncate">
                          {relation.name}
                        </div>
                        <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                          {relation.type}
                        </div>
                      </a>
                    ))}
                    {club.manga_relations.length > 10 && (
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        +{club.manga_relations.length - 10} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Character Relations */}
              {club.character_relations &&
                club.character_relations.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Related Characters
                      </h3>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full text-xs font-semibold">
                        {club.character_relations.length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {club.character_relations.slice(0, 10).map((relation) => (
                        <a
                          key={relation.mal_id}
                          href={relation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 p-3 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="text-sm font-medium text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200 truncate">
                            {relation.name}
                          </div>
                          <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                            {relation.type}
                          </div>
                        </a>
                      ))}
                      {club.character_relations.length > 10 && (
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                          +{club.character_relations.length - 10} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
        {/* Club Staff */}
        {club.staff && club.staff.length > 0 && (
          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <UserCheck className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Club Staff
              </h2>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold">
                {club.staff.length}{" "}
                {club.staff.length === 1 ? "member" : "members"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {club.staff.map((staffMember, index) => (
                <motion.a
                  key={staffMember.username}
                  href={staffMember.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 p-4 rounded-lg transition-all duration-200 group border border-emerald-200 dark:border-emerald-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-200 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 truncate">
                        {staffMember.username}
                      </div>
                      <div className="text-xs text-emerald-500 dark:text-emerald-400">
                        Staff Member
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-500 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}{" "}
        {/* Enhanced Club Information */}
        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <Info className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Detailed Club Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Club ID */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Hash className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  MyAnimeList ID
                </span>
              </div>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                #{club.mal_id}
              </div>
              <div className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">
                Unique identifier
              </div>
            </motion.div>

            {/* Category */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Club Focus
                </span>
              </div>
              <div
                className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getCategoryColor(
                  club.category
                )}`}
              >
                {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
              </div>
              <div className="text-xs text-purple-500 dark:text-purple-400 mt-2">
                Primary interest area
              </div>
            </motion.div>

            {/* Access Level */}
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Access Level
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getAccessIcon(club.access)}</span>
                <div>
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300 capitalize">
                    {club.access}
                  </div>
                  <div className="text-xs text-emerald-500 dark:text-emerald-400">
                    {getAccessDescription(club.access).split(".")[0]}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Member Count with Growth Indicator */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Community Size
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {club.members.toLocaleString()}
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                Total members
              </div>
            </motion.div>

            {/* Creation Date */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-5 rounded-xl border border-orange-100 dark:border-orange-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Established
                </span>
              </div>
              <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                {formatDate(club.created)}
              </div>
              <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">
                {getRelativeTime(club.created)}
              </div>
            </motion.div>

            {/* Activity Level */}
            <motion.div
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-5 rounded-xl border border-pink-100 dark:border-pink-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                  Activity Level
                </span>
              </div>
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-bold ${getActivityColor(
                  clubActivity
                )}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    clubActivity === "Very High"
                      ? "bg-green-500"
                      : clubActivity === "High"
                      ? "bg-blue-500"
                      : clubActivity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  } animate-pulse`}
                ></div>
                <span>{clubActivity}</span>
              </div>
              <div className="text-xs text-pink-500 dark:text-pink-400 mt-2">
                Based on member engagement
              </div>
            </motion.div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Visit on MyAnimeList</span>
              </motion.a>

              <motion.button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={shareStatus !== "idle"}
              >
                {shareStatus === "copied" ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Link Copied!</span>
                  </>
                ) : shareStatus === "shared" ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Successfully Shared!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    <span>Share Club</span>
                  </>
                )}
              </motion.button>

              {/* Additional Action Buttons */}
              <motion.button
                onClick={() =>
                  window.open(
                    `https://myanimelist.net/clubs.php?cid=${club.mal_id}&action=view&t=members`,
                    "_blank"
                  )
                }
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                <span>View All Members</span>
              </motion.button>
            </div>
          </div>
        </motion.div>{" "}
        {/* Enhanced Members Section */}
        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Club Members
              </h2>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                {club.members.toLocaleString()} total
              </span>
            </div>

            {/* Page Info */}
            {totalPages > 1 && !membersLoading && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {/* Members Loading State */}
          {membersLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-purple-800"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                Loading club members...
              </p>
            </div>
          )}

          {/* Members Error State */}
          {membersError && (
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Unable to Load Members
                  </h3>
                  <p className="text-red-600 dark:text-red-300 mb-4">
                    {membersError}
                  </p>
                  <motion.button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Members Grid */}
          {!membersLoading && !membersError && members.length > 0 && (
            <div className="space-y-6">
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {members.map((member, index) => (
                  <MemberCard
                    key={`${member.username}-${currentPage}`}
                    member={member}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Enhanced Members Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => {
                      goToPrevPage();
                      setMembersPage((prev) => Math.max(1, prev - 1));
                    }}
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-600 shadow-sm"
                    }`}
                    whileHover={currentPage !== 1 ? { scale: 1.05, x: -2 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else if (currentPage <= 4) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 3) {
                        pageNum = totalPages - 6 + i;
                      } else {
                        pageNum = currentPage - 3 + i;
                      }

                      return (
                        <motion.button
                          key={pageNum}
                          onClick={() => {
                            goToPage(pageNum);
                            setMembersPage(pageNum);
                          }}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => {
                      goToNextPage();
                      setMembersPage((prev) => Math.min(totalPages, prev + 1));
                    }}
                    disabled={!hasNextPage}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      !hasNextPage
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-600 shadow-sm"
                    }`}
                    whileHover={hasNextPage ? { scale: 1.05, x: 2 } : {}}
                    whileTap={hasNextPage ? { scale: 0.95 } : {}}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}

          {/* Empty Members State */}
          {!membersLoading && !membersError && members.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Members Available
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6 max-w-md mx-auto">
                This club doesn&apos;t have any visible members yet, or the
                member list is private.
              </p>
              <motion.a
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on MyAnimeList</span>
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
