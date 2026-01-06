
import { GoogleGenAI } from "@google/genai";

export const getAuctionCommentary = async (
  league: string,
  playerName: string,
  currentBid: number,
  highestBidder: string,
  isSold: boolean = false
): Promise<string> => {
  try {
    // Correct initialization using direct process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a high-energy auctioneer for the ${league}. 
      Comment on this situation in 1-2 punchy sentences:
      Player: ${playerName}
      Current Bid: ${currentBid}
      Leading Team: ${highestBidder}
      Status: ${isSold ? 'SOLD!' : 'Bidding in progress'}
      Make it feel intense and professional.`,
      config: {
        // Removed maxOutputTokens to avoid potential thinking budget conflicts as per guidelines
        temperature: 0.8,
      },
    });
    // Correctly accessing the .text property on the GenerateContentResponse object
    return response.text || "The auction is heating up!";
  } catch (error) {
    console.error("Gemini Commentary Error:", error);
    return "The room is buzzing with excitement!";
  }
};
