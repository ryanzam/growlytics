import { cropData } from '@/libs/data';
import { getStageColor } from '@/utils';
import { Calendar, Droplets, Sprout, Thermometer } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Categories from '../components/Categories';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const CropsTab = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'cereals', 'vegetables', 'cash crops'];

    const filteredCrops = cropData.filter(crop => {
        if (searchQuery.length > 0) {
            return crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                crop.nepaliName.includes(searchQuery)
        }
        if (selectedCategory === 'all') {
            return crop;
        } else {
            return crop.category.toLowerCase() === selectedCategory.toLowerCase();
        }
    }
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header title='Crops Management' subtitle='बाली व्यवस्थापन' />

                {/* Search Bar */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search crops... / बाली खोज्नुहोस्...' />

                {/* Categories */}
                <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
               
                {/* Crop Cards */}
                <View style={styles.cropsContainer}>
                    {filteredCrops.map((crop) => (
                        <TouchableOpacity key={crop.id} style={styles.cropCard}>
                            <Image source={{ uri: crop.image }} style={styles.cropImage} />
                            <View style={styles.cropContent}>
                                <View style={styles.cropHeader}>
                                    <View>
                                        <Text style={styles.cropName}>{crop.name}</Text>
                                        <Text style={styles.cropNepaliName}>{crop.nepaliName}</Text>
                                    </View>
                                    <View style={[styles.stageBadge, { backgroundColor: getStageColor(crop.growthStage) }]}>
                                        <Text style={styles.stageText}>{crop.growthStage}</Text>
                                    </View>
                                </View>

                                <View style={styles.cropDetails}>
                                    <View style={styles.detailItem}>
                                        <Calendar size={16} color="#6b7280" />
                                        <Text style={styles.detailText}>{crop.daysToHarvest} days to harvest</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Sprout size={16} color="#22c55e" />
                                        <Text style={styles.detailText}>{crop.season} season</Text>
                                    </View>
                                </View>

                                <View style={styles.nextActionContainer}>
                                    <Text style={styles.nextActionLabel}>Next Action:</Text>
                                    <Text style={styles.nextActionText}>{crop.nextAction}</Text>
                                </View>

                                <View style={styles.recommendationsContainer}>
                                    <Text style={styles.recommendationsLabel}>AI Recommendations:</Text>
                                    {crop.recommendations.map((rec, index) => (
                                        <View key={index} style={styles.recommendationItem}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.recommendationText}>{rec}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Weather Impact */}
                <View style={styles.weatherImpact}>
                    <Text style={styles.sectionTitle}>Weather Impact</Text>
                    <View style={styles.weatherCard}>
                        <View style={styles.weatherInfo}>
                            <Thermometer size={20} color="#ef4444" />
                            <Text style={styles.weatherText}>High temperature alert for rice crops</Text>
                        </View>
                        <View style={styles.weatherInfo}>
                            <Droplets size={20} color="#3b82f6" />
                            <Text style={styles.weatherText}>Adequate rainfall expected for wheat</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default CropsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    searchContainer: {
        padding: 20,
        paddingBottom: 0,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#1f2937',
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    categoryButtonActive: {
        backgroundColor: '#09712f',
        borderColor: '#09712f',
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
    },
    categoryTextActive: {
        color: '#ffffff',
    },
    cropsContainer: {
        padding: 20,
        paddingTop: 0,
    },
    cropCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    cropImage: {
        width: '100%',
        height: 160,
    },
    cropContent: {
        padding: 16,
    },
    cropHeader: {
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
    stageBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    stageText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
    cropDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    detailText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
        marginLeft: 8,
    },
    nextActionContainer: {
        backgroundColor: '#fef3c7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    nextActionLabel: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#92400e',
        marginBottom: 4,
    },
    nextActionText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#92400e',
    },
    recommendationsContainer: {
        backgroundColor: '#ecfdf5',
        borderRadius: 8,
        padding: 12,
    },
    recommendationsLabel: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#065f46',
        marginBottom: 8,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    bullet: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#22c55e',
        marginTop: 6,
        marginRight: 8,
    },
    recommendationText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#065f46',
        flex: 1,
    },
    weatherImpact: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginBottom: 16,
    },
    weatherCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    weatherText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#1f2937',
        marginLeft: 12,
        flex: 1,
    },
})