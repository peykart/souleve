import { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'souleve.db';

type DatabaseExecutor = Pick<
  SQLiteDatabase,
  'execAsync' | 'runAsync' | 'getFirstAsync' | 'getAllAsync'
>;

const P_ZERO_TEMPLATE = {
  id: 'p-zero',
  slug: 'p-zero',
  name: 'P-Zero',
  description: 'Foundational GZCL-inspired progression with T1, T2, and T3 volume stages.',
} as const;

const P_ZERO_FULL_BODY_WORKOUTS = [
  {
    id: 'p-zero:full-body:day-1',
    dayCode: 'day-1',
    dayNumber: 1,
    name: 'Day 1',
    focusLabel: 'Deadlift / Bench',
  },
  {
    id: 'p-zero:full-body:day-2',
    dayCode: 'day-2',
    dayNumber: 2,
    name: 'Day 2',
    focusLabel: 'Press / Squat',
  },
  {
    id: 'p-zero:full-body:day-3',
    dayCode: 'day-3',
    dayNumber: 3,
    name: 'Day 3',
    focusLabel: 'Bench / Deadlift',
  },
  {
    id: 'p-zero:full-body:day-4',
    dayCode: 'day-4',
    dayNumber: 4,
    name: 'Day 4',
    focusLabel: 'Squat / Press',
  },
] as const;

const P_ZERO_EXERCISE_DEFINITIONS = [
  ['deadlift', 'Deadlift'],
  ['bench-press', 'Bench'],
  ['chest-supported-t-bar-row', 'Chest Supported T-Bar Row'],
  ['leg-press', 'Leg Press'],
  ['dips', 'Dips'],
  ['decline-weighted-sit-ups', 'Decline Weighted Sit-Ups'],
  ['press', 'Press'],
  ['squat', 'Squat'],
  ['pull-ups', 'Pull Ups'],
  ['incline-dumbbell-bench-press', 'Incline Dumbbell Bench Press'],
  ['leg-curls', 'Leg Curls'],
  ['biceps-curls', 'Biceps Curls'],
  ['cable-underhand-row', 'Cable Underhand Row'],
  ['seated-dumbbell-press', 'Seated Dumbbell Press'],
  ['leg-extension', 'Leg Extension'],
  ['dumbbell-side-crunch-shrug', 'Dumbbell Side Crunch + Shrug'],
  ['romanian-deadlift', 'Romanian Deadlift'],
  ['dumbbell-bench-press', 'Dumbbell Bench Press'],
  ['cable-lateral-raise', 'Cable Lateral Raise'],
  ['leg-lifts', 'Leg Lifts'],
] as const;

const P_ZERO_FULL_BODY_EXERCISES = [
  ['p-zero:full-body:day-1:t1', 'day-1', 'deadlift', 'p-zero:t1', 'T1 Deadlift', 1],
  ['p-zero:full-body:day-1:t2', 'day-1', 'bench-press', 'p-zero:t2', 'T2 Bench', 2],
  ['p-zero:full-body:day-1:t3a', 'day-1', 'chest-supported-t-bar-row', 'p-zero:t3', 'T3a Chest Supported T-Bar Row', 3],
  ['p-zero:full-body:day-1:t3b', 'day-1', 'leg-press', 'p-zero:t3', 'T3b Leg Press', 4],
  ['p-zero:full-body:day-1:t3c', 'day-1', 'dips', 'p-zero:t3', 'T3c Dips', 5],
  ['p-zero:full-body:day-1:t3d', 'day-1', 'decline-weighted-sit-ups', 'p-zero:t3', 'T3d Decline Weighted Sit-Ups', 6],
  ['p-zero:full-body:day-2:t1', 'day-2', 'press', 'p-zero:t1', 'T1 Press', 1],
  ['p-zero:full-body:day-2:t2', 'day-2', 'squat', 'p-zero:t2', 'T2 Squat', 2],
  ['p-zero:full-body:day-2:t3a', 'day-2', 'pull-ups', 'p-zero:t3', 'T3a Pull Ups', 3],
  ['p-zero:full-body:day-2:t3b', 'day-2', 'incline-dumbbell-bench-press', 'p-zero:t3', 'T3b Incline Dumbbell Bench Press', 4],
  ['p-zero:full-body:day-2:t3c', 'day-2', 'leg-curls', 'p-zero:t3', 'T3c Leg Curls', 5],
  ['p-zero:full-body:day-2:t3d', 'day-2', 'biceps-curls', 'p-zero:t3', 'T3d Biceps Curls', 6],
  ['p-zero:full-body:day-3:t1', 'day-3', 'bench-press', 'p-zero:t1', 'T1 Bench', 1],
  ['p-zero:full-body:day-3:t2', 'day-3', 'deadlift', 'p-zero:t2', 'T2 Deadlift', 2],
  ['p-zero:full-body:day-3:t3a', 'day-3', 'cable-underhand-row', 'p-zero:t3', 'T3a Cable Underhand Row', 3],
  ['p-zero:full-body:day-3:t3b', 'day-3', 'seated-dumbbell-press', 'p-zero:t3', 'T3b Seated Dumbbell Press', 4],
  ['p-zero:full-body:day-3:t3c', 'day-3', 'leg-extension', 'p-zero:t3', 'T3c Leg Extension', 5],
  ['p-zero:full-body:day-3:t3d', 'day-3', 'dumbbell-side-crunch-shrug', 'p-zero:t3', 'T3d Dumbbell Side Crunch + Shrug', 6],
  ['p-zero:full-body:day-4:t1', 'day-4', 'squat', 'p-zero:t1', 'T1 Squat', 1],
  ['p-zero:full-body:day-4:t2', 'day-4', 'press', 'p-zero:t2', 'T2 Press', 2],
  ['p-zero:full-body:day-4:t3a', 'day-4', 'romanian-deadlift', 'p-zero:t3', 'T3a Romanian Deadlift', 3],
  ['p-zero:full-body:day-4:t3b', 'day-4', 'dumbbell-bench-press', 'p-zero:t3', 'T3b Dumbbell Bench Press', 4],
  ['p-zero:full-body:day-4:t3c', 'day-4', 'cable-lateral-raise', 'p-zero:t3', 'T3c Cable Lateral Raise', 5],
  ['p-zero:full-body:day-4:t3d', 'day-4', 'leg-lifts', 'p-zero:t3', 'T3d Leg Lifts', 6],
] as const;

const P_ZERO_TIERS = [
  {
    id: 'p-zero:t1',
    code: 'T1',
    name: 'Tier 1',
    description: 'Heavy lifts driven by AMRAP-based stage progression.',
    trainingMaxStrategy: 'T1_90_PERCENT_1RM',
    progressionRule: 'Advance when the AMRAP set does not exceed the prescribed reps by at least 1.',
    sortOrder: 1,
  },
  {
    id: 'p-zero:t2',
    code: 'T2',
    name: 'Tier 2',
    description: 'Moderate work using either a percentage of T1 1RM or 90% of a 10RM.',
    trainingMaxStrategy: 'T2_60_TO_70_PERCENT_T1_1RM_OR_90_PERCENT_10RM',
    progressionRule: 'Advance when all prescribed reps cannot be completed.',
    sortOrder: 2,
  },
  {
    id: 'p-zero:t3',
    code: 'T3',
    name: 'Tier 3',
    description: 'Accessory work tracked by total reps across the exercise.',
    trainingMaxStrategy: 'NONE',
    progressionRule: 'Volume target is defined by total reps in the current stage.',
    sortOrder: 3,
  },
] as const;

const P_ZERO_STAGES = [
  {
    id: 'p-zero:t1:s1',
    tierId: 'p-zero:t1',
    stageNumber: 1,
    label: 'Stage 1',
    setsCount: 4,
    repsPerSet: 4,
    targetTotalReps: null,
    lastSetAmrap: 1,
    progressionTrigger: 'Advance if AMRAP reps are 4 or fewer.',
    sortOrder: 1,
  },
  {
    id: 'p-zero:t1:s2',
    tierId: 'p-zero:t1',
    stageNumber: 2,
    label: 'Stage 2',
    setsCount: 4,
    repsPerSet: 3,
    targetTotalReps: null,
    lastSetAmrap: 1,
    progressionTrigger: 'Advance if AMRAP reps are 3 or fewer.',
    sortOrder: 2,
  },
  {
    id: 'p-zero:t1:s3',
    tierId: 'p-zero:t1',
    stageNumber: 3,
    label: 'Stage 3',
    setsCount: 4,
    repsPerSet: 2,
    targetTotalReps: null,
    lastSetAmrap: 1,
    progressionTrigger: 'Advance if AMRAP reps are 2 or fewer.',
    sortOrder: 3,
  },
  {
    id: 'p-zero:t2:s1',
    tierId: 'p-zero:t2',
    stageNumber: 1,
    label: 'Stage 1',
    setsCount: 4,
    repsPerSet: 12,
    targetTotalReps: null,
    lastSetAmrap: 0,
    progressionTrigger: 'Advance when 48 total prescribed reps cannot be completed.',
    sortOrder: 1,
  },
  {
    id: 'p-zero:t2:s2',
    tierId: 'p-zero:t2',
    stageNumber: 2,
    label: 'Stage 2',
    setsCount: 4,
    repsPerSet: 10,
    targetTotalReps: null,
    lastSetAmrap: 0,
    progressionTrigger: 'Advance when 40 total prescribed reps cannot be completed.',
    sortOrder: 2,
  },
  {
    id: 'p-zero:t2:s3',
    tierId: 'p-zero:t2',
    stageNumber: 3,
    label: 'Stage 3',
    setsCount: 4,
    repsPerSet: 8,
    targetTotalReps: null,
    lastSetAmrap: 0,
    progressionTrigger: 'Advance when 32 total prescribed reps cannot be completed.',
    sortOrder: 3,
  },
  {
    id: 'p-zero:t3:s1',
    tierId: 'p-zero:t3',
    stageNumber: 1,
    label: 'Stage 1',
    setsCount: null,
    repsPerSet: null,
    targetTotalReps: 60,
    lastSetAmrap: 0,
    progressionTrigger: 'Complete 60 total reps.',
    sortOrder: 1,
  },
  {
    id: 'p-zero:t3:s2',
    tierId: 'p-zero:t3',
    stageNumber: 2,
    label: 'Stage 2',
    setsCount: null,
    repsPerSet: null,
    targetTotalReps: 45,
    lastSetAmrap: 0,
    progressionTrigger: 'Complete 45 total reps.',
    sortOrder: 2,
  },
  {
    id: 'p-zero:t3:s3',
    tierId: 'p-zero:t3',
    stageNumber: 3,
    label: 'Stage 3',
    setsCount: null,
    repsPerSet: null,
    targetTotalReps: 30,
    lastSetAmrap: 0,
    progressionTrigger: 'Complete 30 total reps.',
    sortOrder: 3,
  },
] as const;

export async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync('PRAGMA journal_mode = WAL;');

  await db.withExclusiveTransactionAsync(async (txn) => {
    await txn.execAsync('PRAGMA foreign_keys = ON;');
    await createProgramDefinitionTables(txn);
    await migrateLegacyWorkoutTables(txn);
    await createWorkoutTrackingTables(txn);
    await createIndexes(txn);
    await seedPZeroTemplate(txn);
  });
}

async function createProgramDefinitionTables(db: DatabaseExecutor) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS program_templates (
      id TEXT PRIMARY KEY NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tier_definitions (
      id TEXT PRIMARY KEY NOT NULL,
      program_template_id TEXT NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      training_max_strategy TEXT NOT NULL,
      progression_rule TEXT,
      sort_order INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(program_template_id, code),
      FOREIGN KEY (program_template_id) REFERENCES program_templates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS stage_definitions (
      id TEXT PRIMARY KEY NOT NULL,
      tier_definition_id TEXT NOT NULL,
      stage_number INTEGER NOT NULL,
      label TEXT NOT NULL,
      sets_count INTEGER,
      reps_per_set INTEGER,
      target_total_reps INTEGER,
      last_set_amrap INTEGER NOT NULL DEFAULT 0,
      progression_trigger TEXT,
      sort_order INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(tier_definition_id, stage_number),
      FOREIGN KEY (tier_definition_id) REFERENCES tier_definitions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exercise_definitions (
      id TEXT PRIMARY KEY NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      default_equipment TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS workout_day_templates (
      id TEXT PRIMARY KEY NOT NULL,
      program_template_id TEXT NOT NULL,
      day_code TEXT NOT NULL,
      day_number INTEGER NOT NULL,
      name TEXT NOT NULL,
      focus_label TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(program_template_id, day_code),
      UNIQUE(program_template_id, day_number),
      FOREIGN KEY (program_template_id) REFERENCES program_templates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS template_exercises (
      id TEXT PRIMARY KEY NOT NULL,
      program_template_id TEXT NOT NULL,
      exercise_definition_id TEXT NOT NULL,
      tier_definition_id TEXT NOT NULL,
      display_name TEXT,
      day_slot TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_optional INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(program_template_id, exercise_definition_id, tier_definition_id, day_slot),
      FOREIGN KEY (program_template_id) REFERENCES program_templates(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_definition_id) REFERENCES exercise_definitions(id) ON DELETE CASCADE,
      FOREIGN KEY (tier_definition_id) REFERENCES tier_definitions(id) ON DELETE CASCADE
    );
  `);
}

async function createWorkoutTrackingTables(db: DatabaseExecutor) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_sessions (
      id TEXT PRIMARY KEY NOT NULL,
      program_template_id TEXT,
      title TEXT NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT,
      notes TEXT,
      FOREIGN KEY (program_template_id) REFERENCES program_templates(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS exercise_entries (
      id TEXT PRIMARY KEY NOT NULL,
      session_id TEXT NOT NULL,
      exercise_definition_id TEXT,
      template_exercise_id TEXT,
      tier_definition_id TEXT,
      stage_definition_id TEXT,
      name TEXT NOT NULL,
      position INTEGER NOT NULL,
      FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_definition_id) REFERENCES exercise_definitions(id) ON DELETE SET NULL,
      FOREIGN KEY (template_exercise_id) REFERENCES template_exercises(id) ON DELETE SET NULL,
      FOREIGN KEY (tier_definition_id) REFERENCES tier_definitions(id) ON DELETE SET NULL,
      FOREIGN KEY (stage_definition_id) REFERENCES stage_definitions(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS set_entries (
      id TEXT PRIMARY KEY NOT NULL,
      exercise_entry_id TEXT NOT NULL,
      planned_reps INTEGER,
      completed_reps INTEGER,
      planned_weight REAL,
      completed_weight REAL,
      is_amrap INTEGER NOT NULL DEFAULT 0,
      completed INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL,
      FOREIGN KEY (exercise_entry_id) REFERENCES exercise_entries(id) ON DELETE CASCADE
    );
  `);
}

async function createIndexes(db: DatabaseExecutor) {
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_tier_definitions_template
      ON tier_definitions(program_template_id, sort_order);

    CREATE INDEX IF NOT EXISTS idx_stage_definitions_tier
      ON stage_definitions(tier_definition_id, sort_order);

    CREATE INDEX IF NOT EXISTS idx_workout_day_templates_program
      ON workout_day_templates(program_template_id, day_number);

    CREATE INDEX IF NOT EXISTS idx_template_exercises_template
      ON template_exercises(program_template_id, day_slot, sort_order);

    CREATE INDEX IF NOT EXISTS idx_exercise_entries_session
      ON exercise_entries(session_id, position);

    CREATE INDEX IF NOT EXISTS idx_set_entries_exercise
      ON set_entries(exercise_entry_id, position);
  `);
}

async function seedPZeroTemplate(db: DatabaseExecutor) {
  await db.runAsync(
    `
      INSERT OR IGNORE INTO program_templates (id, slug, name, description)
      VALUES (?, ?, ?, ?)
    `,
    P_ZERO_TEMPLATE.id,
    P_ZERO_TEMPLATE.slug,
    P_ZERO_TEMPLATE.name,
    P_ZERO_TEMPLATE.description
  );

  for (const tier of P_ZERO_TIERS) {
    await db.runAsync(
      `
        INSERT OR IGNORE INTO tier_definitions (
          id,
          program_template_id,
          code,
          name,
          description,
          training_max_strategy,
          progression_rule,
          sort_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      tier.id,
      P_ZERO_TEMPLATE.id,
      tier.code,
      tier.name,
      tier.description,
      tier.trainingMaxStrategy,
      tier.progressionRule,
      tier.sortOrder
    );
  }

  for (const stage of P_ZERO_STAGES) {
    await db.runAsync(
      `
        INSERT OR IGNORE INTO stage_definitions (
          id,
          tier_definition_id,
          stage_number,
          label,
          sets_count,
          reps_per_set,
          target_total_reps,
          last_set_amrap,
          progression_trigger,
          sort_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      stage.id,
      stage.tierId,
      stage.stageNumber,
      stage.label,
      stage.setsCount,
      stage.repsPerSet,
      stage.targetTotalReps,
      stage.lastSetAmrap,
      stage.progressionTrigger,
      stage.sortOrder
    );
  }

  await seedPZeroSchedule(db);
}

async function seedPZeroSchedule(db: DatabaseExecutor) {
  for (const workout of P_ZERO_FULL_BODY_WORKOUTS) {
    await db.runAsync(
      `
        INSERT OR IGNORE INTO workout_day_templates (
          id,
          program_template_id,
          day_code,
          day_number,
          name,
          focus_label
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      workout.id,
      P_ZERO_TEMPLATE.id,
      workout.dayCode,
      workout.dayNumber,
      workout.name,
      workout.focusLabel
    );
  }

  for (const [slug, name] of P_ZERO_EXERCISE_DEFINITIONS) {
    await db.runAsync(
      `
        INSERT OR IGNORE INTO exercise_definitions (id, slug, name)
        VALUES (?, ?, ?)
      `,
      `exercise:${slug}`,
      slug,
      name
    );
  }

  for (const [id, dayCode, exerciseSlug, tierId, displayName, sortOrder] of P_ZERO_FULL_BODY_EXERCISES) {
    await db.runAsync(
      `
        INSERT OR IGNORE INTO template_exercises (
          id,
          program_template_id,
          exercise_definition_id,
          tier_definition_id,
          display_name,
          day_slot,
          sort_order,
          is_optional
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 0)
      `,
      id,
      P_ZERO_TEMPLATE.id,
      `exercise:${exerciseSlug}`,
      tierId,
      displayName,
      dayCode,
      sortOrder
    );
  }
}

async function migrateLegacyWorkoutTables(db: DatabaseExecutor) {
  await db.execAsync('PRAGMA foreign_keys = OFF;');

  try {
    await migrateTableIfNeeded(db, {
      tableName: 'workout_sessions',
      requiredColumns: [
        'id',
        'program_template_id',
        'title',
        'started_at',
        'completed_at',
        'notes',
      ],
      createSql: `
        CREATE TABLE workout_sessions (
          id TEXT PRIMARY KEY NOT NULL,
          program_template_id TEXT,
          title TEXT NOT NULL,
          started_at TEXT NOT NULL,
          completed_at TEXT,
          notes TEXT,
          FOREIGN KEY (program_template_id) REFERENCES program_templates(id) ON DELETE SET NULL
        )
      `,
      copySql: `
        INSERT INTO workout_sessions (id, program_template_id, title, started_at, completed_at, notes)
        SELECT id, NULL, title, started_at, completed_at, notes
        FROM workout_sessions_legacy
      `,
    });

    await migrateTableIfNeeded(db, {
      tableName: 'exercise_entries',
      requiredColumns: [
        'id',
        'session_id',
        'exercise_definition_id',
        'template_exercise_id',
        'tier_definition_id',
        'stage_definition_id',
        'name',
        'position',
      ],
      createSql: `
        CREATE TABLE exercise_entries (
          id TEXT PRIMARY KEY NOT NULL,
          session_id TEXT NOT NULL,
          exercise_definition_id TEXT,
          template_exercise_id TEXT,
          tier_definition_id TEXT,
          stage_definition_id TEXT,
          name TEXT NOT NULL,
          position INTEGER NOT NULL,
          FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
          FOREIGN KEY (exercise_definition_id) REFERENCES exercise_definitions(id) ON DELETE SET NULL,
          FOREIGN KEY (template_exercise_id) REFERENCES template_exercises(id) ON DELETE SET NULL,
          FOREIGN KEY (tier_definition_id) REFERENCES tier_definitions(id) ON DELETE SET NULL,
          FOREIGN KEY (stage_definition_id) REFERENCES stage_definitions(id) ON DELETE SET NULL
        )
      `,
      copySql: `
        INSERT INTO exercise_entries (
          id,
          session_id,
          exercise_definition_id,
          template_exercise_id,
          tier_definition_id,
          stage_definition_id,
          name,
          position
        )
        SELECT
          id,
          session_id,
          NULL,
          NULL,
          NULL,
          NULL,
          name,
          position
        FROM exercise_entries_legacy
      `,
    });

    await migrateTableIfNeeded(db, {
      tableName: 'set_entries',
      requiredColumns: [
        'id',
        'exercise_entry_id',
        'planned_reps',
        'completed_reps',
        'planned_weight',
        'completed_weight',
        'is_amrap',
        'completed',
        'position',
      ],
      createSql: `
        CREATE TABLE set_entries (
          id TEXT PRIMARY KEY NOT NULL,
          exercise_entry_id TEXT NOT NULL,
          planned_reps INTEGER,
          completed_reps INTEGER,
          planned_weight REAL,
          completed_weight REAL,
          is_amrap INTEGER NOT NULL DEFAULT 0,
          completed INTEGER NOT NULL DEFAULT 0,
          position INTEGER NOT NULL,
          FOREIGN KEY (exercise_entry_id) REFERENCES exercise_entries(id) ON DELETE CASCADE
        )
      `,
      copySql: `
        INSERT INTO set_entries (
          id,
          exercise_entry_id,
          planned_reps,
          completed_reps,
          planned_weight,
          completed_weight,
          is_amrap,
          completed,
          position
        )
        SELECT
          id,
          exercise_id,
          NULL,
          reps,
          NULL,
          weight,
          0,
          completed,
          position
        FROM set_entries_legacy
      `,
    });
  } finally {
    await db.execAsync('PRAGMA foreign_keys = ON;');
  }
}

type TableMigration = {
  tableName: string;
  requiredColumns: string[];
  createSql: string;
  copySql: string;
};

async function migrateTableIfNeeded(db: DatabaseExecutor, migration: TableMigration) {
  const exists = await tableExists(db, migration.tableName);

  if (!exists) {
    await db.execAsync(migration.createSql);
    return;
  }

  const columns = await getTableColumns(db, migration.tableName);
  const hasAllColumns = migration.requiredColumns.every((column) =>
    columns.includes(column)
  );

  if (hasAllColumns) {
    return;
  }

  const legacyTableName = `${migration.tableName}_legacy`;

  await db.execAsync(`
    DROP TABLE IF EXISTS ${legacyTableName};
    ALTER TABLE ${migration.tableName} RENAME TO ${legacyTableName};
    ${migration.createSql};
    ${migration.copySql};
    DROP TABLE ${legacyTableName};
  `);
}

async function tableExists(db: DatabaseExecutor, tableName: string) {
  const result = await db.getFirstAsync<{ name: string }>(
    `
      SELECT name
      FROM sqlite_master
      WHERE type = 'table' AND name = ?
    `,
    tableName
  );

  return Boolean(result);
}

async function getTableColumns(db: DatabaseExecutor, tableName: string) {
  const result = await db.getAllAsync<{ name: string }>(
    `PRAGMA table_info(${tableName})`
  );

  return result.map((column) => column.name);
}
