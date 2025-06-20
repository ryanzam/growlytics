import { Search } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
}

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }: SearchProps) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Search size={20} color="#9ca3af" />
                <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#9ca3af"
                />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
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
})