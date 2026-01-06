
import React, { useState } from 'react';
import { Layout } from './components/Layout.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { AuctionRoom } from './components/AuctionRoom.tsx';
import { Settings } from './components/Settings.tsx';
import { Login } from './components/Login.tsx';
import { League, User, UserRole, Player } from './types.ts';

export interface UserSettings {
  showPlayerImages: boolean;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'auction' | 'settings'>('dashboard');
  const [selectedLeague, setSelectedLeague] = useState<League>(League.IPL);
  const [customPlayers, setCustomPlayers] = useState<Player[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    showPlayerImages: true,
  });

  const handleLogin = (name: string, role: UserRole, teamId?: string) => {
    setUser({ id: Math.random().toString(36).substr(2, 9), name, role, selectedTeamId: teamId });
  };

  const startAuction = (league: League) => {
    setSelectedLeague(league);
    setCurrentView('auction');
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleImportCustomPool = (players: Player[]) => {
    setCustomPlayers(players);
  };

  const handleAddCustomPlayer = (player: Player) => {
    setCustomPlayers(prev => [...prev, player]);
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user}
      currentLeague={selectedLeague} 
      onLeagueChange={setSelectedLeague}
      onNavigate={setCurrentView}
      onLogout={() => setUser(null)}
      currentView={currentView}
    >
      {currentView === 'dashboard' ? (
        <Dashboard 
          user={user} 
          onStartAuction={startAuction} 
          onImportCustomPool={handleImportCustomPool} 
          onAddCustomPlayer={handleAddCustomPlayer}
          customPoolSize={customPlayers.length}
        />
      ) : currentView === 'settings' ? (
        <Settings 
          settings={userSettings} 
          onUpdateSettings={handleUpdateSettings} 
          onBack={backToDashboard}
        />
      ) : (
        <AuctionRoom 
          user={user} 
          league={selectedLeague} 
          onExit={backToDashboard} 
          customPlayers={customPlayers.length > 0 ? customPlayers : undefined}
          showImages={userSettings.showPlayerImages}
        />
      )}
    </Layout>
  );
};

export default App;