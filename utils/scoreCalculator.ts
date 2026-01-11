
import type { AllPredictions, Results, UserScore } from '../types';

export function calculateScores(allPredictions: AllPredictions, results: Results): UserScore[] {
    const userScores: { [user: string]: { score: number; exacts: number; winners: number } } = {};

    for (const user in allPredictions) {
        userScores[user] = { score: 0, exacts: 0, winners: 0 };
        const userPredictions = allPredictions[user];

        for (const matchIdStr in userPredictions) {
            const matchId = parseInt(matchIdStr, 10);
            const prediction = userPredictions[matchId];
            const result = results[matchId];

            if (result && prediction && prediction.home !== undefined && prediction.away !== undefined && result.home !== undefined && result.away !== undefined && prediction.home !== -1 && prediction.away !== -1) {
                // Exact score: 3 points
                if (prediction.home === result.home && prediction.away === result.away) {
                    userScores[user].score += 3;
                    userScores[user].exacts += 1;
                } else {
                    const predictedWinner = prediction.home > prediction.away ? 'home' : prediction.home < prediction.away ? 'away' : 'draw';
                    const actualWinner = result.home > result.away ? 'home' : result.home < result.away ? 'away' : 'draw';
                    
                    // Correct winner or draw: 1 point
                    if (predictedWinner === actualWinner) {
                        userScores[user].score += 1;
                        userScores[user].winners += 1;
                    }
                }
            }
        }
    }
    
    const sortedScores: UserScore[] = Object.entries(userScores)
        .map(([user, data]) => ({ user, ...data }))
        .sort((a, b) => {
            // Sort by score descending, then by exacts, then by winners
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            if (b.exacts !== a.exacts) {
                return b.exacts - a.exacts;
            }
            return b.winners - a.winners;
        });

    return sortedScores;
}
