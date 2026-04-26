import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '@/constants/theme';
import { getProgramDays, type ProgramDaySummary } from '@/lib/program';
import type { RootStackParamList } from '@/navigation/types';

type ProgramNavigation = NativeStackNavigationProp<RootStackParamList>;

export function ProgramScreen() {
  const db = useSQLiteContext();
  const navigation = useNavigation<ProgramNavigation>();
  const [programDays, setProgramDays] = useState<ProgramDaySummary[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function loadProgram() {
        const days = await getProgramDays(db);

        if (isMounted) {
          setProgramDays(days);
        }
      }

      loadProgram();

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
          <Text style={styles.title}>Program</Text>
          <Text style={styles.subtitle}>
            The full P-Zero schedule, organized as four training days.
          </Text>
        </View>

        <View style={styles.cardStack}>
          {programDays.map((day) => (
            <Pressable
              key={day.id}
              android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
              onPress={() =>
                navigation.navigate('WorkoutLogger', {
                  dayId: day.id,
                  dayName: day.name,
                })
              }
              style={({ pressed }) => [
                styles.scheduleCard,
                pressed ? styles.scheduleCardPressed : null,
              ]}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.dayIndex}>{String(day.dayNumber).padStart(2, '0')}</Text>
                <View style={styles.dayTextBlock}>
                  <Text style={styles.cardTitle}>{day.name}</Text>
                  <Text style={styles.focusLabel}>{day.focusLabel ?? 'P-Zero Session'}</Text>
                </View>
                <Text style={styles.selectLabel}>Open</Text>
              </View>

              <View style={styles.previewList}>
                {day.exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.previewRow}>
                    <Text style={styles.previewBullet}>•</Text>
                    <Text style={styles.previewText}>{exercise.name}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}
        </View>
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
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '700',
  },
  subtitle: {
    maxWidth: 320,
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  cardStack: {
    gap: theme.spacing.md,
  },
  scheduleCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  scheduleCardPressed: {
    backgroundColor: theme.colors.surface,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  dayIndex: {
    color: '#7C838F',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 24,
    paddingTop: 2,
  },
  dayTextBlock: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600',
  },
  focusLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  selectLabel: {
    color: '#D9DDE5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  previewList: {
    gap: 10,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  previewBullet: {
    color: '#7C838F',
    fontSize: 13,
    lineHeight: 20,
  },
  previewText: {
    flex: 1,
    color: '#E4E7EC',
    fontSize: 15,
    lineHeight: 20,
  },
});
