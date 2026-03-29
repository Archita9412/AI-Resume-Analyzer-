export default function calculateATSScore(text, targetRole = "") {
  const resume = text.toLowerCase();

  let score = 0;

  // ---------------------------
  // 1. SKILLS MATCH (25 points)
  // ---------------------------
  const skillKeywords = [
    "javascript", "react", "node", "express",
    "mongodb", "sql", "python", "java",
    "html", "css", "typescript"
  ];

  let skillMatch = 0;
  skillKeywords.forEach(skill => {
    if (resume.includes(skill)) skillMatch++;
  });

  score += Math.min(25, skillMatch * 3);

  // ---------------------------
  // 2. KEYWORDS MATCH (20 points)
  // ---------------------------
  const roleKeywords = targetRole.toLowerCase().split(" ");

  let keywordMatch = 0;
  roleKeywords.forEach(word => {
    if (word.length > 2 && resume.includes(word)) {
      keywordMatch++;
    }
  });

  score += Math.min(20, keywordMatch * 5);

  // ---------------------------
  // 3. PROJECTS (15 points)
  // ---------------------------
  if (resume.includes("project")) score += 8;
  if (resume.includes("built") || resume.includes("developed")) score += 7;

  // ---------------------------
  // 4. EXPERIENCE (15 points)
  // ---------------------------
  if (resume.includes("experience")) score += 8;
  if (resume.includes("intern")) score += 7;

  // ---------------------------
  // 5. STRUCTURE (10 points)
  // ---------------------------
  const sections = ["education", "skills", "project", "experience"];
  let sectionCount = 0;

  sections.forEach(sec => {
    if (resume.includes(sec)) sectionCount++;
  });

  score += sectionCount * 2.5;

  // ---------------------------
  // 6. LINKS (5 points)
  // ---------------------------
  if (resume.includes("github")) score += 2.5;
  if (resume.includes("linkedin")) score += 2.5;

  // ---------------------------
  // 7. LENGTH BALANCE (10 points)
  // ---------------------------
  if (resume.length > 1000 && resume.length < 8000) {
    score += 10;
  } else if (resume.length > 500) {
    score += 6;
  }

  // FINAL SCORE CAP
  if (score > 100) score = 100;

  return {
    score: Math.round(score),
    breakdown: {
      skillMatch,
      keywordMatch,
      length: resume.length
    }
  };
}