import React, { useState, useEffect } from 'react';
import { CurrentStatus } from './components/CurrentStatus';
import { ScheduleList } from './components/ScheduleList';
import { ReminderModal } from './components/ReminderModal';
import { EmailSubscription } from './components/EmailSubscription';
import { calculateSchedule } from './utils/dateUtils';
import type { ScheduleEntry } from './types';

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<ScheduleEntry | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    // Initialize schedule based on today
    const today = new Date();
    const generatedSchedule = calculateSchedule(today, 0, 11); // Show current + next 11 weeks
    setSchedule(generatedSchedule);
    
    // Find current week
    const current = generatedSchedule.find(s => s.isCurrentWeek);
    if (current) {
      setCurrentEntry(current);
    }
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-gray-50/50">
      {/* Decorative background header */}
      <div className="h-72 bg-gray-900 w-full absolute top-0 left-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px'}}>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-12">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4 shadow-xl ring-1 ring-white/10 group transition-transform hover:scale-105 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">BinDuty</h1>
          <p className="text-gray-300 text-lg max-w-xs mx-auto font-light leading-relaxed">Weekly garbage disposal rota for the building</p>
        </header>

        <main className="space-y-8">
          {currentEntry && (
            <CurrentStatus 
              entry={currentEntry} 
              onOpenReminder={() => setShowReminderModal(true)} 
            />
          )}

          <ScheduleList schedule={schedule} />

          <EmailSubscription />
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Building Management System</p>
        </footer>
      </div>

      {showReminderModal && currentEntry && (
        <ReminderModal 
          entry={currentEntry} 
          onClose={() => setShowReminderModal(false)} 
        />
      )}
    </div>
  );
};

export default App;