"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  isPremium: boolean;
  joinDate: string;
  preferences?: {
    favoriteGenres: string[];
    watchedAnime: number;
    readManga: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in real app, this would be a proper database)
const mockUsers: { [email: string]: User & { password: string } } = {
  "demo@minnego.com": {
    id: "1",
    email: "demo@minnego.com",
    name: "Demo User",
    username: "@demo_user",
    bio: "Welcome to the demo! I love exploring anime and manga series. This is a test account to showcase MinnaGo features.",
    password: "demo123",
    avatar: "/unnamed.png",
    coverImage: "/34e2b8220213515.67bf12e77c4b6.jpg",
    location: "Ho Chi Minh City",
    isPremium: true,
    joinDate: "March 2024",
    preferences: {
      favoriteGenres: ["Action", "Romance", "Comedy"],
      watchedAnime: 156,
      readManga: 89,
    },
  },
  "akira@example.com": {
    id: "2",
    email: "akira@example.com",
    name: "Akira Tanaka",
    username: "@akira_otaku",
    bio: "Anime enthusiast since 2010. Love slice of life, shounen, and psychological thrillers. Currently watching 15 series!",
    password: "password123",
    avatar: "/man.png",
    coverImage: "/34e2b8220213515.67bf12e77c4b6.jpg",
    location: "Tokyo, Japan",
    isPremium: true,
    joinDate: "March 2020",
    preferences: {
      favoriteGenres: ["Slice of Life", "Shounen", "Psychological"],
      watchedAnime: 247,
      readManga: 189,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        Cookies.remove("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = mockUsers[email.toLowerCase()];

    if (!mockUser) {
      setIsLoading(false);
      return { success: false, error: "User not found" };
    }

    if (mockUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: "Invalid password" };
    }
    // Remove password from user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = mockUser;

    // Save to cookie (expires in 7 days)
    Cookies.set("user", JSON.stringify(userWithoutPassword), { expires: 7 });
    setUser(userWithoutPassword);
    setIsLoading(false);

    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers[email.toLowerCase()]) {
      setIsLoading(false);
      return { success: false, error: "User already exists" };
    }
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      username: `@${name.toLowerCase().replace(/\s+/g, "_")}`,
      bio: `Hello! I'm ${name} and I love anime and manga. Just joined MinnaGo!`,
      avatar: "/man.png",
      coverImage: "/34e2b8220213515.67bf12e77c4b6.jpg",
      location: "Unknown",
      isPremium: false,
      joinDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      preferences: {
        favoriteGenres: [],
        watchedAnime: 0,
        readManga: 0,
      },
    };

    // Add to mock database
    mockUsers[email.toLowerCase()] = { ...newUser, password };

    // Save to cookie
    Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
    setUser(newUser);
    setIsLoading(false);

    return { success: true };
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 });
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
