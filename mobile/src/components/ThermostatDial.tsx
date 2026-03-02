import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, PanResponder, TouchableOpacity } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface ThermostatDialProps {
    size?: number;
    initialTemp?: number;
    minTemp?: number;
    maxTemp?: number;
    status: 'Heating' | 'Cooling' | 'Eco' | 'Off';
    statusText: string;
    roomText: string;
    onTempChange?: (temp: number) => void;
}

export const ThermostatDial: React.FC<ThermostatDialProps> = ({
    size = 260,
    initialTemp = 22,
    minTemp = 16,
    maxTemp = 32,
    status = 'Heating',
    statusText,
    roomText,
    onTempChange,
}) => {
    const [temp, setTemp] = useState(initialTemp);
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2 - 20; // 20px padding inside neumorphism
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    const currentTempRef = useRef(initialTemp);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3,
            onPanResponderGrant: (evt) => {
                currentTempRef.current = temp;
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
            onPanResponderMove: (evt, gestureState) => {
                const dx = gestureState.dx;
                const dy = gestureState.dy;
                const moveDist = dx - dy;

                const tempChange = Math.round(moveDist / 30); // Maximum smoothness 30 multiplier!
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
                if (onTempChange) {
                    onTempChange(temp);
                }
            }
        })
    ).current;

    const handleButtonPress = (change: number) => {
        let newTemp = temp + change;
        if (newTemp > maxTemp) newTemp = maxTemp;
        if (newTemp < minTemp) newTemp = minTemp;

        if (newTemp !== temp) {
            setTemp(newTemp);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (onTempChange) {
                onTempChange(newTemp);
            }
        }
    };

    useEffect(() => {
        if (temp !== initialTemp) {
            Haptics.selectionAsync();
        }
    }, [temp]);

    // Open Arc (75% circle length)
    const arcLength = 0.75;
    const progress = (temp - minTemp) / (maxTemp - minTemp);
    const dashoffset = circumference - progress * (circumference * arcLength);

    return (
        <View style={[styles.container, { width: size, height: size }]} {...panResponder.panHandlers}>
            {/* Neumorphic Shadow Outer Background - Matches Aura strictly */}
            <View style={[
                styles.outerRing,
                {
                    width: size, height: size, borderRadius: size / 2,
                    backgroundColor: theme.surface,
                    shadowColor: theme.shadowLight,
                    shadowOffset: { width: -20, height: -20 },
                    shadowOpacity: 1, shadowRadius: 40, elevation: 5,
                }
            ]}>
                <View style={[
                    StyleSheet.absoluteFillObject,
                    {
                        borderRadius: size / 2, backgroundColor: theme.surface,
                        shadowColor: theme.shadowDark, shadowOffset: { width: 20, height: 20 },
                        shadowOpacity: 0.8, shadowRadius: 40, elevation: 10,
                    }
                ]} />
            </View>

            {/* SVG Arc Progress */}
            <View style={StyleSheet.absoluteFill}>
                <Svg width={size} height={size}>
                    <Defs>
                        <SvgLinearGradient id="heatingGrad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor={theme.accentWarm} />
                            <Stop offset="1" stopColor={theme.primary} />
                        </SvgLinearGradient>
                    </Defs>
                    {/* Background Track Arc */}
                    <Circle
                        cx={center} cy={center} r={radius} stroke={theme.border}
                        strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={circumference * (1 - arcLength)}
                        origin={`${center}, ${center}`} rotation="135"
                    />
                    {/* Active Gradient Track */}
                    <Circle
                        cx={center} cy={center} r={radius} stroke="url(#heatingGrad)"
                        strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={dashoffset}
                        origin={`${center}, ${center}`} rotation="135"
                    />
                </Svg>
            </View>

            {/* Inside Values */}
            <View style={styles.centerTextContainer}>
                <Text style={[styles.statusText, { color: theme.primary }]}>
                    {statusText.toUpperCase()}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => handleButtonPress(-1)} activeOpacity={0.6} hitSlop={20}>
                        <Ionicons name="remove-circle-outline" size={32} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <Text style={[styles.tempText, { color: theme.textPrimary, marginHorizontal: 15 }]}>
                        {temp}°
                    </Text>

                    <TouchableOpacity onPress={() => handleButtonPress(1)} activeOpacity={0.6} hitSlop={20}>
                        <Ionicons name="add-circle-outline" size={32} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.unitText, { color: theme.textSecondary }]}>
                    {roomText}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center' },
    outerRing: { position: 'absolute' },
    centerTextContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    statusText: { fontSize: 13, fontWeight: '700', letterSpacing: 2, marginBottom: 5 },
    tempText: { fontSize: 72, fontWeight: '400' },
    unitText: { fontSize: 14, fontWeight: '500', marginTop: 5 },
});
