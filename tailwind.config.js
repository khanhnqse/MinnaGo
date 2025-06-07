/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode for next-themes
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Anime-themed colors
        'anime-primary': '#ff6b6b',
        'anime-secondary': '#4ecdc4',
        'anime-accent': '#45b7d1',
        'anime-purple': '#9b59b6',
        'anime-pink': '#e91e63',
        'anime-orange': '#ff9800',
      },
      backgroundImage: {
        'anime-gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'anime-gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'anime-gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'anime-gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(255, 107, 107, 0.5)',
        'neon-glow-blue': '0 0 20px rgba(69, 183, 209, 0.5)',
        'neon-glow-purple': '0 0 20px rgba(155, 89, 182, 0.5)',
      },
    },
  },
}
