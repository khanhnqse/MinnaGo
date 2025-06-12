export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  type?: string;
  synopsis?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  episodes?: number;
  status?: string;
  duration?: string;
  rating?: string;
  season?: string;
  year?: number;
  source?: string;
  genres?: Genre[];
  studios?: Studio[];
  producers?: Producer[];
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ApiResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeVideo {
  youtube?: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
}

export interface AnimeTrailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
  images?: {
    image_url?: string;
    small_image_url?: string;
    medium_image_url?: string;
    large_image_url?: string;
    maximum_image_url?: string;
  };
}

export interface VideoPromo {
  title: string;
  trailer: AnimeTrailer;
}

export interface VideoMusicVideo {
  title: string;
  video: AnimeTrailer;
  meta?: {
    title?: string;
    author?: string;
  };
}

export interface VideoEpisode {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface AnimeVideosResponse {
  data: {
    promo: VideoPromo[];
    episodes: VideoEpisode[];
    music_videos: VideoMusicVideo[];
  };
}

// Manga Types
export interface Manga {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  type?: string;
  synopsis?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  chapters?: number;
  volumes?: number;
  status?: string;
  publishing?: boolean;
  published?: {
    from?: string;
    to?: string;
    prop?: {
      from?: {
        day?: number;
        month?: number;
        year?: number;
      };
      to?: {
        day?: number;
        month?: number;
        year?: number;
      };
    };
    string?: string;
  };
  authors?: Author[];
  serializations?: Serialization[];
  genres?: Genre[];
  themes?: Theme[];
  demographics?: Demographic[];
}

export interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Serialization {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Theme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface MangaApiResponse {
  data: Manga[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Review Types
export interface AnimeReview {
  mal_id: number;
  url: string;
  type: string;
  reactions: {
    overall: number;
    nice: number;
    love_it: number;
    funny: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
  };
  date: string;
  review: string;
  episodes_watched: number;
  scores: {
    overall: number;
    story: number;
    animation: number;
    sound: number;
    character: number;
    enjoyment: number;
  };
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  user: {
    url: string;
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
  };
}

export interface AnimeReviewsResponse {
  data: AnimeReview[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Club interfaces
export interface Club {
  mal_id: number;
  name: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp?: {
      image_url: string;
    };
  };
  members: number;
  category: string;
  created: string;
  access: string;
}

export interface ClubsResponse {
  data: Club[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Detailed Club interface for individual club pages
export interface ClubDetail extends Club {
  stats?: {
    anime_watching: number;
    anime_completed: number;
    anime_on_hold: number;
    anime_dropped: number;
    anime_plan_to_watch: number;
    manga_reading: number;
    manga_completed: number;
    manga_on_hold: number;
    manga_dropped: number;
    manga_plan_to_read: number;
  };
  about?: string;
  title?: string;
  description?: string;
  anime_relations?: ClubRelation[];
  manga_relations?: ClubRelation[];
  character_relations?: ClubRelation[];
  staff?: ClubStaff[];
}

export interface ClubRelation {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ClubStaff {
  url: string;
  username: string;
}

export interface ClubDetailResponse {
  data: ClubDetail;
}

export interface ClubMember {
  username: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp?: {
      image_url: string;
    };
  };
}

export interface ClubMembersResponse {
  data: ClubMember[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
