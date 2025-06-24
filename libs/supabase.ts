import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string;
                    nepali_name?: string;
                    phone?: string;
                    location?: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    full_name: string;
                    nepali_name?: string;
                    phone?: string;
                    location?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    full_name?: string;
                    nepali_name?: string;
                    phone?: string;
                    location?: string;
                    updated_at?: string;
                };
            };
            crops: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    nepali_name: string;
                    variety?: string;
                    planting_date: string;
                    expected_harvest: string;
                    area_size: number;
                    location: string;
                    status: 'planted' | 'growing' | 'harvested';
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    nepali_name: string;
                    variety?: string;
                    planting_date: string;
                    expected_harvest: string;
                    area_size: number;
                    location: string;
                    status?: 'planted' | 'growing' | 'harvested';
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    nepali_name?: string;
                    variety?: string;
                    planting_date?: string;
                    expected_harvest?: string;
                    area_size?: number;
                    location?: string;
                    status?: 'planted' | 'growing' | 'harvested';
                    updated_at?: string;
                };
            };
            detections: {
                Row: {
                    id: string;
                    user_id: string;
                    crop_id?: string;
                    image_url: string;
                    disease_name: string;
                    disease_nepali_name: string;
                    confidence: number;
                    severity: 'low' | 'medium' | 'high';
                    description: string;
                    treatment: string[];
                    prevention: string[];
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    crop_id?: string;
                    image_url: string;
                    disease_name: string;
                    disease_nepali_name: string;
                    confidence: number;
                    severity: 'low' | 'medium' | 'high';
                    description: string;
                    treatment: string[];
                    prevention: string[];
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    crop_id?: string;
                    image_url?: string;
                    disease_name?: string;
                    disease_nepali_name?: string;
                    confidence?: number;
                    severity?: 'low' | 'medium' | 'high';
                    description?: string;
                    treatment?: string[];
                    prevention?: string[];
                };
            };
        };
    };
};