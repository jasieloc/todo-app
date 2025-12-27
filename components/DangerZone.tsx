import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DangerZone = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const deleteAllTodos = useMutation(api.todos.deleteAllTodos);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAllTodos = () => {
    // Prevent action if already in progress
    if (isDeleting) return;

    Alert.alert(
      'Reset App',
      'Are you sure you want to reset your app? This will delete all your todos.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete All',
          onPress: async () => {
            setIsDeleting(true);
            try {
              const result = await deleteAllTodos();

              // Validate response shape before reading deletedCount
              const deletedCount =
                result && typeof result.deletedCount === 'number'
                  ? result.deletedCount
                  : 0;

              Alert.alert(
                'App Reset',
                `Successfully deleted ${deletedCount} todo${
                  deletedCount === 1 ? '' : 's'
                }. Your app has been reset.`
              );
            } catch (err) {
              console.error('Error deleting all todos', err);
              Alert.alert(
                'Whoops!',
                "We couldn't reset the app. Please try again later."
              );
            } finally {
              setIsDeleting(false);
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
        style={[
          settingsStyles.actionButton,
          { borderBottomWidth: 0 },
          isDeleting && { opacity: 0.5 },
        ]}
        onPress={handleDeleteAllTodos}
        activeOpacity={0.7}
        disabled={isDeleting}
      >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyles.actionIcon}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="trash" size={18} color="#ffffff" />
            )}
          </LinearGradient>
          <Text style={settingsStyles.actionTextDanger}>
            {isDeleting ? 'Resetting...' : 'Reset App'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
