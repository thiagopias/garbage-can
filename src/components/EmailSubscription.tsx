import React, { useState } from 'react';
import { MailIcon, CheckIcon } from './Icons';

export const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl overflow-hidden mt-8 text-white relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-400 opacity-10 rounded-full blur-2xl"></div>
      
      <div className="p-6 sm:p-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-xl mb-4 border border-white/10 shadow-inner">
              <MailIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Receba Lembretes Semanais</h3>
            <p className="text-indigo-100 max-w-lg mx-auto lg:mx-0">
              Nunca mais esqueça sua vez! Inscreva-se para receber notificações por email quando a semana de responsabilidade do seu apartamento começar.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[300px] max-w-md">
            {status === 'success' ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 animate-fade-in shadow-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full mb-3 shadow-lg ring-4 ring-emerald-500/20">
                  <CheckIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lg">Inscrito!</h4>
                <p className="text-indigo-100 text-sm mt-1">Tudo pronto para receber lembretes.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs font-medium text-white/70 hover:text-white underline transition-colors"
                >
                  Cadastrar outro email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-2 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-0 bg-gray-50 border border-transparent focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:transform active:scale-95"
                >
                  {status === 'loading' ? (
                     <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : 'Inscrever-se'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};