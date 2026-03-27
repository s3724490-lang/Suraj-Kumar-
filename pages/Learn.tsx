import React from 'react';
import { Link } from 'react-router-dom';

export function Learn() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 flex justify-between items-center">
        <Link to="/" className="text-blue-400 hover:text-blue-300">&larr; Back to Menu</Link>
        <h2 className="text-2xl font-bold">Learn Chess</h2>
      </div>
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Basic Rules</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>The game is played on an 8x8 grid.</li>
          <li>White moves first, then players alternate turns.</li>
          <li>The goal is to checkmate the opponent's king.</li>
          <li>Checkmate happens when the king is under attack and cannot escape.</li>
        </ul>
        <div className="mt-8 text-center">
          <p className="text-slate-400 italic">More lessons coming soon!</p>
        </div>
      </div>
    </div>
  );
}
