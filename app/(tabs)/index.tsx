import { createHomeStyles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <View style={homeStyles.container}>
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
