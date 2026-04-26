import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { theme } from '@/constants/theme';
import {
  calculateOneRepMax,
  calculateT1TrainingMax,
  calculateT2TrainingMax,
  roundToNearestTenth,
} from '@/lib/calculations';

export function CalculatorScreen() {
  const [weightInput, setWeightInput] = useState('225');
  const [repsInput, setRepsInput] = useState('5');

  const weight = Number.parseFloat(weightInput) || 0;
  const reps = Number.parseFloat(repsInput) || 0;

  const metrics = useMemo(() => {
    const oneRepMax = calculateOneRepMax(weight, reps);
    const t1TrainingMax = calculateT1TrainingMax(oneRepMax);
    const tenRepMax = reps === 10 ? weight : null;
    const t2TrainingMax = calculateT2TrainingMax(oneRepMax, tenRepMax);

    return {
      oneRepMax,
      t1TrainingMax,
      t2TrainingMax,
      hasTenRepMax: tenRepMax !== null,
    };
  }, [reps, weight]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>SOULEVE</Text>
          <Text style={styles.title}>Calculator</Text>
          <Text style={styles.subtitle}>
            Estimate 1RM and P-Zero training maxes in real time.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight</Text>
              <TextInput
                keyboardType="decimal-pad"
                onChangeText={setWeightInput}
                placeholder="0"
                placeholderTextColor={theme.colors.textMuted}
                selectionColor={theme.colors.text}
                style={styles.input}
                value={weightInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={setRepsInput}
                placeholder="0"
                placeholderTextColor={theme.colors.textMuted}
                selectionColor={theme.colors.text}
                style={styles.input}
                value={repsInput}
              />
            </View>
          </View>

          <View style={styles.resultBlock}>
            <Text style={styles.resultLabel}>Estimated 1RM</Text>
            <Text style={styles.resultValue}>{formatNumber(metrics.oneRepMax)}</Text>
          </View>

          <View style={styles.resultBlock}>
            <Text style={styles.resultLabel}>T1 TM</Text>
            <Text style={styles.resultValue}>{formatNumber(metrics.t1TrainingMax)}</Text>
          </View>

          <View style={styles.resultBlock}>
            <Text style={styles.resultLabel}>T2 TM Range</Text>
            <Text style={styles.resultValue}>
              {formatRange(
                metrics.t2TrainingMax.fromT1OneRepMax.low,
                metrics.t2TrainingMax.fromT1OneRepMax.high
              )}
            </Text>
          </View>

          <View style={styles.resultBlock}>
            <Text style={styles.resultLabel}>T2 TM from 10RM</Text>
            <Text style={styles.resultValue}>
              {metrics.hasTenRepMax
                ? formatNumber(metrics.t2TrainingMax.fromTenRepMax ?? 0)
                : '--'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatNumber(value: number) {
  if (value <= 0) {
    return '--';
  }

  return roundToNearestTenth(value).toFixed(1);
}

function formatRange(low: number, high: number) {
  if (low <= 0 || high <= 0) {
    return '--';
  }

  return `${roundToNearestTenth(low).toFixed(1)} - ${roundToNearestTenth(high).toFixed(1)}`;
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
  card: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  inputGroup: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  inputLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
  },
  resultBlock: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    gap: 6,
  },
  resultLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  },
  resultValue: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
});
