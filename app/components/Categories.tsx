import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoriesProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const Categories = ({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) => {
    return (
        <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category: string) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.categoryButtonActive
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category && styles.categoryTextActive
                        ]}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
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
})