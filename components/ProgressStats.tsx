import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Text, View } from 'react-native';

// Skeleton loader component for individual stat cards (defined outside to avoid re-creation)
interface StatSkeletonProps {
  borderColor: string;
  colors: ColorScheme;
  styles: ReturnType<typeof createSettingsStyles>;
}

const StatSkeleton = ({ borderColor, colors, styles }: StatSkeletonProps) => (
  <LinearGradient
    colors={colors.gradients.background}
    style={[styles.statCard, { borderLeftColor: borderColor }]}
  >
    <View style={styles.statIconContainer}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: colors.border, opacity: 0.5 },
        ]}
      />
    </View>
    <View>
      <ActivityIndicator size="small" color={colors.textMuted} />
      <View
        style={{
          width: 80,
          height: 14,
          backgroundColor: colors.border,
          borderRadius: 4,
          marginTop: 8,
          opacity: 0.5,
        }}
      />
    </View>
  </LinearGradient>
);

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  // Determine loading state (useQuery returns undefined while loading)
  const isLoading = todos === undefined;

  // Compute stats only when data is available
  const totalTodos = todos?.length ?? 0;
  const completedTodos = todos?.filter((todo) => todo.isCompleted).length ?? 0;
  const activeTodos = totalTodos - completedTodos;

  // Show skeleton while loading
  if (isLoading) {
    return (
      <LinearGradient
        colors={colors.gradients.surface}
        style={settingsStyles.section}
      >
        <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
        <View style={settingsStyles.statsContainer}>
          <StatSkeleton
            borderColor={colors.primary}
            colors={colors}
            styles={settingsStyles}
          />
          <StatSkeleton
            borderColor={colors.success}
            colors={colors}
            styles={settingsStyles}
          />
          <StatSkeleton
            borderColor={colors.warning}
            colors={colors}
            styles={settingsStyles}
          />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
      <View style={settingsStyles.statsContainer}>
        {/* TOTAL TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="list-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>
        {/* COMPLETED TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed Todos</Text>
          </View>
        </LinearGradient>
        {/* ACTIVE TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active Todos</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
