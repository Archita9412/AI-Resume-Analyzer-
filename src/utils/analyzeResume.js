const roleKeywords = {
  "frontend developer": [
    "react", "javascript", "html", "css", "redux", "tailwind",
  ],
  "backend developer": [
    "node.js", "express", "mongodb", "sql", "api", "server",
  ],
  "full stack developer": [
    "react", "node.js", "mongodb", "express", "javascript",
  ],
  "data analyst": [
    "python", "sql", "excel", "pandas", "numpy", "power bi",
  ],
};

const analyzeResume = (text, targetRole = "full stack developer") => {
  const lowerText = text.toLowerCase();

  const skillsList = [
    "c++", "java", "python", "react", "node.js", "sql",
    "javascript", "html", "css", "aws", "docker",
    "git", "github", "mongodb", "express",
  ];

  let foundSkills = [];

  skillsList.forEach((skill) => {
    if (lowerText.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  // 🎯 Role-based matching
  const keywords = roleKeywords[targetRole] || [];
  let matchedKeywords = [];

  keywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      matchedKeywords.push(keyword);
    }
  });

  // ❌ Missing keywords
  const missingKeywords = keywords.filter(
    (kw) => !matchedKeywords.includes(kw)
  );

  // ✅ SECTION DETECTION (IMPORTANT)
  const hasProjects = lowerText.includes("project");
  const hasEducation = lowerText.includes("education");
  const hasExperience = lowerText.includes("experience");

  // 🎯 FINAL BALANCED SCORING

  // 🔹 Skills (max 35)
  const skillsScore = Math.min(foundSkills.length * 5, 35);

  // 🔹 Role match (max 30)
  const roleScore = Math.min(matchedKeywords.length * 8, 30);

  // 🔹 Sections (max 20)
  let sectionScore = 0;
  if (hasProjects) sectionScore += 8;
  if (hasEducation) sectionScore += 4;
  if (hasExperience) sectionScore += 8;

  // 🔹 Length (max 15)
  let lengthScore = 0;
  if (text.length > 600) lengthScore = 15;
  else if (text.length > 400) lengthScore = 10;

  // 🔥 BASE SCORE
  let score = skillsScore + roleScore + sectionScore + lengthScore;

  // ❌ PENALTIES (make weak resumes low)
  score -= missingKeywords.length * 2;

  if (foundSkills.length < 4) score -= 10;
  if (!hasProjects) score -= 8;
  if (!hasExperience) score -= 8;
  if (text.length < 400) score -= 10;

  // 🚀 BOOST GOOD RESUMES
  if (foundSkills.length >= 6 && matchedKeywords.length >= 3) {
    score += 10;
  }

  // 🎯 LIMITS
  // 🚀 SMART INFLATION (PORTFOLIO MODE)

// Base boost
score += 15;

// Extra boost for decent resumes
if (score >= 50) score += 10;

// Strong resume boost
if (foundSkills.length >= 5) score += 5;

// cap limits
if (score > 100) score = 100;
if (score < 0) score = 0;
  // 💡 Suggestions
  let suggestions = [];

  if (foundSkills.length < 5) {
    suggestions.push("Add more relevant technical skills");
  }

  if (!hasProjects) {
    suggestions.push("Include a strong projects section");
  }

  if (!hasExperience) {
    suggestions.push("Add work experience or internships");
  }

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Add missing keywords for ${targetRole}: ${missingKeywords.join(", ")}`
    );
  }

  if (text.length < 500) {
    suggestions.push("Increase resume content and add more details");
  }

  return {
    score,
    foundSkills,
    matchedKeywords,
    missingKeywords,
    suggestions,
    targetRole,
  };
};

export default analyzeResume;