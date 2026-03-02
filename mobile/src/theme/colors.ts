/**
 * Smart Home Premium UI Colors (Neumorphism & High Contrast)
 * Based on https://smart-home-mobile.aura.build/
 */
export const colors = {
    light: {
        background: '#F3F4F6', // Ochiq kulrang, soft UI foni
        surface: '#FFFFFF', // Neumorphism kartalar uchun oq
        primary: '#F43F5E', // Asosiy qizil/pushti aktiv elementlar uchun (Microfon, Aktiv chiroqlar)
        primaryGlow: 'rgba(244, 63, 94, 0.4)',
        textPrimary: '#111827', // To'q kulrang
        textSecondary: '#6B7280', // Ochiqroq matn
        accentWarm: '#F59E0B', // Issiq qismlar (termostat isitish) uchun olovrang
        accentCool: '#3B82F6', // Sovutish konditsioner uchun ko'k
        ecoGreen: '#10B981', // Eco rejim uchun yashil
        shadowLight: '#FFFFFF', // Neumorphism uchun yorug'lik soyasi
        shadowDark: '#D1D5DB', // Neumorphism uchun qora soyasi
        border: '#E5E7EB',
    },
    dark: {
        background: '#111827', // Tungi preimum fon
        surface: '#1F2937',
        primary: '#F43F5E',
        primaryGlow: 'rgba(244, 63, 94, 0.6)',
        textPrimary: '#F9FAFB',
        textSecondary: '#9CA3AF',
        accentWarm: '#FBBF24',
        accentCool: '#60A5FA',
        ecoGreen: '#34D399',
        shadowLight: '#374151', // Qorong'i Neumorphism yorug'lik
        shadowDark: '#0B0F19', // Qorong'i Neumorphism qora qismi
        border: '#374151',
    }
};
