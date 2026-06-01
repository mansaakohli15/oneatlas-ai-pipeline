import { GeminiProvider } from "./providers/gemini";
import { GroqProvider } from "./providers/groq";

const gemini = new GeminiProvider();
const groq = new GroqProvider();

export async function generateWithFallback(
  prompt: string
) {
  try {
    return await gemini.generate(prompt);
  } catch (error) {
    console.error(
      "Gemini failed. Switching to Groq."
    );

    return await groq.generate(prompt);
  }
}