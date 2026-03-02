import { Stack } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  const themeMode = useAppStore(state => state.theme);
  const theme = colors[themeMode];

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background }
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
