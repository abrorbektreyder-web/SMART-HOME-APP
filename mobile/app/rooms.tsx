import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';
import { NeumorphicView } from '../src/components/NeumorphicView';
import { Ionicons } from '@expo/vector-icons';

const translations = {
    uz: {
        back: '← Ortga',
        myRooms: 'Mening Xonalarim',
        sensors: 'ta datchik',
        roomsInfo: [
            { id: 1, name: 'Asosiy Mehmonxona', emoji: '🛋️', count: 3 },
            { id: 2, name: 'Oshxona', emoji: '🍳', count: 2 },
            { id: 3, name: 'Yotoqxona', emoji: '🛏️', count: 4 },
            { id: 4, name: 'Bolalar xonasi', emoji: '🧸', count: 1 },
        ]
    },
    ru: {
        back: '← Назад',
        myRooms: 'Мои комнаты',
        sensors: 'датчиков',
        roomsInfo: [
            { id: 1, name: 'Главная Гостиная', emoji: '🛋️', count: 3 },
            { id: 2, name: 'Кухня', emoji: '🍳', count: 2 },
            { id: 3, name: 'Спальня', emoji: '🛏️', count: 4 },
            { id: 4, name: 'Детская', emoji: '🧸', count: 1 },
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
                        style={styles.roomWrapper}
                        onPress={() => Haptics.selectionAsync()}
                        activeOpacity={0.8}
                    >
                        <NeumorphicView size={'100%'} style={{ minHeight: 140 }} radius={24}>
                            <View style={styles.cardContent}>
                                <Text style={styles.emoji}>{room.emoji}</Text>
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
                        </NeumorphicView>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingTop: 65,
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
        gap: 20,
    },
    roomWrapper: {
        width: '100%',
        minHeight: 140,
        marginTop: 10,
    },
    cardContent: {
        padding: 24,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 36,
        marginBottom: 10,
    },
    roomName: {
        fontSize: 22,
        fontWeight: '600',
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
