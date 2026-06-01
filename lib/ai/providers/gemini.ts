import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "../provider";

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }

  async generate(prompt: string): Promise<string> {
    const result =
      await this.model.generateContent(prompt);

    return result.response.text();
  }
}