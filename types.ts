
export interface Match {
    id: number;
    group: string;
    home: string;
    away: string;
    date: string;
}

export interface Prediction {
    [matchId: number]: {
        home: number;
        away: number;
    };
}

export interface AllPredictions {
    [username: string]: Prediction;
}

export interface Results {
    [matchId: number]: {
        home: number;
        away: number;
    };
}

export interface UserScore {
    user: string;
    score: number;
    exacts: number;
    winners: number;
}
