import React, { useState } from 'react';
import type { ScheduleEntry, ReminderTone } from '../types';
import { ReminderToneValues } from '../types';
import { generateReminderMessage } from '../services/geminiService';
import { SparklesIcon, CopyIcon, CheckIcon } from './Icons';
import { formatDateShort } from '../utils/dateUtils';

interface ReminderModalProps {
  entry: ScheduleEntry;
  onClose: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ entry, onClose }) => {
  const [tone, setTone] = useState<ReminderTone>(ReminderToneValues.Friendly);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedText('');
    const text = await generateReminderMessage(
      entry.apartment.name,
      formatDateShort(entry.startDate),
      formatDateShort(entry.endDate),
      tone
    );
    setGeneratedText(text);
    setIsLoading(false);
    setIsCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-indigo-500" />
            AI Reminder Generator
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(ReminderToneValues).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                    tone === t
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium ring-1 ring-indigo-200'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
             <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-medium shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  Generate Message
                </>
              )}
            </button>
          </div>

          {generatedText && (
            <div className="mt-4 animate-fade-in">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Preview</label>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                <p className="text-gray-800 text-sm leading-relaxed">{generatedText}</p>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-md shadow-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Copy to clipboard"
                >
                  {isCopied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Copy and paste this into your building's group chat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};