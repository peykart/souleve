export type WorkoutSession = {
  id: string;
  title: string;
  startedAt: string;
  completedAt?: string | null;
  notes?: string | null;
};
