// src/utils/timeUtils.ts

/**
 * Convert "HH:mm" into a timestamp for today.
 * If the time has already passed today, it schedules for tomorrow.
 */

export type Weekday =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

const WEEKDAY_MAP: Record<Weekday, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

// export function getTodayTimestamp(time: string): number {
//   const [hourStr, minuteStr] = time.split(':');

//   const hour = Number(hourStr);
//   const minute = Number(minuteStr);

//   if (
//     Number.isNaN(hour) ||
//     Number.isNaN(minute) ||
//     hour < 0 ||
//     hour > 23 ||
//     minute < 0 ||
//     minute > 59
//   ) {
//     throw new Error(`Invalid time format: ${time}`);
//   }

//   const now = new Date();
//   const scheduled = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     hour,
//     minute,
//     0,
//     0
//   );

//   if (scheduled.getTime() <= Date.now()) {
//     scheduled.setDate(scheduled.getDate() + 1);
//   }

//   return scheduled.getTime();
// }

export function getNextWeekdayTimestamp(
  time: string,
  weekday: Weekday
): number {
  const [hourStr, minuteStr] = time.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  const now = new Date();
  const target = new Date(now);

  target.setHours(hour, minute, 0, 0);

  const currentDay = now.getDay();
  const targetDay = WEEKDAY_MAP[weekday];

  let daysUntil = (targetDay - currentDay + 7) % 7;

  // If today is target day but time already passed → next week
  if (daysUntil === 0 && target.getTime() <= now.getTime()) {
    daysUntil = 7;
  }

  target.setDate(now.getDate() + daysUntil);

  return target.getTime();
}

// /**
//  * Convert multiple "HH:mm" times into timestamps.
//  */
// export function getMultipleTodayTimestamps(times: string[]): number[] {
//   return times.map(getTodayTimestamp);
// }

/**
 * Check if a time string is valid "HH:mm" format.
 */
export function isValidTime(time: string): boolean {
  const [hourStr, minuteStr] = time.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  return (
    !Number.isNaN(hour) &&
    !Number.isNaN(minute) &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59
  );
}

// /**
//  * Get timestamp for next N days at a specific time.
//  */
// export function getNextDayTimestamp(time: string, daysFromNow = 1): number {
//   const [hourStr, minuteStr] = time.split(':');
//   const hour = Number(hourStr);
//   const minute = Number(minuteStr);

//   const now = new Date();
//   const scheduled = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate() + daysFromNow,
//     hour,
//     minute,
//     0,
//     0
//   );

//   return scheduled.getTime();
// }

// /**
//  * Get human-readable date string from timestamp.
//  */
// export function formatTimestamp(timestamp: number): string {
//   return new Date(timestamp).toLocaleString();
// }

export function getReminderIdFromTime( 
  weekday: Weekday,
  time: string
): string {
  return `reminder_${weekday}_${time.replace(':', '_')}`;
}
