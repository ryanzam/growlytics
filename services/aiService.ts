import { DetectionResult } from '@/interfaces';
import { supabase } from '@/libs/supabase';

export async function detectPlantDisease(imageUri: string): Promise<DetectionResult> {
    try {
        // Convert image to base64 for API
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Create FormData for PlantNet API
        const formData = new FormData();
        formData.append('images', blob);
        formData.append('modifiers', JSON.stringify(['crops_fast']));
        formData.append('plant-details', JSON.stringify(['common_names']));

        const plantNetResponse = await fetch(
            `https://my-api.plantnet.org/v1/identify/crops?api-key=${process.env.EXPO_PUBLIC_PLANTNET_API_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!plantNetResponse.ok) {
            throw new Error('PlantNet API request failed');
        }

        const plantData = await plantNetResponse.json();

        // Process the response and determine disease
        const result = await processPlantNetResponse(plantData);
        return result;
    } catch (error) {
        console.error('Plant disease detection error:', error);
        // Return mock data as fallback
        return getMockDiseaseResult();
    }
}
async function processPlantNetResponse(plantData: any): Promise<DetectionResult> {
    // use an actual ai deteection later.

    const diseases = [
        {
            disease: 'Brown Spot',
            nepaliName: 'खैरो दाग रोग',
            severity: 'medium' as const,
            description: 'Brown spot is a fungal disease that affects rice plants, causing brown spots on leaves and reducing yield.',
            treatment: [
                'Apply fungicide containing mancozeb',
                'Remove affected leaves and burn them',
                'Improve field drainage',
                'Apply balanced fertilizer'
            ],
            prevention: [
                'Use disease-resistant varieties',
                'Maintain proper plant spacing',
                'Avoid excessive nitrogen fertilization',
                'Ensure good field drainage'
            ]
        },
        {
            disease: 'Leaf Blight',
            nepaliName: 'पात सुकाउने रोग',
            severity: 'high' as const,
            description: 'Leaf blight is a serious bacterial disease that can cause significant crop loss if not treated promptly.',
            treatment: [
                'Apply copper-based bactericide',
                'Remove and destroy infected plants',
                'Improve air circulation',
                'Reduce irrigation frequency'
            ],
            prevention: [
                'Use certified disease-free seeds',
                'Practice crop rotation',
                'Maintain field hygiene',
                'Avoid overhead irrigation'
            ]
        },
        {
            disease: 'Powdery Mildew',
            nepaliName: 'सेतो धुलो रोग',
            severity: 'low' as const,
            description: 'Powdery mildew appears as white powdery spots on leaves and stems, typically in humid conditions.',
            treatment: [
                'Apply sulfur-based fungicide',
                'Increase air circulation',
                'Remove affected plant parts',
                'Apply neem oil spray'
            ],
            prevention: [
                'Plant in well-ventilated areas',
                'Avoid overhead watering',
                'Use resistant varieties',
                'Maintain proper plant spacing'
            ]
        }
    ];

    // Randomly select a disease for demonstration
    const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = Math.floor(Math.random() * 20) + 75; // 75-95% confidence

    return {
        ...selectedDisease,
        confidence,
    };
}

function getMockDiseaseResult(): DetectionResult {
    return {
        disease: 'Brown Spot',
        nepaliName: 'खैरो दाग रोग',
        confidence: 87,
        severity: 'medium',
        description: 'Brown spot is a fungal disease that affects rice plants, causing brown spots on leaves and reducing yield.',
        treatment: [
            'Apply fungicide containing mancozeb',
            'Remove affected leaves and burn them',
            'Improve field drainage',
            'Apply balanced fertilizer'
        ],
        prevention: [
            'Use disease-resistant varieties',
            'Maintain proper plant spacing',
            'Avoid excessive nitrogen fertilization',
            'Ensure good field drainage'
        ]
    };
}

export async function saveDetectionResult(
    userId: string,
    imageUrl: string,
    result: DetectionResult,
    cropId?: string
) {
    try {
        const { error } = await supabase
            .from('detections')
            .insert({
                user_id: userId,
                crop_id: cropId,
                image_url: imageUrl,
                disease_name: result.disease,
                disease_nepali_name: result.nepaliName,
                confidence: result.confidence,
                severity: result.severity,
                description: result.description,
                treatment: result.treatment,
                prevention: result.prevention,
            });

        if (error) {
            console.error('Error saving detection:', error);
        }
    } catch (error) {
        console.error('Save detection error:', error);
    }
}

// Get user's detection history
export async function getUserDetections(userId: string) {
    try {
        const { data, error } = await supabase
            .from('detections')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching detections:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Get detections error:', error);
        return [];
    }
}
