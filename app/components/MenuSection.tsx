import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>{title}</Text>
        {children}
    </View>
);

export const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
    rightComponent
}: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
    rightComponent?: React.ReactNode;
}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            <View style={styles.menuItemIcon}>{icon}</View>
            <View>
                <Text style={styles.menuItemTitle}>{title}</Text>
                {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
            </View>
        </View>
        <View style={styles.menuItemRight}>
            {rightComponent}
            {showChevron && <ChevronRight size={20} color="#9ca3af" />}
        </View>
    </TouchableOpacity>
);

export default MenuSection

const styles = StyleSheet.create({
    menuSection: {
        marginTop: 24,
        marginHorizontal: 20,
    },
    menuSectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#6b7280',
        marginBottom: 12,
        marginLeft: 4,
    },
    menuItem: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuItemTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#1f2937',
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})