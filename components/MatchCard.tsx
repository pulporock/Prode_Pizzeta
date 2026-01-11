
import React, { useState } from 'react';
import { getPredictionAnalysis } from '../services/geminiService';
import type { Match } from '../types';

interface MatchCardProps {
    match: Match;
    prediction?: { home: number; away: number };
    result?: { home: number; away: number };
    onPredictionChange: (matchId: number, home: number, away: number) => void;
}

const getPointsForMatch = (prediction?: { home: number; away: number }, result?: { home: number; away: number }): number | null => {
    if (!prediction || result === undefined || result.home === undefined || result.away === undefined) return null;

    const correctResult = prediction.home === result.home && prediction.away === result.away;
    if (correctResult) return 3;

    const predictedWinner = prediction.home > prediction.away ? 'home' : prediction.home < prediction.away ? 'away' : 'draw';
    const actualWinner = result.home > result.away ? 'home' : result.home < result.away ? 'away' : 'draw';
    if (predictedWinner === actualWinner) return 1;

    return 0;
};

export const MatchCard: React.FC<MatchCardProps> = ({ match, prediction, result, onPredictionChange }) => {
    const homePrediction = prediction?.home ?? '';
    const awayPrediction = prediction?.away ?? '';
    const [analysis, setAnalysis] = useState('');
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

    const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        if (value === '' || (value >= 0 && !isNaN(value))) {
            onPredictionChange(match.id, value === '' ? -1 : value, typeof awayPrediction === 'number' ? awayPrediction : -1);
        }
    };

    const handleAwayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        if (value === '' || (value >= 0 && !isNaN(value))) {
            onPredictionChange(match.id, typeof homePrediction === 'number' ? homePrediction : -1, value === '' ? -1 : value);
        }
    };
    
    const fetchAnalysis = async () => {
        if (typeof homePrediction !== 'number' || typeof awayPrediction !== 'number' || homePrediction < 0 || awayPrediction < 0) {
            alert("Please enter a valid score for both teams to get an analysis.");
            return;
        }
        setIsLoadingAnalysis(true);
        setAnalysis('');
        try {
            const result = await getPredictionAnalysis(match.home, match.away, homePrediction, awayPrediction);
            setAnalysis(result);
        } catch (error) {
            console.error("Gemini API error:", error);
            setAnalysis("Sorry, couldn't get an analysis at this time.");
        } finally {
            setIsLoadingAnalysis(false);
        }
    };

    const points = getPointsForMatch(prediction, result);

    return (
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-3 shadow-md transition-all hover:shadow-lg hover:bg-gray-700">
            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Group {match.group}</span>
                <span>{match.date}</span>
                {points !== null && (
                    <span className={`font-bold px-2 py-1 rounded-full text-xs ${
                        points === 3 ? 'bg-green-500 text-white' :
                        points === 1 ? 'bg-yellow-500 text-black' :
                        'bg-red-500 text-white'
                    }`}>
                        {points} Pts
                    </span>
                )}
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
                <span className="text-right font-semibold text-lg truncate">{match.home}</span>
                <span className="text-center text-gray-400 text-sm">vs</span>
                <span className="text-left font-semibold text-lg truncate">{match.away}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
                <input
                    type="number"
                    min="0"
                    value={homePrediction === -1 ? '' : homePrediction}
                    onChange={handleHomeChange}
                    className="w-full bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={result !== undefined}
                />
                <div className="text-center">
                    {result !== undefined ? (
                         <div className="text-center bg-gray-800 rounded-md py-1">
                            <p className="text-xs text-gray-400">Final</p>
                            <p className="font-bold text-lg">{result.home} - {result.away}</p>
                        </div>
                    ) : (
                        <span className="text-lg font-mono">-</span>
                    )}
                </div>
                <input
                    type="number"
                    min="0"
                    value={awayPrediction === -1 ? '' : awayPrediction}
                    onChange={handleAwayChange}
                    className="w-full bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={result !== undefined}
                />
            </div>
            <div className="pt-2">
                 <button 
                    onClick={fetchAnalysis} 
                    disabled={isLoadingAnalysis}
                    className="w-full text-xs bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:cursor-wait text-white font-semibold py-1 px-2 rounded transition-colors duration-200"
                  >
                    {isLoadingAnalysis ? 'Thinking...' : 'Get Gemini Analysis ✨'}
                  </button>
                  {analysis && (
                    <p className="text-xs text-gray-300 mt-2 p-2 bg-gray-900/50 rounded-md border border-gray-600">
                      {analysis}
                    </p>
                  )}
            </div>
        </div>
    );
};
