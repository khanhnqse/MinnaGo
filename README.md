# MinnaGo Anime Search

A modern Next.js web application for searching and discovering anime using the MyAnimeList API. Built with React, TypeScript, Tailwind CSS, and featuring dark/light mode support.

## Features

- 🔍 **Real-time anime search** with debounced API calls
- 🌙 **Dark/Light mode toggle** with persistent theme preference
- 📱 **Responsive design** that works on all devices
- 🎯 **Detailed anime information** including scores, genres, synopsis, and more
- ⚡ **Fast loading** with optimized images and loading states
- 🎨 **Beautiful UI** with modern design and smooth animations
- 🔗 **Direct linking** to individual anime detail pages

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Theme Management**: next-themes
- **API**: Jikan API (free MyAnimeList API)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd minna-go
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Set up RapidAPI:

```bash
cp .env.example .env.local
# Add your RapidAPI key to .env.local
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

### Default (Free) - Jikan API

The app currently uses the free Jikan API, which provides access to MyAnimeList data without requiring an API key.

### RapidAPI (Premium)

To use the MyAnimeList API via RapidAPI:

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the MyAnimeList API
3. Copy your API key to `.env.local`:

```
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
```

4. Update the API calls in `src/hooks/useAnimeSearch.ts` to use the RapidAPI endpoint

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── anime/[id]/      # Dynamic anime detail pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
│   ├── AnimeCard.tsx    # Individual anime card
│   ├── AnimeGrid.tsx    # Grid layout for anime cards
│   ├── ErrorMessage.tsx # Error state component
│   ├── Header.tsx       # App header with theme toggle
│   ├── LoadingSpinner.tsx # Loading state component
│   ├── Providers.tsx    # Theme provider wrapper
│   ├── SearchInput.tsx  # Search input with icon
│   └── ThemeToggle.tsx  # Dark/light mode toggle
├── hooks/               # Custom React hooks
│   ├── useAnimeDetail.ts # Hook for fetching anime details
│   └── useAnimeSearch.ts # Hook for searching anime
└── types/               # TypeScript type definitions
    └── anime.ts         # Anime-related types
```

## Features in Detail

### Search Functionality

- Debounced search with 500ms delay to optimize API calls
- Real-time results as you type
- Empty state with helpful suggestions
- Error handling for failed requests

### Anime Cards

- High-quality images with fallback placeholders
- Score indicators with color coding
- Genre tags (showing first 3 with overflow indicator)
- Episode count and year information
- Truncated synopsis preview

### Detail Pages

- Comprehensive anime information
- Large cover image
- Detailed statistics (score, rank, popularity, members)
- Full synopsis
- Complete genre and studio listings
- Responsive layout with optimized mobile view

### Theme Support

- Automatic system theme detection
- Manual toggle between light and dark modes
- Persistent theme preference
- Smooth transitions between themes

## Deployment

The app can be deployed on Vercel, Netlify, or any platform that supports Next.js:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [MyAnimeList](https://myanimelist.net/) for the anime data
- [Jikan API](https://jikan.moe/) for providing free access to MAL data
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
