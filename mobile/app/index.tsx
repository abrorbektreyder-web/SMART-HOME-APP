import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThermostatDial } from '../src/components/ThermostatDial';
import { DeviceButton } from '../src/components/DeviceButton';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';
import { Ionicons } from '@expo/vector-icons';

const translations = {
    uz: {
        livingRoom: 'Mehmonxona',
        climate: 'Iqlim',
        heating: 'ISITISH',
        intHumidity: 'Ichki namlik',
        extTemp: 'Tashqi harorat',
        mode: 'Rejim',
        fan: 'Parrak',
        timer: 'Taymer',
        data: "Ma'lumot"
    },
    ru: {
        livingRoom: 'Гостиная',
        climate: 'Климат',
        heating: 'НАГРЕВ',
        intHumidity: 'Влажность',
        extTemp: 'Улич. темп.',
        mode: 'Режим',
        fan: 'Вент.',
        timer: 'Таймер',
        data: 'Данные'
    }
};

export default function HomeScreen() {
    const router = useRouter();
    const themeMode = useAppStore((state: any) => state.theme);
    const language = useAppStore((state: any) => state.language);
    const toggleTheme = useAppStore((state: any) => state.toggleTheme);
    const setLanguage = useAppStore((state: any) => state.setLanguage);

    const theme = colors[themeMode as 'light' | 'dark'];
    const t = translations[language as 'uz' | 'ru'];

    const handleMicPress = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const navToRooms = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/rooms');
    };

    const handleToggleTheme = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleTheme();
    };

    const handleToggleLanguage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setLanguage(language === 'uz' ? 'ru' : 'uz');
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Top Header - Aura Premium Look */}
            <View style={styles.header}>
                <TouchableOpacity onPress={navToRooms} activeOpacity={0.7} style={styles.menuButton}>
                    <Ionicons name="grid-outline" size={24} color={theme.textPrimary} />
                </TouchableOpacity>

                <View style={styles.headerTexts}>
                    <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>{t.livingRoom}</Text>
                    <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>{t.climate}</Text>
                </View>

                {/* Theme and Lang Toggles */}
                <View style={styles.rightActions}>
                    <TouchableOpacity onPress={handleToggleLanguage} style={styles.actionBtn}>
                        <Text style={{ color: theme.textPrimary, fontWeight: '700', fontSize: 13 }}>{language.toUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToggleTheme} style={styles.actionBtn}>
                        <Ionicons
                            name={themeMode === 'dark' ? 'moon' : 'sunny-outline'}
                            size={24}
                            color={theme.textPrimary}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Asosiy Konditsioner Dial */}
                <View style={styles.centerCard}>
                    <ThermostatDial
                        size={320}
                        status="Heating"
                        initialTemp={22}
                        statusText={t.heating}
                        roomText={t.livingRoom}
                    />
                </View>

                {/* Info Cards (Humidity & Temp) */}
                <View style={styles.infoRow}>
                    <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
                        <Ionicons name="water-outline" size={24} color={theme.accentWarm} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{ fontSize: 13, color: theme.textSecondary, fontWeight: '500' }}>{t.intHumidity}</Text>
                            <Text style={{ fontSize: 18, color: theme.textPrimary, fontWeight: '700' }}>42%</Text>
                        </View>
                    </View>
                    <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
                        <Ionicons name="thermometer-outline" size={24} color={theme.accentWarm} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{ fontSize: 13, color: theme.textSecondary, fontWeight: '500' }}>{t.extTemp}</Text>
                            <Text style={{ fontSize: 18, color: theme.textPrimary, fontWeight: '700' }}>14°C</Text>
                        </View>
                    </View>
                </View>

                {/* 4 dumaloq kontrollerlar */}
                <View style={styles.devicesRow}>
                    <DeviceButton icon="options-outline" name={t.mode} isActive={true} />
                    <DeviceButton icon="snow-outline" name={t.fan} />
                    <DeviceButton icon="timer-outline" name={t.timer} />
                    <DeviceButton icon="stats-chart-outline" name={t.data} />
                </View>

            </ScrollView>

            {/* Premium Qizil Mikrafon - Aynan rasmga o'xshash Cutout/Shadow usulida */}
            <View style={styles.micContainer}>
                <TouchableOpacity
                    onPress={handleMicPress}
                    activeOpacity={0.8}
                    style={[
                        styles.micButton,
                        { backgroundColor: theme.primary, shadowColor: theme.primary }
                    ]}
                >
                    <Ionicons name="mic" size={28} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 65,
        paddingBottom: 25,
    },
    menuButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTexts: {
        alignItems: 'center',
    },
    headerSubtitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(0,0,0,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120, // Mikrafon o'rniga zapas
    },
    centerCard: {
        alignItems: 'center',
        marginVertical: 40,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        gap: 15,
    },
    infoCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
    },
    devicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    micContainer: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    micButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    }
});
