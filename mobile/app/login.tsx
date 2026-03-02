import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

export default function LoginScreen() {
    const router = useRouter();
    const login = useAppStore((state: any) => state.login);
    const themeMode = useAppStore((state: any) => state.theme);
    const language = useAppStore((state: any) => state.language);
    const theme = colors[themeMode as 'light' | 'dark'];

    const [step, setStep] = useState<1 | 2>(1);
    const [phone, setPhone] = useState('+998 ');
    const [code, setCode] = useState('');

    const t = {
        uz: {
            title: 'HOYR',
            subtitle: 'SMART HOME',
            welcome: 'Xush kelibsiz',
            desc: "Telefon raqamingizni kiriting va ulaning",
            phoneLabel: 'Telefon raqam',
            next: 'Davom etish',
            codeLabel: 'SMS kod',
            codeDesc: "Raqamga sms kod yuborildi",
            verify: 'Tasdiqlash',
        },
        ru: {
            title: 'HOYR',
            subtitle: 'SMART HOME',
            welcome: 'Добро пожаловать',
            desc: "Введите номер телефона для входа",
            phoneLabel: 'Номер телефона',
            next: 'Продолжить',
            codeLabel: 'СМС код',
            codeDesc: "Смс код был отправлен на номер",
            verify: 'Подтвердить',
        }
    }[language as 'uz' | 'ru'];

    const handleNext = () => {
        if (phone.length > 8) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setStep(2);
        }
    };

    const handleVerify = () => {
        if (code.length === 4) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // API call will be here, for now mock login
            login(phone, 'mock_token_123');
            router.replace('/');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={[styles.iconWrapper, { backgroundColor: theme.surface, shadowColor: theme.shadowLight }]}>
                        <View style={[StyleSheet.absoluteFillObject, { borderRadius: 50, shadowColor: theme.shadowDark, shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.8, shadowRadius: 20 }]} />
                        <Ionicons name="home" size={40} color={theme.primary} />
                    </View>
                    <Text style={[styles.title, { color: theme.textPrimary }]}>{t.title}</Text>
                    <Text style={[styles.subtitle, { color: theme.primary }]}>{t.subtitle}</Text>
                </View>

                {/* Content Section */}
                <View style={styles.formContainer}>
                    <Text style={[styles.welcome, { color: theme.textPrimary }]}>{t.welcome}</Text>
                    <Text style={[styles.desc, { color: theme.textSecondary }]}>{step === 1 ? t.desc : t.codeDesc}</Text>

                    {step === 1 ? (
                        <>
                            {/* Input Neumorphic Container */}
                            <Text style={[styles.label, { color: theme.textSecondary }]}>{t.phoneLabel}</Text>
                            <View style={[styles.inputContainer, { backgroundColor: theme.background }]}>
                                <View style={[styles.innerShadow, { backgroundColor: 'transparent' }]} pointerEvents="none" />
                                <TextInput
                                    style={[styles.input, { color: theme.textPrimary }]}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    placeholder="+998"
                                    placeholderTextColor={theme.textSecondary}
                                />
                                <Ionicons name="call-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                            </View>

                            <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={[styles.button, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
                                <Text style={styles.buttonText}>{t.next}</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>{t.codeLabel}</Text>
                            <View style={[styles.inputContainer, { backgroundColor: theme.background }]}>
                                <View style={[styles.innerShadow, { backgroundColor: 'transparent' }]} pointerEvents="none" />
                                <TextInput
                                    style={[styles.input, { color: theme.textPrimary, letterSpacing: 10, textAlign: 'center' }]}
                                    value={code}
                                    onChangeText={setCode}
                                    keyboardType="number-pad"
                                    placeholder="0000"
                                    placeholderTextColor={theme.textSecondary}
                                    maxLength={4}
                                />
                            </View>

                            <TouchableOpacity onPress={handleVerify} activeOpacity={0.8} style={[styles.button, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
                                <Text style={styles.buttonText}>{t.verify}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 20, alignItems: 'center' }}>
                                <Text style={{ color: theme.textSecondary }}>Ortga</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    iconWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 10,
        shadowOffset: { width: -10, height: -10 },
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 4,
    },
    formContainer: {
        width: '100%',
    },
    welcome: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    desc: {
        fontSize: 14,
        marginBottom: 40,
        lineHeight: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    inputContainer: {
        height: 60,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 4 }, // pseudo inset concept using border
    },
    innerShadow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        opacity: 0.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    inputIcon: {
        marginLeft: 10,
    },
    button: {
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    }
});
