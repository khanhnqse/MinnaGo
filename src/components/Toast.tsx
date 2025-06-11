"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white border-green-600";
      case "error":
        return "bg-red-500 text-white border-red-600";
      case "warning":
        return "bg-yellow-500 text-black border-yellow-600";
      case "info":
        return "bg-blue-500 text-white border-blue-600";
      default:
        return "bg-green-500 text-white border-green-600";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
              backdrop-blur-sm min-w-[300px] max-w-[400px]
              ${getColorClasses()}
            `}
          >
            <div className="flex-shrink-0">{getIcon()}</div>

            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
