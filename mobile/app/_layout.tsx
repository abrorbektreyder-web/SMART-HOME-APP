import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  const themeMode = useAppStore((state: any) => state.theme);
  const isAuthenticated = useAppStore((state: any) => state.isAuthenticated);
  const theme = colors[themeMode as 'light' | 'dark'];
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Wait for navigation tree to load
    requestAnimationFrame(() => {
      const inAuthGroup = segments[0] === 'login';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/');
      }
    });
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'fade'
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background }
        }}
      />
      <Stack.Screen name="rooms" options={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
