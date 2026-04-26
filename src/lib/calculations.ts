export type T2TrainingMax = {
  fromT1OneRepMax: {
    low: number;
    high: number;
  };
  fromTenRepMax: number | null;
};

export function calculateOneRepMax(weight: number, reps: number) {
  if (weight <= 0 || reps <= 0) {
    return 0;
  }

  return weight * (1 + reps / 30);
}

export function calculateT1TrainingMax(oneRepMax: number) {
  if (oneRepMax <= 0) {
    return 0;
  }

  return oneRepMax * 0.9;
}

export function calculateT2TrainingMax(
  t1OneRepMax: number,
  tenRepMax: number | null = null
): T2TrainingMax {
  if (t1OneRepMax <= 0) {
    return {
      fromT1OneRepMax: {
        low: 0,
        high: 0,
      },
      fromTenRepMax: null,
    };
  }

  return {
    fromT1OneRepMax: {
      low: t1OneRepMax * 0.6,
      high: t1OneRepMax * 0.7,
    },
    fromTenRepMax: tenRepMax && tenRepMax > 0 ? tenRepMax * 0.9 : null,
  };
}

export function roundToNearestTenth(value: number) {
  return Math.round(value * 10) / 10;
}
