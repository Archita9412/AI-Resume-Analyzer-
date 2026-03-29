import analyzeResume from "../utils/analyzeResume.js";
import { getGeminiSuggestions } from "../services/gemini.service.js";
import { extractTextFromPDF } from "../utils/extractText.js";
import { calculateSimilarity } from "../utils/similarity.js";
import { extractSkills } from "../utils/skillExtractor.js";

export const uploadResume = async (req, res) => {
  try {
    // ❌ File check
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("FILE RECEIVED");

    // 📄 Extract text
    const text = await extractTextFromPDF(req.file.buffer);
const skills = extractSkills(text);
    if (!text || text.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Could not extract text from PDF",
      });
    }

    console.log("TEXT LENGTH:", text.length);

    const targetRole = req.body.role || "full stack developer";

    // 📊 ATS Score
    const analysis = analyzeResume(text, targetRole);

    // 🏷️ Score Label
    const scoreLabel = getScoreLabel(analysis.score);

    // 🤖 Gemini AI Suggestions
    const aiSuggestions = await getGeminiSuggestions(text);

    // 🎯 Job Matching
    const jobDescription = req.body.jobDescription || "";
   let jobMatch = null;

if (jobDescription) {
  jobMatch = {
    matchPercentage: calculateSimilarity(text, jobDescription)
  };
}

    // 📤 Final Response
   res.json({
  success: true,
 data: {
  score: analysis.score,
  scoreLabel: getScoreLabel(analysis.score),

  // ✅ THIS IS THE MAIN FIX
  skills: analysis.foundSkills || [],

  aiSuggestions: aiSuggestions.suggestions,
  jobMatch: jobMatch || null,
}
});
console.log("FOUND SKILLS:", analysis.foundSkills);


  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    console.error("🔥 MESSAGE:", error.message);
    console.error("🔥 STACK:", error.stack);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 🏷️ Score Label Function
const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
};
