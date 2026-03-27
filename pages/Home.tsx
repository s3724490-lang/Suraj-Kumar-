import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export function Home() {
  const { user, signIn, logOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-8 text-blue-400">Chess App</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link to="/local" className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-center font-semibold text-lg transition-colors">
          Play Locally (Pass & Play)
        </Link>
        <Link to="/cpu" className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-center font-semibold text-lg transition-colors">
          Play vs Computer
        </Link>
        <Link to={`/game/${Math.random().toString(36).substring(2, 9)}`} className="bg-blue-600 hover:bg-blue-500 p-4 rounded-xl text-center font-semibold text-lg transition-colors">
          Play Online
        </Link>
        <Link to="/learn" className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-center font-semibold text-lg transition-colors">
          Learn Chess
        </Link>
        <Link to="/stats" className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-center font-semibold text-lg transition-colors">
          Your Stats
        </Link>
      </div>

      <div className="mt-12 text-center">
        {user ? (
          <div>
            <p className="mb-4 text-slate-400">Logged in as {user.isAnonymous ? 'Guest' : user.email}</p>
            {!user.isAnonymous && (
              <button onClick={logOut} className="text-sm text-red-400 hover:text-red-300">Sign Out</button>
            )}
            {user.isAnonymous && (
              <button onClick={signIn} className="text-sm text-blue-400 hover:text-blue-300">Sign in with Google to save progress</button>
            )}
          </div>
        ) : (
          <button onClick={signIn} className="text-sm text-blue-400 hover:text-blue-300">Sign in with Google</button>
        )}
      </div>
    </div>
  );
}
