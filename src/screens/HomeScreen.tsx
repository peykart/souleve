import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '@/constants/theme';
import { getCompletedWorkouts, getNextWorkout, type CompletedWorkoutSummary, type ProgramDaySummary } from '@/lib/program';
import type { RootStackParamList } from '@/navigation/types';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const db = useSQLiteContext();
  const navigation = useNavigation<HomeNavigation>();
  const [nextWorkout, setNextWorkout] = useState<ProgramDaySummary | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkoutSummary[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function loadHome() {
        const [upNext, completed] = await Promise.all([
          getNextWorkout(db),
          getCompletedWorkouts(db),
        ]);

        if (isMounted) {
          setNextWorkout(upNext);
          setCompletedWorkouts(completed);
        }
      }

      loadHome();

      return () => {
        isMounted = false;
      };
    }, [db])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>SOULEVE</Text>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.subtitle}>
            Your next training day is ready. Start from here, then review completed sessions below.
          </Text>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Next Workout</Text>
          {nextWorkout ? (
            <View style={styles.primaryCard}>
              <View style={styles.primaryHeader}>
                <View style={styles.primaryHeaderText}>
                  <Text style={styles.primaryTitle}>{nextWorkout.name}</Text>
                  <Text style={styles.primaryFocus}>
                    {nextWorkout.focusLabel ?? 'P-Zero Session'}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigation.navigate('WorkoutLogger', {
                      dayId: nextWorkout.id,
                      dayName: nextWorkout.name,
                    })
                  }
                  style={({ pressed }) => [
                    styles.startButton,
                    pressed ? styles.startButtonPressed : null,
                  ]}
                >
                  <Text style={styles.startButtonText}>Start</Text>
                </Pressable>
              </View>

              <View style={styles.previewStack}>
                {nextWorkout.exercises.slice(0, 4).map((exercise) => (
                  <Text key={exercise.id} style={styles.previewLine}>
                    {exercise.tierCode} {exercise.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.emptyCopy}>No workout template loaded yet.</Text>
          )}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Completed Workouts</Text>
          {completedWorkouts.length === 0 ? (
            <View style={styles.listCard}>
              <Text style={styles.emptyCopy}>No completed workouts yet.</Text>
            </View>
          ) : (
            <View style={styles.listCard}>
              {completedWorkouts.map((workout, index) => (
                <View
                  key={workout.id}
                  style={[
                    styles.completedRow,
                    index === completedWorkouts.length - 1 ? styles.completedRowLast : null,
                  ]}
                >
                  <View style={styles.completedTextBlock}>
                    <Text style={styles.completedTitle}>{workout.title}</Text>
                    <Text style={styles.completedTime}>
                      {formatCompletedDate(workout.completedAt)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatCompletedDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.xl,
  },
  hero: {
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.accent,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '700',
  },
  subtitle: {
    maxWidth: 330,
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  sectionBlock: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    color: '#D5D9E0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  primaryCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  primaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  primaryHeaderText: {
    flex: 1,
    gap: 2,
  },
  primaryTitle: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
  },
  primaryFocus: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 20,
  },
  startButton: {
    borderRadius: 999,
    backgroundColor: theme.colors.text,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  startButtonPressed: {
    opacity: 0.8,
  },
  startButtonText: {
    color: theme.colors.background,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  previewStack: {
    gap: 10,
  },
  previewLine: {
    color: '#E4E7EC',
    fontSize: 15,
    lineHeight: 20,
  },
  listCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    overflow: 'hidden',
  },
  completedRow: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  completedRowLast: {
    borderBottomWidth: 0,
  },
  completedTextBlock: {
    gap: 4,
  },
  completedTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  completedTime: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  emptyCopy: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
