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