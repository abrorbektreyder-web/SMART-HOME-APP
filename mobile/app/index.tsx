import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { NeumorphicView } from '../src/components/NeumorphicView';
import { ThermostatDial } from '../src/components/ThermostatDial';
import { DeviceButton } from '../src/components/DeviceButton';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

// Bosh qism (Dashboard datchiklari UI)
export default function HomeScreen() {
    const router = useRouter();
    const themeMode = useAppStore((state: any) => state.theme);
    const toggleTheme = useAppStore((state: any) => state.toggleTheme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const handleMicPress = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Masalan, ovozli asistentni ochish uchun logika
    };

    const navToRooms = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/rooms');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 1. Header & Theme Toggle */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Text style={[styles.title, { color: theme.textPrimary }]}>HOYR Home</Text>
                    <TouchableOpacity onPress={navToRooms} style={styles.navLink}>
                        <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Xonalarga o'tish →</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    toggleTheme();
                }}>
                    <NeumorphicView size={48} radius={24}>
                        <Text style={{ fontSize: 20 }}>{themeMode === 'light' ? '🌙' : '☀️'}</Text>
                    </NeumorphicView>
                </TouchableOpacity>
            </View>

            {/* 2. Thermostat Dial (Heating / Cooling UI) */}
            <View style={styles.centerCard}>
                <ThermostatDial
                    size={260}
                    initialTemp={22}
                    status="Heating"
                    onTempChange={() => Haptics.selectionAsync()}
                />
            </View>

            {/* 3. Device Quick Actions (Tugmalar ro'yxati) */}
            <View style={styles.row}>
                <DeviceButton icon="💡" name="Chiroqlar" />
                <DeviceButton icon="🔌" name="Rozetkalar" isActive={true} />
                <DeviceButton icon="🎥" name="Kameralar" />
            </View>

            {/* 4. Mic Premium Button (Voice First Falsafasi) */}
            <View style={styles.micContainer}>
                <TouchableOpacity onPress={handleMicPress} activeOpacity={0.8}>
                    <NeumorphicView size={90} radius={45} style={{ backgroundColor: theme.primary, shadowColor: theme.primary }}>
                        <Text style={{ fontSize: 36, color: 'white' }}>🎙️</Text>
                    </NeumorphicView>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
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
        marginBottom: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    micContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    }
});
