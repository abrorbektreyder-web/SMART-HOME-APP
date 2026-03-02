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
}

export const NeumorphicView: React.FC<NeumorphicViewProps> = ({
    style,
    children,
    size,
    radius = 24,
    type = 'flat',
    ...props
}) => {
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const baseStyle = {
        backgroundColor: theme.background,
        borderRadius: radius,
        width: size,
        height: size,
    };

    const shadowLight = {
        shadowColor: theme.shadowLight,
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    };

    const shadowDark = {
        shadowColor: theme.shadowDark,
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    };

    if (type === 'pressed') {
        // Inner shadow like effect is complex in standard RN, falling back to flat with darker background for pressed
        return (
            <View style={[styles.container, baseStyle, { backgroundColor: themeMode === 'light' ? '#E5E7EB' : '#1F2937' }, style]} {...props}>
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
