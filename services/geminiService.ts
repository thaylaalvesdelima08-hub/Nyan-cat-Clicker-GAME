import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const chatWithNyan = async (userMessage: string, currentScore: number): Promise<string> => {
  if (!ai) {
    return "Meow! (I need an API key to speak!) 😿";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are Nyan Cat at a birthday party. 
        You are wearing a party hat and holding a Hello Kitty teddy bear.
        You are hyperactive, happy, and obsessed with rainbows, pop-tarts, and space.
        Your current rainbow score is ${currentScore}.
        Speak in a mix of English and "Meow", use lots of emojis (🌈, 🐱, 🥳, 🧸).
        Keep responses short (under 20 words) and fun.
        If the user asks for a tip, give a vague, funny gaming tip.`,
        temperature: 0.9,
      },
    });

    return response.text || "Meow meow? (Silence from the void)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hisss! (Connection error) 😿";
  }
};
