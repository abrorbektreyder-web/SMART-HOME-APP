import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

// Dastur qaysi qurilmada ishlashiga qarab IP ni to'g'irlash kerak (telefon uchun localhost ishlamaydi xabaringiz bor)
// Hozir web test uchun localhost:3000
const SOCKET_URL = 'http://localhost:3000';

interface DeviceState {
  id: string;
  name: string;
  type: string;
  isOn: boolean;
  settings: any;
}

interface AppState {
  theme: 'light' | 'dark';
  language: 'uz' | 'ru';
  socket: Socket | null;
  devices: Record<string, DeviceState>;
  isConnected: boolean;
  isAuthenticated: boolean;
  user: any | null;
  toggleTheme: () => void;
  setLanguage: (lang: 'uz' | 'ru') => void;
  initSocket: () => void;
  updateDeviceState: (deviceId: string, update: Partial<DeviceState>) => void;
  sendDeviceCommand: (deviceId: string, command: any) => void;
  login: (phone: string, token: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: 'dark',
  language: 'uz',
  socket: null,
  devices: {
    // Mock boshlang'ich holat, serverga ulangach yangilanadi
    "tuya_climate_1": { id: "tuya_climate_1", name: "Zal Konditsioneri", type: "CLIMATE", isOn: true, settings: { temp: 22 } },
    "tuya_light_1": { id: "tuya_light_1", name: "Oshxona chirog`i", type: "LIGHT", isOn: false, settings: {} },
    "tuya_plug_1": { id: "tuya_plug_1", name: "Muzlatgich", type: "PLUG", isOn: true, settings: {} },
  },
  isConnected: false,
  isAuthenticated: false,
  user: null,

  login: (phone, token) => set({ isAuthenticated: true, user: { phone, token } }),
  logout: () => set({ isAuthenticated: false, user: null }),

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (lang) => set({ language: lang }),

  initSocket: () => {
    if (get().socket) return; // avoid multiple connections

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('WS: Ulandik', socket.id);
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('WS: Uzildi');
      set({ isConnected: false });
    });

    // Serverdan barcha qurilmalar kelganda yoki bitta o'zgarganda qabul qiluvchi tinglovchilar:
    socket.on('device_state_changed', (device: any) => {
      console.log('WS Data:', device);
      set((state) => ({
        devices: { ...state.devices, [device.id]: device }
      }));
    });

    set({ socket });
  },

  updateDeviceState: (deviceId, update) => {
    set((state) => {
      const d = state.devices[deviceId];
      if (!d) return state;
      return {
        devices: { ...state.devices, [deviceId]: { ...d, ...update } }
      };
    });
  },

  sendDeviceCommand: (deviceId, command) => {
    const socket = get().socket;
    if (socket && socket.connected) {
      socket.emit('toggle_device', { deviceId, ...command });
    } else {
      console.warn('Socket ulanmagan! Offline mode optimistic update');
    }
    // Optimistic update should always run regardless of connection for UI responsiveness
    get().updateDeviceState(deviceId, {
      isOn: command.turnOn !== undefined ? command.turnOn : get().devices[deviceId]?.isOn,
      settings: command.temp !== undefined ? { ...get().devices[deviceId]?.settings, temp: command.temp } : get().devices[deviceId]?.settings
    });
  }
}));
