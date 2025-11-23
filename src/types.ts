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
  Friendly: 'Amigável',
  Professional: 'Profissional',
  Urgent: 'Urgente',
  Funny: 'Divertido'
} as const;

export type ReminderTone = typeof ReminderToneValues[keyof typeof ReminderToneValues];