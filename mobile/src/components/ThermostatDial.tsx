import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';

interface ThermostatDialProps {
    size?: number;
    initialTemp?: number;
    minTemp?: number;
    maxTemp?: number;
    status: 'Heating' | 'Cooling' | 'Eco' | 'Off';
}

export const ThermostatDial: React.FC<ThermostatDialProps> = ({
    size = 280,
    initialTemp = 22,
    minTemp = 16,
    maxTemp = 32,
    status = 'Heating',
}) => {
    const [temp, setTemp] = useState(initialTemp);
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    // PanResponder - Termostatni chindan ham aylantirish (draging) uchun
    const currentTempRef = useRef(initialTemp);

    // Pan Responder: Tepaga/Pastga surish orqali temp ni o'zgartiramiz
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                currentTempRef.current = temp;
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
            onPanResponderMove: (evt, gestureState) => {
                // dy => vertikal harakat
                const dy = gestureState.dy;
                // Har 8 piksel surish 1 gradusni anglatadi (xohishga qarab)
                const tempChange = Math.round(-dy / 8);
                let newTemp = currentTempRef.current + tempChange;

                if (newTemp > maxTemp) newTemp = maxTemp;
                if (newTemp < minTemp) newTemp = minTemp;

                if (newTemp !== temp) {
                    setTemp(newTemp);
                }
            },
            onPanResponderRelease: () => {
                currentTempRef.current = temp;
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // Shu joyda keyinchalik Backend API ga "Update Temp" yuboriladi
            }
        })
    ).current;

    // Yengil haptic har gradus o'zgarganda (juda yoqimli effekt beradi)
    useEffect(() => {
        if (temp !== initialTemp) {
            Haptics.selectionAsync();
        }
    }, [temp]);

    const progress = (temp - minTemp) / (maxTemp - minTemp);
    const dashoffset = circumference - progress * circumference * 0.75;

    const getStatusColor = () => {
        switch (status) {
            case 'Heating': return theme.accentWarm;
            case 'Cooling': return theme.accentCool;
            case 'Eco': return theme.ecoGreen;
            default: return theme.textSecondary;
        }
    };

    return (
        <View style={[styles.container, { width: size, height: size }]} {...panResponder.panHandlers}>
            {/* Neumorphic Shadow Orqa Fon */}
            <View style={[
                styles.outerRing,
                {
                    width: size, height: size, borderRadius: size / 2,
                    backgroundColor: theme.background,
                    shadowColor: theme.shadowLight,
                    shadowOffset: { width: -10, height: -10 },
                    shadowOpacity: 1, shadowRadius: 15, elevation: 5,
                }
            ]}>
                <View style={[
                    StyleSheet.absoluteFillObject,
                    {
                        borderRadius: size / 2, backgroundColor: theme.background,
                        shadowColor: theme.shadowDark, shadowOffset: { width: 10, height: 10 },
                        shadowOpacity: 0.5, shadowRadius: 15, elevation: 10,
                    }
                ]} />
            </View>

            {/* SVG Doira (Circle) */}
            <View style={StyleSheet.absoluteFill}>
                <Svg width={size} height={size}>
                    {/* Background Track */}
                    <Circle
                        cx={center} cy={center} r={radius} stroke={theme.border}
                        strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={circumference * 0.25}
                        origin={`${center}, ${center}`} rotation="135"
                    />
                    {/* Active Track */}
                    <Circle
                        cx={center} cy={center} r={radius} stroke={getStatusColor()}
                        strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={dashoffset}
                        origin={`${center}, ${center}`} rotation="135"
                    />
                </Svg>
            </View>

            {/* O'rta Text (Gradus va status) */}
            <View style={styles.centerTextContainer}>
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                    {status.toUpperCase()}
                </Text>
                <Text style={[styles.tempText, { color: theme.textPrimary }]}>
                    {temp}°
                </Text>
                <Text style={[styles.unitText, { color: theme.textSecondary }]}>
                    Living Room
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center' },
    outerRing: { position: 'absolute' },
    centerTextContainer: { alignItems: 'center', justifyContent: 'center' },
    statusText: { fontSize: 13, fontWeight: '600', letterSpacing: 2, marginBottom: 5 },
    tempText: { fontSize: 68, fontWeight: '300' },
    unitText: { fontSize: 14, marginTop: 5 },
});
