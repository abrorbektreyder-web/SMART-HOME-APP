import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';

interface NeumorphicViewProps extends ViewProps {
    style?: ViewStyle | ViewStyle[];
    children?: React.ReactNode;
    size?: number | string;
    radius?: number;
    type?: 'flat' | 'pressed';
    bg?: string; // override background
}

export const NeumorphicView: React.FC<NeumorphicViewProps> = ({
    style,
    children,
    size,
    radius = 24,
    type = 'flat',
    bg,
    ...props
}) => {
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    // Aura specifically uses white surface for all floating objects
    const bgColor = bg || theme.surface;

    const baseStyle = {
        backgroundColor: bgColor,
        borderRadius: radius,
        width: size,
        height: size,
    };

    const shadowLight = {
        shadowColor: theme.shadowLight,
        shadowOffset: { width: -10, height: -10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    };

    const shadowDark = {
        shadowColor: theme.shadowDark,
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 10,
    };

    if (type === 'pressed') {
        return (
            <View style={[styles.container, baseStyle, {
                backgroundColor: theme.primary,
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
                elevation: 10
            }, style]} {...props}>
                {children}
            </View>
        );
    }

    return (
        <View style={[styles.container, baseStyle, shadowLight]}>
            <View style={[StyleSheet.absoluteFillObject, baseStyle, shadowDark]} />
            <View style={[styles.inner, baseStyle, style]} {...props}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }
});
