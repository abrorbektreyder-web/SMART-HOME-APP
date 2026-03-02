import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';
import { NeumorphicView } from '../src/components/NeumorphicView';

export default function RoomsScreen() {
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];
    const router = useRouter();

    const goBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const rooms = [
        { id: 1, name: 'Asosiy Mehmonxona', emoji: '🛋️', count: 3 },
        { id: 2, name: 'Oshxona', emoji: '🍳', count: 2 },
        { id: 3, name: 'Yotoqxona', emoji: '🛏️', count: 4 },
        { id: 4, name: 'Bolalar xonasi', emoji: '🧸', count: 1 },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backBtn}>
                    <Text style={[styles.backText, { color: theme.primary }]}>← Ortga qaytish</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Mening Xonalarim</Text>
            </View>

            <ScrollView contentContainerStyle={styles.grid}>
                {rooms.map((room) => (
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
                                <Text style={[styles.deviceCount, { color: theme.primary }]}>
                                    {room.count} ta datchik →
                                </Text>
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
        paddingTop: 60,
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
    deviceCount: {
        fontSize: 14,
        fontWeight: '500',
    }
});
