import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { SettingsProvider } from './SettingsContext';
import { Home } from './pages/Home';
import { LocalGame } from './pages/LocalGame';
import { OnlineGame } from './pages/OnlineGame';
import { CpuGame } from './pages/CpuGame';
import { Learn } from './pages/Learn';
import { Stats } from './pages/Stats';

import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/local" element={<LocalGame />} />
              <Route path="/cpu" element={<CpuGame />} />
              <Route path="/game/:gameId" element={<OnlineGame />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}
