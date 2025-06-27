import { AuthError, Session, User } from '@supabase/supabase-js';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export interface ICropRecommendation {
  crop: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  image: string;
}

export interface ICropData {
  id: string;
  name: string;
  nepaliName: string;
  season: string;
  image: string;
  growthStage: string;
  nextAction: string;
  daysToHarvest: number;
  category: string;
  recommendations: string[];
}

export interface IMarketPrice {
  id: string;
  crop: string;
  nepaliName: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  prediction: {
    nextWeek: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number;
  };
}

export interface IMarketAlert {
  id: string;
  type: 'price_surge' | 'price_drop' | 'demand_high' | 'supply_low';
  crop: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface IUserStats {
  cropsManaged: number;
  detectionsUsed: number;
  marketAlerts: number;
  daysActive: number;
}

export interface DetectionResult {
  disease: string;
  nepaliName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string[];
  prevention: string[];
  image?: string;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string, nepaliName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}