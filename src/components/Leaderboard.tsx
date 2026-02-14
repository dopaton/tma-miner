import { useMemo } from 'react';
import { storageService } from '../services';
import type { LeaderboardEntry } from '../types';
import { formatNumber } from '../utils/helpers';
import './Leaderboard.css';

interface LeaderboardProps {
  currentUserId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserId }) => {
  const entries = useMemo<LeaderboardEntry[]>(() => {
    const leaderboard = storageService.getLeaderboard();
    return leaderboard.map((user, index) => ({
      id: user.id,
      username: user.username || `User ${user.id.substring(0, 8)}`,
      totalMined: user.totalMined,
      rank: index + 1,
    }));
  }, []);

  // Use useMemo for derived state
  const currentUserRank = useMemo(() => {
    const currentUser = entries.find(entry => entry.id === currentUserId);
    return currentUser?.rank ?? null;
  }, [entries, currentUserId]);

  const getMedalIcon = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
        {currentUserRank && (
          <div className="user-rank">Your Rank: {getMedalIcon(currentUserRank)}</div>
        )}
      </div>

      <div className="leaderboard-list">
        {entries.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">👤</span>
            <p>No miners yet. Start mining to appear on the leaderboard!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className={`leaderboard-entry ${entry.id === currentUserId ? 'current-user' : ''}`}
            >
              <div className="entry-rank">{getMedalIcon(entry.rank)}</div>
              <div className="entry-info">
                <div className="entry-name">{entry.username}</div>
                <div className="entry-mined">
                  <span className="coin-icon-small">💎</span>
                  {formatNumber(entry.totalMined)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
