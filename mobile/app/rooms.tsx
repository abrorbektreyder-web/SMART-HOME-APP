import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';
import { Ionicons } from '@expo/vector-icons';

const translations = {
    uz: {
        back: '← Ortga',
        myRooms: 'Mening Xonalarim',
        sensors: 'ta datchik',
        roomsInfo: [
            { id: 1, name: 'Asosiy Mehmonxona', emoji: '🛋️', count: 3, icon: 'tv-outline' as const },
            { id: 2, name: 'Oshxona', emoji: '🍳', count: 2, icon: 'restaurant-outline' as const },
            { id: 3, name: 'Yotoqxona', emoji: '🛏️', count: 4, icon: 'bed-outline' as const },
            { id: 4, name: 'Bolalar xonasi', emoji: '🧸', count: 1, icon: 'game-controller-outline' as const },
        ]
    },
    ru: {
        back: '← Назад',
        myRooms: 'Мои комнаты',
        sensors: 'датчиков',
        roomsInfo: [
            { id: 1, name: 'Главная Гостиная', emoji: '🛋️', count: 3, icon: 'tv-outline' as const },
            { id: 2, name: 'Кухня', emoji: '🍳', count: 2, icon: 'restaurant-outline' as const },
            { id: 3, name: 'Спальня', emoji: '🛏️', count: 4, icon: 'bed-outline' as const },
            { id: 4, name: 'Детская', emoji: '🧸', count: 1, icon: 'game-controller-outline' as const },
        ]
    }
};

export default function RoomsScreen() {
    const themeMode = useAppStore((state: any) => state.theme);
    const language = useAppStore((state: any) => state.language);
    const theme = colors[themeMode as 'light' | 'dark'];
    const t = translations[language as 'uz' | 'ru'];

    const router = useRouter();

    const goBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backBtn}>
                    <Text style={[styles.backText, { color: theme.primary }]}>{t.back}</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.textPrimary }]}>{t.myRooms}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.grid}>
                {t.roomsInfo.map((room) => (
                    <TouchableOpacity
                        key={room.id}
                        style={[styles.roomCard, { backgroundColor: theme.surface }]}
                        onPress={() => Haptics.selectionAsync()}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: theme.primary + '15' }]}>
                            <Text style={styles.emoji}>{room.emoji}</Text>
                        </View>
                        <View style={styles.roomInfo}>
                            <Text style={[styles.roomName, { color: theme.textPrimary }]}>
                                {room.name}
                            </Text>
                            <View style={styles.countWrapper}>
                                <Text style={[styles.deviceCount, { color: theme.primary }]}>
                                    {room.count} {t.sensors}
                                </Text>
                                <Ionicons name="arrow-forward" size={16} color={theme.primary} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 20,
    },
    backBtn: {
        marginBottom: 15,
    },
    backText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    grid: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        gap: 16,
    },
    roomCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 22,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    emoji: {
        fontSize: 28,
    },
    roomInfo: {
        flex: 1,
    },
    roomName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
    },
    countWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    deviceCount: {
        fontSize: 14,
        fontWeight: '500',
    }
});

