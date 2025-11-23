import React from 'react';
import type { ScheduleEntry } from '../types';
import { formatDate } from '../utils/dateUtils';
import { TrashIcon } from './Icons';

interface CurrentStatusProps {
  entry: ScheduleEntry;
  onOpenReminder: () => void;
}

export const CurrentStatus: React.FC<CurrentStatusProps> = ({ entry, onOpenReminder }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-emerald-100 font-medium uppercase tracking-wider text-sm mb-2">Current Duty</h2>
        <div className="flex flex-col items-center justify-center mb-1">
          <div className="flex items-center gap-3">
            <TrashIcon className="w-8 h-8 opacity-90" />
            <h1 className="text-4xl font-bold tracking-tight">{entry.apartment.name}</h1>
          </div>
          <p className="text-emerald-100 text-lg font-medium mt-1">{entry.apartment.residents}</p>
        </div>
        <p className="text-emerald-100 mt-2 font-light text-sm opacity-90">
          {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
        </p>
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">
            <p>Don't forget to take the bins out on collection day!</p>
          </div>
          <button 
            disabled
            onClick={onOpenReminder}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-none opacity-70"
            title="Notification disabled"
          >
            <span>Notify Neighbor</span>
          </button>
        </div>
      </div>
    </div>
  );
};