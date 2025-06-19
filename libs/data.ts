import { ICropRecommendation } from "@/interfaces";

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