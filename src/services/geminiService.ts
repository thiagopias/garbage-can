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
    return "Erro: Chave da API não encontrada. Não é possível gerar o lembrete.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      Escreva uma mensagem curta para um grupo de WhatsApp ou aviso para vizinhos.
      
      Contexto:
      - É a vez de "${apartmentName}" colocar o lixo para fora para todo o prédio.
      - O período é de ${startDate} a ${endDate}.
      - O tom deve ser: ${tone}.
      - Mantenha em menos de 50 palavras.
      - Não inclua hashtags.
      - Apenas o conteúdo da mensagem.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Não foi possível gerar a mensagem.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, não consegui gerar uma mensagem agora. Por favor, tente novamente mais tarde.";
  }
};