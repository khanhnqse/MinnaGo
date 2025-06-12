"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, ExternalLink, Calendar, Shield } from "lucide-react";
import { Club } from "@/types/anime";

interface ClubCardProps {
  club: Club;
  index: number;
}

export default function ClubCard({ club, index }: ClubCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  return (
    <motion.article
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Club Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {club.images?.jpg?.image_url ? (
          <Image
            src={club.images.jpg.image_url}
            alt={club.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-anime.svg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {club.name}
              </p>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              club.category
            )}`}
          >
            {club.category}
          </span>
        </div>

        {/* Access Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <span>{getAccessIcon(club.access)}</span>
            <span className="capitalize">{club.access}</span>
          </div>
        </div>

        {/* Members count overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>{club.members.toLocaleString()}</span>
        </div>
      </div>

      {/* Club Content */}
      <div className="p-6">
        {/* Club Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {club.name}
        </h3>
        {/* Club Meta Information */}
        <div className="space-y-2 mb-4">
          {/* Created Date */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDate(club.created)}</span>
          </div>

          {/* Access Level */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="w-4 h-4" />
            <span className="capitalize">{club.access} Club</span>
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {club.members.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Members
              </div>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              club.category
            )}`}
          >
            {club.category}
          </div>
        </div>{" "}
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <motion.a
            href={`/clubs/${club.mal_id}`}
            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-4 h-4" />
            <span>View Details</span>
          </motion.a>

          <motion.a
            href={club.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-3 h-3" />
            <span>Visit on MAL</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
