import { GoogleGenAI } from "@google/genai";
import type { ReminderTone } from '../types';

export const generateReminderMessage = async (
  apartmentName: string,
  startDate: string,
  endDate: string,
  tone: ReminderTone
): Promise<string> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    return "Error: API Key is missing. Cannot generate reminder.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      Write a short, message board notice or text message for a neighbor.
      
      Context:
      - It is the turn of "${apartmentName}" to take out the garbage for the whole building.
      - The period is from ${startDate} to ${endDate}.
      - The tone should be: ${tone}.
      - Keep it under 50 words.
      - Do not include hashtags.
      - Just the message content.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Could not generate message.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a message right now. Please try again later.";
  }
};