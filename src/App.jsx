import React, { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import TimerSettings from './components/TimerSettings';
import ChessTimer from './components/ChessTimer';

export default function App() {
  const [initialMinutes, setInitialMinutes] = useState(5);
  const [key, setKey] = useState(0); // for resetting ChessTimer
  const [isRunning, setIsRunning] = useState(false);

  // Start the game with selected minutes
  const handleStart = (minutes) => {
    setInitialMinutes(minutes);
    setKey(prev => prev + 1); // force ChessTimer remount
    setIsRunning(true);
  };

  // Reset the game
  const handleReset = () => {
    setKey(prev => prev + 1);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Chess Timer</h1>
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <TimerSettings
            initialMinutes={initialMinutes}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={isRunning}
          />
          <ChessTimer key={key} initialMinutes={initialMinutes} />
        </div>
      </main>
    </div>
  );
} 