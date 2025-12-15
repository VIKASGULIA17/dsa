import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Trophy, Medal } from 'lucide-react';

const ContestLeaderboard = ({ contestId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await api.contests.getLeaderboard(contestId);
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to load leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [contestId]);

  if (loading) return <div className="text-gray-500 text-sm animate-pulse">Loading leaderboard...</div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-800/50 border-b border-gray-800 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-white">Live Leaderboard</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">Rank</th>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Score</th>
              <th scope="col" className="px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.rank} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  {entry.rank === 1 && <Medal className="w-4 h-4 text-yellow-400" />}
                  {entry.rank === 2 && <Medal className="w-4 h-4 text-gray-400" />}
                  {entry.rank === 3 && <Medal className="w-4 h-4 text-orange-400" />}
                  {entry.rank}
                </td>
                <td className="px-6 py-4">{entry.user}</td>
                <td className="px-6 py-4 text-green-400 font-mono">{entry.score}</td>
                <td className="px-6 py-4 font-mono text-xs">{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestLeaderboard;
