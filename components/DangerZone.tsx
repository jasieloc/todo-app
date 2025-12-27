import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const deleteAllTodos = useMutation(api.todos.deleteAllTodos);

  const handleDeleteAllTodos = () => {
    Alert.alert(
      'Reset App',
      'Are you sure you want to reset your app? This will delete all your todos.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Delete All',
          onPress: async () => {
            try {
              const result = await deleteAllTodos();
              Alert.alert(
                'App Reset',
                `Successfully deleted ${result.deletedCount} todo${
                  result.deletedCount === 1 ? '' : 's'
                }. Your app has been reset.`
              );
            } catch (err) {
              console.error('Error deleting all todos', err);
              Alert.alert(
                'Whoops!',
                "We couldn't reset the app. Please try again later."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

      <TouchableOpacity
        style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleDeleteAllTodos}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyles.actionIcon}
          >
            <Ionicons name="trash" size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
