import { ANCHOR_DATE, APARTMENTS, MS_PER_WEEK } from '../constants';
import type { ScheduleEntry } from '../types';

// Reset time to 00:00:00 for accurate day calculations
export const startOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

// Get the Monday of the week for a given date
export const getMonday = (date: Date): Date => {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const calculateSchedule = (targetDate: Date, weeksBefore = 2, weeksAfter = 10): ScheduleEntry[] => {
  const anchorMonday = getMonday(ANCHOR_DATE);
  const currentMonday = getMonday(targetDate);
  const schedule: ScheduleEntry[] = [];

  // Calculate the starting point relative to the view
  // We want to generate a list starting from `weeksBefore` ago
  
  const totalApartments = APARTMENTS.length;
  
  // Start generation loop
  for (let i = -weeksBefore; i <= weeksAfter; i++) {
    const weekStart = new Date(currentMonday.getTime() + (i * MS_PER_WEEK));
    const weekEnd = new Date(weekStart.getTime() + (6 * 24 * 60 * 60 * 1000)); // Sunday

    // Calculate difference in weeks from anchor
    // We use Math.round to handle potential DST minor offsets
    const diffTime = weekStart.getTime() - anchorMonday.getTime();
    const diffWeeks = Math.round(diffTime / MS_PER_WEEK);

    // Calculate index. JavaScript % operator can return negative for negative inputs,
    // so we handle that math carefully.
    let aptIndex = diffWeeks % totalApartments;
    if (aptIndex < 0) {
      aptIndex = totalApartments + aptIndex;
    }

    schedule.push({
      startDate: weekStart,
      endDate: weekEnd,
      apartment: APARTMENTS[aptIndex],
      isCurrentWeek: i === 0
    });
  }

  return schedule;
};