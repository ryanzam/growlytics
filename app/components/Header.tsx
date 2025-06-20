import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ title, subtitle, children }: HeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            {children}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#09712f',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#dcfce7',
        marginBottom: 8,
    },
})