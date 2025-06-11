"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Share, X, Copy, Check, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  synopsis?: string;
  onToast: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
}

const ShareModal = ({
  isOpen,
  onClose,
  title,
  url = window?.location?.href || "",
  synopsis = "",
  onToast,
}: ShareModalProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this amazing anime: ${title}`,
          url: url,
        });
        onToast("Shared successfully!");
        onClose();
      } catch (error) {
        console.log("Error sharing:", error);
        onToast("Sharing cancelled", "info");
      }
    } else {
      onToast("Native sharing not supported", "error");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      onToast("Link copied to clipboard!");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      onToast("Failed to copy link", "error");
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(
      `Check out this amazing anime: ${title}`
    );

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?title=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "discord":
        // For Discord, we'll copy a formatted message
        const discordMessage = `🎌 **${title}**\n\n${
          synopsis
            ? synopsis.substring(0, 100) + "..."
            : "Check out this amazing anime!"
        }\n\n🔗 ${url}`;
        navigator.clipboard
          .writeText(discordMessage)
          .then(() => {
            onToast("Discord message copied! Paste it in your server.");
          })
          .catch(() => {
            onToast("Failed to copy Discord message", "error");
          });
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      onToast(`Opening ${platform} share...`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
            onClick={onClose}
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
                    Share {title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Share this amazing anime with your friends!
                </p>

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
  );
};

export default ShareModal;
