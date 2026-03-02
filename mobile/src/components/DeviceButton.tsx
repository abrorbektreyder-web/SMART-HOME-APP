import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { NeumorphicView } from './NeumorphicView';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface DeviceButtonProps {
    icon: any;
    name?: string;
    isActive?: boolean;
    onPress?: (state: boolean) => void;
}

export const DeviceButton: React.FC<DeviceButtonProps> = ({ icon, name, isActive = false, onPress }) => {
    const [active, setActive] = useState(isActive);
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const newState = !active;
        setActive(newState);
        if (onPress) onPress(newState);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1} style={styles.container}>
            <NeumorphicView
                size={56} // Aura UI is around 48px or 56px
                radius={28}
                type={active ? 'pressed' : 'flat'}
            >
                <Ionicons
                    name={icon as any}
                    size={24}
                    color={active ? '#ffffff' : theme.textSecondary}
                />
            </NeumorphicView>
            {name && (
                <Text style={[styles.name, { color: active ? theme.textPrimary : theme.textSecondary }]}>
                    {name}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    name: {
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 12,
    }
});
