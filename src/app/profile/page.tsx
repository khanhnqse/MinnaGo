"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";

import {
  Settings,
  Heart,
  BookOpen,
  Play,
  Star,
  Trophy,
  Calendar,
  Clock,
  Edit,
  Camera,
  Shield,
  Bell,
  Download,
  Crown,
  Award,
  Target,
  TrendingUp,
  Activity,
  ChevronRight,
  Mail,
  MapPin,
  Gift,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  // Mock user data - in real app this would come from authentication/database
  const user = {
    name: "Quang Khanh",
    username: "@quang_khanh",
    email: "quang.khanh@example.com",
    bio: "Welcome to my anime and manga world! I love exploring new series and sharing my thoughts with fellow fans. Join me on this epic journey!",
    avatar: "/man.png", // Using existing avatar from public folder
    coverImage: "/34e2b8220213515.67bf12e77c4b6.jpg", // Using existing image
    isPremium: true,
    joinDate: "March 2020",
    location: "Tokyo, Japan",
    website: "https://quangkhanh.vercel.app/",
  };

  const stats = [
    {
      label: "Anime Watched",
      value: "247",
      icon: <Play className="w-5 h-5" />,
    },
    {
      label: "Manga Read",
      value: "189",
      icon: <BookOpen className="w-5 h-5" />,
    },
    { label: "Favorites", value: "42", icon: <Heart className="w-5 h-5" /> },
    { label: "Reviews", value: "156", icon: <Star className="w-5 h-5" /> },
    {
      label: "Watch Time",
      value: "2,341h",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "Achievements",
      value: "23",
      icon: <Trophy className="w-5 h-5" />,
    },
  ];

  const recentActivity = [
    {
      type: "watched",
      title: "Attack on Titan - Final Season",
      episode: "Episode 24",
      time: "2 hours ago",
      image: "/placeholder-anime.svg",
    },
    {
      type: "rated",
      title: "Demon Slayer: Entertainment District Arc",
      rating: 5,
      time: "1 day ago",
      image: "/placeholder-anime.svg",
    },
    {
      type: "added",
      title: "Jujutsu Kaisen 0",
      time: "2 days ago",
      image: "/placeholder-anime.svg",
    },
    {
      type: "reviewed",
      title: "Your Name",
      time: "3 days ago",
      image: "/placeholder-anime.svg",
    },
  ];

  const achievements = [
    {
      title: "First Watch",
      description: "Watched your first anime",
      icon: <Play className="w-6 h-6" />,
      earned: true,
      date: "Mar 2020",
    },
    {
      title: "Century Club",
      description: "Watched 100 anime series",
      icon: <Trophy className="w-6 h-6" />,
      earned: true,
      date: "Dec 2023",
    },
    {
      title: "Critic",
      description: "Written 50 reviews",
      icon: <Star className="w-6 h-6" />,
      earned: true,
      date: "Aug 2024",
    },
    {
      title: "Marathoner",
      description: "Watch 24 hours in a week",
      icon: <Activity className="w-6 h-6" />,
      earned: true,
      date: "Jan 2025",
    },
    {
      title: "Premium Member",
      description: "Upgrade to premium",
      icon: <Crown className="w-6 h-6" />,
      earned: true,
      date: "Jun 2024",
    },
    {
      title: "Completionist",
      description: "Finish 500 anime series",
      icon: <Target className="w-6 h-6" />,
      earned: false,
      progress: 49,
    },
  ];

  const quickActions = [
    {
      title: "Edit Profile",
      icon: <Edit className="w-5 h-5" />,
      href: "/profile/edit",
    },
    {
      title: "Privacy Settings",
      icon: <Shield className="w-5 h-5" />,
      href: "/settings/privacy",
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      href: "/settings/notifications",
    },
    {
      title: "Downloads",
      icon: <Download className="w-5 h-5" />,
      href: "/downloads",
    },
    {
      title: "Premium Benefits",
      icon: <Crown className="w-5 h-5" />,
      href: "/premium",
    },
    {
      title: "Help & Support",
      icon: <Gift className="w-5 h-5" />,
      href: "/support",
    },
  ];
  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Cover Image and Profile Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-80 overflow-hidden"
        >
          {/* Cover Image */}
          <div className="absolute inset-0">
            <Image
              src={user.coverImage}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 p-1">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {user.isPremium && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-black" />
                    </div>
                  )}
                  <motion.button
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </motion.button>
                </motion.div>

                {/* User Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {user.name}
                    </h1>
                    {user.isPremium && (
                      <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold"
                      >
                        <Sparkles className="w-3 h-3" />
                        Premium
                      </motion.div>
                    )}
                  </div>
                  <p className="text-purple-200 text-lg mb-1">
                    {user.username}
                  </p>
                  <p className="text-purple-300 max-w-2xl">{user.bio}</p>
                  <div className="flex items-center gap-4 mt-3 text-purple-200 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joinDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex gap-3"
                >
                  <motion.button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-purple-400 group-hover:text-pink-400 transition-colors">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-purple-200 text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-purple-400" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                {activity.title}
                              </h3>
                              <div className="flex items-center gap-2 text-purple-200 text-sm mt-1">
                                {activity.type === "watched" && (
                                  <>
                                    <Play className="w-3 h-3" />
                                    <span>Watched {activity.episode}</span>
                                  </>
                                )}
                                {activity.type === "rated" && (
                                  <>
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span>Rated {activity.rating}/5</span>
                                  </>
                                )}
                                {activity.type === "added" && (
                                  <>
                                    <Heart className="w-3 h-3" />
                                    <span>Added to watchlist</span>
                                  </>
                                )}
                                {activity.type === "reviewed" && (
                                  <>
                                    <Star className="w-3 h-3" />
                                    <span>Wrote a review</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className="text-purple-300 text-xs">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-400" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                        achievement.earned
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.earned
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "bg-gray-600 text-gray-400"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold mb-1 ${
                              achievement.earned
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                          <p
                            className={`text-sm mb-2 ${
                              achievement.earned
                                ? "text-purple-200"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.description}
                          </p>
                          {achievement.earned ? (
                            <span className="text-xs text-purple-300">
                              Earned {achievement.date}
                            </span>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400">
                                Progress: {achievement.progress}%
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-purple-400 group-hover:text-pink-400 transition-colors">
                              {action.icon}
                            </div>
                            <span className="text-white group-hover:text-purple-200 transition-colors">
                              {action.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact Info
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">
                      Member since {user.joinDate}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Premium Status */}
              {user.isPremium && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      <h3 className="text-xl font-bold text-white">
                        Premium Member
                      </h3>
                    </div>
                    <p className="text-yellow-200 text-sm mb-4">
                      You&#39;re enjoying all premium features! Thanks for
                      supporting MinnaGo.
                    </p>
                    <Link href="/premium">
                      {" "}
                      <motion.button
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-3 rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Manage Premium
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
