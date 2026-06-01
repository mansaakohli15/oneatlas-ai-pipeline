import Groq from "groq-sdk";
import { AIProvider } from "../provider";

export class GroqProvider implements AIProvider {
  private client;

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async generate(prompt: string): Promise<string> {
    const completion =
      await this.client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return (
      completion.choices[0].message.content ?? ""
    );
  }
}