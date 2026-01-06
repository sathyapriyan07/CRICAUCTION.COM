
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AuctionRoom } from './components/AuctionRoom';
import { Login } from './components/Login';
import { League, User, UserRole, Player } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'auction'>('dashboard');
  const [selectedLeague, setSelectedLeague] = useState<League>(League.IPL);
  const [customPlayers, setCustomPlayers] = useState<Player[]>([]);

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
    >
      {currentView === 'dashboard' ? (
        <Dashboard 
          user={user} 
          onStartAuction={startAuction} 
          onImportCustomPool={handleImportCustomPool} 
          onAddCustomPlayer={handleAddCustomPlayer}
          customPoolSize={customPlayers.length}
        />
      ) : (
        <AuctionRoom 
          user={user} 
          league={selectedLeague} 
          onExit={backToDashboard} 
          customPlayers={customPlayers.length > 0 ? customPlayers : undefined}
        />
      )}
    </Layout>
  );
};

export default App;
