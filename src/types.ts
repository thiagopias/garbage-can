export interface Apartment {
  id: number;
  name: string;
  residents: string;
  color: string;
}

export interface ScheduleEntry {
  startDate: Date;
  endDate: Date;
  apartment: Apartment;
  isCurrentWeek: boolean;
}

export const ReminderToneValues = {
  Friendly: 'Friendly',
  Professional: 'Professional',
  Urgent: 'Urgent',
  Funny: 'Funny'
} as const;

export type ReminderTone = typeof ReminderToneValues[keyof typeof ReminderToneValues];