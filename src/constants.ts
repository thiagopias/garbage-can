import type { Apartment } from './types';

// The reference anchor: 2025-11-24 starts the cycle with Apt 1
export const ANCHOR_DATE = new Date('2025-11-24T00:00:00'); 
export const ANCHOR_APT_INDEX = 0; // Apt 1 is index 0

export const APARTMENTS: Apartment[] = [
  { id: 1, name: 'Apartment 1', residents: 'Thiago and Ian', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 2, name: 'Apartment 2', residents: 'Claus Gabilan', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 3, name: 'Apartment 3', residents: 'Cacau and Cristal', color: 'bg-violet-100 text-violet-800 border-violet-200' },
  { id: 4, name: 'Apartment 4', residents: 'Luisa and Kelvin', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 5, name: 'Apartment 5', residents: 'No resident', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 6, name: 'Apartment 6', residents: 'Carol', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
];

export const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const MS_PER_WEEK = MS_PER_DAY * 7;