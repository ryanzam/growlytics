import { marketAlerts, marketPrices } from '@/libs/data'
import { getAlertColor, getConfidenceColor, getPriceChange, getTrendColor } from '@/utils'
import { AlertTriangle, BarChart3, Calendar, DollarSign, MapPin, TrendingDown, TrendingUp } from 'lucide-react-native'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Categories from '../components/Categories'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

const MarketTab = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMarket, setSelectedMarket] = useState('all');

    const markets = ['all', 'Gorkha', 'Balkhu', 'Pokhara', 'Chitwan'];

    const filteredPrices = marketPrices.filter(price =>
        (price.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
            price.nepaliName.includes(searchQuery)) &&
        (selectedMarket === 'all' || price.market === selectedMarket)
    );

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return <TrendingUp size={16} color="#09712f" />;
            case 'down': return <TrendingDown size={16} color="#ef4444" />;
            default: return <BarChart3 size={16} color="#6b7280" />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header title='Market Prices' subtitle='बजार मूल्य' />

                {/* Search Component */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search crops... / बाली खोज्नुहोस्...' />

                {/* Categories */}
                <Categories categories={markets} selectedCategory={selectedMarket} setSelectedCategory={setSelectedMarket} />

                {/* Market Alerts */}
                <View style={styles.alertsSection}>
                    <Text style={styles.sectionTitle}>Market Alerts</Text>
                    {marketAlerts.map((alert) => (
                        <TouchableOpacity key={alert.id} style={styles.alertCard}>
                            <AlertTriangle size={20} color={getAlertColor(alert.priority)} />
                            <View style={styles.alertContent}>
                                <Text style={styles.alertMessage}>{alert.message}</Text>
                                <Text style={styles.alertCrop}>{alert.crop}</Text>
                            </View>
                            <View style={[styles.priorityDot, { backgroundColor: getAlertColor(alert.priority) }]} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Price Cards */}
                <View style={styles.pricesSection}>
                    <Text style={styles.sectionTitle}>Current Prices</Text>
                    {filteredPrices.map((price) => {
                        const { change, percentage } = getPriceChange(price.currentPrice, price.previousPrice);
                        return (
                            <TouchableOpacity key={price.id} style={styles.priceCard}>
                                <View style={styles.priceHeader}>
                                    <View>
                                        <Text style={styles.cropName}>{price.crop}</Text>
                                        <Text style={styles.cropNepaliName}>{price.nepaliName}</Text>
                                    </View>
                                    <View style={styles.priceInfo}>
                                        <Text style={styles.currentPrice}>NPR {price.currentPrice}</Text>
                                        <Text style={styles.priceUnit}>{price.unit}</Text>
                                    </View>
                                </View>

                                <View style={styles.priceDetails}>
                                    <View style={styles.priceChange}>
                                        {getTrendIcon(price.trend)}
                                        <Text style={[styles.changeText, { color: getTrendColor(price.trend) }]}>
                                            {change > 0 ? '+' : ''}{change.toFixed(0)} ({percentage}%)
                                        </Text>
                                    </View>
                                    <View style={styles.marketInfo}>
                                        <MapPin size={12} color="#6b7280" />
                                        <Text style={styles.marketText}>{price.market}</Text>
                                    </View>
                                </View>

                                <View style={styles.predictionSection}>
                                    <Text style={styles.predictionTitle}>AI Prediction (Next Week)</Text>
                                    <View style={styles.predictionContent}>
                                        <View style={styles.predictionPrice}>
                                            <Text style={styles.predictedPrice}>NPR {price.prediction.nextWeek}</Text>
                                            {getTrendIcon(price.prediction.trend)}
                                        </View>
                                        <View style={styles.confidenceContainer}>
                                            <Text style={[styles.confidenceText, { color: getConfidenceColor(price.prediction.confidence) }]}>
                                                {price.prediction.confidence}% confidence
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.lastUpdated}>
                                    <Calendar size={12} color="#9ca3af" />
                                    <Text style={styles.lastUpdatedText}>Updated {price.lastUpdated}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Selling Tips */}
                <View style={styles.tipsSection}>
                    <Text style={styles.sectionTitle}>Selling Tips</Text>
                    <View style={styles.tipCard}>
                        <DollarSign size={24} color="#09712f" />
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Maximize Your Profits</Text>
                            <Text style={styles.tipText}>• Sell tomatoes now - prices are at peak</Text>
                            <Text style={styles.tipText}>• Hold wheat for 1-2 weeks for better prices</Text>
                            <Text style={styles.tipText}>• Rice demand is high in urban markets</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default MarketTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    marketText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
    },
    alertsSection: {
        padding: 20,
        paddingBottom: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginBottom: 16,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    alertContent: {
        flex: 1,
        marginLeft: 12,
    },
    alertMessage: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#1f2937',
        marginBottom: 2,
    },
    alertCrop: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
    },
    priorityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    pricesSection: {
        padding: 20,
        paddingBottom: 0,
    },
    priceCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cropName: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
    },
    cropNepaliName: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
        marginTop: 2,
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    currentPrice: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#09712f',
    },
    priceUnit: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
    },
    priceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceChange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 4,
    },
    marketInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    predictionSection: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    predictionTitle: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#6b7280',
        marginBottom: 8,
    },
    predictionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    predictionPrice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    predictedPrice: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginRight: 8,
    },
    confidenceContainer: {
        alignItems: 'flex-end',
    },
    confidenceText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    lastUpdated: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lastUpdatedText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#9ca3af',
        marginLeft: 4,
    },
    tipsSection: {
        padding: 20,
        paddingBottom: 40,
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tipContent: {
        flex: 1,
        marginLeft: 12,
    },
    tipTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#1f2937',
        marginBottom: 8,
    },
    tipText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
        marginBottom: 2,
    },
})