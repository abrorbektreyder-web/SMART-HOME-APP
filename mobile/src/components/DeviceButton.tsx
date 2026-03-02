import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { NeumorphicView } from './NeumorphicView';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';

interface DeviceButtonProps {
    icon: string;
    name?: string;
    isActive?: boolean;
    onPress?: (state: boolean) => void;
}

export const DeviceButton: React.FC<DeviceButtonProps> = ({ icon, name, isActive = false, onPress }) => {
    const [active, setActive] = useState(isActive);
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const handlePress = () => {
        // 📳 Haptic Feedback (Vibratsiya) - Premium hissiyot uchin!
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const newState = !active;
        setActive(newState);
        if (onPress) onPress(newState);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <NeumorphicView
                size={80}
                radius={40}
                type={active ? 'pressed' : 'flat'}
                style={active ? { backgroundColor: theme.primaryGlow } : {}}
            >
                <Text style={{ fontSize: 32 }}>{icon}</Text>
            </NeumorphicView>
            {name && (
                <Text style={[styles.name, { color: active ? theme.primary : theme.textSecondary }]}>
                    {name}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    name: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
    }
});
