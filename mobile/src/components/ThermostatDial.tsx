import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';

interface ThermostatDialProps {
    size?: number;
    initialTemp?: number;
    minTemp?: number;
    maxTemp?: number;
    onTempChange?: (temp: number) => void;
    status: 'Heating' | 'Cooling' | 'Eco' | 'Off';
}

export const ThermostatDial: React.FC<ThermostatDialProps> = ({
    size = 280,
    initialTemp = 23,
    minTemp = 16,
    maxTemp = 32,
    onTempChange,
    status = 'Heating',
}) => {
    const [temp, setTemp] = useState(initialTemp);
    const themeMode = useAppStore((state: any) => state.theme);
    const theme = colors[themeMode as 'light' | 'dark'];

    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    // Calculate arch depending on temp
    const progress = (temp - minTemp) / (maxTemp - minTemp);
    const dashoffset = circumference - progress * circumference * 0.75; // 75% circle

    const getStatusColor = () => {
        switch (status) {
            case 'Heating': return theme.accentWarm;
            case 'Cooling': return theme.accentCool;
            case 'Eco': return theme.ecoGreen;
            default: return theme.textSecondary;
        }
    };

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* Neumorphic outer ring background */}
            <View style={[
                styles.outerRing,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: theme.background,
                    shadowColor: theme.shadowLight,
                    shadowOffset: { width: -10, height: -10 },
                    shadowOpacity: 1,
                    shadowRadius: 15,
                    elevation: 5,
                }
            ]}>
                <View style={[
                    StyleSheet.absoluteFillObject,
                    {
                        borderRadius: size / 2,
                        backgroundColor: theme.background,
                        shadowColor: theme.shadowDark,
                        shadowOffset: { width: 10, height: 10 },
                        shadowOpacity: 0.5,
                        shadowRadius: 15,
                        elevation: 10,
                    }
                ]} />
            </View>

            <View style={StyleSheet.absoluteFill}>
                <Svg width={size} height={size}>
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={theme.border}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * 0.25} // 25% gap at bottom
                        origin={`${center}, ${center}`}
                        rotation="135" // Start from bottom left
                    />
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={getStatusColor()}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        origin={`${center}, ${center}`}
                        rotation="135"
                    />
                </Svg>
            </View>

            {/* Central Temperature Display */}
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
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerRing: {
        position: 'absolute',
    },
    centerTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2,
        marginBottom: 5,
    },
    tempText: {
        fontSize: 64,
        fontWeight: '300',
    },
    unitText: {
        fontSize: 14,
        marginTop: 5,
    },
});
