import React, { useState, useCallback } from 'react';
import useTimer from '../hooks/useTimer';
import PlayerTimer from './PlayerTimer';

const PLAYER_1 = 'White';
const PLAYER_2 = 'Black';

export default function ChessTimer({ initialMinutes }) {
  const initialSeconds = initialMinutes * 60;
  const [activePlayer, setActivePlayer] = useState(PLAYER_1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  // Player 1 timer
  const timer1 = useTimer(initialSeconds, {
    onExpire: () => {
      setGameOver(true);
      setWinner(PLAYER_2);
    },
  });
  // Player 2 timer
  const timer2 = useTimer(initialSeconds, {
    onExpire: () => {
      setGameOver(true);
      setWinner(PLAYER_1);
    },
  });

  // Start both timers, but only active player's timer runs
  const handleStart = useCallback(() => {
    setIsStarted(true);
    setGameOver(false);
    setWinner(null);
    if (activePlayer === PLAYER_1) {
      timer1.start();
      timer2.pause();
    } else {
      timer2.start();
      timer1.pause();
    }
  }, [activePlayer, timer1, timer2]);

  // Pause both timers
  const handlePause = () => {
    timer1.pause();
    timer2.pause();
  };

  // Resume the active player's timer
  const handleResume = () => {
    if (activePlayer === PLAYER_1) timer1.start();
    else timer2.start();
  };

  // Reset both timers
  const handleReset = useCallback(() => {
    setIsStarted(false);
    setGameOver(false);
    setWinner(null);
    timer1.reset(initialSeconds);
    timer2.reset(initialSeconds);
    setActivePlayer(PLAYER_1);
  }, [timer1, timer2, initialSeconds]);

  // Switch turns
  const handleSwitch = () => {
    if (!isStarted || gameOver) return;
    if (activePlayer === PLAYER_1) {
      timer1.pause();
      timer2.start();
      setActivePlayer(PLAYER_2);
    } else {
      timer2.pause();
      timer1.start();
      setActivePlayer(PLAYER_1);
    }
  };

  // Game over: disable all controls
  const controlsDisabled = gameOver || !isStarted;

  return (
    <div className="flex flex-col gap-4">
      <PlayerTimer
        name={PLAYER_1}
        seconds={timer1.seconds}
        isActive={activePlayer === PLAYER_1}
        isRunning={timer1.isRunning && isStarted && !gameOver}
        onClick={handleSwitch}
      />
      <PlayerTimer
        name={PLAYER_2}
        seconds={timer2.seconds}
        isActive={activePlayer === PLAYER_2}
        isRunning={timer2.isRunning && isStarted && !gameOver}
        onClick={handleSwitch}
      />
      <div className="flex justify-center gap-4 mt-2">
        {!isStarted ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            disabled={gameOver}
          >
            Start
          </button>
        ) : timer1.isRunning || timer2.isRunning ? (
          <button
            onClick={handlePause}
            className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
            disabled={gameOver}
          >
            Resume
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded bg-gray-400 text-white font-semibold hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
      {gameOver && (
        <div className="mt-4 text-center text-xl font-bold text-red-600 dark:text-red-400">
          Game Over! Winner: {winner}
        </div>
      )}
      <div className="mt-2 text-center text-gray-600 dark:text-gray-300">
        {isStarted && !gameOver && (
          <span>Current turn: <span className="font-semibold">{activePlayer}</span></span>
        )}
      </div>
    </div>
  );
} 