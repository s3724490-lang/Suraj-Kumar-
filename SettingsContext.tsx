import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  soundEnabled: boolean;
  pieceStyle: string;
  boardTheme: string;
  avatar: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Felix',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Sam',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Max',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Leo',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Zoe'
];

export const BOARD_THEMES: Record<string, { light: string; dark: string }> = {
  wood: { light: '#F0D9B5', dark: '#B58863' },
  green: { light: '#FFFFDD', dark: '#86A666' },
  blue: { light: '#DEE3E6', dark: '#8CA2AD' },
  brown: { light: '#ECDAB9', dark: '#C5A076' },
  purple: { light: '#E3E3FF', dark: '#8877B7' }
};

export const PIECE_STYLES = [
  { id: 'neo', name: 'Neo (Modern)' },
  { id: 'alpha', name: 'Alpha (Classic)' },
  { id: 'wood', name: 'Wood (2D)' },
  { id: 'glass', name: 'Glass (2D)' },
  { id: '3d_wood', name: '3D Wood' },
  { id: '3d_plastic', name: '3D Plastic' },
  { id: '3d_staunton', name: '3D Staunton' },
  { id: 'neo_wood', name: 'Neo Wood' }
];

const defaultSettings: Settings = {
  soundEnabled: true,
  pieceStyle: '3d_plastic',
  boardTheme: 'wood',
  avatar: AVATARS[0]
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('chessSettings');
    let parsedSettings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    
    // Migrate old 3d-wood and 3d-plastic to 3d_wood and 3d_plastic
    if (parsedSettings.pieceStyle === '3d-wood') parsedSettings.pieceStyle = '3d_wood';
    if (parsedSettings.pieceStyle === '3d-plastic') parsedSettings.pieceStyle = '3d_plastic';
    
    // Force update to 3d_plastic if they were using the old default neo_wood
    if (parsedSettings.pieceStyle === 'neo_wood') parsedSettings.pieceStyle = '3d_plastic';
    
    return parsedSettings;
  });

  useEffect(() => {
    localStorage.setItem('chessSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
