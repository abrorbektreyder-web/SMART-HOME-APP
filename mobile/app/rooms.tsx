import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

export default function RoomsScreen() {
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Xonalar (Rooms)</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Yaqinda qo'shiladi...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, paddingTop: 60, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: '700' },
    subtitle: { fontSize: 16, marginTop: 10 },
});
