import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThermostatDial } from '../src/components/ThermostatDial';
import { DeviceButton } from '../src/components/DeviceButton';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';

const translations = {
    uz: {
        livingRoom: 'Mehmonxona',
        climate: 'Iqlim',
        heating: 'ISITISH',
        intHumidity: 'Ichki namlik',
        extTemp: 'Tashqi harorat',
        family: 'Oilaviy',
        devicesTitle: 'Qurilmalar',
        offline: 'Oflayn',
    },
    ru: {
        livingRoom: 'Гостиная',
        climate: 'Климат',
        heating: 'НАГРЕВ',
        intHumidity: 'Влажность',
        extTemp: 'Улич. темп.',
        family: 'Семья',
        devicesTitle: 'Устройства',
        offline: 'Офлайн',
    }
};

export default function HomeScreen() {
    const router = useRouter();
    const themeMode = useAppStore((state: any) => state.theme);
    const language = useAppStore((state: any) => state.language);
    const toggleTheme = useAppStore((state: any) => state.toggleTheme);
    const setLanguage = useAppStore((state: any) => state.setLanguage);

    // WebSockets va Qurilmalar holati
    const initSocket = useAppStore((state: any) => state.initSocket);
    const devices = useAppStore((state: any) => state.devices);
    const sendDeviceCommand = useAppStore((state: any) => state.sendDeviceCommand);

    const [familyMembers, setFamilyMembers] = React.useState([
        { avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', online: true },
        { avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', online: true },
        { avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d', online: false },
    ]);
    const [isListening, setIsListening] = React.useState(false);

    React.useEffect(() => {
        initSocket();
    }, []);

    const theme = colors[themeMode as 'light' | 'dark'];
    const t = translations[language as 'uz' | 'ru'];

    const handleAddFamilyMember = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert(language === 'uz' ? "Rasm yuklash uchun ruxsat kerak!" : "Требуется разрешение на фото!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setFamilyMembers([
                ...familyMembers,
                { avatar: result.assets[0].uri, online: true }
            ]);
        }
    };

    // Ovozli buyruqlarni tahlil qilish (umumiy funksiya — web va native uchun)
    const processVoiceCommand = (transcript: string) => {
        const text = transcript.toLowerCase();
        console.log('Eshitdim:', text);

        if (text.includes('chiroq') || text.includes('свет') || text.includes('oshxona')) {
            if (text.includes('yoq') || text.includes('включ')) {
                sendDeviceCommand('tuya_light_1', { turnOn: true });
            } else if (text.includes("o'chir") || text.includes('o’chir') || text.includes('ochir') || text.includes('выключ')) {
                sendDeviceCommand('tuya_light_1', { turnOn: false });
            } else {
                const light = devices['tuya_light_1'];
                if (light) sendDeviceCommand('tuya_light_1', { turnOn: !light.isOn });
            }
        } else if (text.includes('muzlatkich') || text.includes('muzlatgich') || text.includes('холодильник')) {
            if (text.includes('yoq') || text.includes('включ')) {
                sendDeviceCommand('tuya_plug_1', { turnOn: true });
            } else if (text.includes("o'chir") || text.includes('o’chir') || text.includes('ochir') || text.includes('выключ')) {
                sendDeviceCommand('tuya_plug_1', { turnOn: false });
            } else {
                const plug = devices['tuya_plug_1'];
                if (plug) sendDeviceCommand('tuya_plug_1', { turnOn: !plug.isOn });
            }
        }
    };

    // Native Speech Recognition event hooks (expo-speech-recognition)
    useSpeechRecognitionEvent('start', () => setIsListening(true));
    useSpeechRecognitionEvent('end', () => setIsListening(false));
    useSpeechRecognitionEvent('result', (event: any) => {
        if (event.results && event.results[0]?.transcript) {
            processVoiceCommand(event.results[0].transcript);
        }
    });
    useSpeechRecognitionEvent('error', (event: any) => {
        console.error('Speech error:', event.error);
        setIsListening(false);
    });

    const handleMicPress = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        if (isListening) {
            // Agar allaqachon eshitayotgan bo'lsa — to'xtatish
            if (Platform.OS !== 'web') {
                ExpoSpeechRecognitionModule.stop();
            }
            setIsListening(false);
            return;
        }

        if (Platform.OS === 'web') {
            // Web uchun eskicha Web Speech API
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = language === 'uz' ? 'uz-UZ' : 'ru-RU';
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.onstart = () => setIsListening(true);
                recognition.onresult = (event: any) => {
                    processVoiceCommand(event.results[0][0].transcript);
                    setIsListening(false);
                };
                recognition.onerror = () => setIsListening(false);
                recognition.onend = () => setIsListening(false);
                recognition.start();
            } else {
                alert(t.offline);
            }
        } else {
            // Native Android/iOS uchun expo-speech-recognition
            const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
            if (!result.granted) {
                alert(language === 'uz' ? 'Mikrofon va ovoz tanish uchun ruxsat bering!' : 'Дайте разрешение на микрофон!');
                return;
            }
            ExpoSpeechRecognitionModule.start({
                lang: language === 'uz' ? 'uz-UZ' : 'ru-RU',
                interimResults: false,
                continuous: false,
            });
        }
    };

    const navToRooms = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/rooms');
    };

    const handleToggleTheme = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleTheme();
    };

    const handleToggleLanguage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setLanguage(language === 'uz' ? 'ru' : 'uz');
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Top Header - Aura Premium Look */}
            <View style={styles.header}>
                <TouchableOpacity onPress={navToRooms} activeOpacity={0.7} style={styles.menuButton}>
                    <Ionicons name="grid-outline" size={24} color={theme.textPrimary} />
                </TouchableOpacity>

                <View style={styles.headerTexts}>
                    <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>{t.livingRoom}</Text>
                    <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>{t.climate}</Text>
                </View>

                {/* Theme and Lang Toggles */}
                <View style={styles.rightActions}>
                    <TouchableOpacity onPress={handleToggleLanguage} style={styles.actionBtn}>
                        <Text style={{ color: theme.textPrimary, fontWeight: '700', fontSize: 13 }}>{language.toUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToggleTheme} style={styles.actionBtn}>
                        <Ionicons
                            name={themeMode === 'dark' ? 'moon' : 'sunny-outline'}
                            size={24}
                            color={theme.textPrimary}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Family Section */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.family}</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.familyRow}>
                    {familyMembers.map((member, index) => (
                        <View key={index} style={styles.avatarContainer}>
                            <Image source={{ uri: member.avatar }} style={styles.avatar} />
                            <View style={[styles.onlineDot, { backgroundColor: member.online ? theme.ecoGreen : theme.textSecondary }]} />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddFamilyMember} activeOpacity={0.7} style={[styles.avatarAdd, { borderColor: theme.textSecondary }]}>
                        <Ionicons name="add" size={24} color={theme.textSecondary} />
                    </TouchableOpacity>
                </ScrollView>

                {/* Asosiy Konditsioner Dial */}
                <View style={styles.centerCard}>
                    <ThermostatDial
                        size={320}
                        status="Heating"
                        initialTemp={devices['tuya_climate_1']?.settings?.temp || 22}
                        statusText={devices['tuya_climate_1'] ? t.heating : t.offline}
                        roomText={t.livingRoom}
                        onTempChange={(temp: number) => {
                            sendDeviceCommand('tuya_climate_1', { temp });
                        }}
                    />
                </View>

                {/* Info Cards (Humidity & Temp) */}
                <View style={[styles.infoRow, { alignItems: 'stretch' }]}>
                    <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
                        <Ionicons name="water" size={28} color="#00B4DB" />
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 10, color: theme.textSecondary, fontWeight: '700', textTransform: 'uppercase', lineHeight: 14 }} numberOfLines={2}>
                                {t.intHumidity}
                            </Text>
                            <Text style={{ fontSize: 24, color: theme.textPrimary, fontWeight: '800', marginTop: 2 }}>42%</Text>
                        </View>
                    </View>
                    <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
                        <Ionicons name="partly-sunny" size={28} color="#f2a65a" />
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 10, color: theme.textSecondary, fontWeight: '700', textTransform: 'uppercase', lineHeight: 14 }} numberOfLines={2}>
                                {t.extTemp}
                            </Text>
                            <Text style={{ fontSize: 24, color: theme.textPrimary, fontWeight: '800', marginTop: 2 }}>14°C</Text>
                        </View>
                    </View>
                </View>

                {/* Haqiqiy Qurilmalar Boshqaruvi */}
                <View style={[styles.sectionHeader, { marginTop: 10 }]}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{t.devicesTitle}</Text>
                </View>
                <View style={styles.devicesList}>
                    {Object.values(devices)
                        .filter((d: any) => d.type !== 'CLIMATE') // Termostat tepadagisi, bu erda faqat chiroq/rozetka
                        .map((device: any) => (
                            <TouchableOpacity
                                key={device.id}
                                activeOpacity={0.7}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    sendDeviceCommand(device.id, { turnOn: !device.isOn });
                                }}
                                style={[
                                    styles.deviceItem,
                                    { backgroundColor: theme.surface },
                                    device.isOn && { borderColor: theme.primary, borderWidth: 1 }
                                ]}
                            >
                                <View style={[styles.deviceIconBg, { backgroundColor: device.isOn ? theme.primary + '20' : theme.background }]}>
                                    <Ionicons
                                        name={device.type === 'LIGHT' ? 'bulb' : 'power'}
                                        size={24}
                                        color={device.isOn ? theme.primary : theme.textSecondary}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.deviceName, { color: theme.textPrimary }]}>{device.name}</Text>
                                    <Text style={{ color: device.isOn ? theme.ecoGreen : theme.textSecondary, fontSize: 13, fontWeight: '600' }}>
                                        {device.isOn ? 'ON' : 'OFF'}
                                    </Text>
                                </View>
                                <View style={[styles.toggleSwitch, { backgroundColor: device.isOn ? theme.primary : theme.background }]}>
                                    <View style={[styles.toggleKnob, device.isOn ? { transform: [{ translateX: 20 }] } : null]} />
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>

            </ScrollView>

            {/* Premium Qizil Mikrafon - Aynan rasmga o'xshash Cutout/Shadow usulida */}
            <View style={styles.micContainer}>
                <TouchableOpacity
                    onPress={handleMicPress}
                    activeOpacity={0.8}
                    style={[
                        styles.micButton,
                        {
                            backgroundColor: isListening ? theme.ecoGreen : theme.primary,
                            shadowColor: isListening ? theme.ecoGreen : theme.primary,
                            transform: [{ scale: isListening ? 1.1 : 1 }]
                        }
                    ]}
                >
                    <Ionicons name={isListening ? "mic" : "mic-outline"} size={28} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 30, // Kamaytirilgan bo'shliq
        paddingBottom: 25,
    },
    menuButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTexts: {
        alignItems: 'center',
    },
    headerSubtitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(0,0,0,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120, // Mikrafon o'rniga zapas
    },
    centerCard: {
        alignItems: 'center',
        marginVertical: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 10,  // biroz kamroq bo'sh joy qoldirdim
    },
    infoCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 22,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    },
    sectionHeader: {
        marginBottom: 15,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    familyRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 10,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    onlineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        position: 'absolute',
        bottom: 2,
        right: 2,
        borderWidth: 2,
        borderColor: '#1e1e24',
    },
    avatarAdd: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    devicesList: {
        gap: 15,
    },
    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    deviceIconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    deviceName: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
    },
    toggleSwitch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        padding: 3,
        justifyContent: 'center',
    },
    toggleKnob: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    micContainer: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    micButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    }
});
