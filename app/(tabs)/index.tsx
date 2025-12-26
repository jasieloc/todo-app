import useTheme from '@/hooks/useTheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.content}>More React Native training</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
