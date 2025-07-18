import { ICropData, ICropRecommendation, IMarketAlert, IMarketPrice } from "@/interfaces";

export const recomendations: ICropRecommendation[] = [
    {
        crop: 'Rice',
        action: 'Time for fertilizer application',
        priority: 'high',
        image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        crop: 'Wheat',
        action: 'Monitor for pest activity',
        priority: 'medium',
        image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        crop: 'Vegetables',
        action: 'Harvest ready in 3 days',
        priority: 'high',
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
]

export const cropData: ICropData[] = [
    {
        id: '1',
        name: 'Rice',
        nepaliName: 'धान',
        season: 'Monsoon',
        image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=600',
        growthStage: 'Tillering',
        nextAction: 'Apply nitrogen fertilizer',
        daysToHarvest: 45,
        category: 'Cereals',
        recommendations: ['Water level: 2-3 inches', 'Apply urea fertilizer', 'Monitor for brown plant hopper']
    },
    {
        id: '2',
        name: 'Wheat',
        nepaliName: 'गहुँ',
        season: 'Winter',
        image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=600',
        growthStage: 'Grain Filling',
        nextAction: 'Reduce irrigation',
        daysToHarvest: 20,
        category: 'Cereals',
        recommendations: ['Reduce water supply', 'Watch for grain maturity', 'Prepare harvesting tools']
    },
    {
        id: '3',
        name: 'Maize',
        nepaliName: 'मकै',
        season: 'Summer',
        image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=600',
        growthStage: 'Silking',
        nextAction: 'Ensure adequate water',
        daysToHarvest: 35,
        category: 'Cash Crops',
        recommendations: ['Increase irrigation frequency', 'Apply potash fertilizer', 'Control stem borer']
    },
    {
        id: '4',
        name: 'Tomato',
        nepaliName: 'गोलभेडा',
        season: 'Year-round',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
        growthStage: 'Flowering',
        nextAction: 'Support plant stems',
        daysToHarvest: 25,
        category: 'Vegetables',
        recommendations: ['Install stakes for support', 'Remove suckers', 'Monitor for blight disease']
    }
]

export const marketAlerts: IMarketAlert[] = [
    {
        id: '1',
        type: 'price_surge',
        crop: 'Tomato',
        message: 'Tomato prices up 18% - Great time to sell!',
        priority: 'high'
    },
    {
        id: '2',
        type: 'demand_high',
        crop: 'Rice',
        message: 'High demand for rice in urban markets',
        priority: 'medium'
    },
    {
        id: '3',
        type: 'supply_low',
        crop: 'Wheat',
        message: 'Low wheat supply affecting prices',
        priority: 'medium'
    }
];

export const marketPrices: IMarketPrice[] = [
    {
        id: '1',
        crop: 'Rice',
        nepaliName: 'धान',
        currentPrice: 35,
        previousPrice: 32,
        unit: 'per kg',
        market: 'Gorkha',
        lastUpdated: '2 hours ago',
        trend: 'up',
        prediction: {
            nextWeek: 38,
            trend: 'up',
            confidence: 85
        }
    },
    {
        id: '2',
        crop: 'Wheat',
        nepaliName: 'गहुँ',
        currentPrice: 42,
        previousPrice: 45,
        unit: 'per kg',
        market: 'Gorkha',
        lastUpdated: '1 hour ago',
        trend: 'down',
        prediction: {
            nextWeek: 40,
            trend: 'down',
            confidence: 78
        }
    },
    {
        id: '3',
        crop: 'Maize',
        nepaliName: 'मकै',
        currentPrice: 28,
        previousPrice: 28,
        unit: 'per kg',
        market: 'Pokhara',
        lastUpdated: '3 hours ago',
        trend: 'stable',
        prediction: {
            nextWeek: 30,
            trend: 'up',
            confidence: 72
        }
    },
    {
        id: '4',
        crop: 'Tomato',
        nepaliName: 'गोलभेडा',
        currentPrice: 65,
        previousPrice: 55,
        unit: 'per kg',
        market: 'Chitwan',
        lastUpdated: '30 minutes ago',
        trend: 'up',
        prediction: {
            nextWeek: 70,
            trend: 'up',
            confidence: 90
        }
    },
    {
        id: '5',
        crop: 'Potato',
        nepaliName: 'आलु',
        currentPrice: 25,
        previousPrice: 30,
        unit: 'per kg',
        market: 'Balkhu',
        lastUpdated: '1 hour ago',
        trend: 'down',
        prediction: {
            nextWeek: 22,
            trend: 'down',
            confidence: 80
        }
    }
];