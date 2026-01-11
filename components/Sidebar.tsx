
import React, { useState, useEffect } from 'react';
import type { Results } from '../types';
import { FIXTURE } from '../constants';

interface SidebarProps {
    user: string | null;
    onLogin: (username: string) => void;
    onLogout: () => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    results: Results;
    onResultsChange: (newResults: Results) => void;
}

// FIX: Define a type to allow for partial results during editing.
type PartialResults = {
    [matchId: number]: {
        home?: number;
        away?: number;
    }
}

// Admin Panel Component defined within Sidebar file
const AdminPanel: React.FC<{ results: Results; onResultsChange: (newResults: Results) => void; }> = ({ results, onResultsChange }) => {
    // FIX: Use PartialResults for local state to allow undefined scores during input.
    const [localResults, setLocalResults] = useState<PartialResults>(results);

    useEffect(() => {
        setLocalResults(results);
    }, [results]);

    const handleResultChange = (matchId: number, team: 'home' | 'away', value: string) => {
        const score = value === '' ? undefined : parseInt(value, 10);
        if (score !== undefined && isNaN(score)) return;

        const updatedMatchResult = {
            home: team === 'home' ? score : localResults[matchId]?.home,
            away: team === 'away' ? score : localResults[matchId]?.away,
        };

        const newResults = { ...localResults, [matchId]: updatedMatchResult };
        setLocalResults(newResults);
    };

    const handleSave = () => {
        // Filter out incomplete results
        const completeResults = Object.entries(localResults).reduce((acc, [key, value]) => {
            // FIX: Check for properties on `value`. With `localResults` correctly typed as `PartialResults`, `value` is no longer `unknown` and its properties can be safely accessed. This fixes the error about property 'home' not existing.
            if (value.home !== undefined && value.away !== undefined) {
                // FIX: The value being assigned must strictly match the `Results` type. `value` is a `PartialResult`, but after the check we know `home` and `away` are numbers. We create a new object to satisfy the type-checker. This fixes the type mismatch error.
                acc[parseInt(key)] = { home: value.home, away: value.away };
            }
            return acc;
        }, {} as Results);
        onResultsChange(completeResults);
        alert('Results saved!');
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-600">
            <h3 className="font-bold text-lg text-teal-400">Admin Panel</h3>
            <div className="mt-2 space-y-3 max-h-96 overflow-y-auto pr-2">
                {FIXTURE.map(match => (
                    <div key={match.id} className="text-sm">
                        <p className="font-semibold">{match.home} vs {match.away}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="number"
                                min="0"
                                placeholder="H"
                                value={localResults[match.id]?.home ?? ''}
                                onChange={(e) => handleResultChange(match.id, 'home', e.target.value)}
                                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="A"
                                value={localResults[match.id]?.away ?? ''}
                                onChange={(e) => handleResultChange(match.id, 'away', e.target.value)}
                                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSave}
                className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
                Save All Results
            </button>
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ user, onLogin, onLogout, isAdmin, setIsAdmin, results, onResultsChange }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    
    const handleAdminLogin = () => {
        // In a real app, this would be a secure check.
        if (passwordInput === 'admin2026') {
            setIsAdmin(true);
            setShowAdminLogin(false);
            setPasswordInput('');
        } else {
            alert('Incorrect admin password.');
        }
    };

    return (
        <aside className="w-full md:w-72 lg:w-80 bg-gray-800 p-6 flex-shrink-0">
            <div className="sticky top-6">
                <h2 className="text-2xl font-bold mb-6">User Panel</h2>
                {user ? (
                    <div className="space-y-3">
                        <p className="text-lg">Welcome, <span className="font-bold text-teal-400">{user}</span>!</p>
                        <button
                            onClick={onLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            onClick={() => onLogin(usernameInput)}
                            disabled={!usernameInput.trim()}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Login
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-700">
                    {isAdmin ? (
                        <AdminPanel results={results} onResultsChange={onResultsChange} />
                    ) : (
                        <div>
                            <button onClick={() => setShowAdminLogin(!showAdminLogin)} className="text-gray-400 hover:text-white">
                                {showAdminLogin ? 'Hide Admin Login' : 'Admin Login'}
                            </button>
                            {showAdminLogin && (
                                <div className="mt-4 space-y-3">
                                    <input
                                        type="password"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        placeholder="Admin password"
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button
                                        onClick={handleAdminLogin}
                                        className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                    >
                                        Unlock Admin
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
