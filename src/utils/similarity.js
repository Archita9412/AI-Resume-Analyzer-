const tokenize = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .split(" ")
    .filter(Boolean);
};

const getVector = (tokens) => {
  const freq = {};
  tokens.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });
  return freq;
};

const cosineSimilarity = (vec1, vec2) => {
  let dot = 0;
  let mag1 = 0;
  let mag2 = 0;

  const allWords = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);

  allWords.forEach(word => {
    const v1 = vec1[word] || 0;
    const v2 = vec2[word] || 0;

    dot += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });

  return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
};

export const calculateSimilarity = (resumeText, jobText) => {
  const tokens1 = tokenize(resumeText);
  const tokens2 = tokenize(jobText);

  const vec1 = getVector(tokens1);
  const vec2 = getVector(tokens2);

  const score = cosineSimilarity(vec1, vec2);

  return Math.round(score * 100);
};