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
                visible: true, // Make sure nav bar is visible for content to go behind
                backgroundColor: '#000000', // Or your primary color
              },
              // Make content draw behind the system bars
              contentStyle: {
                paddingBottom: 0, // Let the tab bar handle its own space
              },
            }),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
