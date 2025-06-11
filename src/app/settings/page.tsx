"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Download,
  HelpCircle,
  Save,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  const settingsCategories = [
    {
      title: "Account Settings",
      icon: <User className="w-5 h-5" />,
      items: [
        {
          label: "Edit Profile",
          description: "Update your personal information",
          href: "/profile/edit",
        },
        {
          label: "Change Password",
          description: "Update your account password",
          href: "/settings/password",
        },
        {
          label: "Email Preferences",
          description: "Manage email notifications",
          href: "/settings/email",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          label: "Privacy Settings",
          description: "Control who can see your activity",
          href: "/settings/privacy",
        },
        {
          label: "Blocked Users",
          description: "Manage blocked users",
          href: "/settings/blocked",
        },
        {
          label: "Data & Privacy",
          description: "Download or delete your data",
          href: "/settings/data",
        },
      ],
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      items: [
        {
          label: "Push Notifications",
          description: "Mobile and desktop alerts",
          href: "/settings/notifications",
        },
        {
          label: "Email Notifications",
          description: "Weekly digests and updates",
          href: "/settings/email-notif",
        },
        {
          label: "Activity Notifications",
          description: "Comments, likes, and follows",
          href: "/settings/activity",
        },
      ],
    },
    {
      title: "Preferences",
      icon: <Palette className="w-5 h-5" />,
      items: [
        {
          label: "Language & Region",
          description: "Set your preferred language",
          href: "/settings/language",
        },
        {
          label: "Content Filters",
          description: "Set age ratings and content filters",
          href: "/settings/filters",
        },
        {
          label: "Autoplay Settings",
          description: "Video autoplay preferences",
          href: "/settings/autoplay",
        },
      ],
    },
    {
      title: "Data & Storage",
      icon: <Download className="w-5 h-5" />,
      items: [
        {
          label: "Download Settings",
          description: "Offline content and quality",
          href: "/settings/downloads",
        },
        {
          label: "Cache Management",
          description: "Clear app cache and data",
          href: "/settings/cache",
        },
        {
          label: "Export Data",
          description: "Download your watchlist and data",
          href: "/settings/export",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          label: "Help Center",
          description: "FAQ and support articles",
          href: "/help",
        },
        {
          label: "Contact Support",
          description: "Get help from our team",
          href: "/support",
        },
        {
          label: "Feedback",
          description: "Share your thoughts with us",
          href: "/feedback",
        },
      ],
    },
  ];

  return (
    <AuthGuard requireAuth={true}>
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                Settings
              </h1>
              <p className="text-gray-700 dark:text-purple-200">
                Manage your account preferences and privacy settings
              </p>
            </motion.div>{" "}
            {/* User Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-200/50 dark:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                  <img
                    src={user?.avatar || "/man.png"}
                    alt={user?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-purple-200">
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {user?.isPremium && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        Premium
                      </span>
                    )}
                    <span className="text-gray-500 dark:text-purple-300 text-sm">
                      Member since {user?.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>{" "}
            {/* Settings Categories */}
            <div className="space-y-6">
              {settingsCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
                  className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-white/20 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <div className="text-purple-600 dark:text-purple-400">
                        {category.icon}
                      </div>
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-gray-600 dark:text-purple-300 text-sm mt-1">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>{" "}
            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 text-center"
            >
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                Save All Changes
              </motion.button>
            </motion.div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}
