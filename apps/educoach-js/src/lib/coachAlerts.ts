/** In-memory coach_alert side channel (PoC). Never merge into learner `reply`. */

export type CoachAlertRecord = {
  id: string;
  text: string;
  studentId: string;
  studentLabel: string;
  route: "tutor" | "helper" | "analyzer";
  at: string;
};

const MAX = 50;
const store: CoachAlertRecord[] = [];

export function appendCoachAlert(
  alert: Omit<CoachAlertRecord, "id" | "at"> & { at?: string },
): CoachAlertRecord {
  const record: CoachAlertRecord = {
    id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: alert.text,
    studentId: alert.studentId,
    studentLabel: alert.studentLabel,
    route: alert.route,
    at: alert.at ?? new Date().toISOString(),
  };
  store.unshift(record);
  if (store.length > MAX) store.length = MAX;
  return record;
}

export function listCoachAlerts(limit = 20): CoachAlertRecord[] {
  return store.slice(0, limit);
}
