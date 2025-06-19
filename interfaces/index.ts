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