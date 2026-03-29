const skillsList = [
  "javascript", "react", "node", "express",
  "mongodb", "sql", "python", "java",
  "c++", "html", "css", "typescript"
];

export const extractSkills = (text) => {
  const lower = text.toLowerCase();

  return skillsList.filter(skill => lower.includes(skill));
};