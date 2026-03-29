// src/services/resume.service.js

const analyzeResume = (text) => {
  const skillsList = [
    "c++", "java", "python", "react", "node.js",
    "sql", "javascript", "html", "css",
    "aws", "docker", "git", "github", "c", "mongoose"
  ];

  const lowerText = text.toLowerCase();

  const foundSkills = skillsList.filter(skill =>
    lowerText.includes(skill)
  );

  const hasProjects = lowerText.includes("project");
  const hasEducation = lowerText.includes("education");

  const wordCount = text.split(/\s+/).length;

  let score = 0;

  score += foundSkills.length * 10;

  if (hasProjects) score += 20;
  if (hasEducation) score += 20;
  if (wordCount > 200) score += 20;

  if (score > 100) score = 100;

  let suggestions = [];

  if (foundSkills.length < 3) {
    suggestions.push("Add more technical skills");
  }

  if (!hasProjects) {
    suggestions.push("Include a projects section");
  }

  if (!hasEducation) {
    suggestions.push("Include education details");
  }

  if (wordCount < 150) {
    suggestions.push("Increase resume content");
  }

  return {
    wordCount,
    skills: foundSkills,
    score,
    suggestions,
  };
};

export default analyzeResume;