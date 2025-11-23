import React from 'react';
import type { ScheduleEntry } from '../types';
import { formatDateShort } from '../utils/dateUtils';
import { CalendarIcon, TruckIcon } from './Icons';

interface ScheduleListProps {
  schedule: ScheduleEntry[];
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ schedule }) => {
  const getCollectionDates = (startDate: Date) => {
    // Mon (0), Wed (2), Fri (4)
    const offsets = [0, 2, 4]; 
    return offsets.map(offset => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + offset);
      return d;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
             <CalendarIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Próximos Agendamentos</h3>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <TruckIcon className="w-3.5 h-3.5" />
          <span>Coleta: Seg, Qua, Sex</span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {schedule.map((entry, index) => {
          const isPast = !entry.isCurrentWeek && entry.endDate < new Date();
          if (isPast) return null;

          // Filter out apartments without residents
          const hasResidents = entry.apartment.residents && entry.apartment.residents.trim().length > 0;
          if (!hasResidents) return null;

          const collectionDates = getCollectionDates(entry.startDate);

          return (
            <div 
              key={index} 
              className={`p-4 sm:px-6 transition-colors ${
                entry.isCurrentWeek ? 'bg-emerald-50/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Left side: Date & Apartment */}
                <div className="flex flex-col gap-2 flex-1">
                   <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                      <span>{formatDateShort(entry.startDate)}</span>
                      <span className="text-gray-300">→</span>
                      <span>{formatDateShort(entry.endDate)}</span>
                   </div>
                   
                   <div className="flex items-start gap-3">
                     <div className={`w-1.5 self-stretch rounded-full ${entry.apartment.color.split(' ')[0]} shrink-0 mt-1`}></div>
                     <div>
                       <div className="flex items-center gap-2 flex-wrap">
                         <span className={`font-semibold text-lg ${entry.isCurrentWeek ? 'text-gray-900' : 'text-gray-800'}`}>
                           {entry.apartment.name}
                         </span>
                        {entry.isCurrentWeek && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                            Atual
                          </span>
                        )}
                       </div>
                       <p className="text-sm text-gray-500 mt-0.5">
                         {entry.apartment.residents}
                       </p>
                     </div>
                   </div>
                </div>

                {/* Right side: Specific Collection Dates */}
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center sm:justify-end gap-1">
                    <TruckIcon className="w-3 h-3" />
                    Dias de Coleta
                  </div>
                  <div className="flex flex-wrap sm:justify-end gap-2">
                    {collectionDates.map((date, idx) => (
                      <div key={idx} className="flex flex-col items-center bg-white border border-gray-100 rounded-md px-2 py-1 shadow-sm min-w-[50px]">
                        <span className="text-[10px] text-gray-400 font-medium uppercase">
                          {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </span>
                        <span className="text-sm font-bold text-gray-700">
                          {date.getDate()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
         <p className="text-xs text-gray-400">O rodízio se repete a cada 6 semanas</p>
      </div>
    </div>
  );
};