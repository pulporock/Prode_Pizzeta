
import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { GroupTabs } from './components/GroupTabs';
import { Leaderboard } from './components/Leaderboard';
import { Match, Prediction, AllPredictions, Results, UserScore } from './types';
import { FIXTURE, GROUPS } from './constants';
import { calculateScores } from './utils/scoreCalculator';

// Main App Component
const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [activeGroup, setActiveGroup] = useState<string>(GROUPS[0]);
    
    // State for predictions and results, loaded from localStorage
    const [predictions, setPredictions] = useState<Prediction>({});
    const [allPredictions, setAllPredictions] = useState<AllPredictions>({});
    const [results, setResults] = useState<Results>({});

    // Load data from localStorage on initial render
    useEffect(() => {
        try {
            const storedResults = localStorage.getItem('prode_results');
            if (storedResults) setResults(JSON.parse(storedResults));

            const storedAllPredictions = localStorage.getItem('prode_allPredictions');
            if (storedAllPredictions) setAllPredictions(JSON.parse(storedAllPredictions));
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
        }
    }, []);

    const handleLogin = (username: string) => {
        if (username) {
            setUser(username);
            setPredictions(allPredictions[username] || {});
        }
    };

    const handleLogout = () => {
        setUser(null);
        setIsAdmin(false);
        setPredictions({});
    };
    
    const handlePredictionChange = (matchId: number, home: number, away: number) => {
        if (user) {
            const newPredictions = { ...predictions, [matchId]: { home, away } };
            setPredictions(newPredictions);
            
            const newAllPredictions = { ...allPredictions, [user]: newPredictions };
            setAllPredictions(newAllPredictions);
            localStorage.setItem('prode_allPredictions', JSON.stringify(newAllPredictions));
        }
    };

    const handleResultsChange = (newResults: Results) => {
        setResults(newResults);
        localStorage.setItem('prode_results', JSON.stringify(newResults));
    };

    const userScores = useMemo(() => calculateScores(allPredictions, results), [allPredictions, results]);

    const matchesByGroup = useMemo(() => {
        return FIXTURE.reduce((acc, match) => {
            if (!acc[match.group]) {
                acc[match.group] = [];
            }
            acc[match.group].push(match);
            return acc;
        }, {} as { [key: string]: Match[] });
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 font-sans">
            <Sidebar
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                results={results}
                onResultsChange={handleResultsChange}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Mundial 2026 Prode Challenge
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Enter your predictions for the group stage and climb the leaderboard!
                    </p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <GroupTabs
                            groups={GROUPS}
                            activeGroup={activeGroup}
                            setActiveGroup={setActiveGroup}
                            matches={matchesByGroup[activeGroup] || []}
                            predictions={predictions}
                            results={results}
                            onPredictionChange={handlePredictionChange}
                            isUserLoggedIn={!!user}
                        />
                    </div>
                    <div>
                        <Leaderboard scores={userScores} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
