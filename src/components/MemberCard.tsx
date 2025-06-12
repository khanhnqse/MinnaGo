"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, User } from "lucide-react";
import { ClubMember } from "@/types/anime";

interface MemberCardProps {
  member: ClubMember;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Member Avatar */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {member.images?.jpg?.image_url ? (
          <Image
            src={member.images.jpg.image_url}
            alt={member.username}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/man.png";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Visit profile button */}
        <motion.a
          href={member.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </motion.a>
      </div>

      {/* Member Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-center truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {member.username}
        </h3>
      </div>
    </motion.div>
  );
}
