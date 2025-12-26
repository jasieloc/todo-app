import { ThemeProvider } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
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
  );
}
