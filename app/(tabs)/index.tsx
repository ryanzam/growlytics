import { WeatherData } from '@/interfaces';
import { Droplets, Sun, Wind } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const index = () => {

    const [weather, setWeather] = useState<WeatherData>({
        temperature: 24,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy'
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>नमस्ते, किसान!</Text>
                    <Text style={styles.subGreeting}>Good morning, Farmer!</Text>
                    <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</Text>
                </View>

                {/* Weather Card */}
                <View style={styles.weatherCard}>
                    <View style={styles.weatherHeader}>
                        <Sun size={24} color="#f59e0b" />
                        <Text style={styles.weatherTitle}>Today's Weather</Text>
                    </View>
                    <View style={styles.weatherContent}>
                        <View style={styles.temperatureSection}>
                            <Text style={styles.temperature}>{weather.temperature}°C</Text>
                            <Text style={styles.condition}>{weather.condition}</Text>
                        </View>
                        <View style={styles.weatherDetails}>
                            <View style={styles.weatherItem}>
                                <Droplets size={16} color="#3b82f6" />
                                <Text style={styles.weatherValue}>{weather.humidity}%</Text>
                            </View>
                            <View style={styles.weatherItem}>
                                <Wind size={16} color="#6b7280" />
                                <Text style={styles.weatherValue}>{weather.windSpeed} km/h</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#09712f',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    greeting: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    subGreeting: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#dcfce7',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#dcfce7',
    },
    weatherCard: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    weatherHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    weatherTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#1f2937',
        marginLeft: 8,
    },
    weatherContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    temperatureSection: {
        flex: 1,
    },
    temperature: {
        fontSize: 32,
        fontFamily: 'Inter-Bold',
        color: '#1f2937',
    },
    condition: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#6b7280',
    },
    weatherDetails: {
        flex: 1,
        alignItems: 'flex-end',
    },
    weatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    weatherValue: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#1f2937',
        marginLeft: 8,
    },
    quickActions: {
        margin: 20,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: '#1f2937',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    actionText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#1f2937',
        marginTop: 8,
        textAlign: 'center',
    },
    recommendations: {
        margin: 20,
        marginTop: 0,
    },
    recommendationCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cropImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    recommendationContent: {
        flex: 1,
    },
    recommendationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    cropName: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1f2937',
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    priorityText: {
        fontSize: 10,
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
    },
    recommendationAction: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#6b7280',
    },
    marketSection: {
        margin: 20,
        marginTop: 0,
        marginBottom: 40,
    },
    marketCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    marketContent: {
        flex: 1,
        marginLeft: 12,
    },
    marketTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1f2937',
        marginBottom: 2,
    },
    marketSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#22c55e',
    },
})