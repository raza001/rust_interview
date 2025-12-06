import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const explainCode = async (code: string, context: string): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure it to use AI features.";
  
  try {
    const prompt = `You are a senior Rust engineer. Explain the following Rust code snippet clearly and concisely.
    Focus on:
    1. Key Rust concepts used (e.g., Ownership, Lifetimes, Pattern Matching).
    2. Why this is idiomatic or potential pitfalls.
    3. Keep it brief (under 150 words) but helpful for an interviewee.

    Context: ${context}
    
    Code:
    \`\`\`rust
    ${code}
    \`\`\`
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No explanation generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate explanation. Please try again later.";
  }
};

export const generateExample = async (topic: string): Promise<{code: string, explanation: string}> => {
    if (!apiKey) return { code: "", explanation: "API Key is missing." };

    try {
        const prompt = `Generate a production-ready, idiomatic Rust code example for the topic: "${topic}".
        Provide the response in JSON format with two fields: "code" (the Rust code) and "explanation" (a brief description).
        Do not use markdown code blocks in the JSON fields.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        if (!text) throw new Error("Empty response");
        
        const result = JSON.parse(text);
        return {
            code: result.code || "// No code generated",
            explanation: result.explanation || "No explanation generated"
        };
    } catch (error) {
        console.error("Gemini Error:", error);
        return { code: "", explanation: "Failed to generate example." };
    }
}

export const chatWithExpert = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
    if (!apiKey) return "API Key is missing.";

    try {
        // Convert simplified history to Gemini format if needed, but for single-turn or simple chat state in React:
        // We will just use generateContent with system instruction if we don't maintain a Chat object, 
        // OR use a persistent Chat object. For simplicity in this stateless service call, we'll use generateContent with history as context text or use chat if we can keep state.
        // Let's use a fresh chat session for simplicity in this demo structure, or pass history.
        
        // Better approach for this snippet: Just answer the question as an expert.
         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a Rust expert helping a developer prepare for an interview. Answer this question concisely: ${message}`,
         });
         return response.text || "I couldn't understand that.";

    } catch (e) {
        return "Error communicating with AI.";
    }
}