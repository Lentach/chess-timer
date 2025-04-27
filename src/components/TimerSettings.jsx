import React, { useState } from 'react';

export default function TimerSettings({ initialMinutes, onStart, onReset, isRunning }) {
  const [minutes, setMinutes] = useState(initialMinutes);

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value)));
    setMinutes(value);
  };

  const handleStart = () => {
    onStart(minutes);
  };

  return (
    <form className="flex items-center gap-4 mb-6" onSubmit={e => e.preventDefault()}>
      <label htmlFor="minutes" className="text-gray-700 dark:text-gray-200 font-medium">Minutes per player:</label>
      <input
        id="minutes"
        type="number"
        min={1}
        max={99}
        value={minutes}
        onChange={handleChange}
        disabled={isRunning}
        className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={handleStart}
        disabled={isRunning}
        className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        Start
      </button>
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 rounded bg-gray-400 text-white font-semibold hover:bg-gray-500 disabled:opacity-50"
        disabled={!isRunning}
      >
        Reset
      </button>
    </form>
  );
} 