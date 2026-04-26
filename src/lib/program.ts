import { SQLiteDatabase } from 'expo-sqlite';

export type ProgramExerciseSummary = {
  id: string;
  name: string;
  tierCode: string;
};

export type ProgramDaySummary = {
  id: string;
  dayNumber: number;
  name: string;
  focusLabel: string | null;
  exercises: ProgramExerciseSummary[];
};

export type CompletedWorkoutSummary = {
  id: string;
  title: string;
  completedAt: string;
};

export type WorkoutExerciseDetail = {
  id: string;
  name: string;
  tierCode: string;
  stageLabel: string;
  setsCount: number | null;
  repsPerSet: number | null;
  targetTotalReps: number | null;
  lastSetAmrap: boolean;
};

export type WorkoutDetail = {
  id: string;
  dayNumber: number;
  name: string;
  focusLabel: string | null;
  exercises: WorkoutExerciseDetail[];
};

export type LoggerSetPlan = {
  key: string;
  label: string;
  target: string;
  isAmrap: boolean;
};

const PROGRAM_TEMPLATE_ID = 'p-zero';

export async function getProgramDays(db: SQLiteDatabase) {
  const rows = await db.getAllAsync<{
    day_id: string;
    day_number: number;
    day_name: string;
    focus_label: string | null;
    exercise_id: string | null;
    exercise_name: string | null;
    tier_code: string | null;
  }>(
    `
      SELECT
        d.id AS day_id,
        d.day_number,
        d.name AS day_name,
        d.focus_label,
        te.id AS exercise_id,
        te.display_name AS exercise_name,
        td.code AS tier_code
      FROM workout_day_templates d
      LEFT JOIN template_exercises te
        ON te.program_template_id = d.program_template_id
       AND te.day_slot = d.day_code
      LEFT JOIN tier_definitions td
        ON td.id = te.tier_definition_id
      WHERE d.program_template_id = ?
      ORDER BY d.day_number ASC, te.sort_order ASC
    `,
    PROGRAM_TEMPLATE_ID
  );

  return groupProgramDayRows(rows);
}

export async function getNextWorkout(db: SQLiteDatabase) {
  const [days, completedWorkouts] = await Promise.all([
    getProgramDays(db),
    getCompletedWorkouts(db),
  ]);

  if (days.length === 0) {
    return null;
  }

  return days[completedWorkouts.length % days.length];
}

export async function getCompletedWorkouts(db: SQLiteDatabase) {
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    completed_at: string;
  }>(
    `
      SELECT id, title, completed_at
      FROM workout_sessions
      WHERE program_template_id = ? AND completed_at IS NOT NULL
      ORDER BY completed_at DESC
      LIMIT 8
    `,
    PROGRAM_TEMPLATE_ID
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    completedAt: row.completed_at,
  }));
}

export async function getWorkoutDetail(db: SQLiteDatabase, dayId: string) {
  const rows = await db.getAllAsync<{
    day_id: string;
    day_number: number;
    day_name: string;
    focus_label: string | null;
    exercise_id: string;
    exercise_name: string;
    tier_code: string;
    stage_label: string;
    sets_count: number | null;
    reps_per_set: number | null;
    target_total_reps: number | null;
    last_set_amrap: number;
  }>(
    `
      SELECT
        d.id AS day_id,
        d.day_number,
        d.name AS day_name,
        d.focus_label,
        te.id AS exercise_id,
        te.display_name AS exercise_name,
        td.code AS tier_code,
        sd.label AS stage_label,
        sd.sets_count,
        sd.reps_per_set,
        sd.target_total_reps,
        sd.last_set_amrap
      FROM workout_day_templates d
      JOIN template_exercises te
        ON te.program_template_id = d.program_template_id
       AND te.day_slot = d.day_code
      JOIN tier_definitions td
        ON td.id = te.tier_definition_id
      JOIN stage_definitions sd
        ON sd.tier_definition_id = td.id
       AND sd.stage_number = 1
      WHERE d.id = ?
      ORDER BY te.sort_order ASC
    `,
    dayId
  );

  if (rows.length === 0) {
    return null;
  }

  const first = rows[0];

  return {
    id: first.day_id,
    dayNumber: first.day_number,
    name: first.day_name,
    focusLabel: first.focus_label,
    exercises: rows.map((row) => ({
      id: row.exercise_id,
      name: row.exercise_name,
      tierCode: row.tier_code,
      stageLabel: row.stage_label,
      setsCount: row.sets_count,
      repsPerSet: row.reps_per_set,
      targetTotalReps: row.target_total_reps,
      lastSetAmrap: row.last_set_amrap === 1,
    })),
  };
}

export function buildLoggerSetPlan(exercise: WorkoutExerciseDetail): LoggerSetPlan[] {
  if (exercise.tierCode === 'T3') {
    return [
      {
        key: `${exercise.id}:volume`,
        label: 'Volume',
        target: `${exercise.targetTotalReps ?? 0} total reps`,
        isAmrap: false,
      },
    ];
  }

  const totalSets = exercise.setsCount ?? 0;
  const reps = exercise.repsPerSet ?? 0;

  return Array.from({ length: totalSets }, (_, index) => {
    const isLastSetAmrap = exercise.lastSetAmrap && index === totalSets - 1;

    return {
      key: `${exercise.id}:${index}`,
      label: `Set ${index + 1}`,
      target: isLastSetAmrap ? `${reps}+ AMRAP` : `${reps} reps`,
      isAmrap: isLastSetAmrap,
    };
  });
}

export async function completeWorkoutSession(
  db: SQLiteDatabase,
  workout: Pick<WorkoutDetail, 'name'>
) {
  const timestamp = new Date().toISOString();
  const id = `session:${timestamp}`;

  await db.runAsync(
    `
      INSERT INTO workout_sessions (
        id,
        program_template_id,
        title,
        started_at,
        completed_at,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    id,
    PROGRAM_TEMPLATE_ID,
    workout.name,
    timestamp,
    timestamp,
    null
  );
}

function groupProgramDayRows(
  rows: {
    day_id: string;
    day_number: number;
    day_name: string;
    focus_label: string | null;
    exercise_id: string | null;
    exercise_name: string | null;
    tier_code: string | null;
  }[]
) {
  return rows.reduce<ProgramDaySummary[]>((days, row) => {
    const existingDay = days.find((day) => day.id === row.day_id);

    if (existingDay) {
      if (row.exercise_id && row.exercise_name && row.tier_code) {
        existingDay.exercises.push({
          id: row.exercise_id,
          name: row.exercise_name,
          tierCode: row.tier_code,
        });
      }
      return days;
    }

    days.push({
      id: row.day_id,
      dayNumber: row.day_number,
      name: row.day_name,
      focusLabel: row.focus_label,
      exercises:
        row.exercise_id && row.exercise_name && row.tier_code
          ? [
              {
                id: row.exercise_id,
                name: row.exercise_name,
                tierCode: row.tier_code,
              },
            ]
          : [],
    });

    return days;
  }, []);
}
