import { IUserStats } from '@/interfaces'
import { Bell, Calendar, Globe, HelpCircle, LogOut, Mail, MapPin, Phone, Settings, Shield, ShieldUser, Sprout, TrendingUp } from 'lucide-react-native'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import MenuSection, { MenuItem } from '../components/MenuSection'

const ProfileTab = () => {

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState('english');

    const userStats: IUserStats = {
        cropsManaged: 12,
        detectionsUsed: 45,
        marketAlerts: 23,
        daysActive: 89
    };

    const handleLanguageToggle = () => {
        const newLanguage = language === 'english' ? 'nepali' : 'english';
        setLanguage(newLanguage);
        Alert.alert(
            'Language Changed',
            `Language switched to ${newLanguage === 'english' ? 'English' : 'Nepali'}`,
            [{ text: 'OK' }]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
            ]
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header title='Hary M.' subtitle='हरी म.'>
                    <View style={styles.headerContainer}>
                        <View style={styles.userLocationContainer}>
                            <MapPin size={14} color="#dcfce7" />
                            <Text style={styles.userLocation}>Chitwan, Nepal</Text>
                        </View>
                        <ShieldUser size={50} color='#fff' style={styles.userIcon} />
                    </View>
                </Header>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Sprout size={24} color="#22c55e" />
                            <Text style={styles.statNumber}>{userStats.cropsManaged}</Text>
                            <Text style={styles.statLabel}>Crops Managed</Text>
                        </View>
                        <View style={styles.statCard}>
                            <TrendingUp size={24} color="#3b82f6" />
                            <Text style={styles.statNumber}>{userStats.detectionsUsed}</Text>
                            <Text style={styles.statLabel}>Detections Used</Text>
                        </View>
                    </View>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Bell size={24} color="#f59e0b" />
                            <Text style={styles.statNumber}>{userStats.marketAlerts}</Text>
                            <Text style={styles.statLabel}>Market Alerts</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Calendar size={24} color="#8b5cf6" />
                            <Text style={styles.statNumber}>{userStats.daysActive}</Text>
                            <Text style={styles.statLabel}>Days Active</Text>
                        </View>
                    </View>
                </View>

                {/* Contact Information */}
                <MenuSection title="Contact Information">
                    <MenuItem
                        icon={<Phone size={20} color="#22c55e" />}
                        title="Phone Number"
                        subtitle="+977 9841234567"
                        onPress={() => console.log('Edit phone')}
                    />
                    <MenuItem
                        icon={<Mail size={20} color="#22c55e" />}
                        title="Email Address"
                        subtitle="hari.m@email.com"
                        onPress={() => console.log('Edit email')}
                    />
                </MenuSection>

                {/* App Settings */}
                <MenuSection title="App Settings">
                    <MenuItem
                        icon={<Bell size={20} color="#f59e0b" />}
                        title="Notifications"
                        subtitle="Receive alerts and updates"
                        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                        showChevron={false}
                        rightComponent={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#e5e7eb', true: '#22c55e' }}
                                thumbColor={notificationsEnabled ? '#ffffff' : '#ffffff'}
                            />
                        }
                    />
                    <MenuItem
                        icon={<Globe size={20} color="#3b82f6" />}
                        title="Language"
                        subtitle={language === 'english' ? 'English' : 'नेपाली'}
                        onPress={handleLanguageToggle}
                    />
                    <MenuItem
                        icon={<Settings size={20} color="#6b7280" />}
                        title="App Settings"
                        subtitle="Manage app preferences"
                        onPress={() => console.log('App settings')}
                    />
                </MenuSection>

                {/* Help & Support */}
                <MenuSection title="Help & Support">
                    <MenuItem
                        icon={<HelpCircle size={20} color="#8b5cf6" />}
                        title="Help Center"
                        subtitle="Get help and support"
                        onPress={() => console.log('Help center')}
                    />
                    <MenuItem
                        icon={<Shield size={20} color="#ef4444" />}
                        title="Privacy Policy"
                        subtitle="Read our privacy policy"
                        onPress={() => console.log('Privacy policy')}
                    />
                </MenuSection>

                {/* Account Actions */}
                <MenuSection title="Account">
                    <MenuItem
                        icon={<LogOut size={20} color="#ef4444" />}
                        title="Logout"
                        subtitle="Sign out of your account"
                        onPress={handleLogout}
                    />
                </MenuSection>

                {/* App Information */}
                <View style={styles.appInfo}>
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                    <Text style={styles.appDescription}>
                        AI-Powered Agricultural Advisory Platform for Farmers
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    userLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    userLocation: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#dcfce7',
    },
    userIcon: {
        backgroundColor: '#359759',
        borderRadius: 50,
        padding: 20,
        position: 'absolute',
        right: 16,
        top: -30
    },
    statsContainer: {
        padding: 20,
        paddingBottom: 0,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statNumber: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
        textAlign: 'center',
    },
    appInfo: {
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    appVersion: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
        marginBottom: 8,
    },
    appDescription: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#9ca3af',
        textAlign: 'center',
        maxWidth: 250,
    },
})