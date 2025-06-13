# MinnaGo - Complete Anime & Manga Discovery Platform

A comprehensive Next.js web application for discovering anime, manga, clubs, and community content using the MyAnimeList API. Built with React 19, TypeScript, Tailwind CSS, and featuring a modern, responsive design with advanced animations.

## 🌟 Features

### Core Discovery
- 🔍 **Advanced Search** - Real-time anime and manga search with intelligent filters
- 🎯 **Detailed Pages** - Comprehensive information including scores, genres, synopsis, reviews, and streaming links
- 📊 **Rankings** - Browse top anime and manga by various categories
- 🎲 **Random Discovery** - Discover new content with intelligent recommendations
- 📺 **Video Integration** - Watch trailers and promotional videos

### Community Features
- 👥 **Anime Clubs** - Browse and join anime communities with member systems
- 👤 **User Profiles** - Personalized profiles with favorites and activity tracking
- ⭐ **Reviews & Ratings** - Community-driven reviews and scoring system
- 💬 **Social Features** - Share favorites and interact with other users

### Content Management
- 📚 **Manga Support** - Full manga browsing with detailed information
- ❤️ **Favorites System** - Save and organize your favorite anime and manga
- 🏆 **Premium Features** - Enhanced discovery and exclusive content
- 🔐 **Authentication** - Secure user accounts with login/signup

### User Experience
- 🌙 **Dark/Light Mode** - Beautiful themes with persistent preferences
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Fast loading with image optimization and caching
- 🎨 **Modern UI/UX** - Smooth animations and intuitive navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4.1, Framer Motion for animations
- **Icons**: Lucide React
- **HTTP Client**: Axios with custom hooks
- **State Management**: React Context + Custom Hooks
- **Theme Management**: next-themes with system detection
- **UI Components**: Headless UI for accessibility
- **API**: Jikan API (MyAnimeList) + Custom backend integration
- **Authentication**: JWT-based auth system
- **Performance**: Image optimization, lazy loading, debounced search

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd minna-go
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Configure environment variables:

```bash
cp .env.example .env.local
# Add your API keys and configuration to .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔧 API Configuration

### Default (Free) - Jikan API

The app uses the free Jikan API, which provides comprehensive access to MyAnimeList data without requiring an API key.

**Features Available:**
- Anime and manga search
- Detailed information pages
- Rankings and top lists
- Club information
- User profiles (public data)
- Reviews and recommendations

### Premium APIs (Optional)

For enhanced features, you can configure additional APIs:

1. **RapidAPI MyAnimeList**: For enhanced rate limits
2. **Custom Backend**: For user authentication and favorites
3. **Streaming APIs**: For direct streaming links

**Setup:**
```bash
# Copy environment template
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
NEXT_PUBLIC_API_BASE_URL=your_backend_url
NEXT_PUBLIC_AUTH_ENABLED=true
```

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_JIKAN_BASE_URL=https://api.jikan.moe/v4

# Features
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_PREMIUM_FEATURES=false
NEXT_PUBLIC_ANALYTICS_ENABLED=false

# App Configuration
NEXT_PUBLIC_APP_NAME=MinnaGo
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage with featured content
│   ├── not-found.tsx       # Custom 404 page
│   │
│   ├── anime/              # Anime-related pages
│   │   └── [id]/           # Dynamic anime detail pages
│   │       ├── page.tsx    # Main anime detail page
│   │       └── news/       # Anime news subsection
│   │
│   ├── manga/              # Manga section
│   │   ├── page.tsx        # Manga browse/search page
│   │   └── [id]/           # Dynamic manga detail pages
│   │
│   ├── clubs/              # Community clubs
│   │   ├── page.tsx        # Club discovery page
│   │   └── [id]/           # Individual club pages
│   │
│   ├── rankings/           # Top anime/manga rankings
│   ├── random/             # Random content discovery
│   ├── favorites/          # User favorites management
│   ├── profile/            # User profile pages
│   ├── premium/            # Premium features
│   ├── settings/           # App settings
│   │
│   ├── auth/               # Authentication
│   │   ├── login/          # Login page
│   │   └── signup/         # Registration page
│   │
│   └── api/                # API routes
│       └── random/         # Server-side random content
│
├── components/             # Reusable UI components
│   ├── AnimeCard.tsx       # Individual anime display card
│   ├── AnimeGrid.tsx       # Grid layout for anime
│   ├── AnimeCategories.tsx # Category filtering
│   ├── AnimeRanking.tsx    # Ranking display components
│   ├── MangaCard.tsx       # Manga display card
│   ├── MangaGrid.tsx       # Manga grid layout
│   ├── ClubCard.tsx        # Club display card
│   ├── MemberCard.tsx      # Club member card
│   ├── RankingCard.tsx     # Ranking item display
│   ├── ReviewCard.tsx      # Review display component
│   ├── ReviewsSection.tsx  # Reviews container
│   ├── Header.tsx          # App navigation header
│   ├── SearchInput.tsx     # Enhanced search component
│   ├── ThemeToggle.tsx     # Dark/light mode switch
│   ├── VideoPlayer.tsx     # Video playback component
│   ├── StreamingModal.tsx  # Streaming options modal
│   ├── ShareModal.tsx      # Social sharing modal
│   ├── Toast.tsx           # Notification system
│   ├── AuthGuard.tsx       # Authentication wrapper
│   ├── LoadingSpinner.tsx  # Loading states
│   ├── ErrorMessage.tsx    # Error handling display
│   └── Providers.tsx       # Context providers wrapper
│
├── hooks/                  # Custom React hooks
│   ├── useAnimeSearch.ts   # Anime search functionality
│   ├── useAnimeDetail.ts   # Individual anime data
│   ├── useAnimeRanking.ts  # Rankings data
│   ├── useAnimeReviews.ts  # Reviews management
│   ├── useAnimeVideos.ts   # Video content
│   ├── useMangaSearch.ts   # Manga search
│   ├── useMangaDetail.ts   # Manga details
│   ├── useMangaRanking.ts  # Manga rankings
│   ├── useClubs.ts         # Club discovery
│   ├── useClubDetail.ts    # Individual club data
│   ├── useClubMembers.ts   # Club membership
│   ├── useRandomAnime.ts   # Random recommendations
│   └── useMangaCategories.ts # Category management
│
├── contexts/               # React Context providers
│   └── AuthContext.tsx     # Authentication state
│
├── types/                  # TypeScript definitions
│   └── anime.ts            # All type definitions
│
└── utils/                  # Utility functions
```

## ✨ Features in Detail

### 🔍 Advanced Search & Discovery
- **Smart Search**: Debounced search with 300ms delay for optimal performance
- **Multi-type Search**: Search across anime, manga, and clubs simultaneously  
- **Filter Options**: Genre, year, status, rating, and popularity filters
- **Autocomplete**: Intelligent suggestions as you type
- **Search History**: Recently searched items for quick access

### 📺 Anime & Manga Details
- **Comprehensive Information**: Scores, rankings, popularity, episode counts
- **Rich Media**: High-quality images, trailers, and promotional videos
- **Detailed Statistics**: Member counts, favorites, and community scores
- **Related Content**: Sequels, prequels, spin-offs, and adaptations
- **Streaming Links**: Direct links to legal streaming platforms
- **Download Options**: Links to official sources where available

### 👥 Community Features
- **Anime Clubs**: Browse and join themed communities
- **Member Profiles**: View member activity and favorites
- **Club Statistics**: Member counts, activity levels, and growth metrics
- **Club Categories**: Find clubs by genre, activity type, or interests
- **Social Integration**: Share clubs and invite friends

### 🏆 Rankings & Top Lists  
- **Dynamic Rankings**: Top anime/manga by score, popularity, and favorites
- **Category Rankings**: Seasonal, genre-specific, and demographic rankings
- **Trending Content**: Currently popular and rising content
- **Historical Data**: Track how rankings change over time
- **Custom Lists**: Create and share your own top lists

### 👤 User Experience
- **Personalized Dashboard**: Customized homepage based on your interests
- **Favorites Management**: Organize your favorite anime and manga
- **Watch/Read Status**: Track your progress with status indicators
- **Recommendation Engine**: AI-powered suggestions based on your preferences
- **Cross-device Sync**: Your data syncs across all devices

### 🎨 Design & Performance
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Themes**: Beautiful themes with automatic system detection
- **Fast Loading**: Optimized images, lazy loading, and efficient caching
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation support

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or deploy from GitHub
# Connect your repo at vercel.com
```

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static files
npm run build && npm run export
```

### Docker Support
```dockerfile
# Dockerfile included for containerized deployment
docker build -t minna-go .
docker run -p 3000:3000 minna-go
```

### Environment Setup for Production
```env
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

### Development Features
- **Turbopack**: Ultra-fast bundling for development
- **Hot Reload**: Instant updates as you code
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency checking
- **Prettier**: Automatic code formatting

### Code Quality
- **TypeScript Strict Mode**: Enabled for maximum type safety
- **ESLint Configuration**: Extended Next.js and React best practices
- **Component Testing**: Jest and React Testing Library setup
- **Performance Monitoring**: Built-in performance metrics

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Set up the development environment
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- **Code Style**: Follow the existing TypeScript and React patterns
- **Component Structure**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes, avoid custom CSS when possible
- **Type Safety**: Ensure all code is properly typed
- **Performance**: Consider loading times and user experience
- **Accessibility**: Follow WCAG guidelines for all UI components

### Areas for Contribution
- 🐛 **Bug Fixes**: Help fix reported issues
- ✨ **New Features**: Add new functionality or improve existing features
- 🎨 **UI/UX Improvements**: Enhance the visual design and user experience
- 📱 **Mobile Optimization**: Improve mobile responsiveness
- 🔍 **Search Enhancement**: Improve search algorithms and filters
- 🌐 **Internationalization**: Add support for multiple languages
- 📊 **Analytics**: Add user behavior tracking and insights
- 🔒 **Security**: Enhance authentication and data protection

### Code Review Process
1. All submissions require review before merging
2. Maintain consistent code style and structure
3. Include tests for new functionality
4. Update documentation as needed
5. Ensure TypeScript compilation passes
6. Verify responsive design works across devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### APIs & Data Sources
- **[MyAnimeList](https://myanimelist.net/)** - The world's most active anime and manga community and database
- **[Jikan API](https://jikan.moe/)** - Unofficial MyAnimeList API providing free access to MAL data
- **[AniList API](https://anilist.co/)** - Alternative anime/manga database with GraphQL API

### Libraries & Tools
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React
- **[Lucide](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[Headless UI](https://headlessui.dev/)** - Unstyled, accessible UI components

### Design Inspiration
- **[Dribbble](https://dribbble.com/)** - Design inspiration for modern UI patterns
- **[Behance](https://www.behance.net/)** - Creative showcase for design ideas
- **Modern anime/manga platforms** - UI/UX patterns from industry leaders

### Community
- **Open Source Contributors** - Thanks to everyone who has contributed code, ideas, and feedback
- **Anime/Manga Communities** - For providing valuable feedback and feature requests
- **Beta Testers** - For helping identify bugs and usability issues

---

**Made with ❤️ for the anime and manga community**

For questions, suggestions, or support, please [open an issue](https://github.com/your-username/minna-go/issues) or join our [Discord community](https://discord.gg/minna-go).
