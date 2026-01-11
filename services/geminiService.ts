
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getPredictionAnalysis(
    homeTeam: string, 
    awayTeam: string, 
    homeScore: number, 
    awayScore: number
): Promise<string> {
    if (!API_KEY) {
        return "Gemini API key is not configured. Analysis is unavailable.";
    }

    let winner;
    if (homeScore > awayScore) {
        winner = `${homeTeam} with a decisive victory`;
    } else if (awayScore > homeScore) {
        winner = `${awayTeam} with a surprising upset`;
    } else {
        winner = `a hard-fought draw`;
    }

    const prompt = `You are a charismatic and concise soccer commentator.
    Analyze a fan's match prediction where ${homeTeam} will play against ${awayTeam} with a predicted score of ${homeScore}-${awayScore}.
    The prediction results in ${winner}.
    Provide a fun, one-sentence analysis of this prediction. Be creative and encouraging. Do not use markdown.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        const text = response.text;
        if (text) {
            return text.trim();
        } else {
            return "Couldn't generate an analysis for this prediction.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini.");
    }
}
