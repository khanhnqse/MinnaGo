"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Crown,
  Zap,
  Shield,
  Download,
  Heart,
  Star,
  Rocket,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  Users,
  Infinity,
} from "lucide-react";

export default function PremiumPage() {
  const features = [
    {
      icon: <Infinity className="w-8 h-8" />,
      title: "Unlimited Access",
      description:
        "Stream and read unlimited anime and manga with no restrictions",
      highlight: true,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "4K Ultra HD",
      description: "Watch your favorite anime in stunning 4K resolution",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Offline Downloads",
      description: "Download episodes and chapters for offline viewing",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ad-Free Experience",
      description: "Enjoy uninterrupted streaming without any advertisements",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Advanced Recommendations",
      description:
        "AI-powered personalized recommendations based on your taste",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Sharing",
      description: "Share your premium account with up to 5 family members",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Exclusive Content",
      description: "Access to premium-only anime series and manga collections",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Early Access",
      description:
        "Get new episodes and chapters 24 hours before everyone else",
    },
  ];

  const plans = [
    {
      name: "Monthly",
      price: "$9.99",
      period: "/month",
      description: "Perfect for trying out premium features",
      popular: false,
    },
    {
      name: "Annual",
      price: "$79.99",
      period: "/year",
      description: "Save 33% with our most popular plan",
      popular: true,
      savings: "Save $40",
    },
    {
      name: "Lifetime",
      price: "$199.99",
      period: "one-time",
      description: "Ultimate value for true anime enthusiasts",
      popular: false,
      savings: "Best Value",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <Crown className="w-24 h-24 text-yellow-400" />
                <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2 animate-spin" />
                <Sparkles className="w-6 h-6 text-purple-400 absolute -bottom-1 -left-1 animate-pulse" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6"
            >
              MinnaGo Premium
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto"
            >
              Unlock the ultimate anime and manga experience with exclusive
              features, unlimited access, and premium content
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-yellow-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </span>
              </motion.button>

              <motion.button
                className="border-2 border-purple-300 hover:bg-purple-300/10 text-purple-100 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-purple-200 text-sm"
            >
              ✨ 7-day free trial • Cancel anytime • No commitments
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4"
            >
              Premium Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-purple-200 max-w-2xl mx-auto"
            >
              Discover all the amazing features that come with your premium
              subscription
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 group ${
                  feature.highlight
                    ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30"
                    : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`mb-4 ${
                    feature.highlight ? "text-yellow-400" : "text-purple-400"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-purple-200 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4"
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-purple-200 max-w-2xl mx-auto"
            >
              Select the perfect plan for your anime and manga journey
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 scale-105"
                    : "bg-white/5 hover:bg-white/10 border border-white/20"
                }`}
                whileHover={{ scale: plan.popular ? 1.08 : 1.05 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {plan.savings}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-purple-300 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-purple-200 mb-8">{plan.description}</p>

                  <motion.button
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4"
            >
              Why Choose Premium?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Access to 10,000+ anime series",
              "Download up to 100 episodes offline",
              "Stream on up to 5 devices simultaneously",
              "No ads during streaming",
              "4K Ultra HD quality available",
              "24/7 premium customer support",
              "Exclusive behind-the-scenes content",
              "Advanced parental controls",
              "Early access to seasonal releases",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-purple-100">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent mb-6"
          >
            Ready to Level Up?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-purple-200 mb-8"
          >
            Join millions of anime fans worldwide and unlock the ultimate
            streaming experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-yellow-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Your Free Trial
              </span>
            </motion.button>

            <Link href="/">
              <motion.button
                className="border-2 border-purple-300 hover:bg-purple-300/10 text-purple-100 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
