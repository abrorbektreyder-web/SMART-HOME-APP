import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { NeumorphicView } from '../src/components/NeumorphicView';
import { ThermostatDial } from '../src/components/ThermostatDial';
import { DeviceButton } from '../src/components/DeviceButton';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
    const router = useRouter();
    const themeMode = useAppStore((state: any) => state.theme);
    const toggleTheme = useAppStore((state: any) => state.toggleTheme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const handleMicPress = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Ovozli boshqaruv effekti
    };

    const navToRooms = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/rooms');
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Header qismi */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Text style={[styles.title, { color: theme.textPrimary }]}>HOYR Home</Text>
                    <TouchableOpacity onPress={navToRooms} style={styles.navLink}>
                        <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Xonalarga o'tish →</Text>
                    </TouchableOpacity>
                </View>

                {/* Theme Switcher Button */}
                <TouchableOpacity onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    toggleTheme();
                }}>
                    <NeumorphicView size={48} radius={24}>
                        <Text style={{ fontSize: 20 }}>{themeMode === 'light' ? '🌙' : '☀️'}</Text>
                    </NeumorphicView>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Asosiy konditsioner / thermostat (ENDI ISHLAYDI: DRAG QILING) */}
                <View style={styles.centerCard}>
                    <ThermostatDial
                        size={300}
                        status="Heating"
                        initialTemp={22}
                    />
                </View>

                <Text style={{ fontSize: 18, color: theme.textPrimary, fontWeight: 'bold', marginBottom: 15 }}>Tezkor qurilmalar</Text>

                {/* Horizontal Scroll - Qurilmalar sig'may qolsa bemalol surish (scroll) mumkin */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
                    <DeviceButton icon="💡" name="Chiroqlar" />
                    <DeviceButton icon="🔌" name="Rozetkalar" isActive={true} />
                    <DeviceButton icon="🎥" name="Kameralar" />
                    <DeviceButton icon="❄️" name="Konditsioner" />
                    <DeviceButton icon="📺" name="Televizor" />
                </ScrollView>
            </ScrollView>

            {/* Pastki markaziy Premium qizil mikrafon */}
            <View style={styles.micContainer}>
                <TouchableOpacity
                    onPress={handleMicPress}
                    activeOpacity={0.8}
                    style={[
                        styles.micButton,
                        { backgroundColor: theme.primary, shadowColor: theme.primary }
                    ]}
                >
                    <Text style={{ fontSize: 36, color: 'white' }}>🎙️</Text>
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
        paddingTop: 60,
        paddingBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120, // Mikrafon qisib qolmasligi uchun pastida joy
    },
    userInfo: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    navLink: {
        marginTop: 5,
        paddingVertical: 5,
    },
    centerCard: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 10,
    },
    horizontalRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        gap: 15,
    },
    micContainer: {
        position: 'absolute',
        bottom: 30, // Pastdan biroz balandroq
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    micButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    }
});
