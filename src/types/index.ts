export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverUrl: string;
  year: number;
  duration: string;
  genre: string[];
  rating: string;
  cast: string[];
  director: string;
  isTrending?: boolean;
  isNewRelease?: boolean;
  isClassic?: boolean;
  videoUrl: string;
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  username: string;
  phone_number: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}