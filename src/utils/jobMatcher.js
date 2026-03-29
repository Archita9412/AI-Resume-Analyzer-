const extractKeywords = (text) => {
  const words = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ");

  const stopWords = ["the", "and", "or", "a", "to", "of", "in", "for"];

  return words.filter((word) => word.length > 2 && !stopWords.includes(word));
};

const getUnique = (arr) => [...new Set(arr)];

const matchJobDescription = (resumeText, jobDescription) => {
  const resumeWords = getUnique(extractKeywords(resumeText));
  const jobWords = getUnique(extractKeywords(jobDescription));

  let matched = [];
  let missing = [];

  jobWords.forEach((word) => {
    if (resumeWords.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  // 📊 Score calculation
  let score = 0;

  if (jobWords.length > 0) {
    score = Math.round((matched.length / jobWords.length) * 100);
  }

  // 💡 Suggestions
  let suggestions = [];

  if (missing.length > 0) {
    suggestions.push(
      `Add these keywords to improve match: ${missing.slice(0, 10).join(", ")}`
    );
  }

  if (score < 50) {
    suggestions.push("Your resume is not well aligned with this job role");
  } else if (score < 75) {
    suggestions.push("Good match, but can be improved with more keywords");
  } else {
    suggestions.push("Strong match for this role");
  }

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    suggestions,
  };
};

export default matchJobDescription;