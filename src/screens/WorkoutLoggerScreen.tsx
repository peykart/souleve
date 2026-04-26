import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '@/constants/theme';
import {
  buildLoggerSetPlan,
  completeWorkoutSession,
  getWorkoutDetail,
  type WorkoutDetail,
} from '@/lib/program';
import type { RootStackParamList } from '@/navigation/types';

type LoggerRoute = RouteProp<RootStackParamList, 'WorkoutLogger'>;
type LoggerNavigation = NativeStackNavigationProp<RootStackParamList>;

type SetLogState = {
  weight: string;
  reps: string;
  completed: boolean;
};

export function WorkoutLoggerScreen() {
  const db = useSQLiteContext();
  const navigation = useNavigation<LoggerNavigation>();
  const route = useRoute<LoggerRoute>();
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [setLogs, setSetLogs] = useState<Record<string, SetLogState>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadWorkout() {
      const detail = await getWorkoutDetail(db, route.params.dayId);

      if (isMounted) {
        setWorkout(detail);
      }
    }

    loadWorkout();

    return () => {
      isMounted = false;
    };
  }, [db, route.params.dayId]);

  const exercisePlans = useMemo(() => {
    if (!workout) {
      return [];
    }

    return workout.exercises.map((exercise) => ({
      exercise,
      sets: buildLoggerSetPlan(exercise),
    }));
  }, [workout]);

  async function handleCompleteWorkout() {
    if (!workout) {
      return;
    }

    await completeWorkoutSession(db, workout);
    Alert.alert('Workout saved', 'This session has been added to your completed workouts.');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {workout ? (
          <>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>LIVE LOGGER</Text>
              <Text style={styles.title}>{workout.name}</Text>
              <Text style={styles.subtitle}>
                {workout.focusLabel ?? 'P-Zero Session'} using Stage 1 targets.
              </Text>
            </View>

            <View style={styles.exerciseStack}>
              {exercisePlans.map(({ exercise, sets }) => (
                <View key={exercise.id} style={styles.exerciseCard}>
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseHeaderText}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseMeta}>
                        {exercise.tierCode} · {exercise.stageLabel}
                      </Text>
                    </View>
                    <Text style={styles.exerciseTarget}>
                      {exercise.tierCode === 'T3'
                        ? `${exercise.targetTotalReps} total reps`
                        : `${exercise.repsPerSet} reps target`}
                    </Text>
                  </View>

                  <View style={styles.setStack}>
                    {sets.map((setPlan) => {
                      const current = setLogs[setPlan.key] ?? {
                        weight: '',
                        reps: '',
                        completed: false,
                      };

                      return (
                        <View key={setPlan.key} style={styles.setRow}>
                          <View style={styles.setInfo}>
                            <Text style={styles.setLabel}>{setPlan.label}</Text>
                            <Text style={styles.setTarget}>{setPlan.target}</Text>
                          </View>

                          <TextInput
                            keyboardType="decimal-pad"
                            onChangeText={(value) =>
                              setSetLogs((prev) => ({
                                ...prev,
                                [setPlan.key]: {
                                  ...current,
                                  weight: value,
                                },
                              }))
                            }
                            placeholder="Wt"
                            placeholderTextColor={theme.colors.textMuted}
                            selectionColor={theme.colors.text}
                            style={styles.setInput}
                            value={current.weight}
                          />

                          <TextInput
                            keyboardType="number-pad"
                            onChangeText={(value) =>
                              setSetLogs((prev) => ({
                                ...prev,
                                [setPlan.key]: {
                                  ...current,
                                  reps: value,
                                },
                              }))
                            }
                            placeholder="Reps"
                            placeholderTextColor={theme.colors.textMuted}
                            selectionColor={theme.colors.text}
                            style={styles.setInput}
                            value={current.reps}
                          />

                          <Pressable
                            onPress={() =>
                              setSetLogs((prev) => ({
                                ...prev,
                                [setPlan.key]: {
                                  ...current,
                                  completed: !current.completed,
                                },
                              }))
                            }
                            style={[
                              styles.completeButton,
                              current.completed ? styles.completeButtonActive : null,
                            ]}
                          >
                            <Text
                              style={[
                                styles.completeButtonText,
                                current.completed ? styles.completeButtonTextActive : null,
                              ]}
                            >
                              {current.completed ? 'Done' : 'Mark'}
                            </Text>
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>

            <Pressable onPress={handleCompleteWorkout} style={styles.finishButton}>
              <Text style={styles.finishButtonText}>Complete Workout</Text>
            </Pressable>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading workout...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
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
    gap: theme.spacing.lg,
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
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  exerciseStack: {
    gap: theme.spacing.md,
  },
  exerciseCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  exerciseHeader: {
    gap: 6,
  },
  exerciseHeaderText: {
    gap: 3,
  },
  exerciseName: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '600',
  },
  exerciseMeta: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  exerciseTarget: {
    color: '#DCE1E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  setStack: {
    gap: theme.spacing.sm,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  setInfo: {
    flex: 1,
    gap: 2,
  },
  setLabel: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  setTarget: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  setInput: {
    width: 68,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  completeButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minWidth: 66,
    alignItems: 'center',
  },
  completeButtonActive: {
    backgroundColor: theme.colors.text,
    borderColor: theme.colors.text,
  },
  completeButtonText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  completeButtonTextActive: {
    color: theme.colors.background,
  },
  finishButton: {
    borderRadius: 999,
    backgroundColor: theme.colors.text,
    paddingVertical: 16,
    alignItems: 'center',
  },
  finishButtonText: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  loadingText: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
});
