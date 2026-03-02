import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NeumorphicView } from '../components/NeumorphicView';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';

// Example Home Screen for testing UI
export default function HomeScreen() {
    const themeMode = useAppStore(state => state.theme);
    const toggleTheme = useAppStore(state => state.toggleTheme);
    const theme = colors[themeMode];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.textPrimary }]}>HOYR Home</Text>
                <TouchableOpacity onPress={toggleTheme}>
                    <NeumorphicView size={48} radius={24}>
                        <Text style={{ fontSize: 20 }}>{themeMode === 'light' ? '🌙' : '☀️'}</Text>
                    </NeumorphicView>
                </TouchableOpacity>
            </View>

            <View style={styles.centerCard}>
                <NeumorphicView style={styles.dashboardCard} radius={32}>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Living Room</Text>
                    <Text style={[styles.info, { color: theme.textPrimary }]}>14°</Text>
                    <Text style={{ color: theme.primary, marginTop: 10, fontWeight: 'bold' }}>Status: Active</Text>
                </NeumorphicView>
            </View>

            <View style={styles.row}>
                <NeumorphicView size={80} radius={40} type="pressed">
                    <Text style={{ fontSize: 32 }}>💡</Text>
                </NeumorphicView>

                <NeumorphicView size={80} radius={40}>
                    <Text style={{ fontSize: 32 }}>🔌</Text>
                </NeumorphicView>

                <NeumorphicView size={80} radius={40}>
                    <Text style={{ fontSize: 32 }}>🌡️</Text>
                </NeumorphicView>
            </View>

            {/* Mic Premium Button (Voice First) */}
            <View style={styles.micContainer}>
                <NeumorphicView size={90} radius={45} style={{ backgroundColor: theme.primary }}>
                    <Text style={{ fontSize: 36, color: 'white' }}>🎙️</Text>
                </NeumorphicView>
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
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    centerCard: {
        alignItems: 'center',
        marginBottom: 40,
    },
    dashboardCard: {
        padding: 30,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    info: {
        fontSize: 56,
        fontWeight: '300',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    micContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    }
});
