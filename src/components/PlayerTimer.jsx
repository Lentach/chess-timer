import React from 'react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PlayerTimer({ name, seconds, isActive, isRunning, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!isActive || !isRunning}
      className={`w-full flex flex-col items-center p-4 rounded-lg border-2 transition-all
        ${isActive ? 'border-indigo-500 dark:border-yellow-400' : 'border-gray-300 dark:border-gray-600'}
        ${isActive && isRunning ? 'animate-pulse' : ''}
        bg-gray-50 dark:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        mb-2`}
      aria-pressed={isActive}
      aria-label={`Timer for ${name}${isActive ? ', active' : ''}`}
    >
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{name}</span>
      <span className="text-3xl font-mono font-bold text-gray-900 dark:text-yellow-300">{formatTime(seconds)}</span>
    </button>
  );
} 