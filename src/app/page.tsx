'use client'

import { useState } from 'react';
import { joinWaitlist } from './actions';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('pending');
    setMessage('');

    try {
      const result = await joinWaitlist(formData);
      if (result.success) {
        setStatus('success');
        setMessage('You have been added to the waitlist!');
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An unexpected error occurred.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 selection:bg-yellow-200">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase bg-yellow-400 text-black rounded-full">
          JOIN WAITLIST
        </span>

        <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-slate-950 mb-6">
          prom<span className="text-yellow-400">win</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium max-w-lg mx-auto leading-tight">
          The premium marketplace for creators to monetize AI prompts.
        </p>

        <form action={handleSubmit} className="relative max-w-md mx-auto group">
          <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm group-focus-within:border-yellow-400 transition-all">
            <input
              name="email"
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-3 rounded-xl bg-transparent text-slate-900 focus:outline-none placeholder-slate-400"
              required
              disabled={status === 'pending' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'pending' || status === 'success'}
              className="yellow-glow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap px-8 py-3 bg-yellow-400 hover:bg-black hover:text-white text-black font-bold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 min-w-[160px]"
            >
              {status === 'pending' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Joining...</span>
                </>
              ) : status === 'success' ? (
                'Added!'
              ) : (
                'Get Early Access'
              )}
            </button>
          </div>

          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-full bg-yellow-100 blur-2xl opacity-30 rounded-full"></div>

          {message && (
            <p className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 font-medium text-sm">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> 0% Listing Fees
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Verified Prompts
          </span>
        </div>
      </div>
    </div>
  );
}
