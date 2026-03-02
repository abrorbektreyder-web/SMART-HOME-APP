import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  language: 'uz' | 'ru';
  toggleTheme: () => void;
  setLanguage: (lang: 'uz' | 'ru') => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // the user wanted black color theme by default now!
  language: 'uz',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (lang) => set({ language: lang }),
}));
