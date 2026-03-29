import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiSuggestions = async (resumeText) => {
  console.log("API KEY:", process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert resume reviewer.

Analyze the following resume and give:
- Key improvements
- Missing skills
- ATS optimization tips
- Career suggestions

Return only bullet points.

Resume:
${resumeText.slice(0, 3000)}
`;

    const result = await model.generateContent(prompt);

    // ✅ FIXED RESPONSE EXTRACTION
    const text = result.response.text();

    return {
      source: "gemini",
      suggestions: text
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .slice(0, 6),
    };
  } catch (error) {
    console.log("🔥 Gemini Error:", error.message);

    return {
      source: "fallback",
      suggestions: [
        "Add measurable achievements",
        "Improve ATS formatting",
        "Use more relevant keywords",
        "Highlight projects clearly",
        "Keep resume concise",
      ],
    };
  }
};