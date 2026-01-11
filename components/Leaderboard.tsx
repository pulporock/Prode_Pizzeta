
import React from 'react';
import type { UserScore } from '../types';

interface LeaderboardProps {
    scores: UserScore[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Leaderboard</h2>
            {scores.length === 0 ? (
                <p className="text-gray-400">No predictions made yet. Be the first!</p>
            ) : (
                <ol className="space-y-3">
                    {scores.map((userScore, index) => (
                        <li key={userScore.user} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md transition-transform hover:scale-105">
                            <div className="flex items-center">
                                <span className={`text-lg font-bold w-8 text-center ${index < 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                    {index + 1}
                                </span>
                                <span className="ml-3 font-semibold truncate">{userScore.user}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <span title="Exact Results" className="text-green-400">{userScore.exacts} E</span>
                                <span title="Correct Winners/Draws" className="text-yellow-400">{userScore.winners} W</span>
                                <span className="font-bold text-xl text-white bg-gray-900 px-3 py-1 rounded-md">
                                    {userScore.score}
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};
