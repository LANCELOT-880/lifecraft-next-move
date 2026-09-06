const REMINDER_KEY = "lifecraft.reminder.v1";

interface ReminderMetadata {
  lastShownDate: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hasReachedLocalTime(reminderTime: string): boolean {
  const timeParts = reminderTime.split(":");
  if (timeParts.length !== 2) return false;

  const hours = Number(timeParts[0]);
  const minutes = Number(timeParts[1]);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return false;

  const now = new Date();
  return now.getHours() * 60 + now.getMinutes() >= hours * 60 + minutes;
}

function read(): ReminderMetadata | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(REMINDER_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof (parsed as { lastShownDate?: unknown }).lastShownDate !== "string"
    ) {
      return null;
    }
    return { lastShownDate: (parsed as { lastShownDate: string }).lastShownDate };
  } catch {
    return null;
  }
}

export const reminderStore = {
  shouldShowToday(dailyReminderTime: string): boolean {
    return read()?.lastShownDate !== getLocalDate() && hasReachedLocalTime(dailyReminderTime);
  },
  markShownToday(): boolean {
    if (!isBrowser()) return false;

    try {
      window.localStorage.setItem(
        REMINDER_KEY,
        JSON.stringify({ lastShownDate: getLocalDate() } satisfies ReminderMetadata),
      );
      return true;
    } catch {
      return false;
    }
  },
};
