import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export function Stats() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 flex justify-between items-center">
        <Link to="/" className="text-blue-400 hover:text-blue-300">&larr; Back to Menu</Link>
        <h2 className="text-2xl font-bold">Your Stats</h2>
      </div>
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl">
        {user ? (
          <div className="space-y-4 text-slate-300">
            <p><strong className="text-blue-400">Account:</strong> {user.isAnonymous ? 'Guest' : user.email}</p>
            <p><strong className="text-blue-400">Games Played:</strong> 0</p>
            <p><strong className="text-blue-400">Wins:</strong> 0</p>
            <p><strong className="text-blue-400">Losses:</strong> 0</p>
            <p><strong className="text-blue-400">Draws:</strong> 0</p>
          </div>
        ) : (
          <p className="text-slate-400 text-center">Sign in to view your stats.</p>
        )}
      </div>
    </div>
  );
}
