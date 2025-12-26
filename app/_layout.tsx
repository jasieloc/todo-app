import { ThemeProvider } from '@/hooks/useTheme';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL environment variable is required');
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              ...(Platform.OS === 'android' && {
                androidNavigationBar: {
                  visible: true,
                },
                contentStyle: {
                  paddingBottom: 0,
                },
              }),
            }}
          />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
