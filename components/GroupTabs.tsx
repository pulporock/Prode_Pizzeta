
import React from 'react';
import type { Match, Prediction, Results } from '../types';
import { MatchCard } from './MatchCard';

interface GroupTabsProps {
    groups: string[];
    activeGroup: string;
    setActiveGroup: (group: string) => void;
    matches: Match[];
    predictions: Prediction;
    results: Results;
    onPredictionChange: (matchId: number, home: number, away: number) => void;
    isUserLoggedIn: boolean;
}

export const GroupTabs: React.FC<GroupTabsProps> = ({
    groups,
    activeGroup,
    setActiveGroup,
    matches,
    predictions,
    results,
    onPredictionChange,
    isUserLoggedIn
}) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-wrap border-b border-gray-700 mb-4">
                {groups.map(group => (
                    <button
                        key={group}
                        onClick={() => setActiveGroup(group)}
                        className={`py-2 px-4 text-sm sm:text-base font-medium transition-colors duration-200 ${
                            activeGroup === group
                                ? 'border-b-2 border-teal-400 text-teal-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Group {group}
                    </button>
                ))}
            </div>
            {!isUserLoggedIn && (
                 <div className="text-center py-10 bg-gray-700/50 rounded-md">
                    <p className="text-lg text-gray-300">Please log in to make predictions.</p>
                </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${isUserLoggedIn ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                {matches.map(match => (
                    <MatchCard
                        key={match.id}
                        match={match}
                        prediction={predictions[match.id]}
                        result={results[match.id]}
                        onPredictionChange={onPredictionChange}
                    />
                ))}
            </div>
        </div>
    );
};
